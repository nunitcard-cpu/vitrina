"use client";

import { useLanguage } from "@/app/lib/LanguageContext";

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();
  const other = locale === "en" ? "he" : "en";
  const label = other === "en" ? "English" : "עברית";

  return (
    <button
      type="button"
      onClick={() => setLocale(other)}
      dir="ltr"
      className="rounded-full border border-gold/20 px-3 py-1.5 text-xs font-medium text-foreground/70 transition-colors hover:border-gold/40 hover:text-gold-bright"
    >
      {label}
    </button>
  );
}
