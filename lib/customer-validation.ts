import type { CustomerInfo } from "./whatsapp";

export type CustomerInfoErrors = Partial<Record<keyof CustomerInfo, string>>;

/**
 * The single source of truth for checkout field validation — called
 * client-side (app/checkout/page.tsx) for instant feedback AND server-side
 * (app/api/orders/route.ts) as the authoritative check, so the two never
 * drift apart.
 *
 * Every field is type-checked BEFORE any string operation: malformed
 * requests (missing/partial/non-string fields) produce controlled
 * validation errors instead of a server crash.
 *
 * Limits are generous maximums for real Moroccan customers — they reject
 * abuse/accidents, not normal names, addresses or cities.
 */
const MAX_LENGTH: Record<"name" | "phone" | "city" | "address" | "notes", number> = {
  name: 80,
  phone: 30,
  city: 60,
  address: 300,
  notes: 500,
};

/**
 * Moroccan mobile/landline after separator normalization: optional +212 /
 * 00212 / leading 0, then 9 digits starting with 5/6/7 (06/07 mobile,
 * 05 landline). Separators (spaces, dots, hyphens, parentheses) are
 * stripped before matching. Rejects "000000000"-style fakes and wrong
 * prefixes without pretending to be a telecom database.
 */
const MOROCCAN_PHONE = /^(?:\+?212|00212|0)([5-7]\d{8})$/;

function normalizePhone(raw: string): string {
  return raw.replace(/[\s.\-()]/g, "");
}

function asText(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

export function validateCustomerInfo(customer: CustomerInfo): CustomerInfoErrors {
  const errors: CustomerInfoErrors = {};
  const c = (customer ?? {}) as Partial<CustomerInfo>;

  const name = asText(c.name);
  if (!name || !name.trim()) errors.name = "الاسم مطلوب";
  else if (name.length > MAX_LENGTH.name) errors.name = "الاسم طويل جداً";

  const phone = asText(c.phone);
  if (!phone || !phone.trim()) {
    errors.phone = "رقم الهاتف مطلوب";
  } else if (phone.length > MAX_LENGTH.phone || !MOROCCAN_PHONE.test(normalizePhone(phone))) {
    errors.phone = "رقم الهاتف غير صحيح";
  }

  const city = asText(c.city);
  if (!city || !city.trim()) errors.city = "المدينة مطلوبة";
  else if (city.length > MAX_LENGTH.city) errors.city = "اسم المدينة طويل جداً";

  const address = asText(c.address);
  if (!address || !address.trim()) errors.address = "العنوان مطلوب";
  else if (address.length > MAX_LENGTH.address) errors.address = "العنوان طويل جداً";

  // The notes textarea renders this error below the field in the form.
  const notes = asText(c.notes);
  if (notes && notes.length > MAX_LENGTH.notes) errors.notes = "الملاحظات طويلة جداً";

  return errors;
}
