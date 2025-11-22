create table if not exists cover_letters (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null default 'Untitled Cover Letter',
  content jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table cover_letters enable row level security;

-- Policies
create policy "Users can view their own cover letters"
  on cover_letters for select
  using (auth.uid() = user_id);

create policy "Users can insert their own cover letters"
  on cover_letters for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own cover letters"
  on cover_letters for update
  using (auth.uid() = user_id);

create policy "Users can delete their own cover letters"
  on cover_letters for delete
  using (auth.uid() = user_id);
