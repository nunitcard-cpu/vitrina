import type { TagKey } from "@/app/lib/i18n";

export type Tenant = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  whatsappNumber: string;
  instagramHandle: string | null;
  phoneDisplay: string | null;
  location: string | null;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  tag?: TagKey | null;
};

export function whatsappLink(whatsappNumber: string, message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encoded}`;
}
