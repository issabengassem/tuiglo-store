import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { allProducts } from "@/data/products";
import { getCategoryById } from "@/data/categories";

const BASE_URL = "https://tuiglo.store";

/** Generated from the real category/product data — never hand-maintained. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = allProducts.flatMap((product) => {
    const category = getCategoryById(product.categoryId);
    if (!category) return [];
    return [
      {
        url: `${BASE_URL}/${category.slug}/${product.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      },
    ];
  });

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
