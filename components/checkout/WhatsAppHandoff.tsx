"use client";

import { useState } from "react";

interface Props {
  url: string;
  message: string;
  onOpenWhatsApp: () => void;
}

/**
 * Shown after a valid submit instead of hard-redirecting away. The site
 * never navigates off /checkout (the WhatsApp link opens in a new tab), so
 * this stays on screen — with the message text and a copy fallback — no
 * matter whether WhatsApp actually opens. The cart only clears once the
 * customer clicks through, not before.
 */
export function WhatsAppHandoff({ url, message, onOpenWhatsApp }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the message text is already visible below.
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-brand-brown/30 bg-brand-cream/60 p-4 text-sm text-ink">
        <p className="font-semibold">طلبك جاهز للإرسال</p>
        <p className="mt-1 text-ink/70">اضغط الزر أدناه لفتح واتساب وإرسال طلبك.</p>
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onOpenWhatsApp}
        className="flex h-[46px] w-full items-center justify-center rounded-sm bg-brand-brown text-sm font-semibold text-brand-offwhite"
      >
        فتح واتساب لإرسال الطلب
      </a>

      <div className="rounded-md border border-ink/10 p-4 text-sm">
        <p className="text-ink/70">
          لم يفتح واتساب تلقائياً؟ انسخ رسالة الطلب وأرسلها يدوياً على واتساب:{" "}
          <span dir="ltr" className="font-semibold text-ink">+212 691 186 890</span>
        </p>
        <button
          type="button"
          onClick={handleCopy}
          className="mt-3 h-10 rounded-sm border border-brand-brown/40 px-4 text-xs font-semibold text-brand-brown hover:bg-brand-cream"
        >
          {copied ? "تم نسخ الرسالة" : "نسخ رسالة الطلب"}
        </button>
        <pre className="mt-3 whitespace-pre-wrap break-words rounded-sm bg-brand-offwhite p-3 text-start text-xs text-ink/80">
          {message}
        </pre>
      </div>
    </div>
  );
}
