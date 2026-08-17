import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-ink">الصفحة غير موجودة</h1>
      <p className="text-ink/70">لم نتمكن من العثور على الصفحة التي تبحث عنها.</p>
      <Link
        href="/"
        className="inline-flex h-[46px] items-center justify-center rounded-sm bg-brand-brown px-7 text-sm font-semibold text-brand-offwhite"
      >
        العودة للصفحة الرئيسية
      </Link>
    </div>
  );
}
