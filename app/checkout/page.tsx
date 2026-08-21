"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useCart } from "@/lib/cart-context";
import type { CustomerInfo } from "@/lib/whatsapp";
import { validateCustomerInfo, type CustomerInfoErrors } from "@/lib/customer-validation";
import { EmptyCartState } from "@/components/cart/EmptyCartState";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { CustomerInfoForm } from "@/components/checkout/CustomerInfoForm";
import { WhatsAppHandoff } from "@/components/checkout/WhatsAppHandoff";

const EMPTY_CUSTOMER: CustomerInfo = { name: "", phone: "", address: "", city: "", notes: "" };
const PENDING_ORDER_KEY = "tuiglo-pending-whatsapp-order";

type PendingOrder = { url: string; message: string };

/**
 * The cart clears the instant the customer clicks through to WhatsApp
 * (see WhatsAppHandoff), but that click can't reliably confirm WhatsApp
 * actually opened. Persisting the pending message to sessionStorage means
 * a refresh right after clicking — cart already empty, WhatsApp not yet
 * open — still shows the same order text and a manual copy/send fallback,
 * instead of losing it. sessionStorage (not localStorage) so it doesn't
 * outlive the browser tab or bleed into an unrelated later visit.
 */
function readPendingOrder(): PendingOrder | null {
  try {
    const raw = window.sessionStorage.getItem(PENDING_ORDER_KEY);
    return raw ? (JSON.parse(raw) as PendingOrder) : null;
  } catch {
    return null;
  }
}

export default function CheckoutPage() {
  const { lines, totals, clear } = useCart();
  const [customer, setCustomer] = useState<CustomerInfo>(EMPTY_CUSTOMER);
  const [errors, setErrors] = useState<CustomerInfoErrors>({});
  const [order, setOrder] = useState<PendingOrder | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Stable per submission attempt: the same token is reused across a
  // double-click or a manual retry (so the server derives the same order ID
  // and can recognize the retry), and only reset when the customer goes
  // back to edit their info.
  const submissionTokenRef = useRef<string | null>(null);

  // Hydrate a pending order from sessionStorage on mount — covers a refresh
  // that happens right after the cart cleared but before/without WhatsApp
  // actually opening, so the fallback message isn't silently lost.
  useEffect(() => {
    const pending = readPendingOrder();
    if (pending) setOrder(pending);
  }, []);

  useEffect(() => {
    try {
      if (order) {
        window.sessionStorage.setItem(PENDING_ORDER_KEY, JSON.stringify(order));
      } else {
        window.sessionStorage.removeItem(PENDING_ORDER_KEY);
      }
    } catch {
      // Storage unavailable — the order still works for the current render,
      // it just won't survive a refresh.
    }
  }, [order]);

  // The cart only empties once the customer clicks through to WhatsApp, so
  // this guard must not hide the confirmation screen right when it's needed.
  if (lines.length === 0 && !order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold text-ink md:text-3xl">إتمام الطلب</h1>
        <EmptyCartState />
      </div>
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validateCustomerInfo(customer);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (!submissionTokenRef.current) {
      submissionTokenRef.current = crypto.randomUUID();
    }

    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines, customer, submissionToken: submissionTokenRef.current }),
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data) {
        setOrder({ url: data.whatsappUrl, message: data.whatsappMessage });
      } else if (data?.errors) {
        setErrors(data.errors);
      } else {
        setSubmitError("تعذر إرسال الطلب. حاول مرة أخرى.");
      }
    } catch {
      setSubmitError("تعذر الاتصال بالخادم. تحقق من الاتصال بالإنترنت وحاول مرة أخرى.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleEditBack() {
    // A fresh submission attempt (possibly with edited data) gets its own
    // order ID rather than colliding with whatever was already submitted.
    submissionTokenRef.current = null;
    setOrder(null);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-ink md:text-3xl">إتمام الطلب</h1>

      {order ? (
        <div className="mt-6">
          <button
            type="button"
            onClick={handleEditBack}
            className="mb-4 text-sm text-ink/60 hover:text-brand-brown"
          >
            ‹ تعديل المعلومات
          </button>
          <WhatsAppHandoff url={order.url} message={order.message} onOpenWhatsApp={clear} />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-6" noValidate>
          <OrderSummary lines={lines} totals={totals} />

          <div>
            <h2 className="mb-4 text-sm font-semibold text-ink">معلومات التوصيل</h2>
            <CustomerInfoForm customer={customer} errors={errors} onChange={setCustomer} />
          </div>

          <div className="rounded-md bg-brand-cream/60 p-3 text-xs text-ink/70">
            الدفع عند الاستلام فقط. بعد الضغط على تأكيد الطلب ستظهر رسالة الطلب لفتحها في واتساب.
          </div>

          {submitError && (
            <p className="text-sm text-red-600" role="alert">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="h-[46px] w-full rounded-sm bg-brand-brown text-sm font-semibold text-brand-offwhite disabled:opacity-60"
          >
            {submitting ? "جارٍ إرسال الطلب…" : "تأكيد الطلب عبر واتساب"}
          </button>
        </form>
      )}
    </div>
  );
}
