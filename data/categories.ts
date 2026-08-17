import type { Category } from "./types";

/**
 * Exactly the 3 confirmed categories. Arabic names are the ones already
 * approved and used verbatim in TUIGLO_Style_Guide.html — not re-translated.
 * "Cross Body Bags" is never shortened to "Bags" (design direction §9).
 */
export const categories: Category[] = [
  {
    id: "cat-backpacks",
    slug: "backpacks",
    name: { ar: "حقائب الظهر" },
    description: { ar: "حقائب ظهر عملية وأنيقة لكل يوم." },
    sortOrder: 1,
  },
  {
    id: "cat-lunch-boxes",
    slug: "lunch-boxes",
    name: { ar: "علب الغداء" },
    description: { ar: "علب غداء عازلة تحافظ على طعامك طازجاً." },
    sortOrder: 2,
  },
  {
    id: "cat-cross-body-bags",
    slug: "cross-body-bags",
    name: { ar: "حقائب كروس" },
    description: { ar: "حقائب كروس خفيفة تناسب تحركاتك اليومية." },
    sortOrder: 3,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
