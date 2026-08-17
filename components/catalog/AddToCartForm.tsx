"use client";

import { useMemo, useState } from "react";
import type { ColorVariant, Product } from "@/data/types";
import { useCart } from "@/lib/cart-context";
import { isPurchasable } from "@/lib/stock-labels";
import { ColorSwatchSelector } from "./ColorSwatchSelector";

export function AddToCartForm({ product, variants }: { product: Product; variants: ColorVariant[] }) {
  const { addLine } = useCart();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const selectedVariant = useMemo(
    () => variants.find((v) => v.id === selectedId) ?? null,
    [variants, selectedId]
  );
  const canAdd = !!selectedVariant && isPurchasable(selectedVariant.stock) && qty > 0;

  function handleAdd() {
    if (!selectedVariant || !canAdd) return;
    addLine({ productId: product.id, colorVariantId: selectedVariant.id, qty });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  }

  return (
    <div className="space-y-5">
      <ColorSwatchSelector variants={variants} selectedId={selectedId} onSelect={setSelectedId} />

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

      <button
        type="button"
        onClick={handleAdd}
        disabled={!canAdd}
        className="h-[46px] w-full rounded-sm bg-brand-brown text-sm font-semibold text-brand-offwhite transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
      >
        {justAdded ? "تمت الإضافة إلى السلة" : "أضف إلى السلة"}
      </button>

      {!selectedVariant && variants.length > 0 && (
        <p className="text-xs text-ink/60">اختر لوناً متوفراً لإضافة المنتج إلى السلة.</p>
      )}
    </div>
  );
}
