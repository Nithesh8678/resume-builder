-- Create a new storage bucket for resume photos
insert into storage.buckets (id, name, public)
values ('resume-photos', 'resume-photos', true)
on conflict (id) do nothing;

-- Set up access policies for the resume-photos bucket

-- Allow public read access to all files in the bucket
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'resume-photos' );

-- Allow authenticated users to upload files to the bucket
create policy "Authenticated users can upload photos"
  on storage.objects for insert
  with check ( bucket_id = 'resume-photos' and auth.role() = 'authenticated' );

-- Allow users to update their own files (optional, but good for re-uploads if naming convention matches)
create policy "Users can update their own photos"
  on storage.objects for update
  using ( bucket_id = 'resume-photos' and auth.uid() = owner )
  with check ( bucket_id = 'resume-photos' and auth.uid() = owner );

-- Allow users to delete their own files
create policy "Users can delete their own photos"
  on storage.objects for delete
  using ( bucket_id = 'resume-photos' and auth.uid() = owner );
