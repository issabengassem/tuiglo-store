import type { Order } from "@/data/types";
import type { PaymentProcessor } from "./types";

/**
 * The only PaymentProcessor implementation in v1. Confirms the order
 * without collecting any payment — actual delivery is the WhatsApp
 * wa.me link built in lib/whatsapp.ts, not this processor.
 */
export class CodProcessor implements PaymentProcessor {
  method = "cod" as const;

  async processOrder(order: Order): Promise<{ success: boolean; reference?: string }> {
    return { success: true, reference: order.id };
  }
}
