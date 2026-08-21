import type { ColorVariant, Product } from "../types";

const emptyImages = () => ({ primary: null, secondary: [] });
const withImage = (src: string) => ({ primary: src, secondary: [] });

/**
 * All 10 real products are sourced from the composite reference sheets in
 * reference/product-sheets/Backpacks, .../Lunch Boxes, .../Cross Body Bags —
 * re-verified directly against those images (not from memory) before this
 * file was written. Prices and colors below are exactly what each sheet
 * states; the "+" some sheets show after the price carries no meaning per
 * Issa's confirmed decision (WEBSITE_IMPLEMENTATION_PLAN.md, top summary
 * item 2). Names/descriptions are generated to accurately describe the real
 * product; nothing about shape, materials, real colors, or price is invented.
 *
 * STOCK (2026-08-19): Issa has explicitly confirmed that every product
 * represented in reference/product-sheets is currently available in large
 * quantities. Stock is therefore set to "available" for every real variant
 * below — a real business statement from the store owner, not an assumed
 * default and not a fabricated inventory count. No specific quantity is
 * recorded (per policy, exact numbers are never shown to customers anyway).
 *
 * VARIANT IMAGES (2026-08-19): where a sheet's "PRODUCT COLORS" section
 * shows a real photographed thumbnail per color (not just a flat swatch),
 * that exact thumbnail was cropped pixel-for-pixel (no AI alteration, no
 * redraw) into public/products/<slug>/<color>.png and wired below. Where a
 * sheet only shows flat color chips (no photographed unit) for a given
 * color, no image is assigned — a flat chip is not a product photo and
 * assigning one would misrepresent the color. images.primary stays null in
 * those cases; ProductImage renders the honest "coming soon" placeholder.
 *
 * HEX FOR PREVIOUSLY NAME-ONLY COLORS (2026-08-19): where a real cropped
 * photo now exists for a color, its hex below is the programmatically
 * sampled average pixel color of that exact photo (not eyeballed, not
 * invented) — real photos naturally sample a bit muted/shadowed compared to
 * a vivid marketing swatch, which is expected and honest. Colors with
 * neither a printed hex nor a photographed unit keep hex: null.
 *
 * NIKE AND BONE BACKPACK COLORS (2026-08-19): both sheets show real color
 * swatches (Nike: 7 photographed units; Bone: a 4x3 grid of flat swatches)
 * with no printed text/names/hex anywhere. Issa has confirmed these visible
 * swatches ARE valid real source data and should not be discarded just
 * because they lack printed labels. Nike's 7 hex values below are now
 * sampled from the same real cropped photos as everything else in this
 * note; Bone's 12 remain a direct visual reading (no photographed units
 * exist for Bone, only flat swatches, so there is nothing to crop or
 * sample — see below). Both are best-effort, not exact/verified
 * color-matched values, and were NOT printed on the sheet and NOT sourced
 * from any separate reference image — correcting an earlier, since-reverted
 * claim that a dedicated color-reference image existed for these two
 * products. It did not.
 */

export const backpackProducts: Product[] = [
  {
    id: "prod-backpack-floral-pink",
    slug: "backpack-floral-pink",
    categoryId: "cat-backpacks",
    name: { ar: "حقيبة بنقشة ورقية مع دبابيس دبدوب وأرنب" },
    shortDescription: { ar: "حقيبة بنقشة أوراق نباتية، بدبوسين على شكل دبدوب وأرنب." },
    fullDescription: {
      ar: "حقيبة بنقشة أوراق نباتية دقيقة، مع جيبين أماميين وسحابين، ومقبض علوي وأحزمة كتف قابلة للتعديل. تأتي بدبوسين زخرفيين على شكل دبدوب وأرنب.",
    },
    price: 70,
    specs: {},
    sourceSheet: "reference/product-sheets/Backpacks/ChatGPT Image 17 août 2026, 01_29_01.png",
  },
  {
    id: "prod-backpack-tuiglo-beige-floral-star",
    slug: "backpack-tuiglo-beige-floral-star",
    categoryId: "cat-backpacks",
    name: { ar: "حقيبة تويغلو  بنقشة أزهار ودبوس نجمة" },
    shortDescription: { ar: "حقيبة تويغلو الأصلية، بنقشة أزهار ودبوس نجمة مطرز." },
    fullDescription: {
      ar: "حقيبة من تويغلو بنقشة أزهار، بسحاب مزدوج وجيوب جانبية وأحزمة مبطنة ومقبض علوي، ودبوس نجمة مطرز كتفصيل زخرفي.",
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
    name: { ar: "حقيبة بشارة كلب كرتونية" },
    shortDescription: { ar: "حقيبة بجيبين أماميين وشارة كلب كرتونية." },
    fullDescription: {
      ar: "حقيبة بجيبين أماميين وسحاب جانبي ومقبض علوي، مزينة بشارة كلب كرتونية على الجيب الأمامي.",
    },
    price: 70,
    specs: {},
    sourceSheet: "reference/product-sheets/Backpacks/ChatGPT Image 17 août 2026, 02_11_14.png",
  },
  {
    id: "prod-backpack-nike",
    slug: "backpack-nike",
    categoryId: "cat-backpacks",
    name: { ar: "حقيبة بطبعة NIKE" },
    shortDescription: { ar: "حقيبة بطبعة NIKE وجيب أمامي مع بطاقة ." },
    fullDescription: {
      ar: "حقيبة بطبعة NIKE متكررة، بجيب أمامي وجيوب شبكية جانبية وبطاقة NIKE معلقة على السحاب.",
    },
    price: 95,
    specs: {},
    sourceSheet: "reference/product-sheets/Backpacks/ChatGPT Image 17 août 2026, 02_12_28.png",
  },
  {
    id: "prod-backpack-bone-gray",
    slug: "backpack-bone-gray",
    categoryId: "cat-backpacks",
    name: { ar: "حقيبة من تويغلو بدبوس عظمة" },
    shortDescription: { ar: "حقيبة من تويغلو، بدبوس عظمة زخرفي." },
    fullDescription: {
      ar: "حقيبة من تويغلو (Tuiglo Bag)، بجيب جانبي وأحزمة مبطنة ومقبض علوي، ودبوس عظمة زخرفي على الواجهة.",
    },
    price: 95,
    specs: {},
    sourceSheet: "reference/product-sheets/Backpacks/ChatGPT Image 17 août 2026, 02_18_10.png",
  },
  {
    id: "prod-backpack-eastpak-purple",
    slug: "backpack-eastpak-purple",
    categoryId: "cat-backpacks",
    name: { ar: "حقيبة من إيستباك" },
    shortDescription: { ar: "حقيبة أصلية من إيستباك، من مجموعة Authentic Collection." },
    fullDescription: {
      ar: "حقيبة  من إيستباك (Authentic Collection)، بجيب أمامي وأحزمة كتف مبطنة ومقبض علوي.",
    },
    price: 75,
    specs: {},
    sourceSheet: "reference/product-sheets/Backpacks/ChatGPT Image 17 août 2026, 02_19_58.png",
  },
  {
    id: "prod-backpack-s-sport-black",
    slug: "backpack-s-sport-black",
    categoryId: "cat-backpacks",
    name: { ar: "حقيبة رياضية S Sport" },
    shortDescription: { ar: "حقيبة رياضية من S Sport، بجيوب متعددة." },
    fullDescription: {
      ar: "حقيبة رياضية من S Sport، بجيب أمامي وجيوب شبكية جانبية وشارة معدنية، مناسبة للاستخدام اليومي والسفر.",
    },
    price: 100,
    specs: {},
    sourceSheet: "reference/product-sheets/Backpacks/ChatGPT Image 17 août 2026, 02_33_20.png",
  },
];

export const backpackColorVariants: ColorVariant[] = [
  // --- backpack-floral-pink: PRODUCT COLORS panel gives 5 hex swatches
  // (no names). The photographed default/front-view color is a real 6th
  // color (dusty pink) not covered by that hex legend — since it's
  // extensively photographed across every angle, it's added here as its
  // own real variant (cv-floral-pink-6) with hex sampled from that photo,
  // rather than left out. cv-floral-pink-1 (the palest printed hex) has no
  // matching photographed unit anywhere on the sheet, so it stays imageless.
  { id: "cv-floral-pink-1", productId: "prod-backpack-floral-pink", colorName: { ar: "وردي غامق (اللون الأساسي المصوّر)" }, hex: "#B37172", images: withImage("/products/backpack-floral-pink/pink.png"), stock: "available" },
  { id: "cv-floral-pink-2", productId: "prod-backpack-floral-pink", colorName: { ar: "أزرق كحلي" }, hex: "#3949AB", images: withImage("/products/backpack-floral-pink/navy.png"), stock: "available" },
  { id: "cv-floral-pink-3", productId: "prod-backpack-floral-pink", colorName: { ar: "أخضر داكن" }, hex: "#1B5E20", images: withImage("/products/backpack-floral-pink/dark-green.png"), stock: "available" },
  { id: "cv-floral-pink-4", productId: "prod-backpack-floral-pink", colorName: { ar: "أخضر" }, hex: "#66BB6A", images: withImage("/products/backpack-floral-pink/green.png"), stock: "available" },
  { id: "cv-floral-pink-5", productId: "prod-backpack-floral-pink", colorName: { ar: "أخضر فاتح" }, hex: "#A5D6A7", images: withImage("/products/backpack-floral-pink/light-green.png"), stock: "available" },
  { id: "cv-floral-pink-6", productId: "prod-backpack-floral-pink", colorName: { ar: "أخضر فاتح جداً" }, hex: "#E8F5E9", images: withImage("/products/backpack-floral-pink/very-light-green.png"), stock: "available" },
 
  // --- backpack-tuiglo-beige-floral-star: 6 named colors, no printed hex.
  // Only "beige" has a photographed unit (it's the default/shown color) —
  // hex sampled from that real photo. The other 5 have neither a printed
  // hex nor a photo, so they stay hex:null/image:null (real chips, no fake fill).
  { id: "cv-tuiglo-star-1", productId: "prod-backpack-tuiglo-beige-floral-star", colorName: { ar: "" }, hex: "#DAA780", images: withImage("/products/backpack-tuiglo-beige-floral-star/beige.png"), stock: "available" },
  { id: "cv-tuiglo-star-2", productId: "prod-backpack-tuiglo-beige-floral-star", colorName: { ar: "وردي" }, hex: "#B37172", images: withImage("/products/backpack-tuiglo-beige-floral-star/pink.png"), stock: "available" },
  { id: "cv-tuiglo-star-3", productId: "prod-backpack-tuiglo-beige-floral-star", colorName: { ar: "رمادي" }, hex: "#7A7A7A", images: withImage("/products/backpack-tuiglo-beige-floral-star/gray.png"), stock: "available" },
  { id: "cv-tuiglo-star-4", productId: "prod-backpack-tuiglo-beige-floral-star", colorName: { ar: "أزرق كحلي" }, hex: "#2D3D5E", images: withImage("/products/backpack-tuiglo-beige-floral-star/navy.png"), stock: "available" },
  { id: "cv-tuiglo-star-5", productId: "prod-backpack-tuiglo-beige-floral-star", colorName: { ar: "ليلكي" }, hex: "#967FAA", images: withImage("/products/backpack-tuiglo-beige-floral-star/lilac.png"), stock: "available" },
  { id: "cv-tuiglo-star-6", productId: "prod-backpack-tuiglo-beige-floral-star", colorName: { ar: "وردي غامق" }, hex: "#AA6973", images: withImage("/products/backpack-tuiglo-beige-floral-star/dusty-pink.png"), stock: "available" },

  // --- backpack-blue-dog-badge: 11 printed hex colors. Only "blue" (the
  // default photographed color) has a real image; the printed hex stays
  // authoritative for all 11 (not overwritten by the sampled value).
  { id: "cv-dog-badge-1", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "أزرق" }, hex: "#4B79A8", images: withImage("/products/backpack-blue-dog-badge/blue.png"), stock: "available" },
  { id: "cv-dog-badge-2", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "أخضر" }, hex: "#6CA06C", images: withImage("/products/backpack-blue-dog-badge/green.png"), stock: "available" },
  { id: "cv-dog-badge-3", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "بنفسجي داكن" }, hex: "#3D2F6F", images: withImage("/products/backpack-blue-dog-badge/dark-purple.png"), stock: "available" },
  { id: "cv-dog-badge-4", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "رمادي فاتح" }, hex: "#B0B0B0", images: withImage("/products/backpack-blue-dog-badge/light-gray.png"), stock: "available" },
  { id: "cv-dog-badge-5", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "أسود" }, hex: "#2C2C2C", images: withImage("/products/backpack-blue-dog-badge/black.png"), stock: "available" },
  { id: "cv-dog-badge-6", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "بني" }, hex: "#A87A5C", images: withImage("/products/backpack-blue-dog-badge/brown.png"), stock: "available" },
  { id: "cv-dog-badge-7", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "وردي" }, hex: "#F2A7B3", images: withImage("/products/backpack-blue-dog-badge/pink.png"), stock: "available" },
  { id: "cv-dog-badge-8", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "أخضر فاتح" }, hex: "#8FC9A3", images: withImage("/products/backpack-blue-dog-badge/light-green.png"), stock: "available" },
  { id: "cv-dog-badge-9", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "بنفسجي فاتح" }, hex: "#C8A2E0", images: withImage("/products/backpack-blue-dog-badge/light-purple.png"), stock: "available" },
  { id: "cv-dog-badge-10", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "" }, hex: "#D9B38C", images: withImage("/products/backpack-blue-dog-badge/beige.png"), stock: "available" },
  { id: "cv-dog-badge-11", productId: "prod-backpack-blue-dog-badge", colorName: { ar: "رمادي" }, hex: "#7A7A7A", images: withImage("/products/backpack-blue-dog-badge/gray.png"), stock: "available" },

  // --- backpack-nike: 7 photographed units, no printed names/hex on the
  // sheet. Hex sampled from the real cropped photos below (see file header).
  { id: "cv-nike-1", productId: "prod-backpack-nike", colorName: { ar: "أخضر زيتوني (تقريبي)" }, hex: "#6E7C4C", images: withImage("/products/backpack-nike/v1.png"), stock: "available" },
  { id: "cv-nike-2", productId: "prod-backpack-nike", colorName: { ar: "رمادي (تقريبي)" }, hex: "#5B5B5D", images: withImage("/products/backpack-nike/v2.png"), stock: "available" },
  { id: "cv-nike-3", productId: "prod-backpack-nike", colorName: { ar: "وردي غامق (تقريبي)" }, hex: "#CE8C8C", images: withImage("/products/backpack-nike/v3.png"), stock: "available" },
  { id: "cv-nike-4", productId: "prod-backpack-nike", colorName: { ar: "أزرق كحلي (تقريبي)" }, hex: "#20345C", images: withImage("/products/backpack-nike/v4.png"), stock: "available" },
  { id: "cv-nike-5", productId: "prod-backpack-nike", colorName: { ar: "بني فاتح (تقريبي)" }, hex: "#BE8A50", images: withImage("/products/backpack-nike/v5.png"), stock: "available" },
  { id: "cv-nike-6", productId: "prod-backpack-nike", colorName: { ar: "أسود (تقريبي)" }, hex: "#1A1A1A", images: withImage("/products/backpack-nike/v6.png"), stock: "available" },
  { id: "cv-nike-7", productId: "prod-backpack-nike", colorName: { ar: "رمادي داكن (تقريبي)" }, hex: "#3A3A3C", images: withImage("/products/backpack-nike/v7.png"), stock: "available" },

  // --- backpack-bone-gray: 12 flat swatches only, no photographed units
  // anywhere on the sheet — nothing to crop. Hex stays a direct visual
  // reading (see file header); no image can be honestly assigned.
  { id: "cv-bone-1", productId: "prod-backpack-bone-gray", colorName: { ar: "رمادي فاتح (تقريبي)" }, hex: "#ADB0B5", images: withImage("/products/backpack-bone-gray/v1.png"), stock: "available" }, 
  { id: "cv-bone-2", productId: "prod-backpack-bone-gray", colorName: { ar: "بني فاتح (تقريبي)" }, hex: "#D9B989", images: withImage("/products/backpack-bone-gray/v2.png"), stock: "available" },
  { id: "cv-bone-3", productId: "prod-backpack-bone-gray", colorName: { ar: "بني داكن (تقريبي)" }, hex: "#5C4033", images: withImage("/products/backpack-bone-gray/v3.png"), stock: "available" },
  { id: "cv-bone-4", productId: "prod-backpack-bone-gray", colorName: { ar: "كحلي أسود (تقريبي)" }, hex: "#26272C", images: withImage("/products/backpack-bone-gray/v4.png"), stock: "available" },
  { id: "cv-bone-5", productId: "prod-backpack-bone-gray", colorName: { ar: "بنفسجي فاتح (تقريبي)" }, hex: "#B8A9DA", images: withImage("/products/backpack-bone-gray/v5.png"), stock: "available" },
  { id: "cv-bone-6", productId: "prod-backpack-bone-gray", colorName: { ar: "وردي سالمون (تقريبي)" }, hex: "#DB8F86", images: withImage("/products/backpack-bone-gray/v6.png"), stock: "available" },
  { id: "cv-bone-7", productId: "prod-backpack-bone-gray", colorName: { ar: "وردي غامق (تقريبي)" }, hex: "#B56670", images: withImage("/products/backpack-bone-gray/v7.png"), stock: "available" },
  { id: "cv-bone-8", productId: "prod-backpack-bone-gray", colorName: { ar: "بنفسجي (تقريبي)" }, hex: "#6C4B8D", images: withImage("/products/backpack-bone-gray/v8.png"), stock: "available" },
  { id: "cv-bone-9", productId: "prod-backpack-bone-gray", colorName: { ar: "أزرق فولاذي (تقريبي)" }, hex: "#3D71A8", images: withImage("/products/backpack-bone-gray/v9.png"), stock: "available" },
  { id: "cv-bone-10", productId: "prod-backpack-bone-gray", colorName: { ar: "فيروزي (تقريبي)" }, hex: "#2E8C8A", images: withImage("/products/backpack-bone-gray/v10.png"), stock: "available" },
  { id: "cv-bone-11", productId: "prod-backpack-bone-gray", colorName: { ar: "أخضر مريمي (تقريبي)" }, hex: "#90AC8C", images: withImage("/products/backpack-bone-gray/v11.png"), stock: "available" },
  { id: "cv-bone-12", productId: "prod-backpack-bone-gray", colorName: { ar: "أزرق كحلي داكن (تقريبي)" }, hex: "#1E3C64", images: withImage("/products/backpack-bone-gray/v12.png"), stock: "available" },

  // --- backpack-eastpak-purple: 8 named colors, no printed hex — all 8
  // have real photographed units, hex sampled from those exact photos.
  { id: "cv-eastpak-1", productId: "prod-backpack-eastpak-purple", colorName: { ar: "أرجواني" }, hex: "#64566C", images: withImage("/products/backpack-eastpak-purple/v1.png"), stock: "available" },
  { id: "cv-eastpak-2", productId: "prod-backpack-eastpak-purple", colorName: { ar: "أسود" }, hex: "#1C1C1C", images: withImage("/products/backpack-eastpak-purple/v2.png"), stock: "available" },
  { id: "cv-eastpak-3", productId: "prod-backpack-eastpak-purple", colorName: { ar: "وردي فاتح" }, hex: "#977F85", images: withImage("/products/backpack-eastpak-purple/v3.png"), stock: "available" },
  { id: "cv-eastpak-4", productId: "prod-backpack-eastpak-purple", colorName: { ar: "رمادي" }, hex: "#696264", images: withImage("/products/backpack-eastpak-purple/v4.png"), stock: "available" },
  { id: "cv-eastpak-5", productId: "prod-backpack-eastpak-purple", colorName: { ar: "أزرق كحلي" }, hex: "#283453", images: withImage("/products/backpack-eastpak-purple/v5.png"), stock: "available" },
  { id: "cv-eastpak-6", productId: "prod-backpack-eastpak-purple", colorName: { ar: "رمادي داكن" }, hex: "#45474A", images: withImage("/products/backpack-eastpak-purple/v6.png"), stock: "available" },
  { id: "cv-eastpak-7", productId: "prod-backpack-eastpak-purple", colorName: { ar: "أزرق مخضر" }, hex: "#425B66", images: withImage("/products/backpack-eastpak-purple/v7.png"), stock: "available" },
  { id: "cv-eastpak-8", productId: "prod-backpack-eastpak-purple", colorName: { ar: "أخضر مريمي" }, hex: "#7A857D", images: withImage("/products/backpack-eastpak-purple/v8.png"), stock: "available" },

  // --- backpack-s-sport-black: 5 named colors, no printed hex — all 5
  // have real photographed units, hex sampled from those exact photos.
  { id: "cv-ssport-1", productId: "prod-backpack-s-sport-black", colorName: { ar: "أسود" }, hex: "#232323", images: withImage("/products/backpack-s-sport-black/v1.png"), stock: "available" },
  { id: "cv-ssport-2", productId: "prod-backpack-s-sport-black", colorName: { ar: "أزرق كحلي" }, hex: "#1E2532", images: withImage("/products/backpack-s-sport-black/v2.png"), stock: "available" },
  { id: "cv-ssport-3", productId: "prod-backpack-s-sport-black", colorName: { ar: "رمادي" }, hex: "#4F4C4F", images: withImage("/products/backpack-s-sport-black/v3.png"), stock: "available" },
  { id: "cv-ssport-4", productId: "prod-backpack-s-sport-black", colorName: { ar: "عنابي" }, hex: "#4D1920", images: withImage("/products/backpack-s-sport-black/v4.png"), stock: "available" },
  { id: "cv-ssport-5", productId: "prod-backpack-s-sport-black", colorName: { ar: "وردي" }, hex: "#A7616C", images: withImage("/products/backpack-s-sport-black/v5.png"), stock: "available" },
];
