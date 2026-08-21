"use client";

import type { CustomerInfo } from "@/lib/whatsapp";
import type { CustomerInfoErrors } from "@/lib/customer-validation";

export type { CustomerInfoErrors };

interface Props {
  customer: CustomerInfo;
  errors: CustomerInfoErrors;
  onChange: (customer: CustomerInfo) => void;
}

const inputClass =
  "h-11 w-full rounded-sm border border-ink/20 bg-white px-3 text-sm text-ink placeholder:text-ink/40 focus-visible:border-brand-brown focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-brown";
const errorClass = "mt-1 text-xs text-red-600";

export function CustomerInfoForm({ customer, errors, onChange }: Props) {
  function set<K extends keyof CustomerInfo>(key: K, value: CustomerInfo[K]) {
    onChange({ ...customer, [key]: value });
  }

  return (
    <div className="space-y-4">
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
          onChange={(e) => set("city", e.target.value)}
          className={inputClass}
          autoComplete="address-level2"
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
          className="w-full rounded-sm border border-ink/20 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-brown"
        />
      </div>
    </div>
  );
}
