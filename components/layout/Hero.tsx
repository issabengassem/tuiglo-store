import Link from "next/link";
import type { LocalizedText } from "@/data/types";

interface HeroProps {
  video?: { srcMp4: string; posterSrc?: string };
  headline: LocalizedText;
  subheadline?: LocalizedText;
  ctaLabel: LocalizedText;
  ctaHref: string;
}

/**
 * Full-bleed hero background. Video is muted/autoplay/loop/playsInline —
 * the only combination browsers reliably allow without a user gesture.
 * `prefers-reduced-motion: reduce` hides the video via CSS (no JS needed,
 * keeps this a Server Component) and falls back to the brand gradient.
 * See WEBSITE_IMPLEMENTATION_PLAN.md §15.
 */
export function Hero({ video, headline, subheadline, ctaLabel, ctaHref }: HeroProps) {
  return (
    <section className="relative flex min-h-[520px] items-center overflow-hidden bg-gradient-to-br from-brand-brown via-brand-beige to-brand-cream text-brand-offwhite md:min-h-[640px]">
      {video && (
        <video
          className="motion-reduce:hidden absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={video.posterSrc}
          aria-hidden="true"
        >
          <source src={video.srcMp4} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/10 to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 text-start">
        <div className="max-w-lg">
          <h1 className="text-3xl font-bold leading-snug md:text-4xl">{headline.ar}</h1>
          {subheadline?.ar && (
            <p className="mt-4 text-base leading-relaxed opacity-95 md:text-lg">
              {subheadline.ar}
            </p>
          )}
          <Link
            href={ctaHref}
            className="mt-8 inline-flex h-[46px] items-center justify-center rounded-sm bg-brand-offwhite px-7 text-sm font-semibold text-brand-brown transition-opacity hover:opacity-90"
          >
            {ctaLabel.ar}
          </Link>
        </div>
      </div>
    </section>
  );
}
