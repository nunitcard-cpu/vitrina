"use client";

import { useLanguage } from "@/app/lib/LanguageContext";
import { landingText } from "@/app/lib/i18n";

export default function MarketingLanding() {
  const { locale, setLocale } = useLanguage();
  const t = landingText[locale];
  const dir = locale === "en" ? "ltr" : "rtl";
  const otherLocale = locale === "en" ? "he" : "en";
  const otherLabel = otherLocale === "en" ? "English" : "עברית";

  return (
    <div dir={dir} className="flex flex-1 flex-col bg-background bg-noise">
      <header className="sticky top-0 z-40 border-b border-gold/15 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
          <span className="font-display text-lg italic font-semibold text-gold-bright">
            Vitrina
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLocale(otherLocale)}
              dir="ltr"
              className="rounded-full border border-gold/20 px-3 py-1.5 text-xs font-medium text-foreground/70 transition-colors hover:border-gold/40 hover:text-gold-bright"
            >
              {otherLabel}
            </button>
            <a
              href="/dashboard/login"
              className="text-xs font-medium text-foreground/60 underline-offset-4 hover:text-gold-bright hover:underline"
            >
              {t.ownerLogin}
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 pt-12 pb-10 text-center sm:px-6 sm:pt-20">
          <span className="animate-shimmer inline-block rounded-full border border-gold/40 bg-gradient-to-r from-surface-2 via-surface to-surface-2 bg-[length:200%_100%] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-bright">
            {t.eyebrow}
          </span>
          <h1 className="mt-5 font-display text-4xl italic font-semibold leading-[1.1] text-foreground sm:text-5xl">
            {t.heroTitleLine1}
            <br />
            <span className="text-gradient-gold not-italic">{t.heroTitleLine2}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-foreground/60 sm:text-base">
            {t.heroSubtitle}
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/dashboard/signup"
              className="rounded-full bg-gradient-to-r from-gold-bright to-gold px-6 py-3 text-sm font-semibold text-[#171009] shadow-lg shadow-gold/20 transition-transform active:scale-95"
            >
              {t.ctaCreateStore}
            </a>
            <a
              href="/?tenant=elamar"
              className="rounded-full border border-gold/25 px-6 py-3 text-sm font-medium text-foreground/80 transition-colors hover:border-gold/50 hover:text-gold-bright"
            >
              {t.ctaLiveExample}
            </a>
          </div>
        </section>

        <section className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {t.steps.map((step) => (
              <div key={step.number} className="rounded-2xl border border-gold/10 bg-surface p-5">
                <span className="font-display text-2xl italic font-semibold text-gold/50">
                  {step.number}
                </span>
                <h3 className="mt-2 text-sm font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground/60">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-display text-2xl italic font-semibold text-foreground">
            {t.featuresHeading}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {t.features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-gold/10 bg-surface p-5">
                <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground/60">{feature.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mb-16 mt-14 max-w-xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl italic font-semibold text-foreground">
            {t.finalHeading}
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-foreground/60">{t.finalSubtitle}</p>
          <a
            href="/dashboard/signup"
            className="mt-5 inline-block rounded-full bg-gradient-to-r from-gold-bright to-gold px-6 py-3 text-sm font-semibold text-[#171009] shadow-lg shadow-gold/20 transition-transform active:scale-95"
          >
            {t.finalCta}
          </a>
        </section>
      </main>

      <footer className="border-t border-gold/10 py-6 text-center text-xs text-foreground/40">
        {t.footer}
      </footer>
    </div>
  );
}
