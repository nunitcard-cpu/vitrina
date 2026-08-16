import type { SupabaseClient } from "@supabase/supabase-js";

export async function ensureTenantForUser(
  supabase: SupabaseClient,
  userId: string,
  metadata: Record<string, unknown>
): Promise<string> {
  const { data: existing } = await supabase
    .from("profiles")
    .select("tenant_id")
    .eq("id", userId)
    .maybeSingle();

  if (existing) return existing.tenant_id as string;

  const storeName = String(metadata.store_name ?? "").trim();
  const slug = String(metadata.slug ?? "").trim();
  const whatsappNumber = String(metadata.whatsapp_number ?? "").trim();

  if (!storeName || !slug || !whatsappNumber) {
    throw new Error("Missing store details for this account.");
  }

  const { data: tenant, error: tenantError } = await supabase
    .from("tenants")
    .insert({ store_name: storeName, slug, whatsapp_number: whatsappNumber })
    .select("id")
    .single();

  if (tenantError) {
    if (tenantError.code === "23505") {
      throw new Error("That subdomain is already taken.");
    }
    throw tenantError;
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .insert({ id: userId, tenant_id: tenant.id });

  if (profileError) throw profileError;

  return tenant.id as string;
}
