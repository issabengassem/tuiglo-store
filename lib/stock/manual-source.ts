import { getColorVariantById, getColorVariantsForProduct } from "@/data/products";
import type { StockValue } from "@/data/types";
import type { StockSource } from "./types";

/**
 * v1 implementation: reads the `stock` field already on each ColorVariant
 * in data/products/*.ts. No network calls, no external dependency.
 *
 * This class is temporary. It will be replaced by a GoogleSheetsStockSource
 * implementing the same StockSource interface (see ./index.ts), so no
 * product/cart component needs to change when that happens.
 *
 * The future Sheets-backed source is expected to derive StockValue from a
 * real quantity rather than storing the state directly:
 *   qty === 0                     -> "out_of_stock"
 *   0 < qty <= lowStockThreshold  -> "low_stock"
 *   qty > lowStockThreshold       -> "available"
 * No lowStockThreshold is defined yet — Issa hasn't set one, and this file
 * does not invent one. It gets added alongside the Sheets integration.
 */
export class ManualStockSource implements StockSource {
  async getStock(colorVariantId: string): Promise<StockValue> {
    return getColorVariantById(colorVariantId)?.stock ?? "unknown";
  }

  async getStockForProduct(productId: string): Promise<Record<string, StockValue>> {
    const variants = getColorVariantsForProduct(productId);
    const result: Record<string, StockValue> = {};
    for (const v of variants) {
      result[v.id] = v.stock;
    }
    return result;
  }
}
