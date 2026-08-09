-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query).

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  audience text not null check (audience in ('nha-xe', 'tram-dung-nghi', 'tai-xe')),
  product text check (
    product in ('trai-nghiem', 'hanh-trinh', 'co-thuong', 'vip', 'chua-chac')
  ),
  note text,
  created_at timestamptz not null default now()
);

create index if not exists leads_phone_idx on public.leads (phone);
create index if not exists leads_email_idx on public.leads (lower(email));

-- RLS is enabled with NO policies for anon/authenticated — default-deny.
-- Only the server, using SUPABASE_SERVICE_ROLE_KEY (which bypasses RLS),
-- can read or write this table. The anon key (safe to expose to the
-- browser) gets zero access, since lead data is private business data,
-- not something the site itself queries directly from the client.
alter table public.leads enable row level security;
