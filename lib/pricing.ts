import type { CartLine, Product } from "@/data/types";
import { getProductById } from "@/data/products";

/**
 * The ONE shared source of truth for wholesale pricing tiers. Every
 * consumer (product page preview, AddToCartForm, cart lines/totals,
 * checkout order summary, WhatsApp order message) must go through
 * `unitPriceForQuantity` / `computeCartTotals` below — never re-implement
 * this table elsewhere.
 *
 * Tiers (2026-08-19 business rule): quantity is the combined total of one
 * product across ALL of its colors, not per color.
 *   1–9    -> base price
 *   10–29  -> base price − 5 DH/unit
 *   30–49  -> base price − 10 DH/unit
 *   50–99  -> base price − 15 DH/unit
 *   100+   -> base price − 20 DH/unit
 * Sorted descending so the first matching tier (by minQty) wins.
 */
export interface WholesaleTier {
  minQty: number;
  deduction: number;
}

export const WHOLESALE_TIERS: WholesaleTier[] = [
  { minQty: 100, deduction: 20 },
  { minQty: 50, deduction: 15 },
  { minQty: 30, deduction: 10 },
  { minQty: 10, deduction: 5 },
];

/** The lowest quantity at which any discount at all applies. */
export const WHOLESALE_THRESHOLD = WHOLESALE_TIERS[WHOLESALE_TIERS.length - 1].minQty;

/** Shipping rates in MAD (DH): 15 DH inside Casablanca, 25 DH outside Casablanca */
export const SHIPPING_RATES = {
  CASABLANCA: 15,
  OUTSIDE_CASABLANCA: 25,
} as const;

export type ShippingMethod = "casablanca" | "outside";

export function isCasablancaCity(city?: string | null): boolean {
  if (!city || typeof city !== "string") return false;
  const normalized = city.trim().toLowerCase();
  return (
    normalized.includes("casablanca") ||
    normalized.includes("casa") ||
    normalized.includes("الدار البيضاء") ||
    normalized.includes("كازا") ||
    normalized.includes("بيضاء")
  );
}

export function computeShippingCost(city?: string | null, selectedMethod?: ShippingMethod): number {
  if (selectedMethod === "casablanca") return SHIPPING_RATES.CASABLANCA;
  if (selectedMethod === "outside") return SHIPPING_RATES.OUTSIDE_CASABLANCA;
  if (city && isCasablancaCity(city)) return SHIPPING_RATES.CASABLANCA;
  if (city && city.trim().length > 0) return SHIPPING_RATES.OUTSIDE_CASABLANCA;
  return SHIPPING_RATES.CASABLANCA;
}

export function deductionForQuantity(qty: number): number {
  return activeTier(qty)?.deduction ?? 0;
}

/** The single matching tier for a quantity, or undefined below the lowest threshold. */
export function activeTier(qty: number): WholesaleTier | undefined {
  return WHOLESALE_TIERS.find((t) => qty >= t.minQty);
}

/**
 * Final unit price for a product given its combined quantity across colors.
 * Deduction is clamped so the price can never go negative or below zero,
 * even for a very low base price.
 */
export function unitPriceForQuantity(basePrice: number, totalQtyAcrossColors: number): number {
  const deduction = Math.min(deductionForQuantity(totalQtyAcrossColors), basePrice);
  return basePrice - deduction;
}

export interface ProductGroupTotal {
  productId: string;
  totalQty: number;
  unitPrice: number;
  lineTotal: number;
  wholesaleApplied: boolean;
}

/**
 * Groups cart lines BY PRODUCT (not product+color) and applies the
 * wholesale rule to each group's combined quantity — a customer's units
 * might be spread across several different colors, and the tier still
 * applies to all of them once the combined total crosses a threshold.
 */
export function groupCartByProduct(
  lines: CartLine[],
  productLookup: (id: string) => Product | undefined = getProductById
): ProductGroupTotal[] {
  const totalsByProduct = new Map<string, number>();
  for (const line of lines) {
    totalsByProduct.set(line.productId, (totalsByProduct.get(line.productId) ?? 0) + line.qty);
  }

  const groups: ProductGroupTotal[] = [];
  for (const [productId, totalQty] of totalsByProduct) {
    const product = productLookup(productId);
    if (!product) continue;
    const unitPrice = unitPriceForQuantity(product.price, totalQty);
    groups.push({
      productId,
      totalQty,
      unitPrice,
      lineTotal: unitPrice * totalQty,
      wholesaleApplied: totalQty >= WHOLESALE_THRESHOLD,
    });
  }
  return groups;
}

export interface CartTotals {
  subtotal: number;
  wholesaleDiscountTotal: number;
  total: number;
  groups: ProductGroupTotal[];
}

/**
 * Note: this always recomputes from each line's live qty and the product's
 * base price — a cart line never stores a "discounted unit price" that
 * could go stale. Changing qty always re-derives the correct tier.
 */
export function computeCartTotals(
  lines: CartLine[],
  productLookup?: (id: string) => Product | undefined
): CartTotals {
  const groups = groupCartByProduct(lines, productLookup);
  let subtotal = 0;
  let discounted = 0;
  for (const line of lines) {
    const product = (productLookup ?? getProductById)(line.productId);
    if (!product) continue;
    subtotal += product.price * line.qty;
  }
  for (const g of groups) {
    discounted += g.lineTotal;
  }
  return {
    subtotal,
    wholesaleDiscountTotal: subtotal - discounted,
    total: discounted,
    groups,
  };
}
