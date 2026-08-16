import { login } from "@/app/dashboard/auth-actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 px-6 py-12">
      <h1 className="font-display text-2xl italic font-semibold text-foreground">
        Store owner login
      </h1>
      {message === "check-email" && (
        <p className="text-sm text-foreground/70">
          Check your email to confirm your account, then log in here.
        </p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
      <form action={login} className="flex flex-col gap-3">
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
            className="rounded-lg border border-gold/20 bg-surface px-3 py-2 text-foreground"
          />
        </label>
        <button
          type="submit"
          className="mt-2 rounded-full bg-gradient-to-r from-gold-bright to-gold px-4 py-2.5 text-sm font-semibold text-[#171009]"
        >
          Log in
        </button>
      </form>
      <p className="text-xs text-foreground/50">
        New here?{" "}
        <a href="/dashboard/signup" className="underline">
          Create a store
        </a>
      </p>
    </div>
  );
}
