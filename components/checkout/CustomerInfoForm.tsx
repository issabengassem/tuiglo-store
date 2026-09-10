"use client";

import type { CustomerInfo } from "@/lib/whatsapp";
import type { CustomerInfoErrors } from "@/lib/customer-validation";
import { isCasablancaCity, type ShippingMethod } from "@/lib/pricing";

export type { CustomerInfoErrors };

interface Props {
  customer: CustomerInfo;
  errors: CustomerInfoErrors;
  onChange: (customer: CustomerInfo) => void;
  shippingMethod: ShippingMethod;
  onShippingMethodChange: (method: ShippingMethod) => void;
}

const inputClass =
  "h-11 w-full rounded-sm border border-ink/20 bg-white px-3 text-sm text-ink placeholder:text-ink/40 focus-visible:border-brand-brown focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-brown";
const errorClass = "mt-1 text-xs text-red-600";

export function CustomerInfoForm({
  customer,
  errors,
  onChange,
  shippingMethod,
  onShippingMethodChange,
}: Props) {
  function set<K extends keyof CustomerInfo>(key: K, value: CustomerInfo[K]) {
    onChange({ ...customer, [key]: value });
  }

  function handleCityChange(newCity: string) {
    set("city", newCity);
    if (newCity.trim().length > 0) {
      if (isCasablancaCity(newCity)) {
        onShippingMethodChange("casablanca");
      } else {
        onShippingMethodChange("outside");
      }
    }
  }

  function handleShippingChange(method: ShippingMethod) {
    onShippingMethodChange(method);
    if (method === "casablanca" && (!customer.city || customer.city.trim() === "")) {
      set("city", "الدار البيضاء");
    }
  }

  return (
    <div className="space-y-4">
      {/* طريقة الشحن والتوصيل */}
      <div>
        <label className="mb-2 block text-sm font-medium text-ink">
          طريقة الشحن والتوصيل
        </label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label
            className={`flex cursor-pointer items-center justify-between rounded-sm border p-3 text-sm transition-all ${
              shippingMethod === "casablanca"
                ? "border-brand-brown bg-brand-cream/40 font-medium text-brand-brown shadow-sm"
                : "border-ink/20 bg-white text-ink hover:bg-brand-cream/20"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                name="shippingMethod"
                value="casablanca"
                checked={shippingMethod === "casablanca"}
                onChange={() => handleShippingChange("casablanca")}
                className="h-4 w-4 accent-brand-brown"
              />
              <span>توصيل داخل الدار البيضاء</span>
            </div>
            <span dir="ltr" className="font-bold text-brand-brown">
              15 DH
            </span>
          </label>

          <label
            className={`flex cursor-pointer items-center justify-between rounded-sm border p-3 text-sm transition-all ${
              shippingMethod === "outside"
                ? "border-brand-brown bg-brand-cream/40 font-medium text-brand-brown shadow-sm"
                : "border-ink/20 bg-white text-ink hover:bg-brand-cream/20"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                name="shippingMethod"
                value="outside"
                checked={shippingMethod === "outside"}
                onChange={() => handleShippingChange("outside")}
                className="h-4 w-4 accent-brand-brown"
              />
              <span>توصيل خارج الدار البيضاء</span>
            </div>
            <span dir="ltr" className="font-bold text-brand-brown">
              25 DH
            </span>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
          الاسم الكامل
        </label>
        <input
          id="name"
          type="text"
          value={customer.name}
          onChange={(e) => set("name", e.target.value)}
          className={inputClass}
          autoComplete="name"
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className={errorClass}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
          رقم الهاتف
        </label>
        <input
          id="phone"
          type="tel"
          dir="ltr"
          value={customer.phone}
          onChange={(e) => set("phone", e.target.value)}
          className={inputClass}
          autoComplete="tel"
          placeholder="06XXXXXXXX"
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <p className={errorClass}>{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-ink">
          المدينة
        </label>
        <input
          id="city"
          type="text"
          value={customer.city}
          onChange={(e) => handleCityChange(e.target.value)}
          className={inputClass}
          autoComplete="address-level2"
          placeholder={shippingMethod === "casablanca" ? "الدار البيضاء" : "مثال: الرباط، مراكش، طنجة..."}
          aria-invalid={!!errors.city}
        />
        {errors.city && <p className={errorClass}>{errors.city}</p>}
      </div>

      <div>
        <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-ink">
          العنوان الكامل
        </label>
        <input
          id="address"
          type="text"
          value={customer.address}
          onChange={(e) => set("address", e.target.value)}
          className={inputClass}
          autoComplete="street-address"
          aria-invalid={!!errors.address}
        />
        {errors.address && <p className={errorClass}>{errors.address}</p>}
      </div>

      <div>
        <label htmlFor="notes" className="mb-1.5 block text-sm font-medium text-ink">
          ملاحظات <span className="text-ink/50">(اختياري)</span>
        </label>
        <textarea
          id="notes"
          value={customer.notes ?? ""}
          onChange={(e) => set("notes", e.target.value)}
          rows={3}
          maxLength={500}
          className="w-full rounded-sm border border-ink/20 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-brown"
        />
        {errors.notes && <p className={errorClass}>{errors.notes}</p>}
      </div>
    </div>
  );
}
