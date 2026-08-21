import type { CustomerInfo } from "./whatsapp";

export type CustomerInfoErrors = Partial<Record<keyof CustomerInfo, string>>;

/**
 * The single source of truth for checkout field validation — called
 * client-side (app/checkout/page.tsx) for instant feedback AND server-side
 * (app/api/orders/route.ts) as the authoritative check, so the two never
 * drift apart.
 */
export function validateCustomerInfo(customer: CustomerInfo): CustomerInfoErrors {
  const errors: CustomerInfoErrors = {};
  if (!customer.name.trim()) errors.name = "الاسم مطلوب";

  const digitCount = customer.phone.replace(/[^0-9]/g, "").length;
  if (!customer.phone.trim()) {
    errors.phone = "رقم الهاتف مطلوب";
  } else if (digitCount < 9) {
    errors.phone = "رقم الهاتف غير صحيح";
  }

  if (!customer.city.trim()) errors.city = "المدينة مطلوبة";
  if (!customer.address.trim()) errors.address = "العنوان مطلوب";

  return errors;
}
