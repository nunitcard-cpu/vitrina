import { signup } from "@/app/dashboard/auth-actions";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 px-6 py-12">
      <h1 className="font-display text-2xl italic font-semibold text-foreground">
        Create your store
      </h1>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <form action={signup} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm text-foreground/80">
          Store name
          <input
            name="storeName"
            required
            className="rounded-lg border border-gold/20 bg-surface px-3 py-2 text-foreground"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-foreground/80">
          Subdomain
          <div className="flex items-center gap-1">
            <input
              name="slug"
              required
              pattern="[a-z0-9\-]+"
              placeholder="mystore"
              className="w-full rounded-lg border border-gold/20 bg-surface px-3 py-2 text-foreground"
            />
            <span className="whitespace-nowrap text-xs text-foreground/50">.yourdomain.com</span>
          </div>
        </label>
        <label className="flex flex-col gap-1 text-sm text-foreground/80">
          WhatsApp number (country code + digits, no +)
          <input
            name="whatsappNumber"
            required
            placeholder="972501234567"
            className="rounded-lg border border-gold/20 bg-surface px-3 py-2 text-foreground"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-foreground/80">
          Email
          <input
            name="email"
            type="email"
            required
            className="rounded-lg border border-gold/20 bg-surface px-3 py-2 text-foreground"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-foreground/80">
          Password
          <input
            name="password"
            type="password"
            required
            minLength={8}
            className="rounded-lg border border-gold/20 bg-surface px-3 py-2 text-foreground"
          />
        </label>
        <button
          type="submit"
          className="mt-2 rounded-full bg-gradient-to-r from-gold-bright to-gold px-4 py-2.5 text-sm font-semibold text-[#171009]"
        >
          Create store
        </button>
      </form>
      <p className="text-xs text-foreground/50">
        Already have a store?{" "}
        <a href="/dashboard/login" className="underline">
          Log in
        </a>
      </p>
    </div>
  );
}
