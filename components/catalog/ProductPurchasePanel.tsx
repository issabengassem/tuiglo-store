"use client";

import { useState } from "react";
import type { ColorVariant, Product } from "@/data/types";
import { isPurchasable } from "@/lib/stock-labels";
import { formatPrice } from "@/lib/format";
import { specLabel } from "@/lib/spec-labels";
import { ProductImage } from "@/components/ui/ProductImage";
import { AddToCartForm } from "./AddToCartForm";
import { ColorSwatchSelector } from "./ColorSwatchSelector";

interface Props {
  product: Product;
  variants: ColorVariant[];
}

function defaultVariantId(variants: ColorVariant[]): string | null {
  // Prefer a purchasable variant that already has a real photo, so the
  // gallery shows something real immediately; fall back to any purchasable
  // variant; null only if nothing is purchasable at all.
  const purchasable = variants.filter((v) => isPurchasable(v.stock));
  return (
    purchasable.find((v) => v.images.primary)?.id ??
    purchasable[0]?.id ??
    null
  );
}

/**
 * Owns the selected-color state so the gallery image and AddToCartForm stay
 * in sync — selecting a swatch changes both the selected variant AND the
 * displayed product image, never just one of them. Once a color is
 * explicitly selected, the image shows THAT color's real photo or an honest
 * "coming soon" placeholder — never a different color's photo (plan §14).
 */
export function ProductPurchasePanel({ product, variants }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(() => defaultVariantId(variants));
  const selectedVariant = variants.find((v) => v.id === selectedId) ?? null;
  const displayImage = selectedVariant?.images.primary ?? null;
  const specEntries = Object.entries(product.specs);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      <div className="md:order-1">
        <ProductImage
          src={displayImage}
          alt={
            selectedVariant
              ? `${product.name.ar} — ${selectedVariant.colorName.ar}`
              : product.name.ar ?? product.slug
          }
          className="aspect-square w-full rounded-md"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>

      <div className="flex flex-col gap-6 text-start md:order-2">
        {/* Mobile: colors sit right under the image, above the title, so the
            customer sees the product and its options before anything else.
            Desktop keeps the original order (title/price above colors). */}
        <div className="order-1 md:order-2">
          <ColorSwatchSelector variants={variants} selectedId={selectedId} onSelect={setSelectedId} />
        </div>

        <div className="order-2 md:order-1">
          <h1 className="text-2xl font-bold text-ink md:text-3xl">{product.name.ar}</h1>
          <p className="mt-2 text-ink/70">{product.shortDescription.ar}</p>
          <p dir="ltr" className="mt-3 text-start text-xl font-bold text-brand-brown">
            {formatPrice(product.price)}
          </p>
        </div>

        <div className="order-3">
          <AddToCartForm product={product} variants={variants} selectedId={selectedId} />
        </div>

        {product.fullDescription.ar && (
          <div className="order-4">
            <h2 className="text-sm font-semibold text-ink">الوصف</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">{product.fullDescription.ar}</p>
          </div>
        )}

        {specEntries.length > 0 && (
          <div className="order-5">
            <h2 className="text-sm font-semibold text-ink">المواصفات</h2>
            <dl className="mt-2 divide-y divide-ink/10 text-sm">
              {specEntries.map(([key, value]) => (
                <div key={key} className="flex justify-between py-2">
                  <dt className="text-ink/60">{specLabel(key)}</dt>
                  <dd className="text-ink">{value.ar}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
