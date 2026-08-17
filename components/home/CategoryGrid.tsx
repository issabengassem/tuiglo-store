import Link from "next/link";
import { categories } from "@/data/categories";

/** Homepage "shop by category" — exactly the 3 confirmed categories. */
export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-xl font-bold text-ink md:text-2xl">تسوق حسب الفئة</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/${category.slug}`}
            className="group flex flex-col justify-end rounded-md bg-brand-cream p-6 shadow-warm transition-transform hover:-translate-y-0.5"
          >
            <span className="text-lg font-semibold text-ink">{category.name.ar}</span>
            <span className="mt-1 text-sm text-ink/70">{category.description.ar}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
