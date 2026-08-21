import Link from "next/link";
import type { Product } from "@/data/types";
import { getColorVariantsForProduct, getPrimaryDisplayImage } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { isPurchasable } from "@/lib/stock-labels";
import { ProductImage } from "@/components/ui/ProductImage";
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
      <ProductImage
        src={getPrimaryDisplayImage(product.id)}
        alt={product.name.ar ?? product.slug}
        className="aspect-square w-full"
        sizes="(min-width: 768px) 25vw, 50vw"
      />
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
