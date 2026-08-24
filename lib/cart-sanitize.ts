import type { CartLine } from "../data/types";
import { getColorVariantById } from "../data/products";

/**
 * localStorage is UNTRUSTED input — never treated as authoritative.
 * The server re-validates everything at order time; this sanitizer only
 * guarantees the client cart state is structurally sane so hydration can
 * never crash or corrupt totals (e.g. string-qty concatenation).
 *
 * Invalid lines are DROPPED, not repaired: we never invent product/variant
 * data that isn't in the bundled catalog. Valid carts pass through
 * unchanged (same productId/colorVariantId/qty values).
 */
export const MAX_QTY_PER_LINE = 200;
const MAX_CART_LINES = 20;

function safeQty(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  const qty = Math.floor(value);
  if (qty < 1 || qty > MAX_QTY_PER_LINE) return null;
  return qty;
}

export function sanitizeCartLines(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];

  const lines: CartLine[] = [];
  for (const entry of value) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) continue;
    const e = entry as Record<string, unknown>;
    const { productId, colorVariantId } = e;
    if (typeof productId !== "string" || typeof colorVariantId !== "string") continue;

    // Must exist in the catalog AND belong to its parent product.
    const variant = getColorVariantById(colorVariantId);
    if (!variant || variant.productId !== productId) continue;

    const qty = safeQty(e.qty);
    if (qty === null) continue;

    lines.push({ productId, colorVariantId, qty });
    if (lines.length >= MAX_CART_LINES) break;
  }
  return lines;
}
