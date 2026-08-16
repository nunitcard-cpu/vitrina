"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ensureTenantForUser } from "@/app/lib/ensure-tenant";

export async function signup(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const storeName = String(formData.get("storeName") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const whatsappNumber = String(formData.get("whatsappNumber") ?? "").trim();

  if (!email || !password || !storeName || !slug || !whatsappNumber) {
    redirect("/dashboard/signup?error=Please+fill+in+every+field.");
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    redirect("/dashboard/signup?error=Subdomain+can+only+contain+lowercase+letters%2C+numbers+and+dashes.");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { store_name: storeName, slug, whatsapp_number: whatsappNumber },
    },
  });

  if (error) {
    redirect(`/dashboard/signup?error=${encodeURIComponent(error.message)}`);
  }

  if (!data.session || !data.user) {
    redirect("/dashboard/login?message=check-email");
  }

  try {
    await ensureTenantForUser(supabase, data.user.id, data.user.user_metadata ?? {});
  } catch (err) {
    redirect(`/dashboard/signup?error=${encodeURIComponent((err as Error).message)}`);
  }

  redirect("/dashboard/products");
}

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect("/dashboard/login?error=Please+enter+your+email+and+password.");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    redirect(`/dashboard/login?error=${encodeURIComponent(error?.message ?? "Invalid credentials.")}`);
  }

  try {
    await ensureTenantForUser(supabase, data.user.id, data.user.user_metadata ?? {});
  } catch (err) {
    redirect(`/dashboard/login?error=${encodeURIComponent((err as Error).message)}`);
  }

  redirect("/dashboard/products");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/dashboard/login");
}
