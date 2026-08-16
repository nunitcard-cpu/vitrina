"use client";

import type { Tenant } from "@/app/lib/store";
import { whatsappLink } from "@/app/lib/store";
import { uiText } from "@/app/lib/i18n";
import { useLanguage } from "@/app/lib/LanguageContext";

export default function FloatingBar({ tenant }: { tenant: Tenant }) {
  const { locale } = useLanguage();
  const t = uiText[locale];

  return (
    <div className="fixed inset-x-0 bottom-3 z-40 mx-auto w-full max-w-md px-4 sm:max-w-2xl sm:px-6">
      <div className="flex items-center justify-between gap-2 rounded-2xl border border-gold/20 bg-surface/90 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <a
          href={`tel:+${tenant.whatsappNumber}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gold/15 py-2.5 text-xs font-medium text-foreground/80 transition-colors hover:border-gold/40 hover:text-gold-bright"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
            <path
              d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z"
              strokeLinejoin="round"
            />
          </svg>
          {t.callLabel}
        </a>

        <a
          href={whatsappLink(tenant.whatsappNumber, t.genericMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-[1.6] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-transform active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91S17.5 2 12.04 2Zm0 18.1h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.14.82.84-3.06-.2-.31a8.19 8.19 0 0 1-1.26-4.4c0-4.54 3.7-8.24 8.26-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.42 5.83c0 4.55-3.7 8.27-8.26 8.27Z" />
          </svg>
          {t.orderNowLabel}
        </a>

        <a
          href="#products"
          aria-label={t.shopLabel}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gold/15 py-2.5 text-xs font-medium text-foreground/80 transition-colors hover:border-gold/40 hover:text-gold-bright"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
            <path d="M3 6h18M6 6v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t.shopLabel}
        </a>
      </div>
    </div>
  );
}
