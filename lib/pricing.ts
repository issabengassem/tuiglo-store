import type { CartLine, Product } from "@/data/types";
import { getProductById } from "@/data/products";

/** WHOLESALE_THRESHOLD/DISCOUNT are the universal rule for every product — not product/category-specific. */
export const WHOLESALE_THRESHOLD = 10;
export const WHOLESALE_DISCOUNT_PER_UNIT = 20;

/**
 * 1-9 units of a product (summed across ALL of its colors) -> normal price.
 * 10+ units -> flat 20 DH/unit off, applied to every unit of that product.
 * See WEBSITE_IMPLEMENTATION_PLAN.md §8 for the worked examples this is
 * tested against.
 */
export function unitPriceForQuantity(basePrice: number, totalQtyAcrossColors: number): number {
  return totalQtyAcrossColors >= WHOLESALE_THRESHOLD
    ? basePrice - WHOLESALE_DISCOUNT_PER_UNIT
    : basePrice;
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
 * wholesale rule to each group's combined quantity — a customer's 10 units
 * might be spread across three different colors, and the discount still
 * applies to all of them once the combined total crosses the threshold.
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
