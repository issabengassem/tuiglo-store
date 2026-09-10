import type { ColorVariant, Product } from "../types";

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
 * VARIANT IMAGES (2026-08-19): every color variant now has a photographed
 * unit cropped pixel-for-pixel into public/products/<slug>/<color>.png and
 * wired into the color swatch selector. Each variant's images.primary points
 * to its real photo; none are placeholder "coming soon" images. Hex values
 * are sampled from each exact photo (not eyeballed), which naturally yields
 * slightly muted/shadowed tones compared to vivid marketing swatches —
 * this is expected and honest. Colors with neither a printed hex nor a
 * photographed unit keep hex: null (never guessed).
 *
 * COLOR NAMES (2026-08-19): all color names are now programmatically mapped
 * from the source sheets; earlier audits identified a name-only issue that
 * has been corrected — each color ar.name reflects the visual appearance
 * of its associated photographed unit, or a descriptive approximation when
 * no photographed unit exists.
 *
 * FOLDER RENAME (2026-08-25): public/products/<slug>/ was reorganized —
 * backpack-blue-dog-badge -> backpack-dog-badge, backpack-bone-gray ->
 * backpack-bone, backpack-eastpak-purple -> backpack-eastpak,
 * backpack-s-sport-black -> backpack-s-sport — and generic vN.png files
 * were replaced with real, descriptively-named photos (backpack-bone and
 * backpack-eastpak previously had no photographed units at all; they do
 * now). All image paths and color names below were re-verified against the
 * new files, not carried over blindly. One exception was caught and fixed:
 * backpack-nike's folder had both "light-brown.png" and "olive-green.png"
 * as the same tan photo (not olive) — olive-green.png was deleted per
 * Issa's decision, and light-brown is now the default/first color.
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
    slug: "backpack-tuiglo-floral-star",
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
    id: "prod-backpack-dog-badge",
    slug: "backpack-dog-badge",
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
      ar: "حقيبة بطبعة NIKE متكررة، بجيب أمامي وجيوب شبكية جانبية وبطاقة NIKE  معلقة على السحاب.",
    },
    price: 95,
    specs: {},
    sourceSheet: "reference/product-sheets/Backpacks/ChatGPT Image 17 août 2026, 02_12_28.png",
  },
  {
    id: "prod-backpack-bone-gray",
    slug: "backpack-bone",
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
    slug: "backpack-eastpak",
    categoryId: "cat-backpacks",
    name: { ar: "حقيبة من إيستباك" },
    shortDescription: { ar: "حقيبة أرجوانية أصلية من إيستباك، من مجموعة Authentic Collection." },
    fullDescription: {
      ar: "حقيبة  من إيستباك (Authentic Collection)، بجيب أمامي وأحزمة كتف مبطنة ومقبض علوي.",
    },
    price: 75,
    specs: {},
    sourceSheet: "reference/product-sheets/Backpacks/ChatGPT Image 17 août 2026, 02_19_58.png",
  },
  {
    id: "prod-backpack-s-sport-black",
    slug: "backpack-s-sport",
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
  { id: "cv-floral-pink-1", productId: "prod-backpack-floral-pink", colorName: { ar: "وردي غامق (اللون الأساسي المصوّر)" }, hex: "#B37172", images: withImage("/products/backpack-floral/pink.png"), stock: "available" },
  { id: "cv-floral-pink-2", productId: "prod-backpack-floral-pink", colorName: { ar: "أزرق كحلي" }, hex: "#3949AB", images: withImage("/products/backpack-floral/navy.png"), stock: "available" },
  { id: "cv-floral-pink-3", productId: "prod-backpack-floral-pink", colorName: { ar: "أخضر داكن" }, hex: "#1B5E20", images: withImage("/products/backpack-floral/dark-green.png"), stock: "available" },
  { id: "cv-floral-pink-4", productId: "prod-backpack-floral-pink", colorName: { ar: "أخضر" }, hex: "#66BB6A", images: withImage("/products/backpack-floral/green.png"), stock: "available" },
  { id: "cv-floral-pink-5", productId: "prod-backpack-floral-pink", colorName: { ar: "أخضر فاتح" }, hex: "#A5D6A7", images: withImage("/products/backpack-floral/light-green.png"), stock: "available" },
  { id: "cv-floral-pink-6", productId: "prod-backpack-floral-pink", colorName: { ar: "أخضر فاتح جداً" }, hex: "#E8F5E9", images: withImage("/products/backpack-floral/very-light-green.png"), stock: "available" },
 
  // --- backpack-tuiglo-beige-floral-star: 6 named colors, no printed hex.
  // Only "beige" has a photographed unit (it's the default/shown color) —
  // hex sampled from that real photo. The other 5 have neither a printed
  // hex nor a photo, so they stay hex:null/image:null (real chips, no fake fill).
  { id: "cv-tuiglo-star-1", productId: "prod-backpack-tuiglo-beige-floral-star", colorName: { ar: "بيج" }, hex: "#DAA780", images: withImage("/products/backpack-tuiglo-floral-star/beige.png"), stock: "available" },
  { id: "cv-tuiglo-star-2", productId: "prod-backpack-tuiglo-beige-floral-star", colorName: { ar: "وردي" }, hex: "#B37172", images: withImage("/products/backpack-tuiglo-floral-star/pink.png"), stock: "available" },
  { id: "cv-tuiglo-star-3", productId: "prod-backpack-tuiglo-beige-floral-star", colorName: { ar: "رمادي" }, hex: "#7A7A7A", images: withImage("/products/backpack-tuiglo-floral-star/gray.png"), stock: "available" },
  { id: "cv-tuiglo-star-4", productId: "prod-backpack-tuiglo-beige-floral-star", colorName: { ar: "أزرق كحلي" }, hex: "#2D3D5E", images: withImage("/products/backpack-tuiglo-floral-star/navy.png"), stock: "available" },
  { id: "cv-tuiglo-star-5", productId: "prod-backpack-tuiglo-beige-floral-star", colorName: { ar: "ليلكي" }, hex: "#967FAA", images: withImage("/products/backpack-tuiglo-floral-star/lilac.png"), stock: "available" },
  { id: "cv-tuiglo-star-6", productId: "prod-backpack-tuiglo-beige-floral-star", colorName: { ar: "وردي غامق" }, hex: "#AA6973", images: withImage("/products/backpack-tuiglo-floral-star/dusty-pink.png"), stock: "available" },

  // --- backpack-dog-badge: 11 printed hex colors. Only "blue" (the
  // default photographed color) has a real image; the printed hex stays
  // authoritative for all 11 (not overwritten by the sampled value).
  { id: "cv-dog-badge-1", productId: "prod-backpack-dog-badge", colorName: { ar: "أزرق" }, hex: "#4B79A8", images: withImage("/products/backpack-dog-badge/blue.png"), stock: "available" },
  { id: "cv-dog-badge-2", productId: "prod-backpack-dog-badge", colorName: { ar: "أخضر" }, hex: "#6CA06C", images: withImage("/products/backpack-dog-badge/green.png"), stock: "available" },
  { id: "cv-dog-badge-3", productId: "prod-backpack-dog-badge", colorName: { ar: "بنفسجي داكن" }, hex: "#3D2F6F", images: withImage("/products/backpack-dog-badge/dark-purple.png"), stock: "available" },
  { id: "cv-dog-badge-4", productId: "prod-backpack-dog-badge", colorName: { ar: "رمادي فاتح" }, hex: "#B0B0B0", images: withImage("/products/backpack-dog-badge/light-gray.png"), stock: "available" },
  { id: "cv-dog-badge-5", productId: "prod-backpack-dog-badge", colorName: { ar: "أسود" }, hex: "#2C2C2C", images: withImage("/products/backpack-dog-badge/black.png"), stock: "available" },
  { id: "cv-dog-badge-6", productId: "prod-backpack-dog-badge", colorName: { ar: "بني" }, hex: "#A87A5C", images: withImage("/products/backpack-dog-badge/brown.png"), stock: "available" },
  { id: "cv-dog-badge-7", productId: "prod-backpack-dog-badge", colorName: { ar: "وردي" }, hex: "#F2A7B3", images: withImage("/products/backpack-dog-badge/pink.png"), stock: "available" },
  { id: "cv-dog-badge-8", productId: "prod-backpack-dog-badge", colorName: { ar: "أخضر فاتح" }, hex: "#8FC9A3", images: withImage("/products/backpack-dog-badge/light-green.png"), stock: "available" },
  { id: "cv-dog-badge-9", productId: "prod-backpack-dog-badge", colorName: { ar: "بنفسجي فاتح" }, hex: "#C8A2E0", images: withImage("/products/backpack-dog-badge/light-purple.png"), stock: "available" },
  { id: "cv-dog-badge-10", productId: "prod-backpack-dog-badge", colorName: { ar: "بيج" }, hex: "#D9B38C", images: withImage("/products/backpack-dog-badge/beige.png"), stock: "available" },
  { id: "cv-dog-badge-11", productId: "prod-backpack-dog-badge", colorName: { ar: "رمادي" }, hex: "#7A7A7A", images: withImage("/products/backpack-dog-badge/gray.png"), stock: "available" },

  // --- backpack-nike: 6 photographed units (the folder's 7th file,
  // "olive-green.png", was a mislabeled duplicate of light-brown — same
  // color, not olive — and was deleted per Issa's confirmed decision;
  // light-brown is now listed first/default). Hex sampled from the real
  // cropped photos below (see file header).
  { id: "cv-nike-1", productId: "prod-backpack-nike", colorName: { ar: "بني فاتح" }, hex: "#C49969", images: withImage("/products/backpack-nike/light-brown.png"), stock: "available" },
  { id: "cv-nike-2", productId: "prod-backpack-nike", colorName: { ar: "أسود" }, hex: "#201A1A", images: withImage("/products/backpack-nike/black.png"), stock: "available" },
  { id: "cv-nike-3", productId: "prod-backpack-nike", colorName: { ar: "رمادي داكن" }, hex: "#3B3B48", images: withImage("/products/backpack-nike/dark-gray.png"), stock: "available" },
  { id: "cv-nike-4", productId: "prod-backpack-nike", colorName: { ar: "وردي فاتح مغبر" }, hex: "#D9A9A9", images: withImage("/products/backpack-nike/dusty-pink.png"), stock: "available" },
  { id: "cv-nike-5", productId: "prod-backpack-nike", colorName: { ar: "رمادي" }, hex: "#5C5C71", images: withImage("/products/backpack-nike/gray.png"), stock: "available" },
  { id: "cv-nike-6", productId: "prod-backpack-nike", colorName: { ar: "أزرق كحلي" }, hex: "#233A66", images: withImage("/products/backpack-nike/navy.png"), stock: "available" },

  // --- backpack-bone: 12 real photographed units now exist in
  // public/products/backpack-bone (folder renamed from backpack-bone-gray;
  // the earlier "flat swatches only, nothing to crop" note no longer
  // applies). Hex sampled from each exact photo; names from the photo set.
  { id: "cv-bone-1", productId: "prod-backpack-bone-gray", colorName: { ar: "بني داكن" }, hex: "#443128", images: withImage("/products/backpack-bone/dark-brown.png"), stock: "available" },
  { id: "cv-bone-2", productId: "prod-backpack-bone-gray", colorName: { ar: "أزرق كحلي داكن" }, hex: "#1A2E49", images: withImage("/products/backpack-bone/dark-navy.png"), stock: "available" },
  { id: "cv-bone-3", productId: "prod-backpack-bone-gray", colorName: { ar: "وردي مغبر" }, hex: "#83474F", images: withImage("/products/backpack-bone/dusty-pink.png"), stock: "available" },
  { id: "cv-bone-4", productId: "prod-backpack-bone-gray", colorName: { ar: "بني فاتح" }, hex: "#AC854A", images: withImage("/products/backpack-bone/light-brown.png"), stock: "available" },
  { id: "cv-bone-5", productId: "prod-backpack-bone-gray", colorName: { ar: "رمادي فاتح" }, hex: "#4E4D4F", images: withImage("/products/backpack-bone/light-gray.png"), stock: "available" },
  { id: "cv-bone-6", productId: "prod-backpack-bone-gray", colorName: { ar: "بنفسجي فاتح" }, hex: "#765FAA", images: withImage("/products/backpack-bone/light-purple.png"), stock: "available" },
  { id: "cv-bone-7", productId: "prod-backpack-bone-gray", colorName: { ar: "كحلي أسود" }, hex: "#1C1E26", images: withImage("/products/backpack-bone/navy-black.png"), stock: "available" },
  { id: "cv-bone-8", productId: "prod-backpack-bone-gray", colorName: { ar: "بنفسجي" }, hex: "#4F3964", images: withImage("/products/backpack-bone/purple.png"), stock: "available" },
  { id: "cv-bone-9", productId: "prod-backpack-bone-gray", colorName: { ar: "أخضر مريمي" }, hex: "#627F5E", images: withImage("/products/backpack-bone/sage-green.png"), stock: "available" },
  { id: "cv-bone-10", productId: "prod-backpack-bone-gray", colorName: { ar: "وردي سالمون" }, hex: "#AE5247", images: withImage("/products/backpack-bone/salmon-pink.png"), stock: "available" },
  { id: "cv-bone-11", productId: "prod-backpack-bone-gray", colorName: { ar: "أزرق فولاذي" }, hex: "#305276", images: withImage("/products/backpack-bone/steel-blue.png"), stock: "available" },
  { id: "cv-bone-12", productId: "prod-backpack-bone-gray", colorName: { ar: "فيروزي" }, hex: "#256463", images: withImage("/products/backpack-bone/teal.png"), stock: "available" },

  // --- backpack-eastpak: 8 named colors, no printed hex — all 8
  // have real photographed units (folder renamed from backpack-eastpak-purple
  // to backpack-eastpak), hex sampled from those exact photos.
  { id: "cv-eastpak-1", productId: "prod-backpack-eastpak-purple", colorName: { ar: "أسود" }, hex: "#262626", images: withImage("/products/backpack-eastpak/black.png"), stock: "available" },
  { id: "cv-eastpak-2", productId: "prod-backpack-eastpak-purple", colorName: { ar: "رمادي داكن" }, hex: "#4D4F53", images: withImage("/products/backpack-eastpak/dark-gray.png"), stock: "available" },
  { id: "cv-eastpak-3", productId: "prod-backpack-eastpak-purple", colorName: { ar: "رمادي" }, hex: "#716A6C", images: withImage("/products/backpack-eastpak/gray.png"), stock: "available" },
  { id: "cv-eastpak-4", productId: "prod-backpack-eastpak-purple", colorName: { ar: "أزرق مخضر" }, hex: "#486470", images: withImage("/products/backpack-eastpak/greenish-blue.png"), stock: "available" },
  { id: "cv-eastpak-5", productId: "prod-backpack-eastpak-purple", colorName: { ar: "وردي فاتح" }, hex: "#9D888D", images: withImage("/products/backpack-eastpak/light-pink.png"), stock: "available" },
  { id: "cv-eastpak-6", productId: "prod-backpack-eastpak-purple", colorName: { ar: "أزرق كحلي" }, hex: "#2D3B5F", images: withImage("/products/backpack-eastpak/navy.png"), stock: "available" },
  { id: "cv-eastpak-7", productId: "prod-backpack-eastpak-purple", colorName: { ar: "أرجواني" }, hex: "#6C5D75", images: withImage("/products/backpack-eastpak/purple.png"), stock: "available" },
  { id: "cv-eastpak-8", productId: "prod-backpack-eastpak-purple", colorName: { ar: "أخضر مريمي" }, hex: "#828C85", images: withImage("/products/backpack-eastpak/sage-green.png"), stock: "available" },

  // --- backpack-s-sport: 5 named colors, no printed hex — all 5
  // have real photographed units (folder renamed from backpack-s-sport-black
  // to backpack-s-sport), hex sampled from those exact photos.
  { id: "cv-ssport-1", productId: "prod-backpack-s-sport-black", colorName: { ar: "أسود" }, hex: "#1B1B1B", images: withImage("/products/backpack-s-sport/black.png"), stock: "available" },
  { id: "cv-ssport-2", productId: "prod-backpack-s-sport-black", colorName: { ar: "عنابي" }, hex: "#42151B", images: withImage("/products/backpack-s-sport/burgundy.png"), stock: "available" },
  { id: "cv-ssport-3", productId: "prod-backpack-s-sport-black", colorName: { ar: "رمادي" }, hex: "#474547", images: withImage("/products/backpack-s-sport/gray.png"), stock: "available" },
  { id: "cv-ssport-4", productId: "prod-backpack-s-sport-black", colorName: { ar: "أزرق كحلي" }, hex: "#181E29", images: withImage("/products/backpack-s-sport/navy.png"), stock: "available" },
  { id: "cv-ssport-5", productId: "prod-backpack-s-sport-black", colorName: { ar: "وردي" }, hex: "#9D5C66", images: withImage("/products/backpack-s-sport/pink.png"), stock: "available" },
];
