# TUIGLO — Website Design Direction

Status: **COMPLETE — approved by Issa.** The planning/specification phase is finished. Implementation begins in Claude Code once Issa provides the real product assets — see "Implementation handoff" at the end of this document.
Last updated: 2026-08-16 (final round — logo lockup, text-ink color, product sheet format, and wholesale discount scope all confirmed; no open questions remain)

**Changes in this revision:**
- **Logo lockup — confirmed.** Full primary logo (icon + wordmark) on the desktop header; icon/monogram only on the mobile header — this was already how the style guide's phone mockup was built, and is now the locked decision.
- **`text-ink` (`#443A2C`) — confirmed.** Approved for body text and functional icons. Explicitly **not** part of the official 4-color brand palette, and never used in the logo.
- **Product sheet format — confirmed.** Issa will provide real image/product assets; no specific file format is locked at the planning stage — implementation adapts to whatever real assets arrive.
- **Wholesale discount scope — confirmed.** The 20 DH/unit discount at a combined quantity of 10+ applies to every product for the initial version — one universal rule, not product- or category-specific.
- **All open questions, from every round, are now resolved.** This closes the planning/specification phase — see "Implementation handoff" at the end of this document for what Claude Code will use next.
- **Visual style guide updated to match** — see the note at the end of this document.

This document defines the visual and structural direction for the TUIGLO e-commerce website, built entirely on the already-locked brand identity. It does not contain any code — it's the plan to review before implementation starts.

**Source of truth used throughout:**
- Colors (locked): dark warm brown `#A79277`, beige `#D1BB9E`, light cream `#EAD8C0`, off-white `#FFF2E1`
- Logo (locked): TUIGLO T‑monogram + TUIGLO wordmark, from `TUIGLO_Logo_Identity.zip` — geometry untouched, nothing added, and (see §1) it does not change or mirror for RTL
- Business: Tuiglo is based in **Casablanca, Morocco** (home base / HQ) and **sells and ships nationwide across Morocco** — not a Casablanca-only store. Selling **Backpacks**, **Lunch Boxes**, and **Cross Body Bags**
- Language & direction: **Arabic-first, RTL**, for Moroccan Arabic-speaking customers. French/English possibly later.
- Brand tone: premium but accessible, warm, clean, modern, urban, Moroccan without being literal or touristy, product‑focused, trustworthy, mobile‑first

---

## 1. Typography

### Latin system (unchanged, still needed for the brand mark and any future French/English)

**Primary: Montserrat** — already the wordmark's typeface. Weights: SemiBold/Bold for headings/buttons, Medium for labels, Regular for short Latin body copy.

**Secondary: Lora** — a warm serif for hero headlines and brand-story moments, in Latin content only.

These stay exactly as previously specified. See the earlier reasoning for why Lora over Playfair Display or an ornamental font. Both remain relevant for the brand name itself and for whenever French/English content exists.

### Arabic system (this is the primary reading experience)

Montserrat and Lora have no Arabic characters at all, so a real Arabic typeface is required — this isn't optional polish, it's the main font the vast majority of visitors will read every day.

**Recommended: IBM Plex Sans Arabic**, for both UI and body text (nav, buttons, labels, product names, descriptions, checkout, everything Arabic).
- Why: it's part of IBM's Plex superfamily, deliberately engineered for cross-script harmony — its proportions and stroke weight were designed to sit comfortably next to a clean geometric Latin sans like Montserrat, which matters here since Montserrat isn't going away (it's still carrying the brand name and any Latin content). Professional and modern without being cold, which fits "premium but accessible."
- Free, on Google Fonts, wide weight range.
- Comfortable body size: 16–17px (very close to the Latin system's existing 16px base — no major rework of the type scale needed, just slightly more generous line-height for Arabic, which reads better a little looser than Latin).

**On having a second "warm" Arabic font (mirroring Lora's role):** I'm deliberately not proposing one yet. Arabic type doesn't map cleanly onto the Latin serif/sans emotional split — warmth in Arabic type comes more from letterform proportions and weight than from a serif-equivalent category, and mixing two different Arabic type families in one layout is riskier than doing it in Latin (proportions rarely match by default). The lower-risk, still-premium approach: use IBM Plex Sans Arabic consistently, varying only by weight (Bold for headlines, Regular for body) — plenty of premium Arabic sites do exactly this successfully. If Issa wants more character specifically on hero headlines, **Cairo** is a reasonable candidate worth a side-by-side type test once real Arabic headline copy exists — flagging it as a researched option, not a confident recommendation the way IBM Plex Sans Arabic is.

**The TUIGLO wordmark itself does not change.** It's a locked graphic asset — the Latin word "TUIGLO" in Montserrat Bold, built as vector paths, not live text. It doesn't get transliterated into Arabic script and doesn't mirror in an RTL layout; it just sits as a fixed unit at the header's *start* edge (which is the right side in RTL — see §6).

**Numerals: Western numerals (0–9) throughout, never Eastern Arabic-Indic digits (٠١٢٣).** I checked this rather than assume it — Morocco and the wider Maghreb (unlike Egypt and the Gulf, where both systems mix) conventionally use Western numerals exclusively, in print and on screens. This applies everywhere a number appears: prices, phone numbers, dates, quantities — even embedded in Arabic RTL text, the digits themselves read left-to-right as usual and are not reversed or restyled.

**Usage:**

| Use | Font | Notes |
|---|---|---|
| Arabic nav, buttons, labels, body, product info, checkout | IBM Plex Sans Arabic | Regular body, Bold/SemiBold headings and buttons |
| Arabic hero headline / brand story | IBM Plex Sans Arabic Bold | Or Cairo, if a type test favors it — see above |
| TUIGLO wordmark (logo only) | Montserrat Bold (locked, Latin, unchanged) | Never transliterated or mirrored |
| Any French/English content (future) | Montserrat + Lora | Existing Latin system, unchanged |
| Prices, phone numbers, dates, quantities | Western numerals (0–9) | Never Eastern Arabic-Indic digits |

---

## 2. Visual language

**A real constraint worth flagging up front:** all 4 locked colors are warm neutrals close together in value — none of them are dark enough to use as body text and pass basic legibility standards. I checked this with WCAG contrast-ratio math: dark warm brown `#A79277` on off‑white `#FFF2E1` measures **2.71:1**, well under the 4.5:1 body text needs. That's true of every combination of the 4 colors against each other.

The fix is one small, disclosed addition: a **near-black derived from the exact same brown** — same hue (33.7°) and saturation as `#A79277`, just darkened to `#443A2C`. It reads as "the brand brown, in ink form," not a new color, and is used *only* for text and icons — never in the logo, never a palette swatch. Measured contrast: 10.1:1 on off-white, 8.0:1 on cream. **Confirmed by Issa** — approved for body text and functional icons. Explicitly not part of the official 4-color brand palette, and never used in the logo.

**Shapes, corner radius, borders, shadows, spacing, buttons, cards, background usage** — all stay exactly as previously specified (arch motif echoing the icon, 8/16/28px radius scale, hairline borders, warm-tinted soft shadows, 8px spacing scale, the 4-color background hierarchy). None of this is direction-dependent.

**What *is* new — building for RTL correctly from the start:**

- **Use CSS logical properties, not physical left/right.** `margin-inline-start` / `margin-inline-end` instead of `margin-left` / `margin-right`; `text-align: start` / `end` instead of `left` / `right`; `padding-inline-start/end` the same way. Set `dir="rtl"` on the page root. Done this way, flexbox and grid layouts reverse automatically — this is a build-time discipline, not a design choice, but it belongs here because getting it right from day one avoids a painful mirror-everything-by-hand retrofit later.
- **Icon mirroring rule:** directional icons — back arrows, breadcrumb chevrons, "next/previous" carousel controls — flip horizontally in RTL, because they represent motion/direction. Non-directional icons — cart, search, WhatsApp, trash, share — do **not** flip; they don't point anywhere, so mirroring them would just be wrong. The TUIGLO icon/logo never flips, under any circumstance.
- **Form fields:** set `dir="auto"` on text inputs (search, checkout name/address fields) so mixed Arabic/Latin/number input displays correctly as the customer types, rather than forcing one fixed direction.

---

## 3. Product photography direction

Clean off-white/cream seamless backgrounds and a consistent angle set for catalog shots; warm, real, Casablanca-rooted environments (not old-medina staging) for lifestyle shots — this is about where the brand's story comes from, not where it sells; per the source-of-truth block above, Tuiglo ships nationwide. Generous negative space so images work equally well with right-aligned Arabic text overlays.

Any text baked directly into a photo or banner graphic (rare, and best avoided in favor of live text) must be composed in Arabic and right-aligned, not a Latin layout with Arabic pasted on afterward.

### What the website shows vs. what Issa provides

Issa will supply a **product sheet** per product — a reference document, not website content. Full definition and contents are in §9. In short: the product sheet is the accurate, complete record of the real product (every angle, every real color, the real price); the website only ever shows **professionally prepared images** built from that reference — never the sheet itself.

### Primary product image — one consistent system

The main image shown for every product (catalog cards, product page hero) is a **clean front view**. Every primary image across the whole catalog follows the same system, so the store reads as one coherent, professional catalog rather than a mix of styles:
- Same camera angle, same product positioning, same scale, same composition
- Consistent lighting and visual treatment
- Backgrounds that harmonize with the locked TUIGLO palette (§2) rather than clashing with it

### Secondary images

Each product page supports additional images beyond the front view: back view, side view(s), bottom view, detail/close-up views, and any other view that genuinely helps a customer understand the real product. These fill out the gallery described in §5.

### Per-color imagery — confirmed

Because the primary image must change to the real photo when a customer picks a different color (§5/§9), **every color variant needs at least its own front-view primary image.** Secondary images (back/side/bottom/detail) also switch to the selected color's real photos **when a color-specific version exists.** Not every view needs to be reshot for every color: if a particular secondary view isn't available for a given color, the gallery simply omits that thumbnail for that color rather than ever showing an image in the wrong color. Never generate or display a color that doesn't exist in the real product assets.

### AI-generated product presentation images — hard rules

For turning a real product sheet into a polished, on-brand website image, Issa may use the Higgsfield connector or a suitable image-generation model (Issa mentioned GPT Image as an option) — either is acceptable; this is a tool choice, not a design decision.

**Whatever tool is used, the rule is absolute: the AI improves *presentation* only. It must never:**
- Redesign the product, or change its shape, proportions, construction, or materials
- Invent details that aren't real, or remove/hide real details
- Change the product's actual colors, or invent a color that doesn't exist
- Invent a different product

**What it *may* do:** improve background, lighting, composition, and overall photographic presentation — style, not substance. The product sheet is the visual source of truth throughout; the output must still be recognizably, exactly the real product. This rule applies to every AI-generated product image without exception.

*(No product photography or generated imagery exists yet — this section is direction for that future work, not a deliverable itself.)*

---

## 4. Homepage structure

Section order is unchanged (order itself isn't an RTL concern — RTL affects layout *within* a section, not the vertical sequence of sections):

1. **Announcement bar** — thin, dismissible strip, Arabic copy, right-aligned.
2. **Header** — logo at the start (right) edge in RTL, nav flowing right-to-left, search/cart at the end (left) edge. Sticky on scroll. Full detail in §6.
3. **Hero** — full-bleed lifestyle image, Arabic headline (IBM Plex Sans Arabic Bold), right-aligned text block, one primary CTA in Arabic.
4. **Trust strip** — icon row in Arabic: "الدفع عند الاستلام متوفر" (cash on delivery available) · fast delivery across Morocco · WhatsApp contact · secure payment — icons stay as designed (non-directional), text right-aligned, reading right-to-left.
5. **Shop by category** — exactly three cards: **Backpacks**, **Lunch Boxes**, **Cross Body Bags** (Arabic labels), ordered right-to-left. Each category launches with roughly 5 or more products (§9), with room to add more over time without changing this section's design.
6. **Best sellers / featured products** — manually curated by Issa at launch (no sales history yet); Arabic product names, Western-numeral prices.
7. **Brand story band** — warm lifestyle image with a short Arabic narrative paragraph (IBM Plex Sans Arabic), right-aligned, linking to the About page. This is where Tuiglo's Casablanca roots and brand warmth come through as an origin story, in Arabic — distinct from where the brand actually sells, which is nationwide (see source-of-truth block).
8. **Product spotlight** — one flagship product, chosen by Issa, editorial large-image treatment.
9. **Social proof** — ratings and real customer reviews, in Arabic (Darija-flavored is natural and expected here — see §7).
10. **Newsletter / WhatsApp signup band** — Arabic copy, WhatsApp button prioritized over email per §7.
11. **Footer** — nav links, About/Contact, WhatsApp number, socials, delivery & returns summary, payment icons, all right-aligned, reading right-to-left.

A persistent WhatsApp floating button sits over all of this — see §6 for RTL positioning.

---

## 5. Product page structure

See §9 for the underlying data fields — this section is the page layout those fields fill, now specified for RTL and for the color-variant/pricing model.

1. **Breadcrumb** (Home / Category / Product name) — reads right-to-left, separator chevron mirrored to point left (toward "Home").
2. **Gallery** — sits at the end (left) of the layout on desktop, swipeable on mobile. One large primary image plus a secondary-image thumbnail strip. Both the primary image and the secondary thumbnails show the currently selected color's real photos (§3): primary is always that color's clean front view; secondary thumbnails are that color's real back/side/bottom/detail shots where they exist, simply omitted where they don't — never a mismatched-color image or a placeholder. Swipe direction should feel natural in RTL — test this specifically, since swipe-gesture expectations can be less consistent than static layout mirroring.
3. **Title, price (Western numerals, in DH), short one-line descriptor** — sits at the start (right) of the layout on desktop, right-aligned text. Price is the single unit price Issa provides (§9) — never invented, estimated, or adjusted — except where the quantity-based wholesale rule (§9) applies once quantity 10+ is reached, counted across all colors of that product combined.
4. **Color variant selection (required)** — every product's available colors (typically 5 or more, §9) shown as visual swatches. There is **no size selector** — Tuiglo products are a single fixed size, never a size variant.
   - **Every real color always stays visible** — never removed or hidden, even when out of stock, so customers always see the full range.
   - An **out-of-stock color is shown visually disabled** (e.g. dimmed/grayed-out with a subtle "unavailable" treatment on the swatch). Tapping or clicking it clearly tells the customer it's currently out of stock, and it cannot be added to the cart in that state.
   - Picking an available color updates the gallery (item 2) to that color's real images and shows that color's own stock state (§9: Available / Low Stock / Out of Stock — never a raw number).
   - **Proposed add-to-cart flow:** the customer selects one color and a quantity, adds to cart, and can repeat with a different color to build a multi-color order of the same product (e.g. 7 Black + 2 Beige + 4 Brown as three additions). The cart then groups these under the product and applies the wholesale rule to their combined quantity (§9). This is the simplest, most standard pattern; a single screen for entering quantities across several colors at once is a possible later enhancement for bulk buyers, not needed for launch — flagged as a proposal, open to adjustment.
5. **Trust micro-copy under the price/CTA** — Arabic: cash-on-delivery availability, a delivery estimate (fastest within Casablanca, a bit longer elsewhere in Morocco), a short return-policy line.
6. **Quantity selector, Add to cart, and Buy now** — sticky on mobile, Arabic labels. The quantity stepper is where the wholesale rule (§9) becomes visible: once the customer's *total* quantity of this product (summed across every color in their cart, not just the color currently shown) reaches 10, the unit price and order total update live, with a clear savings message (e.g. "starting at 10 pieces total, the price per piece drops") shown before checkout, not just applied silently.
7. **"Ask about this product" WhatsApp button** — pre-filled Arabic message including the product name (and selected color), next to the add-to-cart button.
8. **Accordion sections** — Description / Materials & Care / Dimensions / Delivery & Returns, Arabic headings, right-aligned content, expand/collapse chevron mirrored.
9. **Trust badges row.**
10. **Related products** — see §9.
11. **Reviews** — Arabic.

---

## 6. Navigation

**Header (desktop):** the full primary logo lockup (icon + wordmark, confirmed) sits at the *start* edge — the right side in RTL — where a logo conventionally sits first. Primary nav (Backpacks / Lunch Boxes / Cross Body Bags / About / Contact) flows right-to-left next to it. Search and cart icons sit at the *end* edge — the left side. This is a genuine mirror of the LTR layout described earlier, not a redesign: same relationships (logo-then-nav, icons at the far side), reversed as a whole.

**Header (mobile) — confirmed:** the TUIGLO icon/monogram alone (no wordmark) sits at the start (right) edge, keeping the compact mobile header uncluttered; the full lockup is a desktop-only treatment. This is already how the style guide's phone mockup is built.

**Search:** icon-triggered overlay, right-aligned input, `dir="auto"` so it handles Arabic/Latin/number queries correctly.

**Cart:** slide-out drawer — opens from the *start* side (right) in RTL, matching where Arabic-reading users expect a panel to originate. Each line item shows the product's selected color; when a cart holds several colors of the same product, their combined quantity drives the wholesale unit price (§9) applied to all of them together, not each color independently.

**Mobile navigation:** hamburger menu (a non-directional icon — doesn't need to mirror itself) sits at the header's *end* corner, i.e. top-left in RTL — the same corner utility icons (search, cart) occupy on desktop, with the logo anchored at the *start* (top-right) in both cases. Opens a full-screen overlay with large tap targets. A sticky bottom bar (Home / Search / Cart) reads right-to-left, matching the header nav order, so Home sits rightmost. WhatsApp stays a separate floating button, not a bottom-bar icon.

**WhatsApp floating button:** conventionally a bottom-corner element; exactly which corner (visually left or right) reads best in an RTL Arabic layout is a small polish decision worth testing once the real layout exists, rather than a rule to lock in from a document — flagging this honestly rather than asserting an unverified convention.

---

## 7. Moroccan e-commerce UX

Grounded in research on how Moroccan shoppers actually behave, written for an Arabic-first experience, for a brand that sells nationwide from a Casablanca base.

**Payment — offer both card and cash on delivery, don't force a choice.** Card payment is growing quickly nationally, but COD still accounts for a large share of orders outside the biggest cities, and functions as a trust bridge for a brand with no track record yet. Support both, in Arabic, without hiding either behind extra clicks.

**Pricing — "DH," Western numerals. Confirmed.** "DH" is the near-universal shorthand seen on Moroccan price tags and receipts regardless of surrounding language, so it reads naturally even inside Arabic copy. Example format: `70 DH` (illustrative formatting only — not a real Tuiglo price). See §9 for the quantity-based wholesale pricing rule that applies on top of the unit price.

**WhatsApp is the default channel, and the language register can relax there. Confirmed.** Site chrome (navigation, buttons, legal, structural labels) reads in clear, natural, professional Arabic. WhatsApp is different — it's a conversation, not a storefront sign, so a warmer, Moroccan Darija-inflected tone fits how people actually text each other here, and reads as more genuine than stiffly formal Arabic in a chat bubble. Concretely: a floating WhatsApp button sitewide, a pre-filled "ask about this product" message in Arabic, order-confirmation and shipping updates over WhatsApp (cuts "where is my order" questions substantially), and WhatsApp-based cart recovery, which gets a far higher response rate than email.

**Delivery information** — specific and visible, in Arabic: Tuiglo ships from Casablanca (fastest zone) to **all of Morocco** — other major cities next, elsewhere a bit longer; a plainly stated returns policy. The site should never imply delivery is limited to Casablanca. Logistics and delivery time are consistently the top friction point in Moroccan online shopping satisfaction.

**Trust elements that measurably matter:** visible contact information and a real Casablanca address (as the brand's base, not a service-area limit), genuine local customer reviews (in Arabic), a clearly stated return policy, recognizable local payment logos (e.g., CMI) — none of which need colors outside the palette.

**Mobile-first checkout, in Arabic, RTL.** Guest checkout by default, the fewest form fields that still work, large tap targets, a sticky checkout button, a phone number field expecting Moroccan formats (06/07 prefixes, Western numerals), and Arabic field labels and error messages, not just an Arabic-translated skin over an otherwise English/French checkout flow. The order summary reflects the wholesale unit price automatically wherever a product's total quantity (across colors) reaches 10+ (§9).

**Language is Arabic-first for launch, not Arabic-only forever.** French and English are not required for the initial version and may be added later. The structural implication (see §9) is that content fields are built as translatable from day one — even though only Arabic is populated at launch — rather than hard-coded to one language and retrofitted later.

---

## 8. Design system

A short reference so the site stays consistent as it's built.

**Color tokens**

| Token | Hex | Role |
|---|---|---|
| `brand-brown` | `#A79277` | Primary brand color — buttons, header/footer, dark sections, accents |
| `brand-beige` | `#D1BB9E` | Secondary accents, tags, dividers, hover states |
| `brand-cream` | `#EAD8C0` | Alternate section background, card surfaces |
| `brand-offwhite` | `#FFF2E1` | Default page background |
| `text-ink` | `#443A2C` | **Functional only, confirmed by Issa** — body text, icons, borders needing real contrast. Not part of the 4-color brand palette, never a swatch or logo fill. |

**Type scale** (base 16px, ~1.25 ratio): 14 / 16 / 20 / 25 / 32 / 40 / 50px — same numeric scale for Arabic and Latin, but Arabic line-height should run a little more generous throughout (Arabic script benefits from more vertical breathing room at the same point size).

**Spacing scale:** 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128px — implemented as logical (inline-start/end, block-start/end), not physical left/right/top/bottom, so RTL flips automatically.

**Radius scale:** 8px (small) · 16px (medium) · 28px (large) — unchanged, symmetric shapes don't care about direction.

**Shadow tokens:** unchanged — soft, warm-brown-tinted, never pure black/grey.

**Direction & RTL rules:**
- `dir="rtl"` and `lang="ar"` on the document root.
- CSS logical properties throughout (`margin-inline-start/end`, `padding-inline-start/end`, `text-align: start/end`) instead of physical `left`/`right` — this alone handles most mirroring automatically via flexbox/grid.
- Directional icons (arrows, chevrons, carousel/breadcrumb controls) mirror horizontally. Non-directional icons (cart, search, WhatsApp, trash, share, badges) do not. The TUIGLO logo never mirrors.
- Numerals are always Western (0–9) — prices, phone numbers, dates, quantities.
- `dir="auto"` on free-text inputs so mixed-script typing displays correctly.

**Buttons, cards, badges, icon style** — unchanged in structure from the previous revision, rendered in Arabic/IBM Plex Sans Arabic with RTL-correct alignment.

**Stock badge states (new — see §9):** exactly three, text-only, never a number — "متوفر" (Available), "كمية محدودة" (Low Stock), "غير متوفر" (Out of Stock).

**Core components to build first:** header/nav (RTL), footer (RTL), WhatsApp floating button, hero block, trust-strip, category card, product card, **color-swatch variant selector** (with a distinct disabled/out-of-stock swatch state, tied to per-color stock), product gallery (swaps per selected color), **quantity stepper with live wholesale-savings messaging** (based on same-product total across colors), stock/availability badge (per color, state-only — see above), accordion (RTL chevron), badge/tag, button set, review card, cart drawer (opens from start/right, shows color + wholesale-adjusted price per line item, grouped by product), newsletter/WhatsApp signup block, filter/sort bar, **language toggle** (structural placeholder — only Arabic populated at launch, but the component and content model support adding French/English later without a rebuild).

---

## 9. Catalog & product architecture

Defines the *shape* of the catalog so the site can be built to cleanly hold Tuiglo's real products once they're provided. **Nothing below is real product data.**

### Categories — confirmed, exact names

Exactly three top-level categories. Use these exact names everywhere; "Cross Body Bags" is never shortened to "Bags":

- **Backpacks**
- **Lunch Boxes**
- **Cross Body Bags**

Each launches with roughly **5 or more products**, with more added over time — the architecture below is built so adding products later never requires restructuring. Each category needs: name (Arabic, primary; other languages structurally supported for later), URL slug, a short description, an optional banner/lifestyle image, a sort order. A category page shows a header (name + description + optional image), breadcrumb, filter/sort controls, a product grid, and pagination once needed.

### Product sheets — what Issa provides

For each real product, Issa will provide a **product sheet**: a reference document, not a webpage. It contains:
- Front, back, left, right, and bottom views of the product
- The product's real colors and a color palette reference
- Product information (real specs — materials, dimensions, capacity, etc. — as Issa knows them, distinct from marketing copy)
- The real price

**The product sheet itself is never displayed on the website.** It exists so the implementation and any image-generation step has a complete, accurate reference for the real product. What customers see on the site are the professionally prepared images described in §3, built from this reference.

**File format — confirmed:** Issa will provide these as real image/product assets. No specific file format (PDF, spreadsheet, folder convention, etc.) is required or locked at the planning stage — the implementation will work with whatever real assets Issa actually provides when the time comes.

### Real data sourcing — how this actually gets populated

- **Images and colors: sourced strictly from Issa's product sheets.** Never generated from imagination, never guessed, never adjusted — see §3 for exactly what an AI tool is and isn't allowed to change when preparing a presentation image from the sheet.
- **Price: exactly what Issa provides.** Never invented, modified, estimated, or replaced.
- **Stock: exactly what Issa provides, per color.** Never assumed uniform across colors, and never shown to customers as a raw number (see "Stock display rules" below).
- **Name and description: can be generated when needed** (e.g., AI-assisted product copywriting from the real product sheet), but generated copy must accurately describe the real product and must never invent characteristics the product sheet doesn't support, or contradict the real price/colors/stock.
- **Category assignment: set by Issa** — however he organizes or labels the real product sheets when he shares them, since no specific format is enforced (see "File format — confirmed" above).

### Source-of-truth rules (binding reference for implementation)

| What | Source of truth |
|---|---|
| Real product images | Issa's product sheets/assets — never invented or altered |
| Real product colors | Issa's product sheets/assets — never invented or altered |
| Real product price | The price Issa provides — never invented, modified, estimated, or replaced |
| Real product stock | The stock information Issa provides, per color — never assumed, never shown to customers as a raw number |
| Product names / descriptions / features | May be generated when needed, but must accurately represent the real product |
| AI-generated product presentation images | Allowed (§3), but must never alter the actual product — presentation only |

### Product model — the fields, not the content

The catalog is a three-level hierarchy:

```
Category
 └── Product        (one fixed size — no size variants, ever)
      └── Color Variant   (typically 5 or more per product)
           └── Stock status   (tracked and enforced separately per color)
```

**Product-level fields:**
- **Name** — Arabic at launch; modeled as translatable so French/English can be added later without restructuring. Generated when needed, never fabricated.
- **URL slug**
- **Category** — exactly one of the three above at launch.
- **Price, in MAD** — one price per product, from Issa's real figures, Western numerals, displayed as "DH" (confirmed — see §7). Optional "compare-at" price field reserved for a possible future markdown/sale display — a separate mechanism from the quantity-based wholesale pricing below, unused at launch.
- **Short description** and **full description** — Arabic, generated when needed from the real product sheet, never inventing specs the real product doesn't have.
- **Product details/specs** — a structured key-value table (dimensions, material, capacity, category-specific specs like insulation duration for a lunch box), Arabic labels, sourced from the product sheet's real product information.
- **SKU / style code** — optional at launch.
- **Status badges** ("Best Seller," "New") — set by Issa when there's a real reason to, never auto-generated or guessed.

**Color-variant-level fields (per color, typically 5+ per product):**
- **Color name** (Arabic) and a swatch reference, matching the product sheet's real colors exactly — never a color that isn't on the sheet.
- **Images** — its own front-view primary image at minimum (§3); secondary views (back/side/bottom/detail) too, wherever they exist for that color.
- **Stock status** — Available / Low Stock / Out of Stock (display-only states — see below), tracked and enforced completely independently per color. A customer can order any quantity of any in-stock color, freely mixed with other colors of the same product, with no requirement that quantities match across colors. Tuiglo generally keeps ready stock in relatively large quantities, but never assume every color holds the same amount.
- **Optional variant SKU.**
- **Real inventory quantity** — stored internally (needed to enforce "can't order more than what's in stock" and to compute Available/Low Stock/Out of Stock), but never exposed to the customer as a number at launch. See "Stock display rules" below.

### Stock display rules

Customers see one of exactly three states per color — never a number:
- **Available**
- **Low Stock**
- **Out of Stock**

Never invent an urgency number like "Only 2 left" when real inventory is actually higher (or for any other reason). If an "Only X left" style message is introduced later, X must always be pulled from real inventory data — never fabricated as a marketing trick.

### Out-of-stock color handling (product page)

- Every real color from the product sheet **always stays visible** in the color selector — never removed or hidden, so customers can always see the full range, including colors that may come back in stock later.
- An out-of-stock color is shown **visually disabled** (dimmed/grayed-out).
- Interacting with a disabled color clearly indicates it's currently out of stock.
- A disabled color **cannot be added to the cart.**

### Quantity-based wholesale pricing & multi-color ordering

Two rules that work together, both real calculations the cart must perform automatically — not just informational text:

**1. Free color mixing.** A customer can order any independent quantity of any in-stock color of a product, in any combination — there is no requirement to order equal or matching quantities across colors. Each color's stock is checked and enforced on its own (e.g. a customer can't order 8 Cream if only 3 are in stock, even if plenty of other colors are available).

**2. Wholesale discount, based on total quantity of the same product.** The 20 DH/unit discount is triggered by the *combined* quantity of one product across *all* the colors the customer ordered — not by how many units of a single color they picked:
- **Total quantity 1–9 (all colors of that product combined)** → normal unit price.
- **Total quantity 10 or more (all colors of that product combined)** → the unit price drops by a flat **20 DH per unit**, applied to *every* unit of that product in the order, regardless of which color each one is.
- The threshold and the savings should be clearly communicated before checkout (e.g. a short "buy 10 or more total and save 20 DH per piece" message near the quantity selector, per §5).
- **Implementation note:** cart logic must group order lines by product (not by product+color) when evaluating this threshold, since a customer's 10 units might be spread across three different colors.

**Worked examples (illustrative numbers only — not a real Tuiglo price; normal unit price assumed to be 70 DH):**

| Order | Total quantity of that product | Unit price applied | Total |
|---|---|---|---|
| 9 Black | 9 | 70 DH (below threshold) | 630 DH |
| 6 Black + 4 Beige | 10 | 50 DH (70 − 20) — applies to all 10 | 500 DH |
| 7 Black + 2 Beige + 4 Brown | 13 | 50 DH — applies to all 13 | 650 DH |

**Confirmed: this rule applies to every product for the initial version** — one universal 20 DH/unit discount at a combined quantity of 10+, not product- or category-specific.

### Related products

Default: other products from the same category. Optional manual override per product for a curated pairing (e.g., a specific backpack with a specific lunch box), falling back to the same-category default when unset.

### Filtering & sorting

Modest catalog size at launch (~5+ products × 3 categories), so keep it simple: sort by price (low–high / high–low), newest, and best-selling once there's sales data; filter by in-stock only; optionally filter by color once the catalog is large enough for that to be useful. Skip heavy faceted filtering at launch — add it only if the catalog and variant count actually grow into needing it.

### What this doesn't decide

This section defines structure, not content. It doesn't set the real products, their real names, exact prices, exact colors, or images — that's Issa's real information, provided via product sheets later. The architecture is built to hold it cleanly whenever it arrives, and to keep working the same way as more products are added.

---

## Open questions — all resolved

Every question raised across every round of this document has now been confirmed by Issa. Nothing remains open:

- Exact category names (Backpacks, Lunch Boxes, Cross Body Bags) — resolved
- Real-data sourcing model (product sheets, images/colors/price/stock always real, names/descriptions may be generated) — resolved
- Arabic-first, RTL — resolved
- Nationwide market (Casablanca is home base, not a service-area limit) — resolved
- Multi-color ordering (customers freely mix colors/quantities; each color's stock independent) — resolved
- Wholesale-discount counting (based on total quantity of a product across all its colors combined, not per color) — resolved
- Out-of-stock color display (always visible, shown disabled, blocked from cart, clearly indicated on interaction) — resolved
- Stock number visibility (Available/Low Stock/Out of Stock only, never a real or fabricated number) — resolved
- Per-color secondary images (shown when they exist, omitted when they don't) — resolved
- **Logo lockup** — confirmed: full primary logo on the desktop header, icon/monogram only on the mobile header
- **The `text-ink` functional color** (`#443A2C`) — confirmed: approved for text/functional icons, explicitly not part of the 4-color brand palette, never used in the logo
- **Product sheet file format** — confirmed: real image/product assets, no specific file format enforced at the planning stage
- **Wholesale discount scope** — confirmed: one universal rule (20 DH/unit at a combined quantity of 10+) for every product at launch

This document, together with `claude/brand-identity.md` and `TUIGLO_Style_Guide.html`, is the complete, approved planning specification.

---

## Implementation handoff — what comes next

**This planning/specification phase is complete. Do not build the actual website until implementation formally begins** — this document being finished is not itself the signal to start building; that still needs the real product assets below and Issa's go-ahead.

When implementation does start, it happens in Claude Code, using:
- This document — the approved website design direction
- `claude/brand-identity.md` — the approved brand identity (logo, colors, business/market facts)
- `TUIGLO_Style_Guide.html` — the final visual reference
- `MEMORY.md` and `TASKS.md` — operating context and roadmap
- `TUIGLO_Logo_Identity.zip` — the locked logo package
- Real product/category folders — provided by Issa
- Real product sheets/assets — provided by Issa

Until the last two arrive, the architecture is ready but empty — there's a complete plan for holding real products, but no real products in it yet.

*The visual style guide (`TUIGLO_Style_Guide.html`) has been updated alongside this document to match this final round — logo lockup, the confirmed `text-ink` color, and the universal wholesale-discount rule.*
