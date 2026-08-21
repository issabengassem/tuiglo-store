import type { CartLine } from "@/data/types";
import type { CartTotals } from "@/lib/pricing";
import { getColorVariantById, getProductById } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "@/components/ui/ProductImage";

interface Props {
  lines: CartLine[];
  totals: CartTotals;
}

/** Read-only recap shown on /checkout before the customer confirms — no qty/remove controls. */
export function OrderSummary({ lines, totals }: Props) {
  return (
    <div className="rounded-md border border-ink/10 bg-brand-offwhite/60 p-4">
      <h2 className="mb-2 text-sm font-semibold text-ink">ملخص الطلب</h2>

      <div>
        {lines.map((line) => {
          const product = getProductById(line.productId);
          const variant = getColorVariantById(line.colorVariantId);
          const group = totals.groups.find((g) => g.productId === line.productId);
          if (!product || !variant) return null;
          return (
            <div
              key={`${line.productId}-${line.colorVariantId}`}
              className="flex items-center gap-3 border-b border-ink/10 py-3 last:border-b-0"
            >
              <ProductImage
                src={variant.images.primary}
                alt={`${product.name.ar} — ${variant.colorName.ar}`}
                className="h-14 w-14 shrink-0 rounded-sm"
                sizes="56px"
              />
              <div className="flex-1 text-start text-sm">
                <p className="font-medium text-ink">{product.name.ar}</p>
                <p className="text-xs text-ink/60">
                  {variant.colorName.ar} × {line.qty}
                </p>
              </div>
              <p dir="ltr" className="text-sm font-semibold text-ink">
                {formatPrice((group?.unitPrice ?? 0) * line.qty)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 space-y-2 border-t border-ink/10 pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-ink/70">المجموع الفرعي</span>
          <span dir="ltr">{formatPrice(totals.subtotal)}</span>
        </div>
        {totals.wholesaleDiscountTotal > 0 && (
          <div className="flex justify-between text-brand-brown">
            <span>خصم الجملة (حسب الكمية الإجمالية لكل منتج)</span>
            <span dir="ltr">-{formatPrice(totals.wholesaleDiscountTotal)}</span>
          </div>
        )}
        <div className="flex justify-between text-base font-bold text-ink">
          <span>الإجمالي</span>
          <span dir="ltr">{formatPrice(totals.total)}</span>
        </div>
      </div>
    </div>
  );
}
