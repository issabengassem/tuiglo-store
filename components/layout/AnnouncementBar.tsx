"use client";

import { useState } from "react";

/** Thin, dismissible strip per design direction §4. Text is exact, as specified. */
export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="flex items-center justify-center gap-3 bg-brand-brown px-4 py-2 text-center text-xs font-medium text-brand-offwhite md:text-sm">
      <p>عروض الجملة: وفر حتى 20 درهماً للقطعة!</p>
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="إغلاق الشريط"
        className="shrink-0 text-brand-offwhite/80 hover:text-brand-offwhite"
      >
        ×
      </button>
    </div>
  );
}
