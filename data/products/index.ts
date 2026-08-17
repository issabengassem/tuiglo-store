import type { ColorVariant, Product } from "../types";
import { backpackProducts, backpackColorVariants } from "./backpacks";
import { lunchBoxProducts, lunchBoxColorVariants } from "./lunch-boxes";
import { crossBodyBagProducts, crossBodyBagColorVariants } from "./cross-body-bags";

export const allProducts: Product[] = [
  ...backpackProducts,
  ...lunchBoxProducts,
  ...crossBodyBagProducts,
];

export const allColorVariants: ColorVariant[] = [
  ...backpackColorVariants,
  ...lunchBoxColorVariants,
  ...crossBodyBagColorVariants,
];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export function getProductsByCategoryId(categoryId: string): Product[] {
  return allProducts.filter((p) => p.categoryId === categoryId);
}

export function getColorVariantsForProduct(productId: string): ColorVariant[] {
  return allColorVariants.filter((v) => v.productId === productId);
}

export function getColorVariantById(id: string): ColorVariant | undefined {
  return allColorVariants.find((v) => v.id === id);
}
