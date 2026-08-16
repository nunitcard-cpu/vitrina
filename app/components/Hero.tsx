"use client";

import Image from "next/image";
import type { Tenant } from "@/app/lib/store";
import { uiText } from "@/app/lib/i18n";
import { useLanguage } from "@/app/lib/LanguageContext";

export default function Hero({
  tenant,
  heroImage,
}: {
  tenant: Tenant;
  heroImage?: string;
}) {
  const { locale } = useLanguage();
  const t = uiText[locale];

  if (!heroImage) return null;

  return (
    <section className="relative mx-auto mt-4 max-w-md overflow-hidden rounded-3xl sm:max-w-2xl sm:mt-8">
      <div className="relative aspect-[4/5] w-full sm:aspect-[16/9]">
        <Image
          src={heroImage}
          alt={`${tenant.name} new collection`}
          fill
          priority
          sizes="(max-width: 640px) 100vw, 672px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-noise opacity-40" />

        <div className="absolute inset-x-0 top-4 flex justify-center">
          <span className="animate-shimmer rounded-full border border-gold/40 bg-gradient-to-r from-surface-2 via-surface to-surface-2 bg-[length:200%_100%] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-bright">
            {t.heroBadge}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 sm:p-8">
          <h1 className="font-display text-3xl italic font-semibold leading-[1.1] text-white sm:text-5xl">
            {t.heroTitleLine1}
            <br />
            <span className="text-gradient-gold not-italic">{t.heroTitleLine2}</span>
          </h1>
          <p className="max-w-xs text-sm text-white/75 sm:max-w-sm sm:text-base">
            {t.heroSubtitle}
          </p>
          <div className="mt-1 flex items-center gap-3">
            <a
              href="#products"
              className="rounded-full bg-gradient-to-r from-gold-bright to-gold px-5 py-2.5 text-sm font-semibold text-[#171009] shadow-lg shadow-gold/20 transition-transform active:scale-95"
            >
              {t.heroCta}
            </a>
            <span className="text-xs text-white/60">{t.heroDelivery}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
