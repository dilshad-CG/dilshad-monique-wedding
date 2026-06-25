-- RSVP table for the wedding invitation site.
-- Run this in the Supabase SQL editor.

create table if not exists public.rsvp_guests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  attending boolean not null default false,
  guests integer not null default 0,
  dietary_requirements text,
  message text,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security.
alter table public.rsvp_guests enable row level security;

-- Allow anonymous guests to submit (insert) their RSVP from the website.
create policy "Public can submit RSVP"
  on public.rsvp_guests
  for insert
  to anon
  with check (true);

-- Note: no public SELECT policy — responses are private to the couple,
-- readable only via the Supabase dashboard / service role.
