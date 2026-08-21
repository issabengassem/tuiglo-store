import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryById, getCategoryBySlug } from "@/data/categories";
import {
  allProducts,
  getColorVariantsForProduct,
  getPrimaryDisplayImage,
  getProductBySlug,
} from "@/data/products";
import { ProductPurchasePanel } from "@/components/catalog/ProductPurchasePanel";
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

  const title = product.name.ar ?? product.slug;
  const description = product.shortDescription.ar;
  const path = `/${category.slug}/${product.slug}`;
  // Falls back to the sitewide default OG image (set in the root layout)
  // until real per-product photos exist — never a substitute product photo.
  const productImage = getPrimaryDisplayImage(product.id);

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      ...(productImage ? { images: [{ url: productImage }] } : {}),
    },
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

      <ProductPurchasePanel product={product} variants={variants} />

      <RelatedProducts product={product} categorySlug={category.slug} />
    </div>
  );
}
