"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { EmptyCartState } from "@/components/cart/EmptyCartState";

export default function CartPage() {
  const { lines, totals } = useCart();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-ink md:text-3xl">السلة</h1>

      {lines.length === 0 ? (
        <EmptyCartState />
      ) : (
        <div className="mt-6">
          <div>
            {lines.map((line) => {
              const group = totals.groups.find((g) => g.productId === line.productId);
              return (
                <CartLineItem
                  key={`${line.productId}-${line.colorVariantId}`}
                  line={line}
                  unitPrice={group?.unitPrice ?? 0}
                />
              );
            })}
          </div>

          <div className="mt-6 space-y-2 border-t border-ink/10 pt-6 text-sm">
            <div className="flex justify-between">
              <span className="text-ink/70">المجموع الفرعي</span>
              <span dir="ltr">{formatPrice(totals.subtotal)}</span>
            </div>
            {totals.wholesaleDiscountTotal > 0 && (
              <div className="flex justify-between text-brand-brown">
                <span>خصم الجملة (حسب الكمية الإجمالية لكل منتج)</span>
                <span dir="ltr">-{formatPrice(totals.wholesaleDiscountTotal)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-ink">
              <span>الإجمالي</span>
              <span dir="ltr">{formatPrice(totals.total)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-6 flex h-[46px] items-center justify-center rounded-sm bg-brand-brown text-sm font-semibold text-brand-offwhite"
          >
            المتابعة إلى الدفع
          </Link>
        </div>
      )}
    </div>
  );
}
