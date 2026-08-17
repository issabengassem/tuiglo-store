"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

/** Live item-count badge on the header's cart icon — plan §6. */
export function CartIndicator() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`السلة${itemCount > 0 ? ` — ${itemCount} قطعة` : ""}`}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-sm text-ink hover:bg-brand-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-brown"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 4h1.5l1.5 12.5A2 2 0 0 0 8 18.5h9a2 2 0 0 0 2-1.7L20.5 8H6"
        />
        <circle cx="9" cy="21" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="17" cy="21" r="1.25" fill="currentColor" stroke="none" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-1 -end-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-brown px-1 text-[11px] font-semibold text-brand-offwhite">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
