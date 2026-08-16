import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProductsView from "./products-view";

export default async function ProductsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/dashboard/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("tenant_id")
    .eq("id", user.id)
    .maybeSingle();
  if (!profile) redirect("/dashboard/signup");

  const [{ data: tenant }, { data: products }] = await Promise.all([
    supabase.from("tenants").select("*").eq("id", profile.tenant_id).single(),
    supabase
      .from("products")
      .select("*")
      .eq("tenant_id", profile.tenant_id)
      .order("sort_order", { ascending: true }),
  ]);

  return (
    <ProductsView
      tenantId={profile.tenant_id}
      storeName={tenant?.store_name ?? ""}
      slug={tenant?.slug ?? ""}
      rootDomain={process.env.NEXT_PUBLIC_ROOT_DOMAIN || "yourdomain.com"}
      products={(products ?? []).map((product) => ({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        originalPrice: product.original_price !== null ? Number(product.original_price) : null,
        imagePath: product.image_path,
        tag: product.tag,
      }))}
    />
  );
}
