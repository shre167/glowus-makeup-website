-- =========================================================================
-- GLOWUS BEAUTY & COSMETICS - DATABASE SCHEMA MIGRATION
-- =========================================================================
-- This script configures user profiles sync triggers, product catalogs,
-- orders, order items, and row level security (RLS) policies.
-- Run this in your Supabase project's SQL Editor (https://supabase.com)
-- to instantly configure your backend database!
-- =========================================================================

-- 1. PUBLIC PROFILES TABLE
-- Maps auth.users data to public space for easy relational lookups.
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  first_name text,
  last_name text,
  email text not null,
  avatar_url text,
  updated_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Create Profile RLS Policies
create policy "Allow users to view their own profile" 
  on public.profiles for select 
  using (auth.uid() = id);

create policy "Allow users to update their own profile" 
  on public.profiles for update 
  using (auth.uid() = id);

-- 2. AUTOMATIC USER REGISTRATION PROFILE SYNC TRIGGER
-- Automatically creates a public profile row whenever a new user signs up.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name, email, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'first_name', 'Glowus'),
    coalesce(new.raw_user_meta_data->>'last_name', 'Shopper'),
    new.email,
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger execution binding
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 3. PRODUCT CATALOG TABLE
-- Stores full cosmetic products details, prices, and CDN assets.
create table public.products (
  id text not null primary key,
  name text not null,
  brand text not null,
  price integer not null,
  original_price integer not null,
  description text,
  category text,
  img text not null,
  rating numeric(3,2),
  reviews integer default 0,
  tag text,
  created_at timestamp with time zone default now()
);

-- Enable RLS for Products
alter table public.products enable row level security;

-- Anyone (even guests) can browse products
create policy "Allow public read access to products" 
  on public.products for select 
  using (true);

-- Only authenticated administrators can modify products
create policy "Allow admins to insert products" 
  on public.products for insert 
  with check (auth.role() = 'service_role');


-- 4. CUSTOMER ORDERS & ORDER ITEMS TABLES
-- Stores customer purchases, transactional totals, and individual purchased quantities.
create table public.orders (
  id uuid default gen_random_uuid() not null primary key,
  user_id uuid references auth.users on delete set null,
  email text not null,
  total_price integer not null,
  status text default 'Pending' not null,
  created_at timestamp with time zone default now()
);

create table public.order_items (
  id uuid default gen_random_uuid() not null primary key,
  order_id uuid references public.orders on delete cascade not null,
  product_id text references public.products(id) on delete restrict not null,
  qty integer not null check (qty > 0),
  price integer not null
);

-- Enable RLS for Orders and Order Items
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Orders Policies
create policy "Allow users to view their own orders" 
  on public.orders for select 
  using (auth.uid() = user_id);

create policy "Allow anyone to create an order" 
  on public.orders for insert 
  with check (true);

-- Order Items Policies
create policy "Allow users to view their own purchased items" 
  on public.order_items for select 
  using (
    exists (
      select 1 from public.orders 
      where orders.id = order_items.order_id 
      and orders.user_id = auth.uid()
    )
  );

create policy "Allow anyone to create order items" 
  on public.order_items for insert 
  with check (true);

-- =========================================================================
-- INVENTORY SEED DATA
-- Pre-populates the product tables with standard Glowus catalog products.
-- =========================================================================
insert into public.products (id, name, brand, price, original_price, description, category, img, rating, reviews, tag)
values
  ('sb-matt-lip-01', 'Swiss Beauty Soft Matte Lip Cream - 04 Cafe', 'Swiss Beauty', 229, 299, 'Ultra-creamy matte lipstick with weightless comfort, locking in a flawless hydration cover for up to 8 hours.', 'Lipstick', 'https://img.thecdn.in/365412/1715423851720_SwissBeautySoftMatteLipCream_04Cafe.jpeg?width=300&format=webp', 4.8, 142, 'trending'),
  ('plg-alpha-serum-02', 'Pilgrim Alpha Arbutin & Vitamin C Pigmentation Serum', 'Pilgrim', 449, 549, 'Dermatologist approved skin brightening serum enriched with Korean Jeju secrets to reduce dark spots and acne blemishes.', 'Serum', 'https://img.thecdn.in/365412/1715600219488_PilgrimAlphaArbutinVitaminCPigmentationSerum.jpeg?width=300&format=webp', 4.9, 96, 'bestseller'),
  ('mars-kit-03', 'Mars City Paradise Complete Face Makeup Kit - 02 Pink', 'Mars', 349, 449, 'Complete travel-friendly makeup palette featuring high-pigmented blushes, eyeshadows, and premium skin highlighters.', 'Makeup Kit', 'https://img.thecdn.in/365412/1715694218314_MarsCityParadiseMakeupKit_02Pink.jpeg?width=300&format=webp', 4.7, 78, 'trending'),
  ('bio-smooth-shamp-04', 'Biolage Smoothproof Professional Camellia Conditioner & Shampoo Set', 'Biolage', 899, 1199, 'Intense professional anti-frizz smoothing treatment infused with natural Camellia extracts to control humidity frizz.', 'Hair Care', 'https://img.thecdn.in/365412/1715893201492_BiolageSmoothproofProfessionalSet.jpeg?width=300&format=webp', 4.9, 120, 'bestseller')
on conflict (id) do update 
set name = excluded.name, price = excluded.price, img = excluded.img;
