import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Product, Tenant } from "@/app/lib/store";
import type { TagKey } from "@/app/lib/i18n";
import { demoTenant, demoProducts } from "@/app/lib/demo-tenant";

export const getTenantBySlug = cache(async function getTenantBySlug(
  slug: string
): Promise<{ tenant: Tenant; products: Product[] } | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return slug === demoTenant.slug ? { tenant: demoTenant, products: demoProducts } : null;
  }

  const supabase = await createClient();

  const { data: tenantRow } = await supabase
    .from("tenants")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!tenantRow) return null;

  const { data: productRows } = await supabase
    .from("products")
    .select("*")
    .eq("tenant_id", tenantRow.id)
    .order("sort_order", { ascending: true });

  const tenant: Tenant = {
    id: tenantRow.id,
    slug: tenantRow.slug,
    name: tenantRow.store_name,
    tagline: tenantRow.tagline,
    whatsappNumber: tenantRow.whatsapp_number,
    instagramHandle: tenantRow.instagram_handle,
    phoneDisplay: tenantRow.phone_display,
    location: tenantRow.location,
  };

  const products: Product[] = (productRows ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    price: Number(row.price),
    originalPrice: row.original_price !== null ? Number(row.original_price) : null,
    image: row.image_path,
    tag: row.tag as TagKey | null,
  }));

  return { tenant, products };
});
