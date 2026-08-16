import SignupForm from "./signup-form";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "yourdomain.com";

  return <SignupForm error={error} rootDomain={rootDomain} />;
}
