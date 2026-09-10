import { NextResponse } from "next/server";
import type { CartLine, Order } from "@/data/types";
import { getColorVariantById, getProductById } from "@/data/products";
import { computeCartTotals, computeShippingCost } from "@/lib/pricing";
import { buildOrderMessage, buildWhatsAppOrderUrl, type CustomerInfo } from "@/lib/whatsapp";
import { validateCustomerInfo } from "@/lib/customer-validation";
import { generateOrderId } from "@/lib/order-id";
import { recordOrderInSheets, type SheetsWriteStatus } from "@/lib/sheets/orders-sheet";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

interface OrderRequestBody {
  lines: CartLine[];
  customer: CustomerInfo;
  shippingCost?: number;
  submissionToken: string;
}

/** Server-authoritative caps — rejected, never silently clamped. */
const MAX_QTY_PER_LINE = 200;
const MAX_CART_LINES = 20;

function isValidLine(line: unknown): line is CartLine {
  if (!line || typeof line !== "object") return false;
  const l = line as Record<string, unknown>;
  return (
    typeof l.productId === "string" &&
    typeof l.colorVariantId === "string" &&
    typeof l.qty === "number" &&
    Number.isFinite(l.qty) &&
    Number.isInteger(l.qty) &&
    l.qty >= 1 &&
    l.qty <= MAX_QTY_PER_LINE
  );
}

/**
 * Best-effort memory of recently-seen submission tokens (token -> orderId),
 * used to distinguish a GENUINE duplicate submission (same token retried —
 * the Sheets row already exists, keep that ID) from an accidental Order-ID
 * COLLISION (different order drew the same ID — regenerate instead of
 * silently dropping the new order). Per-instance only; a retry served by
 * another instance/cold start may be treated as a collision and appended
 * under a fresh ID. Max retries below bounds the whole loop either way.
 */
const RECENT_TOKEN_TTL_MS = 15 * 60 * 1000;
const recentSubmissions = new Map<string, { orderId: string; at: number }>();
let lastRecentSweepAt = 0;

function sweepRecentSubmissions(now: number): void {
  if (now - lastRecentSweepAt < 60 * 1000 && recentSubmissions.size > 0) return;
  lastRecentSweepAt = now;
  for (const [token, entry] of recentSubmissions) {
    if (now - entry.at > RECENT_TOKEN_TTL_MS) recentSubmissions.delete(token);
  }
}

/** Max Sheets attempts per request when regenerating collided IDs (bounded — no infinite loop). */
const MAX_ID_ATTEMPTS = 3;

export async function POST(request: Request) {
  // Rate limit FIRST — rejected requests never reach pricing, Google
  // Sheets, or WhatsApp generation.
  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { error: "تم استلام عدد كبير من المحاولات من جهازك. يرجى المحاولة بعد بضع دقائق." },
      { status: 429 }
    );
  }

  let body: OrderRequestBody;
  try {
    body = (await request.json()) as OrderRequestBody;
  } catch {
    return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 });
  }

  const { lines, customer, submissionToken } = body ?? {};

  if (!submissionToken || typeof submissionToken !== "string") {
    return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 });
  }

  if (!Array.isArray(lines) || lines.length === 0 || lines.length > MAX_CART_LINES || !lines.every(isValidLine)) {
    return NextResponse.json({ error: "السلة فارغة أو غير صالحة" }, { status: 400 });
  }

  // Never trust productId/colorVariantId pairs from the client — every line
  // must resolve to a real, matching product + color variant in the catalog,
  // and its stock state must be one the storefront actually sells.
  for (const line of lines) {
    const product = getProductById(line.productId);
    const variant = getColorVariantById(line.colorVariantId);
    if (!product || !variant || variant.productId !== line.productId) {
      return NextResponse.json({ error: "السلة تحتوي على منتج غير معروف" }, { status: 400 });
    }
    // Mirrors isPurchasable() in lib/stock-labels.ts: 'unknown' renders as
    // "غير متوفر" in the UI, so it is rejected here too — never assumed
    // available. (All currently cataloged variants are "available".)
    if (variant.stock !== "available" && variant.stock !== "low_stock") {
      return NextResponse.json({ error: "السلة تحتوي على منتج غير متوفر حالياً" }, { status: 400 });
    }
  }

  const errors = validateCustomerInfo(customer ?? ({} as CustomerInfo));
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  // Authoritative pricing: recomputed server-side from productId/colorVariantId/qty
  // via the same lib/pricing.ts used everywhere else — the client's subtotal/
  // discount/total/unit prices are never read or trusted here.
  const totals = computeCartTotals(lines);
  const shippingCost =
    typeof body.shippingCost === "number" && (body.shippingCost === 15 || body.shippingCost === 25)
      ? body.shippingCost
      : computeShippingCost(customer.city);
  const finalTotal = totals.total + shippingCost;

  const seen = recentSubmissions.get(submissionToken);
  const now = Date.now();
  sweepRecentSubmissions(now);

  let orderId = generateOrderId(submissionToken);
  let sheetsStatus: SheetsWriteStatus = "failed";
  let whatsappMessage = "";
  let whatsappUrl = "";

  for (let attempt = 0; attempt < MAX_ID_ATTEMPTS; attempt++) {
    if (attempt > 0) {
      // Collision with a DIFFERENT order: mint a fresh ID (random salt)
      // and try again — never silently discard this legitimate order.
      orderId = generateOrderId(submissionToken, new Date(), crypto.randomUUID());
    }
    whatsappMessage = buildOrderMessage(lines, customer, orderId, shippingCost);
    whatsappUrl = buildWhatsAppOrderUrl(lines, customer, orderId, shippingCost);

    const order: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: {
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        notes: customer.notes,
      },
      lines: lines.map((line) => {
        const group = totals.groups.find((g) => g.productId === line.productId);
        return {
          productId: line.productId,
          colorVariantId: line.colorVariantId,
          qty: line.qty,
          unitPriceApplied: group?.unitPrice ?? 0,
        };
      }),
      subtotal: totals.subtotal,
      wholesaleDiscountTotal: totals.wholesaleDiscountTotal,
      shippingCost,
      total: finalTotal,
      paymentMethod: "cod",
      paymentStatus: "not_applicable",
      status: "submitted",
    };

    // A Sheets failure must never block the order — WhatsApp is the real
    // fulfillment channel. recordOrderInSheets() never throws; `recorded`
    // tells the client whether the row actually landed.
    sheetsStatus = await recordOrderInSheets(order, whatsappMessage);

    if (sheetsStatus === "ok") break;

    if (sheetsStatus === "duplicate") {
      if (seen && attempt === 0) {
        // Genuine retry of an order already recorded under this token —
        // keep the original ID; the row is already in the sheet.
        orderId = seen.orderId;
        break;
      }
      // Accidental collision (or unknown token): loop regenerates.
      continue;
    }

    // "failed": transient/unavailable — retrying under yet another ID
    // wouldn't help and could create stray rows once Sheets recovers.
    break;
  }

  recentSubmissions.set(submissionToken, { orderId, at: Date.now() });

  const recorded = sheetsStatus === "ok" || (sheetsStatus === "duplicate" && Boolean(seen));
  return NextResponse.json({ orderId, whatsappMessage, whatsappUrl, recorded, sheetsStatus });
}
