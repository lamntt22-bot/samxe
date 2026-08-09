-- Run this in the Supabase SQL editor (Project → SQL Editor → New query).
-- Safe to re-run: uses IF NOT EXISTS / OR REPLACE where possible.

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null unique,
  email text not null unique,
  password_hash text not null,
  role text not null default 'member' check (role in ('member', 'admin')),
  audience text not null check (audience in ('nha-xe', 'tram-dung-nghi', 'tai-xe')),
  interested_product text check (
    interested_product in ('trai-nghiem', 'hanh-trinh', 'co-thuong', 'vip', 'chua-chac')
  ),
  note text,
  must_change_password boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists members_phone_idx on public.members (phone);
create index if not exists members_email_idx on public.members (lower(email));

-- Dealer levels (RULE-set below) are computed from cumulative order revenue —
-- no manual "upgrade request" approval anymore, so the old free/doi-tac
-- tier column and upgrade_requests table from the previous version are gone.
alter table public.members drop column if exists tier;
drop table if exists public.upgrade_requests;

-- Who referred this member (affiliate) — set once at registration time.
alter table public.members
  add column if not exists referred_by uuid references public.members(id) on delete set null;

create index if not exists members_referred_by_idx on public.members (referred_by);

-- Revenue ledger. Admin records a row per confirmed purchase; a member's
-- cumulative revenue (and therefore dealer level) is the sum of their rows.
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members(id) on delete cascade,
  amount numeric not null check (amount > 0),
  note text,
  created_at timestamptz not null default now()
);

create index if not exists orders_member_idx on public.orders (member_id);

-- RLS enabled with NO policies for anon/authenticated — default-deny.
-- Only the server, using SUPABASE_SERVICE_ROLE_KEY (which bypasses RLS),
-- can read or write these tables. Every access path (register, login,
-- dashboard, admin) goes through our own API routes, which verify the
-- session/role server-side before touching the database.
alter table public.members enable row level security;
alter table public.orders enable row level security;
