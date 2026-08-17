import Link from "next/link";
import type { Product } from "@/data/types";
import { getColorVariantsForProduct } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { isPurchasable } from "@/lib/stock-labels";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { StockBadge } from "@/components/catalog/StockBadge";

function aggregateStock(productId: string) {
  const variants = getColorVariantsForProduct(productId);
  if (variants.length === 0) return "unknown" as const;
  return variants.some((v) => isPurchasable(v.stock))
    ? variants.find((v) => isPurchasable(v.stock))!.stock
    : "unknown";
}

export function ProductCard({ product, categorySlug }: { product: Product; categorySlug: string }) {
  const stock = aggregateStock(product.id);

  return (
    <Link
      href={`/${categorySlug}/${product.slug}`}
      className="group block overflow-hidden rounded-md bg-white shadow-warm transition-transform hover:-translate-y-0.5"
    >
      <ImagePlaceholder className="aspect-square w-full" />
      <div className="space-y-2 p-4 text-start">
        <StockBadge stock={stock} />
        <h3 className="text-sm font-semibold text-ink">{product.name.ar}</h3>
        <p dir="ltr" className="text-start text-sm font-bold text-brand-brown">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
