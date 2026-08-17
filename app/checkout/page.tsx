"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useCart } from "@/lib/cart-context";
import { buildWhatsAppOrderUrl, type CustomerInfo } from "@/lib/whatsapp";
import { EmptyCartState } from "@/components/cart/EmptyCartState";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { CustomerInfoForm, type CustomerInfoErrors } from "@/components/checkout/CustomerInfoForm";

const EMPTY_CUSTOMER: CustomerInfo = { name: "", phone: "", address: "", city: "", notes: "" };

function validate(customer: CustomerInfo): CustomerInfoErrors {
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

export default function CheckoutPage() {
  const { lines, totals, clear } = useCart();
  const [customer, setCustomer] = useState<CustomerInfo>(EMPTY_CUSTOMER);
  const [errors, setErrors] = useState<CustomerInfoErrors>({});

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold text-ink md:text-3xl">إتمام الطلب</h1>
        <EmptyCartState />
      </div>
    );
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate(customer);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const url = buildWhatsAppOrderUrl(lines, customer);
    clear();
    window.location.href = url;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-ink md:text-3xl">إتمام الطلب</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6" noValidate>
        <OrderSummary lines={lines} totals={totals} />

        <div>
          <h2 className="mb-4 text-sm font-semibold text-ink">معلومات التوصيل</h2>
          <CustomerInfoForm customer={customer} errors={errors} onChange={setCustomer} />
        </div>

        <div className="rounded-md bg-brand-cream/60 p-3 text-xs text-ink/70">
          الدفع عند الاستلام فقط. بعد الضغط على تأكيد الطلب سيتم فتح واتساب لإرسال طلبك.
        </div>

        <button
          type="submit"
          className="h-[46px] w-full rounded-sm bg-brand-brown text-sm font-semibold text-brand-offwhite"
        >
          تأكيد الطلب عبر واتساب
        </button>
      </form>
    </div>
  );
}
