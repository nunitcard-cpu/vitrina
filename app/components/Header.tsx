"use client";

import type { Tenant } from "@/app/lib/store";
import { locales, localeLabels } from "@/app/lib/i18n";
import { useLanguage } from "@/app/lib/LanguageContext";

export default function Header({ tenant }: { tenant: Tenant }) {
  const { locale, setLocale } = useLanguage();

  const initials = tenant.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-gold/15 bg-background/70 backdrop-blur-xl">
      <div
        dir="ltr"
        className="mx-auto flex max-w-md items-center justify-between px-4 py-3 sm:max-w-2xl sm:px-6"
      >
        <div className="flex items-center gap-1">
          {locales
            .filter((loc) => loc !== locale)
            .map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setLocale(loc)}
                className="flex h-8 items-center justify-center rounded-full border border-gold/15 px-3 text-xs font-semibold text-foreground/60 transition-colors hover:border-gold/40 hover:bg-surface-2 hover:text-gold-bright"
              >
                {localeLabels[loc]}
              </button>
            ))}
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-br from-surface-2 to-surface text-sm font-display italic font-semibold text-gold-bright">
            {initials}
          </div>
          <div dir={locale === "en" ? "ltr" : "rtl"} className="leading-tight">
            <p className="font-display text-[15px] font-semibold tracking-wide text-foreground">
              {tenant.name}
            </p>
            {tenant.tagline && (
              <p className="text-[10px] uppercase tracking-[0.18em] text-gold/70">
                {tenant.tagline}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
