"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ColorVariant, Product } from "@/data/types";
import { useCart } from "@/lib/cart-context";
import { isPurchasable } from "@/lib/stock-labels";
import { activeTier, unitPriceForQuantity } from "@/lib/pricing";
import { formatPrice } from "@/lib/format";
import { WholesaleTierInfo } from "./WholesaleTierInfo";

interface Props {
  product: Product;
  variants: ColorVariant[];
  /** Selection is controlled by the parent (ProductPurchasePanel) — the color
   * swatches render there so they can sit next to the gallery image; this
   * form only reads the current selection to price and submit the line. */
  selectedId: string | null;
}

export function AddToCartForm({ product, variants, selectedId }: Props) {
  const router = useRouter();
  const { lines, addLine } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const selectedVariant = useMemo(
    () => variants.find((v) => v.id === selectedId) ?? null,
    [variants, selectedId]
  );
  const canAdd = !!selectedVariant && isPurchasable(selectedVariant.stock) && qty > 0;

  // Wholesale tiers are based on this product's TOTAL quantity across every
  // color already in the cart, plus what's about to be added — not just the
  // number in the stepper alone. Same shared pricing function used
  // everywhere else (lib/pricing.ts) — no duplicated tier logic here.
  const existingQtyForProduct = useMemo(
    () => lines.filter((l) => l.productId === product.id).reduce((sum, l) => sum + l.qty, 0),
    [lines, product.id]
  );
  const projectedTotalQty = existingQtyForProduct + qty;
  const projectedUnitPrice = unitPriceForQuantity(product.price, projectedTotalQty);
  const projectedTier = activeTier(projectedTotalQty);
  const hasDiscount = projectedUnitPrice < product.price;

  function handleAdd() {
    if (!selectedVariant || !canAdd) return;
    addLine({ productId: product.id, colorVariantId: selectedVariant.id, qty });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 5000);
  }

  function handleBuyNow() {
    if (!selectedVariant || !canAdd) return;
    addLine({ productId: product.id, colorVariantId: selectedVariant.id, qty });
    router.push("/checkout");
  }

  return (
    <div className="space-y-5">
      {/* Visible before the customer touches the quantity stepper, per spec. */}
      <div>
        <p className="mb-2 text-sm font-medium text-ink">عروض الجملة</p>
        <WholesaleTierInfo activeMinQty={projectedTier?.minQty} />
      </div>

      <div>
        <label htmlFor="qty" className="mb-2 block text-sm font-medium text-ink">
          الكمية
        </label>
        <div dir="ltr" className="inline-flex items-center rounded-sm border border-ink/20">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="إنقاص الكمية"
            className="h-11 w-11 text-lg text-ink hover:bg-brand-cream"
          >
            −
          </button>
          <input
            id="qty"
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            className="h-11 w-14 border-x border-ink/20 text-center [appearance:textfield]"
          />
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            aria-label="زيادة الكمية"
            className="h-11 w-11 text-lg text-ink hover:bg-brand-cream"
          >
            +
          </button>
        </div>
      </div>

      {/* Live unit price + line total — recalculated on every qty change
          from base price + current quantity, never a stored stale value. */}
      <div role="status" aria-live="polite" className="rounded-md bg-brand-cream/60 p-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-ink/70">سعر القطعة</span>
          <span dir="ltr" className="font-semibold text-ink">
            {hasDiscount && (
              <span className="me-2 text-ink/40 line-through">{formatPrice(product.price)}</span>
            )}
            {formatPrice(projectedUnitPrice)}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-ink/70">إجمالي هذه الكمية</span>
          <span dir="ltr" className="font-bold text-brand-brown">
            {formatPrice(projectedUnitPrice * qty)}
          </span>
        </div>
        {existingQtyForProduct > 0 && (
          <p className="mt-1 text-xs text-ink/60">
            السعر محتسب على إجمالي {projectedTotalQty} قطعة من هذا المنتج (بما فيها {existingQtyForProduct} في سلتك حالياً).
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {/* زر إتمام الطلب مباشرة والشراء الفوري */}
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={!canAdd}
          className="flex h-[48px] w-full items-center justify-center gap-2 rounded-sm bg-brand-brown text-sm font-bold text-brand-offwhite shadow-sm transition-all hover:bg-brand-brown/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span>اشتري الآن (إتمام الطلب)</span>
          <span className="text-xs font-normal opacity-90">• الدفع عند الاستلام</span>
        </button>

        {/* زر أضف إلى السلة لإضافة منتجات أخرى ومتابعة التسوق */}
        <button
          type="button"
          onClick={handleAdd}
          disabled={!canAdd}
          className="flex h-[46px] w-full items-center justify-center gap-2 rounded-sm border-2 border-brand-brown bg-white text-sm font-bold text-brand-brown transition-all hover:bg-brand-cream/50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span>أضف إلى السلة</span>
        </button>

        {lines.length > 0 && (
          <Link
            href="/cart"
            className="flex items-center justify-center gap-1.5 py-1 text-xs font-medium text-ink/70 hover:text-brand-brown transition-colors"
          >
            <span>معاينة محتويات السلة ({lines.reduce((s, l) => s + l.qty, 0)} قطعة)</span>
            <span>←</span>
          </Link>
        )}
      </div>

      {/* تنبيه تأكيد الإضافة ورابط الذهاب إلى السلة */}
      {justAdded && (
        <div className="flex items-center justify-between rounded-md border border-brand-brown/20 bg-brand-cream/60 p-3 text-xs text-ink">
          <span className="font-medium text-brand-brown">✓ تمت إضافة المنتج إلى سلتك</span>
          <div className="flex items-center gap-2.5">
            <Link
              href="/cart"
              className="font-semibold text-brand-brown underline hover:text-brand-brown/80"
            >
              الذهاب إلى السلة
            </Link>
            <span className="text-ink/30">•</span>
            <Link
              href="/checkout"
              className="rounded bg-brand-brown px-2.5 py-1 font-semibold text-brand-offwhite hover:bg-brand-brown/90"
            >
              إتمام الطلب
            </Link>
          </div>
        </div>
      )}

      {!selectedVariant && variants.length > 0 && (
        <p className="text-xs text-ink/60">اختر لوناً متوفراً لإضافة المنتج إلى السلة.</p>
      )}
    </div>
  );
}
