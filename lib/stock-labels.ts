import type { StockValue } from "@/data/types";

/**
 * Exactly the 3 customer-facing states from TUIGLO_Style_Guide.html —
 * text-only, never a number. 'unknown' renders identically to
 * out_of_stock (plan §11) — safe-by-default, never an assumed availability.
 */
export function stockLabel(stock: StockValue): string {
  switch (stock) {
    case "available":
      return "متوفر";
    case "low_stock":
      return "كمية محدودة";
    case "out_of_stock":
    case "unknown":
    default:
      return "غير متوفر";
  }
}

export function isPurchasable(stock: StockValue): boolean {
  return stock === "available" || stock === "low_stock";
}
