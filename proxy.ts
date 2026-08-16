import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// e.g. "yourdomain.com" — the domain each store's subdomain lives under.
// Set NEXT_PUBLIC_ROOT_DOMAIN once the real domain is connected; until
// then every host falls back to apex behavior (marketing/dashboard).
const rootDomain = (process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "").toLowerCase();

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? "";
  const hostname = host.split(":")[0];

  // Local dev override: `?tenant=elamar` or `elamar.lvh.me:3000` work
  // without touching /etc/hosts or DNS.
  const slug =
    request.nextUrl.searchParams.get("tenant") ?? extractSubdomain(hostname);

  const requestHeaders = new Headers(request.headers);
  if (slug) {
    requestHeaders.set("x-tenant-slug", slug);
  }

  let response = NextResponse.next({ request: { headers: requestHeaders } });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  // Server Components can't write cookies (see lib/supabase/server.ts), so
  // if Supabase rotates the access/refresh token during a page render, the
  // new cookies are silently dropped and the next request's stale refresh
  // token gets rejected — signing the user out. Refreshing here and
  // forwarding the result on every request is Supabase's documented fix.
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request: { headers: requestHeaders } });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  await supabase.auth.getUser();

  return response;
}

function extractSubdomain(hostname: string): string | null {
  if (hostname.endsWith(".lvh.me")) {
    const sub = hostname.slice(0, -".lvh.me".length);
    return sub && sub !== "www" ? sub : null;
  }

  if (!rootDomain || hostname === rootDomain || hostname === "localhost") {
    return null;
  }

  if (hostname.endsWith(`.${rootDomain}`)) {
    const sub = hostname.slice(0, -(rootDomain.length + 1));
    return sub && sub !== "www" ? sub : null;
  }

  return null;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
