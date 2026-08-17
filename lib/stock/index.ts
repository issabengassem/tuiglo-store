import { ManualStockSource } from "./manual-source";
import type { StockSource } from "./types";

/**
 * Every stock read/check in the app goes through this factory — never a
 * direct data-file read. Swapping in GoogleSheetsStockSource later is a
 * one-line change here, no component rewrite. See plan §12.
 */
const activeSource: StockSource = new ManualStockSource();

export function getStockSource(): StockSource {
  return activeSource;
}

export type { StockSource } from "./types";
