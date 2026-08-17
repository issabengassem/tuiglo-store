import type { ColorVariant, Product } from "../types";

const emptyImages = () => ({ primary: null, secondary: [] });

// Stock: Issa confirmed these products currently have sufficient real
// inventory (WEBSITE_IMPLEMENTATION_PLAN.md — business rules update), so
// their variants are set to "available" rather than left "unknown". This
// is real, owner-provided inventory information, not an invented value.
// ManualStockSource remains temporary — see lib/stock/.

/**
 * All 10 real products are sourced from the composite reference sheets in
 * products/Backpacks, products/Lunch Boxes, products/Cross Body Bags —
 * re-verified directly against those images (not from memory) before this
 * file was written. Prices and colors below are exactly what each sheet
 * states; the "+" some sheets show after the price carries no meaning per
 * Issa's confirmed decision (WEBSITE_IMPLEMENTATION_PLAN.md, top summary
 * item 2). Names/descriptions are generated to accurately describe the real
 * product; nothing about shape, materials, or colors is invented.
 *
 * Two products (Nike-branded and "Bone"/gray Tuiglo) have NO printed color
 * names, hex codes, or labels anywhere on their sheets — their colorVariants
 * arrays are intentionally left empty rather than guessed. See
 * WEBSITE_IMPLEMENTATION_PLAN.md §26 item 1.
 */

export const backpackProducts: Product[] = [
  {
    id: "prod-backpack-floral-pink",
    slug: "backpack-floral-pink",
    categoryId: "cat-backpacks",
    name: { ar: "حقيبة ظهر بنقشة ورقية مع دبابيس دبدوب وأرنب" },
    shortDescription: { ar: "حقيبة ظهر بنقشة أوراق نباتية، بدبوسين على شكل دبدوب وأرنب." },
    fullDescription: {
      ar: "حقيبة ظهر بنقشة أوراق نباتية دقيقة، مع جيبين أماميين وسحابين، ومقبض علوي وأحزمة كتف قابلة للتعديل. تأتي بدبوسين زخرفيين على شكل دبدوب وأرنب.",
    },
    price: 70,
    specs: {},
    sourceSheet: "reference/product-sheets/Backpacks/ChatGPT Image 17 août 2026, 01_29_01.png",
  },
  {
    id: "prod-backpack-tuiglo-beige-floral-star",
    slug: "backpack-tuiglo-beige-floral-star",
    categoryId: "cat-backpacks",
    name: { ar: "حقيبة ظهر توغلو بيج بنقشة أزهار ودبوس نجمة" },
    shortDescription: { ar: "حقيبة ظهر توغلو الأصلية، بنقشة أزهار ودبوس نجمة مطرز." },
    fullDescription: {
      ar: "حقيبة ظهر من توغلو بنقشة أزهار، بسحاب مزدوج وجيوب جانبية وأحزمة مبطنة ومقبض علوي، ودبوس نجمة مطرز كتفصيل زخرفي.",
    },
    price: 90,
    specs: {
      material: { ar: "قماش بوليستر" },
      capacity: { ar: "~15 لتر" },
      dimensions: { ar: "28×20×38 سم (طول×عرض×ارتفاع)" },
      weight: { ar: "~0.45 كغ" },
    },
    sourceSheet: "reference/product-sheets/Backpacks/ChatGPT Image 17 août 2026, 01_48_22.png",
  },
  {
    id: "prod-backpack-blue-dog-badge",
    slug: "backpack-blue-dog-badge",
    categoryId: "cat-backpacks",
    name: { ar: "حقيبة ظهر زرقاء بشارة كلب كرتونية" },
    shortDescription: { ar: "حقيبة ظهر زرقاء بجيبين أماميين وشارة كلب كرتونية." },
    fullDescription: {
      ar: "حقيبة ظهر زرقاء بجيبين أماميين وسحاب جانبي ومقبض علوي، مزينة بشارة كلب كرتونية على الجيب الأمامي.",
    },
    price: 70,
    specs: {},
    sourceSheet: "reference/product-sheets/Backpacks/ChatGPT Image 17 août 2026, 02_11_14.png",
  },
  {
    id: "prod-backpack-nike",
    slug: "backpack-nike",
    categoryId: "cat-backpacks",
    name: { ar: "حقيبة ظهر رمادية بطبعة NIKE" },
    shortDescription: { ar: "حقيبة ظهر رمادية بطبعة NIKE وجيب أمامي مع بطاقة حمراء." },
    fullDescription: {
      ar: "حقيبة ظهر رمادية بطبعة NIKE متكررة، بجيب أمامي وجيوب شبكية جانبية وبطاقة NIKE حمراء معلقة على السحاب.",
    },
    price: 95,
    specs: {},
    sourceSheet: "reference/product-sheets/Backpacks/ChatGPT Image 17 août 2026, 02_12_28.png",
  },
  {
    id: "prod-backpack-bone-gray",
    slug: "backpack-bone-gray",
    categoryId: "cat-backpacks",
    name: { ar: "حقيبة ظهر رمادية من توغلو بدبوس عظمة" },
    shortDescription: { ar: "حقيبة ظهر رمادية من توغلو، بدبوس عظمة زخرفي." },
    fullDescription: {
      ar: "حقيبة ظهر رمادية من توغلو (Tuiglo Bag)، بجيب جانبي وأحزمة مبطنة ومقبض علوي، ودبوس عظمة زخرفي على الواجهة.",
    },
    price: 95,
    specs: {},
    sourceSheet: "reference/product-sheets/Backpacks/ChatGPT Image 17 août 2026, 02_18_10.png",
  },
  {
    id: "prod-backpack-eastpak-purple",
    slug: "backpack-eastpak-purple",
    categoryId: "cat-backpacks",
    name: { ar: "حقيبة ظهر أرجوانية من إيستباك" },
    shortDescription: { ar: "حقيبة ظهر أرجوانية أصلية من إيستباك، من مجموعة Authentic Collection." },
    fullDescription: {
      ar: "حقيبة ظهر أرجوانية من إيستباك (Authentic Collection)، بجيب أمامي وأحزمة كتف مبطنة ومقبض علوي.",
    },
    price: 75,
    specs: {},
    sourceSheet: "reference/product-sheets/Backpacks/ChatGPT Image 17 août 2026, 02_19_58.png",
  },
  {
    id: "prod-backpack-s-sport-black",
    slug: "backpack-s-sport-black",
    categoryId: "cat-backpacks",
    name: { ar: "حقيبة ظهر سوداء رياضية S Sport" },
    shortDescription: { ar: "حقيبة ظهر سوداء رياضية من S Sport، بجيوب متعددة." },
    fullDescription: {
      ar: "حقيبة ظهر سوداء رياضية من S Sport، بجيب أمامي وجيوب شبكية جانبية وشارة معدنية، مناسبة للاستخدام اليومي والسفر.",
    },
    price: 100,
    specs: {},
    sourceSheet: "reference/product-sheets/Backpacks/ChatGPT Image 17 août 2026, 02_33_20.png",
  },
];

export const backpackColorVariants: ColorVariant[] = [
  // --- backpack-floral-pink: PRODUCT COLORS panel gives 5 hex swatches only
  // (no names). Note: the photographed default/front-view color reads as
  // dusty pink, which does not clearly match any of these 5 hex values —
  // this mismatch is on the source sheet itself and is not resolved here;
  // flagged in WEBSITE_IMPLEMENTATION_PLAN.md for Issa to confirm.
  { id: "cv-floral-pink-1", productId: "prod-backpack-floral-pink", colorName: { ar: "أخضر فاتح جداً" }, hex: "#E8F5E9", images: emptyImages(), stock: "available" },
  { id: "cv-floral-pink-2", productId: "prod-backpack-floral-pink", colorName: { ar: "أخضر فاتح" }, hex: "#A5D6A7", images: emptyImages(), stock: "available" },
  { id: "cv-floral-pink-3", productId: "prod-backpack-floral-pink", colorName: { ar: "أخضر" }, hex: "#66BB6A", images: emptyImages(), stock: "available" },
  { id: "cv-floral-pink-4", productId: "prod-backpack-floral-pink", colorName: { ar: "أخضر داكن" }, hex: "#1B5E20", images: emptyImages(), stock: "available" },
  { id: "cv-floral-pink-5", productId: "prod-backpack-floral-pink", colorName: { ar: "أزرق كحلي" }, hex: "#3949AB", images: emptyImages(), stock: "available" },

  // --- backpack-tuiglo-beige-floral-star: 6 named colors, no hex given
  { id: "cv-tuiglo-star-1", productId: "prod-backpack-tuiglo-beige-floral-star", colorName: { ar: "بيج" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-tuiglo-star-2", productId: "prod-backpack-tuiglo-beige-floral-star", colorName: { ar: "وردي" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-tuiglo-star-3", productId: "prod-backpack-tuiglo-beige-floral-star", colorName: { ar: "رمادي" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-tuiglo-star-4", productId: "prod-backpack-tuiglo-beige-floral-star", colorName: { ar: "أزرق كحلي" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-tuiglo-star-5", productId: "prod-backpack-tuiglo-beige-floral-star", colorName: { ar: "ليلكي" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-tuiglo-star-6", productId: "prod-backpack-tuiglo-beige-floral-star", colorName: { ar: "وردي غامق" }, hex: null, images: emptyImages(), stock: "available" },

  // --- backpack-blue-dog-badge: 11 hex colors, no names given
  { id: "cv-dog-badge-1", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "أزرق" }, hex: "#4B79A8", images: emptyImages(), stock: "available" },
  { id: "cv-dog-badge-2", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "أخضر" }, hex: "#6CA06C", images: emptyImages(), stock: "available" },
  { id: "cv-dog-badge-3", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "بنفسجي داكن" }, hex: "#3D2F6F", images: emptyImages(), stock: "available" },
  { id: "cv-dog-badge-4", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "رمادي فاتح" }, hex: "#B0B0B0", images: emptyImages(), stock: "available" },
  { id: "cv-dog-badge-5", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "أسود" }, hex: "#2C2C2C", images: emptyImages(), stock: "available" },
  { id: "cv-dog-badge-6", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "بني" }, hex: "#A87A5C", images: emptyImages(), stock: "available" },
  { id: "cv-dog-badge-7", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "وردي" }, hex: "#F2A7B3", images: emptyImages(), stock: "available" },
  { id: "cv-dog-badge-8", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "أخضر فاتح" }, hex: "#8FC9A3", images: emptyImages(), stock: "available" },
  { id: "cv-dog-badge-9", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "بنفسجي فاتح" }, hex: "#C8A2E0", images: emptyImages(), stock: "available" },
  { id: "cv-dog-badge-10", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "بيج" }, hex: "#D9B38C", images: emptyImages(), stock: "available" },
  { id: "cv-dog-badge-11", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "رمادي" }, hex: "#7A7A7A", images: emptyImages(), stock: "available" },

  // --- backpack-nike: PRODUCT COLORS panel shows 7 photographed variants
  // with NO printed names or hex anywhere on the sheet. Intentionally left
  // empty — see WEBSITE_IMPLEMENTATION_PLAN.md §26 item 1.

  // --- backpack-bone-gray: 12 unlabeled swatch blocks, no names or hex.
  // Intentionally left empty — see WEBSITE_IMPLEMENTATION_PLAN.md §26 item 1.

  // --- backpack-eastpak-purple: 8 named colors, no hex given
  { id: "cv-eastpak-1", productId: "prod-backpack-eastpak-purple", colorName: { ar: "أرجواني" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-eastpak-2", productId: "prod-backpack-eastpak-purple", colorName: { ar: "أسود" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-eastpak-3", productId: "prod-backpack-eastpak-purple", colorName: { ar: "وردي فاتح" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-eastpak-4", productId: "prod-backpack-eastpak-purple", colorName: { ar: "رمادي" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-eastpak-5", productId: "prod-backpack-eastpak-purple", colorName: { ar: "أزرق كحلي" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-eastpak-6", productId: "prod-backpack-eastpak-purple", colorName: { ar: "رمادي داكن" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-eastpak-7", productId: "prod-backpack-eastpak-purple", colorName: { ar: "أزرق مخضر" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-eastpak-8", productId: "prod-backpack-eastpak-purple", colorName: { ar: "أخضر مريمي" }, hex: null, images: emptyImages(), stock: "available" },

  // --- backpack-s-sport-black: 5 named colors, no hex given
  { id: "cv-ssport-1", productId: "prod-backpack-s-sport-black", colorName: { ar: "أسود" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-ssport-2", productId: "prod-backpack-s-sport-black", colorName: { ar: "أزرق كحلي" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-ssport-3", productId: "prod-backpack-s-sport-black", colorName: { ar: "رمادي" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-ssport-4", productId: "prod-backpack-s-sport-black", colorName: { ar: "عنابي" }, hex: null, images: emptyImages(), stock: "available" },
  { id: "cv-ssport-5", productId: "prod-backpack-s-sport-black", colorName: { ar: "وردي" }, hex: null, images: emptyImages(), stock: "available" },
];
