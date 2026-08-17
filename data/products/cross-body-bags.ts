import type { ColorVariant, Product } from "../types";

const emptyImages = () => ({ primary: null, secondary: [] });

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
  { id: "cv-crossbody-nike-1", productId: "prod-crossbody-nike-fanny", colorName: { ar: "أسود" }, hex: null, images: emptyImages(), stock: "available" },
];
