import type { ColorVariant, Product } from "../types";

const emptyImages = () => ({ primary: null, secondary: [] });

export const lunchBoxProducts: Product[] = [
  {
    id: "prod-lunchbox-pink-dual",
    slug: "lunchbox-pink-dual-compartment",
    categoryId: "cat-lunch-boxes",
    name: { ar: "علبة غداء وردية بطبقتين" },
    shortDescription: { ar: "علبة غداء عازلة بطبقتين، بحزام قابل للفصل." },
    fullDescription: {
      ar: "علبة غداء عازلة بطبقتين وسحاب مزدوج، بمقبض علوي وحزام كتف قابل للتعديل والفصل، وبطانة داخلية عازلة للحرارة.",
    },
    price: 75,
    specs: {
      capacity: { ar: "~5 لتر (169 أونصة سائلة)" },
      material: { ar: "قماش بوليستر" },
      dimensions: { ar: "22×16×19 سم (طول×عرض×ارتفاع)" },
      weight: { ar: "~0.35 كغ" },
    },
    sourceSheet: "reference/product-sheets/Lunch Boxes/ChatGPT Image 17 août 2026, 01_57_34.png",
  },
  {
    id: "prod-lunchbox-gray-dual",
    slug: "lunchbox-gray-dual-compartment",
    categoryId: "cat-lunch-boxes",
    name: { ar: "علبة غداء رمادية بطبقتين من توغلو" },
    shortDescription: { ar: "علبة غداء توغلو الأصلية بطبقتين، بحزام قابل للفصل." },
    fullDescription: {
      ar: "علبة غداء من توغلو بطبقتين وسحاب مزدوج، بمقبض علوي وحزام كتف قابل للتعديل والفصل.",
    },
    price: 80,
    specs: {
      capacity: { ar: "~5 لتر (169 أونصة سائلة)" },
    },
    sourceSheet: "reference/product-sheets/Lunch Boxes/ChatGPT Image 17 août 2026, 02_34_24.png",
  },
];

export const lunchBoxColorVariants: ColorVariant[] = [
  // --- lunchbox-pink-dual-compartment: 8 named colors, no hex given
  { id: "cv-lunchbox-pink-1", productId: "prod-lunchbox-pink-dual", colorName: { ar: "وردي فاتح" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-lunchbox-pink-2", productId: "prod-lunchbox-pink-dual", colorName: { ar: "وردي غامق" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-lunchbox-pink-3", productId: "prod-lunchbox-pink-dual", colorName: { ar: "أسود" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-lunchbox-pink-4", productId: "prod-lunchbox-pink-dual", colorName: { ar: "أزرق كحلي" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-lunchbox-pink-5", productId: "prod-lunchbox-pink-dual", colorName: { ar: "بيج" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-lunchbox-pink-6", productId: "prod-lunchbox-pink-dual", colorName: { ar: "بني" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-lunchbox-pink-7", productId: "prod-lunchbox-pink-dual", colorName: { ar: "رمادي" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-lunchbox-pink-8", productId: "prod-lunchbox-pink-dual", colorName: { ar: "رمادي داكن" }, hex: null, images: emptyImages(), stock: "available" },

  // --- lunchbox-gray-dual-compartment: 8 named colors, no hex given
  { id: "cv-lunchbox-gray-1", productId: "prod-lunchbox-gray-dual", colorName: { ar: "أرجواني مغبر (موف)" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-lunchbox-gray-2", productId: "prod-lunchbox-gray-dual", colorName: { ar: "رمادي" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-lunchbox-gray-3", productId: "prod-lunchbox-gray-dual", colorName: { ar: "لافندر" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-lunchbox-gray-4", productId: "prod-lunchbox-gray-dual", colorName: { ar: "بني" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-lunchbox-gray-5", productId: "prod-lunchbox-gray-dual", colorName: { ar: "أزرق كحلي" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-lunchbox-gray-6", productId: "prod-lunchbox-gray-dual", colorName: { ar: "وردي" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-lunchbox-gray-7", productId: "prod-lunchbox-gray-dual", colorName: { ar: "أخضر نعناعي" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-lunchbox-gray-8", productId: "prod-lunchbox-gray-dual", colorName: { ar: "بيج" }, hex: null, images: emptyImages(), stock: "available" },
];
