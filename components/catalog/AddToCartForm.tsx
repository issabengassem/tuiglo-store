"use client";

import { useMemo, useState } from "react";
import type { ColorVariant, Product } from "@/data/types";
import { useCart } from "@/lib/cart-context";
import { isPurchasable } from "@/lib/stock-labels";
import { activeTier, unitPriceForQuantity } from "@/lib/pricing";
import { formatPrice } from "@/lib/format";
import { WholesaleTierInfo } from "./WholesaleTierInfo";

interface Props {
  product: Product;
  variants: ColorVariant[];
  /** Selection is controlled by the parent (ProductPurchasePanel) — the color
   * swatches render there so they can sit next to the gallery image; this
   * form only reads the current selection to price and submit the line. */
  selectedId: string | null;
}

export function AddToCartForm({ product, variants, selectedId }: Props) {
  const { lines, addLine } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const selectedVariant = useMemo(
    () => variants.find((v) => v.id === selectedId) ?? null,
    [variants, selectedId]
  );
  const canAdd = !!selectedVariant && isPurchasable(selectedVariant.stock) && qty > 0;

  // Wholesale tiers are based on this product's TOTAL quantity across every
  // color already in the cart, plus what's about to be added — not just the
  // number in the stepper alone. Same shared pricing function used
  // everywhere else (lib/pricing.ts) — no duplicated tier logic here.
  const existingQtyForProduct = useMemo(
    () => lines.filter((l) => l.productId === product.id).reduce((sum, l) => sum + l.qty, 0),
    [lines, product.id]
  );
  const projectedTotalQty = existingQtyForProduct + qty;
  const projectedUnitPrice = unitPriceForQuantity(product.price, projectedTotalQty);
  const projectedTier = activeTier(projectedTotalQty);
  const hasDiscount = projectedUnitPrice < product.price;

  function handleAdd() {
    if (!selectedVariant || !canAdd) return;
    addLine({ productId: product.id, colorVariantId: selectedVariant.id, qty });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  }

  return (
    <div className="space-y-5">
      {/* Visible before the customer touches the quantity stepper, per spec. */}
      <div>
        <p className="mb-2 text-sm font-medium text-ink">عروض الجملة</p>
        <WholesaleTierInfo activeMinQty={projectedTier?.minQty} />
      </div>

      <div>
        <label htmlFor="qty" className="mb-2 block text-sm font-medium text-ink">
          الكمية
        </label>
        <div dir="ltr" className="inline-flex items-center rounded-sm border border-ink/20">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="إنقاص الكمية"
            className="h-11 w-11 text-lg text-ink hover:bg-brand-cream"
          >
            −
          </button>
          <input
            id="qty"
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            className="h-11 w-14 border-x border-ink/20 text-center [appearance:textfield]"
          />
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            aria-label="زيادة الكمية"
            className="h-11 w-11 text-lg text-ink hover:bg-brand-cream"
          >
            +
          </button>
        </div>
      </div>

      {/* Live unit price + line total — recalculated on every qty change
          from base price + current quantity, never a stored stale value. */}
      <div role="status" aria-live="polite" className="rounded-md bg-brand-cream/60 p-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-ink/70">سعر القطعة</span>
          <span dir="ltr" className="font-semibold text-ink">
            {hasDiscount && (
              <span className="me-2 text-ink/40 line-through">{formatPrice(product.price)}</span>
            )}
            {formatPrice(projectedUnitPrice)}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-ink/70">إجمالي هذه الكمية</span>
          <span dir="ltr" className="font-bold text-brand-brown">
            {formatPrice(projectedUnitPrice * qty)}
          </span>
        </div>
        {existingQtyForProduct > 0 && (
          <p className="mt-1 text-xs text-ink/60">
            السعر محتسب على إجمالي {projectedTotalQty} قطعة من هذا المنتج (بما فيها {existingQtyForProduct} في سلتك حالياً).
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={!canAdd}
        className="h-[46px] w-full rounded-sm bg-brand-brown text-sm font-semibold text-brand-offwhite transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
      >
        أضف إلى السلة
      </button>

      {/* aria-live region announces the confirmation to screen readers
          reliably — a re-rendered button label alone isn't always announced. */}
      <p role="status" aria-live="polite" className="text-sm font-medium text-brand-brown">
        {justAdded ? "تمت الإضافة إلى السلة" : ""}
      </p>

      {!selectedVariant && variants.length > 0 && (
        <p className="text-xs text-ink/60">اختر لوناً متوفراً لإضافة المنتج إلى السلة.</p>
      )}
    </div>
  );
}
