-- Run this in your Supabase SQL editor

create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  student_name text not null,
  grade text not null,
  school text,
  target_universities text[] default '{}',
  intended_major text,
  timeline text not null,
  parent_name text not null,
  email text not null,
  phone text not null,
  how_heard text
);

-- Enable Row Level Security
alter table leads enable row level security;

-- Allow anyone to insert (your form submissions)
create policy "Allow public inserts" on leads
  for insert to anon
  with check (true);

-- Only authenticated users (you) can read leads
create policy "Allow authenticated reads" on leads
  for select to authenticated
  using (true);

-- Index for faster queries
create index leads_created_at_idx on leads (created_at desc);
create index leads_email_idx on leads (email);
