import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { CartIndicator } from "@/components/cart/CartIndicator";

/**
 * Desktop: full primary logo lockup (icon + wordmark). Mobile: icon alone.
 * This is a real conditional asset swap, not a CSS trick — the guidelines
 * PDF explicitly forbids splitting the icon from the wordmark within the
 * primary lockup, so mobile uses the separately-approved standalone icon
 * asset instead of a cropped/scaled primary lockup. See plan §18.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-beige/60 bg-brand-offwhite/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" aria-label="TUIGLO — الصفحة الرئيسية" className="shrink-0">
          <Image
            src="/brand/tuiglo_logo_primary.svg"
            alt="TUIGLO"
            width={140}
            height={89}
            priority
            className="hidden h-10 w-auto md:block"
          />
          <Image
            src="/brand/tuiglo_icon.svg"
            alt="TUIGLO"
            width={40}
            height={42}
            priority
            className="block h-9 w-auto md:hidden"
          />
        </Link>

        <nav
          aria-label="التنقل الرئيسي"
          className="flex gap-4 overflow-x-auto text-sm font-medium md:gap-6"
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className="shrink-0 whitespace-nowrap text-ink transition-colors hover:text-brand-brown"
            >
              {category.name.ar}
            </Link>
          ))}
        </nav>

        <CartIndicator />
      </div>
    </header>
  );
}
