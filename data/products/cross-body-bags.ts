import type { ColorVariant, Product } from "../types";

const withImage = (src: string) => ({ primary: src, secondary: [] });

export const crossBodyBagProducts: Product[] = [
  {
    id: "prod-crossbody-nike-fanny",
    slug: "crossbody-nike-fanny-pack",
    categoryId: "cat-cross-body-bags",
    name: { ar: "حقيبة كروس سوداء من نايك" },
    shortDescription: { ar: "حقيبة خصر/كروس سوداء من نايك، بحزام قابل للتعديل." },
    fullDescription: {
      ar: "حقيبة كروس سوداء من نايك بجيب أمامي وحزام قابل للتعديل، مناسبة للاستخدام اليومي.",
    },
    price: 55,
    specs: {},
    sourceSheet: "reference/product-sheets/Cross Body Bags/ChatGPT Image 17 août 2026, 02_27_55.png",
  },
];

export const crossBodyBagColorVariants: ColorVariant[] = [
  // Only real color; hex sampled from the product's own photographed fabric
  // region (see backpacks.ts header for the sampling policy).
  { id: "cv-crossbody-nike-1", productId: "prod-crossbody-nike-fanny", colorName: { ar: "أسود" }, hex: "#2E363E", images: withImage("/products/crossbody-nike-fanny-pack/black.png"), stock: "available" },
];
