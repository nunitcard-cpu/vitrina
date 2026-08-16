-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query).
-- Multi-tenant schema: one store owner (auth.users) -> one tenant -> many products.

create extension if not exists "pgcrypto";

create table tenants (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  store_name text not null,
  tagline text,
  whatsapp_number text not null,
  instagram_handle text,
  phone_display text,
  location text,
  created_at timestamptz not null default now()
);

create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  tenant_id uuid not null references tenants (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants (id) on delete cascade,
  name text not null,
  price numeric(10, 2) not null,
  original_price numeric(10, 2),
  image_path text not null,
  tag text check (tag in ('New', 'Bestseller', 'Sale')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index products_tenant_id_idx on products (tenant_id);

alter table tenants enable row level security;
alter table profiles enable row level security;
alter table products enable row level security;

-- tenants: anyone can read (storefronts are public); an authenticated user
-- with no existing store yet may create exactly one; an owner may update
-- their own store's details.
create policy "tenants are publicly readable"
  on tenants for select
  using (true);

create policy "authenticated users without a store can create one"
  on tenants for insert
  to authenticated
  with check (
    not exists (select 1 from profiles where profiles.id = auth.uid())
  );

create policy "owners can update their own store"
  on tenants for update
  to authenticated
  using (id in (select tenant_id from profiles where profiles.id = auth.uid()));

-- profiles: a user can only see/create their own profile row.
create policy "users can read their own profile"
  on profiles for select
  to authenticated
  using (id = auth.uid());

create policy "users can create their own profile"
  on profiles for insert
  to authenticated
  with check (id = auth.uid());

-- products: publicly readable (storefronts); writable only by the owning
-- tenant's store owner.
create policy "products are publicly readable"
  on products for select
  using (true);

create policy "owners can insert their own products"
  on products for insert
  to authenticated
  with check (
    tenant_id in (select tenant_id from profiles where profiles.id = auth.uid())
  );

create policy "owners can update their own products"
  on products for update
  to authenticated
  using (
    tenant_id in (select tenant_id from profiles where profiles.id = auth.uid())
  );

create policy "owners can delete their own products"
  on products for delete
  to authenticated
  using (
    tenant_id in (select tenant_id from profiles where profiles.id = auth.uid())
  );

-- Storage: a public bucket for product images, one folder per tenant
-- (path convention: "<tenant_id>/<file>"). Anyone can view; only the
-- owning tenant's store owner can write into their own folder.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "product images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "owners can upload into their own folder"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'product-images'
    and (storage.foldername(name))[1] = (
      select tenant_id::text from profiles where profiles.id = auth.uid()
    )
  );

create policy "owners can update files in their own folder"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'product-images'
    and (storage.foldername(name))[1] = (
      select tenant_id::text from profiles where profiles.id = auth.uid()
    )
  );

create policy "owners can delete files in their own folder"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'product-images'
    and (storage.foldername(name))[1] = (
      select tenant_id::text from profiles where profiles.id = auth.uid()
    )
  );

-- Seed data: the existing "El Amar" demo store, migrated from the old
-- hardcoded app/lib/store.ts + app/lib/i18n.ts. Images keep pointing at
-- the files already shipped in public/products/ (no owner account for
-- this tenant, since it predates the dashboard).
insert into tenants (id, slug, store_name, tagline, whatsapp_number, instagram_handle, phone_display, location)
values (
  '11111111-1111-1111-1111-111111111111',
  'elamar',
  'El Amar',
  'Modern luxury, made effortless',
  '972584044277',
  '@elamar',
  '+972 58 404 4277',
  'Tel Aviv'
);

insert into products (tenant_id, name, price, original_price, image_path, tag, sort_order)
values
  ('11111111-1111-1111-1111-111111111111', 'Tufted Beige Platform Bed', 2190, null, '/products/tufted-beige-bed.jpg', 'New', 1),
  ('11111111-1111-1111-1111-111111111111', 'Graphite Velvet Wingback Bed', 2590, null, '/products/velvet-wingback-bed.jpg', 'Bestseller', 2),
  ('11111111-1111-1111-1111-111111111111', 'Ivory Tufted Leather Bed', 2890, 3290, '/products/tufted-leather-bed.png', 'Sale', 3),
  ('11111111-1111-1111-1111-111111111111', 'Complete Bedroom Set', 1890, null, '/products/bedroom-set-bundle.jpg', null, 4),
  ('11111111-1111-1111-1111-111111111111', 'Blush Channel-Tufted Bed', 2390, null, '/products/blush-channel-bed.jpg', 'New', 5),
  ('11111111-1111-1111-1111-111111111111', 'Noir Velvet Sofa', 3490, null, '/products/noir-velvet-sofa.jpg', 'Bestseller', 6),
  ('11111111-1111-1111-1111-111111111111', 'Navy Channel-Tufted Sofa', 3190, null, '/products/navy-channel-sofa.png', null, 7),
  ('11111111-1111-1111-1111-111111111111', 'Blush Velvet Armchair', 1290, null, '/products/blush-velvet-armchair.jpg', null, 8),
  ('11111111-1111-1111-1111-111111111111', 'Rose Tufted Bed Frame', 1690, 2090, '/products/rose-tufted-bedframe.png', 'Sale', 9);
