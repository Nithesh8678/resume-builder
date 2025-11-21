-- Create the resumes table
create table if not exists resumes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text default 'Untitled Resume',
  content jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table resumes enable row level security;

-- Create policies
create policy "Users can view their own resumes"
  on resumes for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own resumes"
  on resumes for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own resumes"
  on resumes for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own resumes"
  on resumes for delete
  using ( auth.uid() = user_id );

-- Create a function to handle updated_at
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create a trigger for updated_at
create trigger handle_resumes_updated_at
  before update on resumes
  for each row
  execute procedure handle_updated_at();
