/**
 * Core domain types for the TUIGLO catalog, cart, and order flow.
 * See WEBSITE_IMPLEMENTATION_PLAN.md §4, §5, §10 for the rationale behind
 * every field, in particular which ones are allowed to be "unknown"/null
 * and why (real data only — nothing here is ever guessed).
 */

/** Only `ar` is populated at launch; `fr`/`en` stay ready for later. */
export type Locale = "ar" | "fr" | "en";
export type LocalizedText = Partial<Record<Locale, string>>;

export interface Category {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  sortOrder: number;
}

export interface Product {
  id: string;
  slug: string;
  categoryId: string;
  name: LocalizedText;
  shortDescription: LocalizedText;
  fullDescription: LocalizedText;
  /** Single flat MAD value — confirmed, never varies by color. */
  price: number;
  specs: Record<string, LocalizedText>;
  /** Set manually by Issa only — never auto-generated. */
  statusBadges?: ("best_seller" | "new")[];
  /** Which of the original reference sheets this came from, for traceability. */
  sourceSheet: string;
  /** Optional manual override; falls back to same-category default when unset. */
  relatedProductIds?: string[];
}

export type StockState = "available" | "low_stock" | "out_of_stock";

/**
 * Stock is either a real, confirmed state, or 'unknown' — which the UI
 * treats identically to out_of_stock. Never a guess presented as fact.
 */
export type StockValue = StockState | "unknown";

export interface VariantImageSet {
  /** null until real image prep (Phase 5) is done — never a substitute photo. */
  primary: string | null;
  secondary: { view: string; src: string }[];
}

export interface ColorVariant {
  id: string;
  productId: string;
  colorName: LocalizedText;
  /** null when the source sheet gives no hex — never guessed. */
  hex: string | null;
  images: VariantImageSet;
  stock: StockValue;
  /** Internal only — never shown to the customer. */
  realInventoryQty?: number;
}

export interface CartLine {
  productId: string;
  colorVariantId: string;
  qty: number;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    notes?: string;
  };
  lines: {
    productId: string;
    colorVariantId: string;
    qty: number;
    unitPriceApplied: number;
  }[];
  subtotal: number;
  wholesaleDiscountTotal: number;
  total: number;
  paymentMethod: "cod";
  /** "not_applicable" for COD (no online payment collected) — kept for future CMI compatibility. */
  paymentStatus: "not_applicable" | "pending" | "paid" | "failed";
  status: "submitted";
}
