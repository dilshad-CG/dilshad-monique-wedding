-- RSVP table for the wedding invitation site.
-- Run this in the Supabase SQL editor.

create table if not exists public.rsvp_guests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  attending boolean not null default false,
  guests integer not null default 0,
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

-- NOTE: there is intentionally NO public SELECT policy on rsvp_guests, so
-- private fields (email, phone, message) can never be read by the public.

-- Public, privacy-safe view powering the "Who's Celebrating" list.
-- It exposes ONLY names + guest counts of people who are attending.
-- Created without security_invoker, so it runs as the owner and bypasses the
-- base-table RLS for exactly these safe columns.
create or replace view public.public_attendees as
  select full_name, guests, attending, created_at
  from public.rsvp_guests
  where attending = true;

grant select on public.public_attendees to anon;
