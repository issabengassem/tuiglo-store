import type { Metadata } from "next";
import { Hero } from "@/components/layout/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductCard } from "@/components/catalog/ProductCard";
import { allProducts } from "@/data/products";
import { getCategoryById } from "@/data/categories";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  // Best sellers/new arrivals are curated via Product.statusBadges, set
  // manually by Issa — never auto-generated. None are set yet, so this
  // section simply doesn't render rather than showing fabricated picks.
  const featured = allProducts.filter((p) => p.statusBadges?.length);

  return (
    <>
      <Hero
        video={{ srcMp4: "/hero/hero_background_final.mp4" }}
        headline={{ ar: "خفيفة كل يوم، أصيلة من الدار البيضاء" }}
        ctaLabel={{ ar: "تسوق المجموعة" }}
        ctaHref="/backpacks"
      />

      <CategoryGrid />

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-xl font-bold text-ink md:text-2xl">الأكثر مبيعاً</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {featured.map((product) => {
              const category = getCategoryById(product.categoryId);
              if (!category) return null;
              return (
                <ProductCard key={product.id} product={product} categorySlug={category.slug} />
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
