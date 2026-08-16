"use client";

import type { Product, Tenant } from "@/app/lib/store";
import { whatsappLink } from "@/app/lib/store";
import { tagLabels, uiText } from "@/app/lib/i18n";
import { useLanguage } from "@/app/lib/LanguageContext";

function ProductCard({
  product,
  whatsappNumber,
}: {
  product: Product;
  whatsappNumber: string;
}) {
  const { locale } = useLanguage();
  const t = uiText[locale];
  const message = t.productMessage(product.name, product.price);

  return (
    <div className="group relative mb-3 break-inside-avoid overflow-hidden rounded-2xl border border-gold/10 bg-surface transition-colors hover:border-gold/30 sm:mb-4">
      <div className="relative w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="block w-full h-auto transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

        {product.tag && (
          <span className="absolute left-2.5 top-2.5 rounded-full border border-gold/30 bg-black/50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold-bright backdrop-blur-sm">
            {tagLabels[locale][product.tag]}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 p-3 sm:p-4">
        <h3 className="text-sm font-medium text-foreground/90 sm:text-base">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-gold-bright sm:text-base">
            ₪{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-foreground/40 line-through">
              ₪{product.originalPrice}
            </span>
          )}
        </div>

        <a
          href={whatsappLink(whatsappNumber, message)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-md shadow-emerald-600/20 transition-transform active:scale-95 sm:text-sm"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 sm:h-4 sm:w-4">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91S17.5 2 12.04 2Zm0 18.1h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.14.82.84-3.06-.2-.31a8.19 8.19 0 0 1-1.26-4.4c0-4.54 3.7-8.24 8.26-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.42 5.83c0 4.55-3.7 8.27-8.26 8.27Zm4.53-6.19c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.06 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28Z" />
          </svg>
          {t.orderViaWhatsapp}
        </a>
      </div>
    </div>
  );
}

export default function ProductGrid({
  tenant,
  products,
}: {
  tenant: Tenant;
  products: Product[];
}) {
  const { locale } = useLanguage();
  const t = uiText[locale];

  return (
    <section id="products" className="mx-auto mt-10 max-w-md px-4 sm:max-w-2xl sm:px-6">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="font-display text-2xl italic font-semibold text-foreground">
          {t.collectionHeading}
        </h2>
        <span className="text-xs text-foreground/50">{t.piecesSuffix(products.length)}</span>
      </div>

      <div className="columns-2 gap-3 sm:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} whatsappNumber={tenant.whatsappNumber} />
        ))}
      </div>
    </section>
  );
}
