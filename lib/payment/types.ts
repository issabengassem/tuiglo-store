import type { Order } from "@/data/types";

/**
 * v1 only implements 'cod' — WhatsApp is the order-confirmation/contact
 * channel here, not a payment processor; the customer pays on delivery.
 * A future online option (Stripe, CMI, or another Moroccan-compatible
 * provider — not decided) would add a value here and its own
 * PaymentProcessor implementation, without touching checkout or the order
 * model. No provider is implemented, and no credentials exist, yet.
 */
export type PaymentMethod = "cod";

export interface PaymentProcessor {
  method: PaymentMethod;
  processOrder(order: Order): Promise<{ success: boolean; reference?: string }>;
}
