"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

async function requireTenantId(supabase: SupabaseServerClient): Promise<string> {
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

  return profile.tenant_id as string;
}

function readProductFields(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const price = Number(formData.get("price"));
  const originalPriceRaw = formData.get("originalPrice");
  const originalPrice =
    originalPriceRaw && String(originalPriceRaw).trim() !== "" ? Number(originalPriceRaw) : null;
  const imagePath = String(formData.get("imagePath") ?? "").trim();
  const tagRaw = String(formData.get("tag") ?? "");
  const tag = tagRaw === "" ? null : tagRaw;

  if (!name || !Number.isFinite(price) || !imagePath) {
    throw new Error("Missing required product fields.");
  }

  return { name, price, originalPrice, imagePath, tag };
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();
  const tenantId = await requireTenantId(supabase);
  const fields = readProductFields(formData);

  const { error } = await supabase.from("products").insert({
    tenant_id: tenantId,
    name: fields.name,
    price: fields.price,
    original_price: fields.originalPrice,
    image_path: fields.imagePath,
    tag: fields.tag,
  });

  if (error) throw error;

  revalidatePath("/dashboard/products");
}

export async function updateProduct(productId: string, formData: FormData) {
  const supabase = await createClient();
  const tenantId = await requireTenantId(supabase);
  const fields = readProductFields(formData);

  const { error } = await supabase
    .from("products")
    .update({
      name: fields.name,
      price: fields.price,
      original_price: fields.originalPrice,
      image_path: fields.imagePath,
      tag: fields.tag,
    })
    .eq("id", productId)
    .eq("tenant_id", tenantId);

  if (error) throw error;

  revalidatePath("/dashboard/products");
}

export async function deleteProduct(productId: string) {
  const supabase = await createClient();
  const tenantId = await requireTenantId(supabase);

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId)
    .eq("tenant_id", tenantId);

  if (error) throw error;

  revalidatePath("/dashboard/products");
}
