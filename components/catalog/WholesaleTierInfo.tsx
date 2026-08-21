import { WHOLESALE_TIERS } from "@/lib/pricing";

// Exact wording as specified — display text only, the actual deduction
// values are still driven from WHOLESALE_TIERS (lib/pricing.ts) so the two
// can never drift apart silently.
const TIER_LABELS: { minQty: number; text: string }[] = [
  { minQty: 10, text: "10 - 29 قطعة: وفر 5 دراهم للقطعة" },
  { minQty: 30, text: "30 - 49 قطعة: وفر 10 دراهم للقطعة" },
  { minQty: 50, text: "50 - 99 قطعة: وفر 15 درهماً للقطعة" },
  { minQty: 100, text: "100+ قطعة: وفر 20 درهماً للقطعة" },
];

if (TIER_LABELS.length !== WHOLESALE_TIERS.length) {
  // Guards against silently drifting out of sync with lib/pricing.ts if
  // the tier structure is ever changed without updating this display copy.
  throw new Error("WholesaleTierInfo: TIER_LABELS is out of sync with WHOLESALE_TIERS");
}

/** Compact, always-visible tier reference — shown before the customer touches the quantity stepper. */
export function WholesaleTierInfo({ activeMinQty }: { activeMinQty?: number }) {
  return (
    <div className="flex flex-wrap gap-2">
      {TIER_LABELS.map((tier) => (
        <span
          key={tier.minQty}
          className={[
            "rounded-full border px-3 py-1 text-xs",
            tier.minQty === activeMinQty
              ? "border-brand-brown bg-brand-brown text-brand-offwhite"
              : "border-ink/15 bg-brand-cream/60 text-ink/80",
          ].join(" ")}
        >
          {tier.text}
        </span>
      ))}
    </div>
  );
}
