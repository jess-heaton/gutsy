-- Gutsy schema. Run this in the Supabase SQL editor.
-- Safe to re-run: uses IF NOT EXISTS / CREATE OR REPLACE where possible.

create extension if not exists "pgcrypto";

-- ── profiles ────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  phase text default 'elimination',
  start_date date default current_date,
  created_at timestamptz default now()
);

-- ── entries (meals / bowel / symptom / note) ────────────────────────────────
create table if not exists public.entries (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  time text not null,
  type text not null check (type in ('meal','bowel','symptom','note')),
  payload jsonb not null,
  created_at timestamptz default now()
);
create index if not exists entries_user_date_idx on public.entries(user_id, date desc);

-- ── saved recipes ───────────────────────────────────────────────────────────
create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  source_url text,
  image_url text,
  original_text text,
  fixed_text text,
  fodmap_summary jsonb,
  ingredients jsonb,
  swaps jsonb,
  notes jsonb,
  tags jsonb,
  emoji text,
  accent text,
  total_time text,
  servings text,
  confidence text,
  created_at timestamptz default now()
);
create index if not exists recipes_user_idx on public.recipes(user_id, created_at desc);

-- Backfill new columns on existing installs
alter table public.recipes add column if not exists notes jsonb;
alter table public.recipes add column if not exists tags jsonb;
alter table public.recipes add column if not exists emoji text;
alter table public.recipes add column if not exists accent text;
alter table public.recipes add column if not exists total_time text;
alter table public.recipes add column if not exists servings text;
alter table public.recipes add column if not exists confidence text;

-- ── menu scans (shareable) ──────────────────────────────────────────────────
create table if not exists public.menu_scans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  slug text unique not null,
  restaurant text,
  image_url text,
  analysis jsonb not null,
  is_public boolean not null default false,
  created_at timestamptz default now()
);
create index if not exists menu_scans_user_idx on public.menu_scans(user_id, created_at desc);
create index if not exists menu_scans_slug_idx on public.menu_scans(slug);

-- ── RLS ─────────────────────────────────────────────────────────────────────
alter table public.profiles   enable row level security;
alter table public.entries    enable row level security;
alter table public.recipes    enable row level security;
alter table public.menu_scans enable row level security;

-- profiles: user manages own row
drop policy if exists "profiles self" on public.profiles;
create policy "profiles self" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- entries: user manages own rows
drop policy if exists "entries self" on public.entries;
create policy "entries self" on public.entries
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- recipes: user manages own rows
drop policy if exists "recipes self" on public.recipes;
create policy "recipes self" on public.recipes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- menu_scans: owner manages; anyone can read if is_public
drop policy if exists "menu_scans owner all"  on public.menu_scans;
drop policy if exists "menu_scans public read" on public.menu_scans;
create policy "menu_scans owner all" on public.menu_scans
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "menu_scans public read" on public.menu_scans
  for select using (is_public = true);

-- ── auto-create profile on signup ───────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email,'@',1)))
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
