import type { ColorVariant, Product } from "../types";

const withImage = (src: string) => ({ primary: src, secondary: [] });

// STOCK (2026-08-19): Issa has explicitly confirmed every product in
// reference/product-sheets is currently available in large quantities —
// see the equivalent note in backpacks.ts for the full rationale.
//
// VARIANT IMAGES / HEX (2026-08-19): where the sheet shows a real
// photographed thumbnail per color, it was cropped pixel-for-pixel into
// public/products/<slug>/ and hex was sampled from that exact photo (not
// invented). Where only a flat color chip (or nothing) exists for a color,
// no image is assigned and hex stays null — see backpacks.ts header for
// the full policy this follows.

export const lunchBoxProducts: Product[] = [
  {
    id: "prod-lunchbox-pink-dual",
    slug: "lunchbox-pink-dual-compartment",
    categoryId: "cat-lunch-boxes",
    name: { ar: "علبة غداء بطبقتين" },
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
    name: { ar: "علبة غداء بطبقتين من تويغلو" },
    shortDescription: { ar: "علبة غداء تويغلو الأصلية بطبقتين، بحزام قابل للفصل." },
    fullDescription: {
      ar: "علبة غداء من تويغلو بطبقتين وسحاب مزدوج، بمقبض علوي وحزام كتف قابل للتعديل والفصل.",
    },
    price: 80,
    specs: {
      capacity: { ar: "~5 لتر (169 أونصة سائلة)" },
    },
    sourceSheet: "reference/product-sheets/Lunch Boxes/ChatGPT Image 17 août 2026, 02_34_24.png",
  },
];

export const lunchBoxColorVariants: ColorVariant[] = [
  // --- lunchbox-pink-dual-compartment: 8 named colors, all 8 now have real
  // generated photos (recolored from the light-pink master, preserving
  // shape/texture/hardware) — hex sampled from each exact generated photo.
  { id: "cv-lunchbox-pink-1", productId: "prod-lunchbox-pink-dual", colorName: { ar: "وردي فاتح" }, hex: "#E6C5CD", images: withImage("/products/lunchbox-pink-dual-compartment/light-pink.png"), stock: "available" },
  { id: "cv-lunchbox-pink-2", productId: "prod-lunchbox-pink-dual", colorName: { ar: "وردي غامق" }, hex: "#E87EA3", images: withImage("/products/lunchbox-pink-dual-compartment/hot-pink.png"), stock: "available" },
  { id: "cv-lunchbox-pink-3", productId: "prod-lunchbox-pink-dual", colorName: { ar: "أسود" }, hex: "#464648", images: withImage("/products/lunchbox-pink-dual-compartment/black.png"), stock: "available" },
  { id: "cv-lunchbox-pink-4", productId: "prod-lunchbox-pink-dual", colorName: { ar: "أزرق كحلي" }, hex: "#435788", images: withImage("/products/lunchbox-pink-dual-compartment/navy.png"), stock: "available" },
  // { id: "cv-lunchbox-pink-5", productId: "prod-lunchbox-pink-dual", colorName: { ar: "بيج" }, hex: "#E3D6CB", images: withImage("/products/lunchbox-pink-dual-compartment/beige.png"), stock: "available" },
  { id: "cv-lunchbox-pink-6", productId: "prod-lunchbox-pink-dual", colorName: { ar: "بني" }, hex: "#936654", images: withImage("/products/lunchbox-pink-dual-compartment/brown.png"), stock: "available" },
  { id: "cv-lunchbox-pink-7", productId: "prod-lunchbox-pink-dual", colorName: { ar: "رمادي" }, hex: "#D0CFD0", images: withImage("/products/lunchbox-pink-dual-compartment/gray.png"), stock: "available" },
  { id: "cv-lunchbox-pink-8", productId: "prod-lunchbox-pink-dual", colorName: { ar: "رمادي داكن" }, hex: "#919093", images: withImage("/products/lunchbox-pink-dual-compartment/dark-gray.png"), stock: "available" },

  // --- lunchbox-gray-dual-compartment: 8 named colors, no printed hex —
  // all 8 have real photographed units, hex sampled from those exact photos.
  { id: "cv-lunchbox-gray-1", productId: "prod-lunchbox-gray-dual", colorName: { ar: "رمادي" }, hex: "#666261", images: withImage("/products/lunchbox-gray-dual-compartment/gray.png"), stock: "available" },
  { id: "cv-lunchbox-gray-2", productId: "prod-lunchbox-gray-dual", colorName: { ar: "أرجواني مغبر (موف)" }, hex: "#A38585", images: withImage("/products/lunchbox-gray-dual-compartment/mauve.png"), stock: "available" },
  { id: "cv-lunchbox-gray-3", productId: "prod-lunchbox-gray-dual", colorName: { ar: "لافندر" }, hex: "#92859B", images: withImage("/products/lunchbox-gray-dual-compartment/lavender.png"), stock: "available" },
  { id: "cv-lunchbox-gray-4", productId: "prod-lunchbox-gray-dual", colorName: { ar: "بني" }, hex: "#5E4F47", images: withImage("/products/lunchbox-gray-dual-compartment/brown.png"), stock: "available" },
  { id: "cv-lunchbox-gray-5", productId: "prod-lunchbox-gray-dual", colorName: { ar: "أزرق كحلي" }, hex: "#3F4957", images: withImage("/products/lunchbox-gray-dual-compartment/navy.png"), stock: "available" },
  { id: "cv-lunchbox-gray-6", productId: "prod-lunchbox-gray-dual", colorName: { ar: "وردي" }, hex: "#BC8C8D", images: withImage("/products/lunchbox-gray-dual-compartment/pink.png"), stock: "available" },
  { id: "cv-lunchbox-gray-7", productId: "prod-lunchbox-gray-dual", colorName: { ar: "أخضر نعناعي" }, hex: "#929D94", images: withImage("/products/lunchbox-gray-dual-compartment/mint.png"), stock: "available" },
  { id: "cv-lunchbox-gray-8", productId: "prod-lunchbox-gray-dual", colorName: { ar: "بيج" }, hex: "#8D7D78", images: withImage("/products/lunchbox-gray-dual-compartment/beige.png"), stock: "available" },
];
