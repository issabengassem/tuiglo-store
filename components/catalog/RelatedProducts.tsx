import type { Product } from "@/data/types";
import { getProductsByCategoryId } from "@/data/products";
import { ProductCard } from "./ProductCard";

/** Default: other products from the same category (design direction §9). */
export function RelatedProducts({ product, categorySlug }: { product: Product; categorySlug: string }) {
  const related = getProductsByCategoryId(product.categoryId).filter((p) => p.id !== product.id);
  if (related.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-xl font-bold text-ink md:text-2xl">منتجات ذات صلة</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {related.map((p) => (
          <ProductCard key={p.id} product={p} categorySlug={categorySlug} />
        ))}
      </div>
    </section>
  );
}
