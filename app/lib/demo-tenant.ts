import type { Product, Tenant } from "@/app/lib/store";

// Local fallback so the storefront renders before Supabase is connected.
// Mirrors the seed data in supabase/migration.sql. Only used when
// NEXT_PUBLIC_SUPABASE_URL is unset — once real credentials are added,
// getTenantBySlug reads from the database instead.
export const demoTenant: Tenant = {
  id: "11111111-1111-1111-1111-111111111111",
  slug: "elamar",
  name: "El Amar",
  tagline: "Modern luxury, made effortless",
  whatsappNumber: "972584044277",
  instagramHandle: "@elamar",
  phoneDisplay: "+972 58 404 4277",
  location: "Tel Aviv",
};

export const demoProducts: Product[] = [
  { id: "tufted-beige-bed", name: "Tufted Beige Platform Bed", price: 2190, image: "/products/tufted-beige-bed.jpg", tag: "New" },
  { id: "velvet-wingback-bed", name: "Graphite Velvet Wingback Bed", price: 2590, image: "/products/velvet-wingback-bed.jpg", tag: "Bestseller" },
  { id: "tufted-leather-bed", name: "Ivory Tufted Leather Bed", price: 2890, originalPrice: 3290, image: "/products/tufted-leather-bed.png", tag: "Sale" },
  { id: "bedroom-set-bundle", name: "Complete Bedroom Set", price: 1890, image: "/products/bedroom-set-bundle.jpg" },
  { id: "blush-channel-bed", name: "Blush Channel-Tufted Bed", price: 2390, image: "/products/blush-channel-bed.jpg", tag: "New" },
  { id: "noir-velvet-sofa", name: "Noir Velvet Sofa", price: 3490, image: "/products/noir-velvet-sofa.jpg", tag: "Bestseller" },
  { id: "navy-channel-sofa", name: "Navy Channel-Tufted Sofa", price: 3190, image: "/products/navy-channel-sofa.png" },
  { id: "blush-velvet-armchair", name: "Blush Velvet Armchair", price: 1290, image: "/products/blush-velvet-armchair.jpg" },
  { id: "rose-tufted-bedframe", name: "Rose Tufted Bed Frame", price: 1690, originalPrice: 2090, image: "/products/rose-tufted-bedframe.png", tag: "Sale" },
];
