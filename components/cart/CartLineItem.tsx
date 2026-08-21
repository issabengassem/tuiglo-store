"use client";

import type { CartLine } from "@/data/types";
import { getColorVariantById, getProductById } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import { ProductImage } from "@/components/ui/ProductImage";

export function CartLineItem({ line, unitPrice }: { line: CartLine; unitPrice: number }) {
  const { setQty, removeLine } = useCart();
  const product = getProductById(line.productId);
  const variant = getColorVariantById(line.colorVariantId);
  if (!product || !variant) return null;

  return (
    <div className="flex gap-4 border-b border-ink/10 py-5">
      <ProductImage
        src={variant.images.primary}
        alt={`${product.name.ar} — ${variant.colorName.ar}`}
        className="h-20 w-20 shrink-0 rounded-sm"
        sizes="80px"
      />

      <div className="flex flex-1 flex-col gap-2 text-start">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-ink">{product.name.ar}</p>
            <p className="text-xs text-ink/60">{variant.colorName.ar}</p>
          </div>
          <button
            type="button"
            onClick={() => removeLine(line.productId, line.colorVariantId)}
            aria-label="إزالة من السلة"
            className="text-xs text-ink/50 hover:text-brand-brown"
          >
            إزالة
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div dir="ltr" className="inline-flex items-center rounded-sm border border-ink/20">
            <button
              type="button"
              onClick={() => setQty(line.productId, line.colorVariantId, line.qty - 1)}
              aria-label="إنقاص الكمية"
              className="h-9 w-9 text-ink hover:bg-brand-cream"
            >
              −
            </button>
            <span className="flex h-9 w-10 items-center justify-center text-sm">{line.qty}</span>
            <button
              type="button"
              onClick={() => setQty(line.productId, line.colorVariantId, line.qty + 1)}
              aria-label="زيادة الكمية"
              className="h-9 w-9 text-ink hover:bg-brand-cream"
            >
              +
            </button>
          </div>
          <p dir="ltr" className="text-sm font-semibold text-brand-brown">
            {formatPrice(unitPrice * line.qty)}
          </p>
        </div>
      </div>
    </div>
  );
}
