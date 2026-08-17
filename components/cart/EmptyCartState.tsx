import Link from "next/link";

export function EmptyCartState() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <p className="text-ink/70">سلتك فارغة حالياً.</p>
      <Link
        href="/"
        className="inline-flex h-[46px] items-center justify-center rounded-sm bg-brand-brown px-7 text-sm font-semibold text-brand-offwhite"
      >
        متابعة التسوق
      </Link>
    </div>
  );
}
