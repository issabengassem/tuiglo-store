import type { CartLine } from "@/data/types";
import { getColorVariantById, getProductById } from "@/data/products";
import { computeCartTotals } from "./pricing";
import { formatPrice } from "./format";

/**
 * The real number confirmed in WEBSITE_IMPLEMENTATION_PLAN.md §9. A plain
 * wa.me deep link — no API, no credentials, no WhatsApp Business Cloud API
 * (that stays a documented future dependency, plan §26 item 3).
 */
export const WHATSAPP_ORDER_NUMBER = "212691186890";

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}

export function buildOrderMessage(lines: CartLine[], customer: CustomerInfo): string {
  const totals = computeCartTotals(lines);

  const itemLines = lines.map((line) => {
    const product = getProductById(line.productId);
    const variant = getColorVariantById(line.colorVariantId);
    const name = product?.name.ar ?? line.productId;
    const color = variant?.colorName.ar ?? "";
    return `- ${name} (${color}) × ${line.qty}`;
  });

  const parts = [
    "طلب جديد من موقع TUIGLO",
    "",
    ...itemLines,
    "",
    `المجموع الفرعي: ${formatPrice(totals.subtotal)}`,
  ];

  if (totals.wholesaleDiscountTotal > 0) {
    parts.push(`خصم الجملة: -${formatPrice(totals.wholesaleDiscountTotal)}`);
  }

  parts.push(
    `الإجمالي: ${formatPrice(totals.total)}`,
    "",
    `الاسم: ${customer.name}`,
    `الهاتف: ${customer.phone}`,
    `المدينة: ${customer.city}`,
    `العنوان: ${customer.address}`
  );

  if (customer.notes) {
    parts.push(`ملاحظات: ${customer.notes}`);
  }

  parts.push("", "الدفع: عند الاستلام");

  return parts.join("\n");
}

export function buildWhatsAppOrderUrl(lines: CartLine[], customer: CustomerInfo): string {
  const message = buildOrderMessage(lines, customer);
  return `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(message)}`;
}
