import type { StockValue } from "@/data/types";

/**
 * The seam that lets Google Sheets replace manual stock later without
 * touching any component. See WEBSITE_IMPLEMENTATION_PLAN.md §12.
 */
export interface StockSource {
  getStock(colorVariantId: string): Promise<StockValue>;
  getStockForProduct(productId: string): Promise<Record<string, StockValue>>;
}
