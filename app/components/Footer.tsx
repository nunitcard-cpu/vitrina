"use client";

import type { Tenant } from "@/app/lib/store";

export default function Footer({ tenant }: { tenant: Tenant }) {
  return (
    <footer className="mx-auto mt-8 w-full max-w-md px-4 pb-28 pt-6 text-center sm:max-w-2xl sm:px-6">
      <p className="font-display text-lg italic font-semibold text-gold-bright">
        {tenant.name}
      </p>
      <p className="mt-1 text-xs text-foreground/50">
        {[tenant.location, tenant.phoneDisplay].filter(Boolean).join(" · ")}
      </p>
      {tenant.instagramHandle && (
        <p className="mt-1 text-xs text-foreground/40">{tenant.instagramHandle}</p>
      )}
    </footer>
  );
}
