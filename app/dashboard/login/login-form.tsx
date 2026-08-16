"use client";

import { useLanguage } from "@/app/lib/LanguageContext";
import { dashboardText } from "@/app/lib/i18n";
import { login } from "@/app/dashboard/auth-actions";
import LanguageToggle from "@/app/dashboard/language-toggle";

export default function LoginForm({
  error,
  checkEmail,
}: {
  error?: string;
  checkEmail?: boolean;
}) {
  const { locale } = useLanguage();
  const t = dashboardText[locale];
  const dir = locale === "en" ? "ltr" : "rtl";

  return (
    <div dir={dir} className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl italic font-semibold text-foreground">{t.loginTitle}</h1>
        <LanguageToggle />
      </div>
      {checkEmail && <p className="text-sm text-foreground/70">{t.checkEmailMessage}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
      <form action={login} className="flex flex-col gap-3">
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
            dir="ltr"
            className="rounded-lg border border-gold/20 bg-surface px-3 py-2 text-foreground"
          />
        </label>
        <button
          type="submit"
          className="mt-2 rounded-full bg-gradient-to-r from-gold-bright to-gold px-4 py-2.5 text-sm font-semibold text-[#171009]"
        >
          {t.logInButton}
        </button>
      </form>
      <p className="text-xs text-foreground/50">
        {t.newHere}{" "}
        <a href="/dashboard/signup" className="underline">
          {t.createStoreLink}
        </a>
      </p>
    </div>
  );
}
