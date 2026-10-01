-- ASWOORODA TRAVELS - production booking + WhatsApp event schema
-- Run in Supabase SQL Editor.

create table if not exists public.bookings (
  id text primary key,
  customer_name text not null,
  mobile text not null,
  whatsapp text,
  pickup text not null,
  destination text not null,
  travel_date date not null,
  pickup_time text,
  travellers integer default 1,
  package_name text,
  vehicle_name text,
  total_price numeric(12,2),
  special_notes text,
  status text not null default 'NEW' check (status in ('NEW','CONTACTED','CONFIRMED','COMPLETED','CANCELLED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bookings_status_idx on public.bookings(status);
create index if not exists bookings_travel_date_idx on public.bookings(travel_date);

create or replace function public.set_booking_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists bookings_set_updated_at on public.bookings;
create trigger bookings_set_updated_at
before update on public.bookings
for each row execute function public.set_booking_updated_at();

alter table public.bookings enable row level security;

-- Customers can create a request. Do not add a public SELECT policy that exposes every booking.
drop policy if exists "public can create booking" on public.bookings;
create policy "public can create booking"
on public.bookings for insert
with check (true);

-- The current frontend keeps the local owner dashboard for compatibility.
-- For production, protect owner reads/updates with Supabase Auth before enabling them.

-- Database Webhook setup (recommended):
-- Supabase Dashboard -> Database -> Webhooks -> Create webhook
-- Table: public.bookings
-- Events: INSERT + UPDATE
-- Target: Edge Function -> whatsapp-notify
-- Method: POST
-- Add the function's service-key auth header.
-- The webhook payload contains { type, table, schema, record, old_record }.

-- Fleet management
create table if not exists public.vehicles (
  id text primary key,
  name text not null,
  type text,
  capacity text,
  start_price numeric(12,2) default 0,
  price_per_km text,
  ac boolean default true,
  luggage text,
  image text,
  rating numeric(3,1) default 5,
  registration_number text,
  driver_name text,
  status text not null default 'AVAILABLE' check (status in ('AVAILABLE','BOOKED','MAINTENANCE','INACTIVE')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.vehicles enable row level security;
drop policy if exists "public can read active fleet" on public.vehicles;
create policy "public can read active fleet" on public.vehicles for select using (true);

-- For production owner writes should be protected with Supabase Auth/owner role.
