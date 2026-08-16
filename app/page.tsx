import type { Metadata } from "next";
import { headers } from "next/headers";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import ProductGrid from "@/app/components/ProductGrid";
import FloatingBar from "@/app/components/FloatingBar";
import Footer from "@/app/components/Footer";
import MarketingLanding from "@/app/components/MarketingLanding";
import { getTenantBySlug } from "@/app/lib/get-tenant";

export async function generateMetadata(): Promise<Metadata> {
  const slug = (await headers()).get("x-tenant-slug");
  if (!slug) {
    return {
      title: "Vitrina — פתחו חנות אונליין לעסק שלכם",
      description:
        "כל חנות מקבלת כתובת משלה, דשבורד לניהול מוצרים ותמונות, והזמנות ישירות לוואטסאפ.",
    };
  }

  const result = await getTenantBySlug(slug);
  if (!result) return { title: "החנות לא נמצאה" };

  return {
    title: result.tenant.tagline
      ? `${result.tenant.name} | ${result.tenant.tagline}`
      : result.tenant.name,
    description: result.tenant.tagline ?? undefined,
  };
}

export default async function Home() {
  const slug = (await headers()).get("x-tenant-slug");

  if (!slug) {
    return <MarketingLanding />;
  }

  const result = await getTenantBySlug(slug);

  if (!result) {
    return <StoreNotFound slug={slug} />;
  }

  const { tenant, products } = result;

  return (
    <div className="flex flex-1 flex-col bg-background bg-noise">
      <Header tenant={tenant} />
      <main className="flex-1">
        <Hero tenant={tenant} heroImage={products[0]?.image} />
        <ProductGrid tenant={tenant} products={products} />
      </main>
      <Footer tenant={tenant} />
      <FloatingBar tenant={tenant} />
    </div>
  );
}

function StoreNotFound({ slug }: { slug: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
      <h1 className="font-display text-2xl italic font-semibold text-foreground">
        Store not found
      </h1>
      <p className="text-sm text-foreground/60">
        There&apos;s no store at &quot;{slug}&quot;.
      </p>
    </div>
  );
}
