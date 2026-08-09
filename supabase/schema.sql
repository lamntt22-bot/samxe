-- Run this in the Supabase SQL editor (Project → SQL Editor → New query).
-- Safe to re-run: uses IF NOT EXISTS / OR REPLACE where possible.

-- Drop the old leads-only table from the earlier (pre-account) version of
-- the site — members now supersedes it (superset of the same fields).
drop table if exists public.leads;

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null unique,
  email text not null unique,
  password_hash text not null,
  role text not null default 'member' check (role in ('member', 'admin')),
  tier text not null default 'free' check (tier in ('free', 'doi-tac')),
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

create table if not exists public.upgrade_requests (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  note text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index if not exists upgrade_requests_member_idx on public.upgrade_requests (member_id);
create index if not exists upgrade_requests_status_idx on public.upgrade_requests (status);

-- RLS enabled with NO policies for anon/authenticated — default-deny.
-- Only the server, using SUPABASE_SERVICE_ROLE_KEY (which bypasses RLS),
-- can read or write these tables. Every access path (register, login,
-- dashboard, admin) goes through our own API routes, which verify the
-- session/role server-side before touching the database.
alter table public.members enable row level security;
alter table public.upgrade_requests enable row level security;
