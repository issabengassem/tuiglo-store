import { NextResponse } from "next/server";
import type { CartLine, Order } from "@/data/types";
import { getColorVariantById, getProductById } from "@/data/products";
import { computeCartTotals } from "@/lib/pricing";
import { buildOrderMessage, buildWhatsAppOrderUrl, type CustomerInfo } from "@/lib/whatsapp";
import { validateCustomerInfo } from "@/lib/customer-validation";
import { generateOrderId } from "@/lib/order-id";
import { recordOrderInSheets } from "@/lib/sheets/orders-sheet";

interface OrderRequestBody {
  lines: CartLine[];
  customer: CustomerInfo;
  submissionToken: string;
}

function isValidLine(line: unknown): line is CartLine {
  if (!line || typeof line !== "object") return false;
  const l = line as Record<string, unknown>;
  return (
    typeof l.productId === "string" &&
    typeof l.colorVariantId === "string" &&
    typeof l.qty === "number" &&
    Number.isInteger(l.qty) &&
    l.qty > 0
  );
}

export async function POST(request: Request) {
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

  if (!Array.isArray(lines) || lines.length === 0 || !lines.every(isValidLine)) {
    return NextResponse.json({ error: "السلة فارغة أو غير صالحة" }, { status: 400 });
  }

  // Never trust productId/colorVariantId pairs from the client — every line
  // must resolve to a real, matching product + color variant in the catalog.
  for (const line of lines) {
    const product = getProductById(line.productId);
    const variant = getColorVariantById(line.colorVariantId);
    if (!product || !variant || variant.productId !== line.productId) {
      return NextResponse.json({ error: "السلة تحتوي على منتج غير معروف" }, { status: 400 });
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
  const orderId = generateOrderId(submissionToken);
  const createdAt = new Date().toISOString();

  const order: Order = {
    id: orderId,
    createdAt,
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
    total: totals.total,
    paymentMethod: "cod",
    paymentStatus: "not_applicable",
    status: "submitted",
  };

  const whatsappMessage = buildOrderMessage(lines, customer, orderId);
  const whatsappUrl = buildWhatsAppOrderUrl(lines, customer, orderId);

  // A Sheets failure must never block the order — WhatsApp is the real
  // fulfillment channel. recordOrderInSheets() never throws; sheetsStatus
  // is reported for our own visibility, not surfaced to the customer.
  const sheetsStatus = await recordOrderInSheets(order, whatsappMessage);

  return NextResponse.json({ orderId, whatsappMessage, whatsappUrl, sheetsStatus });
}
