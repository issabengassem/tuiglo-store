import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryById, getCategoryBySlug } from "@/data/categories";
import { allProducts, getColorVariantsForProduct, getProductBySlug } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { specLabel } from "@/lib/spec-labels";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { AddToCartForm } from "@/components/catalog/AddToCartForm";
import { RelatedProducts } from "@/components/catalog/RelatedProducts";

export function generateStaticParams() {
  return allProducts
    .map((p) => ({ category: getCategoryById(p.categoryId)?.slug, product: p.slug }))
    .filter((p): p is { category: string; product: string } => !!p.category);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}): Promise<Metadata> {
  const { category: categorySlug, product: productSlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  const product = getProductBySlug(productSlug);
  if (!category || !product || product.categoryId !== category.id) return {};
  return {
    title: `${product.name.ar} — TUIGLO`,
    description: product.shortDescription.ar,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category: categorySlug, product: productSlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  const product = getProductBySlug(productSlug);

  if (!category || !product || product.categoryId !== category.id) {
    notFound();
  }

  const variants = getColorVariantsForProduct(product.id);
  const specEntries = Object.entries(product.specs);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav aria-label="مسار التصفح" className="mb-6 text-sm text-ink/60">
        <Link href="/" className="hover:text-brand-brown">
          الرئيسية
        </Link>
        <span className="mx-2">‹</span>
        <Link href={`/${category.slug}`} className="hover:text-brand-brown">
          {category.name.ar}
        </Link>
        <span className="mx-2">‹</span>
        <span className="text-ink">{product.name.ar}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <ImagePlaceholder className="aspect-square w-full rounded-md" />
        </div>

        <div className="order-1 space-y-6 text-start md:order-2">
          <div>
            <h1 className="text-2xl font-bold text-ink md:text-3xl">{product.name.ar}</h1>
            <p className="mt-2 text-ink/70">{product.shortDescription.ar}</p>
            <p dir="ltr" className="mt-3 text-start text-xl font-bold text-brand-brown">
              {formatPrice(product.price)}
            </p>
          </div>

          <AddToCartForm product={product} variants={variants} />

          {product.fullDescription.ar && (
            <div>
              <h2 className="text-sm font-semibold text-ink">الوصف</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">
                {product.fullDescription.ar}
              </p>
            </div>
          )}

          {specEntries.length > 0 && (
            <div>
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

      <RelatedProducts product={product} categorySlug={category.slug} />
    </div>
  );
}
