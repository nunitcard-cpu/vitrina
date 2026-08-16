import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createProduct } from "@/app/dashboard/actions";
import { logout } from "@/app/dashboard/auth-actions";
import ProductForm from "./product-form";
import ProductRow from "./product-row";

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
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl italic font-semibold text-foreground">
            {tenant?.store_name}
          </h1>
          <p className="text-xs text-foreground/50">{tenant?.slug}.yourdomain.com</p>
        </div>
        <form action={logout}>
          <button type="submit" className="text-xs text-foreground/50 underline">
            Log out
          </button>
        </form>
      </div>

      <div className="mb-8 flex flex-col gap-3">
        {(products ?? []).map((product) => (
          <ProductRow
            key={product.id}
            tenantId={profile.tenant_id}
            product={{
              id: product.id,
              name: product.name,
              price: Number(product.price),
              originalPrice:
                product.original_price !== null ? Number(product.original_price) : null,
              imagePath: product.image_path,
              tag: product.tag,
            }}
          />
        ))}
        {(products ?? []).length === 0 && (
          <p className="text-sm text-foreground/50">No products yet — add your first one below.</p>
        )}
      </div>

      <div className="rounded-2xl border border-gold/15 bg-surface p-4">
        <h2 className="mb-3 text-sm font-semibold text-foreground">Add a product</h2>
        <ProductForm tenantId={profile.tenant_id} action={createProduct} />
      </div>
    </div>
  );
}
