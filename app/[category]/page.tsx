import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getProductsByCategoryId } from "@/data/products";
import { ProductCard } from "@/components/catalog/ProductCard";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return {};
  const title = category.name.ar ?? category.slug;
  const description = category.description.ar;
  return {
    title,
    description,
    alternates: { canonical: `/${category.slug}` },
    openGraph: { title, description, url: `/${category.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const products = getProductsByCategoryId(category.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav aria-label="مسار التصفح" className="mb-4 text-sm text-ink/60">
        <Link href="/" className="hover:text-brand-brown">
          الرئيسية
        </Link>
        <span className="mx-2">‹</span>
        <span className="text-ink">{category.name.ar}</span>
      </nav>

      <h1 className="text-2xl font-bold text-ink md:text-3xl">{category.name.ar}</h1>
      <p className="mt-2 max-w-xl text-ink/70">{category.description.ar}</p>

      {products.length === 0 ? (
        <p className="mt-10 text-ink/60">لا توجد منتجات في هذه الفئة حالياً.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} categorySlug={category.slug} />
          ))}
        </div>
      )}
    </div>
  );
}
