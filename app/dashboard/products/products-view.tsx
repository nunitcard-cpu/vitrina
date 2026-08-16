"use client";

import { useLanguage } from "@/app/lib/LanguageContext";
import { dashboardText } from "@/app/lib/i18n";
import { createProduct } from "@/app/dashboard/actions";
import { logout } from "@/app/dashboard/auth-actions";
import LanguageToggle from "@/app/dashboard/language-toggle";
import ProductForm from "./product-form";
import ProductRow from "./product-row";

type Row = {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  imagePath: string;
  tag: "New" | "Bestseller" | "Sale" | null;
};

export default function ProductsView({
  tenantId,
  storeName,
  slug,
  rootDomain,
  products,
}: {
  tenantId: string;
  storeName: string;
  slug: string;
  rootDomain: string;
  products: Row[];
}) {
  const { locale } = useLanguage();
  const t = dashboardText[locale];
  const dir = locale === "en" ? "ltr" : "rtl";

  return (
    <div dir={dir} className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl italic font-semibold text-foreground">{storeName}</h1>
          <p dir="ltr" className="text-xs text-foreground/50">
            {slug}.{rootDomain}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <form action={logout}>
            <button type="submit" className="text-xs text-foreground/50 underline">
              {t.logOut}
            </button>
          </form>
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-3">
        {products.map((product) => (
          <ProductRow key={product.id} tenantId={tenantId} product={product} />
        ))}
        {products.length === 0 && <p className="text-sm text-foreground/50">{t.noProducts}</p>}
      </div>

      <div className="rounded-2xl border border-gold/15 bg-surface p-4">
        <h2 className="mb-3 text-sm font-semibold text-foreground">{t.addProductHeading}</h2>
        <ProductForm tenantId={tenantId} action={createProduct} />
      </div>
    </div>
  );
}
