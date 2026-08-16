"use client";

import { useLanguage } from "@/app/lib/LanguageContext";
import { dashboardText } from "@/app/lib/i18n";
import { signup } from "@/app/dashboard/auth-actions";
import LanguageToggle from "@/app/dashboard/language-toggle";

export default function SignupForm({
  error,
  rootDomain,
}: {
  error?: string;
  rootDomain: string;
}) {
  const { locale } = useLanguage();
  const t = dashboardText[locale];
  const dir = locale === "en" ? "ltr" : "rtl";

  return (
    <div dir={dir} className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl italic font-semibold text-foreground">{t.signupTitle}</h1>
        <LanguageToggle />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <form action={signup} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm text-foreground/80">
          {t.storeNameLabel}
          <input
            name="storeName"
            required
            className="rounded-lg border border-gold/20 bg-surface px-3 py-2 text-foreground"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-foreground/80">
          {t.subdomainLabel}
          <div dir="ltr" className="flex items-center gap-1">
            <input
              name="slug"
              required
              pattern="[a-z0-9\-]+"
              placeholder="mystore"
              className="w-full rounded-lg border border-gold/20 bg-surface px-3 py-2 text-foreground"
            />
            <span className="whitespace-nowrap text-xs text-foreground/50">.{rootDomain}</span>
          </div>
        </label>
        <label className="flex flex-col gap-1 text-sm text-foreground/80">
          {t.whatsappLabel}
          <input
            name="whatsappNumber"
            required
            placeholder={t.whatsappPlaceholder}
            dir="ltr"
            className="rounded-lg border border-gold/20 bg-surface px-3 py-2 text-foreground"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-foreground/80">
          {t.emailLabel}
          <input
            name="email"
            type="email"
            required
            dir="ltr"
            className="rounded-lg border border-gold/20 bg-surface px-3 py-2 text-foreground"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-foreground/80">
          {t.passwordLabel}
          <input
            name="password"
            type="password"
            required
            minLength={8}
            dir="ltr"
            className="rounded-lg border border-gold/20 bg-surface px-3 py-2 text-foreground"
          />
        </label>
        <button
          type="submit"
          className="mt-2 rounded-full bg-gradient-to-r from-gold-bright to-gold px-4 py-2.5 text-sm font-semibold text-[#171009]"
        >
          {t.createStoreButton}
        </button>
      </form>
      <p className="text-xs text-foreground/50">
        {t.alreadyHaveStore}{" "}
        <a href="/dashboard/login" className="underline">
          {t.logIn}
        </a>
      </p>
    </div>
  );
}
