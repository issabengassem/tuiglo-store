import type { StockValue } from "@/data/types";
import { stockLabel } from "@/lib/stock-labels";

const styles: Record<StockValue, string> = {
  available: "bg-brand-brown text-brand-offwhite",
  low_stock: "bg-brand-beige text-ink",
  out_of_stock: "border border-ink/30 text-ink/70",
  unknown: "border border-ink/30 text-ink/70",
};

export function StockBadge({ stock }: { stock: StockValue }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[stock]}`}
    >
      {stockLabel(stock)}
    </span>
  );
}
