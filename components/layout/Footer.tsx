import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { WHATSAPP_ORDER_NUMBER } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-brand-beige/60 bg-brand-cream">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <Image
              src="/brand/tuiglo_logo_brown.svg"
              alt="TUIGLO"
              width={120}
              height={76}
              className="h-9 w-auto"
            />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/80">
              حقائب ظهر، علب غداء، وحقائب كروس. مقرنا في الدار البيضاء، ونوصل لجميع أنحاء المغرب.
            </p>
          </div>

          <nav aria-label="روابط الفئات" className="flex flex-col gap-2 text-sm">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                className="text-ink/80 hover:text-brand-brown"
              >
                {category.name.ar}
              </Link>
            ))}
          </nav>

          <div className="text-sm">
            <p className="font-semibold text-ink">تواصل معنا</p>
            <a
              href={`https://wa.me/${WHATSAPP_ORDER_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-ink/80 hover:text-brand-brown"
            >
              واتساب: +212 691 186 890
            </a>
          </div>
        </div>

        <p className="mt-8 border-t border-brand-beige/60 pt-6 text-xs text-ink/60">
          الدفع عند الاستلام متوفر · التوصيل لجميع أنحاء المغرب
        </p>
      </div>
    </footer>
  );
}
