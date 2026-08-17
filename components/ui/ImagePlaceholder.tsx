/**
 * Explicit "image coming soon" state — used wherever a product/color has no
 * prepared display image yet (real image prep is Phase 5, not started).
 * Never a substitute photo, never another color's image. Plan §14/§23.
 */
export function ImagePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-brand-cream text-center text-xs text-ink/50 ${className}`}
      role="img"
      aria-label="الصورة غير متوفرة بعد"
    >
      الصورة قريباً
    </div>
  );
}
