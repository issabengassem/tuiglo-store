"use client";

import type { ColorVariant } from "@/data/types";
import { isPurchasable, stockLabel } from "@/lib/stock-labels";

interface Props {
  variants: ColorVariant[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

/**
 * Every real color always stays visible — never removed or hidden.
 * Out-of-stock/unknown colors render visibly disabled but remain in the
 * list, per plan §6 / design direction §5.
 */
export function ColorSwatchSelector({ variants, selectedId, onSelect }: Props) {
  if (variants.length === 0) {
    return (
      <p className="text-sm text-ink/60">
        الألوان قيد التأكيد — سيتم إضافتها قريباً.
      </p>
    );
  }

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-ink">اللون</p>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => {
          const purchasable = isPurchasable(variant.stock);
          const selected = variant.id === selectedId;
          return (
            <button
              key={variant.id}
              type="button"
              disabled={!purchasable}
              onClick={() => onSelect(variant.id)}
              aria-pressed={selected}
              aria-disabled={!purchasable}
              title={`${variant.colorName.ar} — ${stockLabel(variant.stock)}`}
              className={[
                "relative h-11 w-11 rounded-full border transition",
                selected ? "ring-2 ring-brand-brown ring-offset-2" : "border-ink/20",
                purchasable ? "cursor-pointer" : "cursor-not-allowed opacity-35",
              ].join(" ")}
              style={{ backgroundColor: variant.hex ?? "#D1BB9E" }}
            >
              <span className="sr-only">{variant.colorName.ar}</span>
              {!purchasable && (
                <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-ink">
                  ×
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
