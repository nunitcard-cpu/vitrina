"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { defaultLocale, locales, type Locale } from "@/app/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "el-amar-locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (locales.includes(stored as Locale)) {
      setLocaleState(stored as Locale);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "en" ? "ltr" : "rtl";
    document.documentElement.classList.toggle("lang-he", locale === "he");
    document.documentElement.classList.toggle("lang-ar", locale === "ar");
    document.documentElement.classList.toggle("lang-en", locale === "en");
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = (next: Locale) => setLocaleState(next);

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
