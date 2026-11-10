-- Migration 001: NVBA website CMS content types, tenant helpers, and media bucket.

create or replace function public.is_nvba_tenant(target_tenant_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.tenants t
    where t.id = target_tenant_id
      and (
        lower(t.display_name) in (
          'noochie varner baseball academy',
          'noochie varner baseball academy (nvba)',
          'nvba'
        )
        or lower(t.slug) in (
          'noochie-varner-baseball-academy',
          'noochie-varner',
          'nvba',
          'noochievarner'
        )
      )
  );
$$;

revoke all on function public.is_nvba_tenant(uuid) from public;
grant execute on function public.is_nvba_tenant(uuid) to anon, authenticated;

alter table public.tenant_content_items drop constraint if exists tenant_content_items_content_type_check;

alter table public.tenant_content_items add constraint tenant_content_items_content_type_check check (
  content_type in (
    'tournament',
    'tournament_resource',
    'staff',
    'travel_team_coach',
    'business_staff',
    'training_offering',
    'program',
    'hittrax_league',
    'facility_section',
    'facility_stat',
    'homepage',
    'site_settings',
    'instructor',
    'lesson',
    'membership_display',
    'pro_shop_vendor',
    'pro_shop_settings',
    'nvba_service',
    'about_settings',
    'facility_settings',
    'facility_feature',
    'contact_settings',
    'contact_topic',
    'gallery_photo',
    'news_article',
    'sponsor',
    'services_intro'
  )
);

insert into storage.buckets (id, name, public)
values ('nvba-media', 'nvba-media', true)
on conflict (id) do nothing;

create or replace function public.is_nvba_media_staff(object_name text)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if object_name !~ '^[0-9a-fA-F-]{36}/' then
    return false;
  end if;
  return public.is_nvba_tenant(split_part(object_name, '/', 1)::uuid)
    and public.is_tenant_website_staff(split_part(object_name, '/', 1)::uuid);
end;
$$;

revoke all on function public.is_nvba_media_staff(text) from public;
grant execute on function public.is_nvba_media_staff(text) to authenticated;

drop policy if exists nvba_media_public_read on storage.objects;
create policy nvba_media_public_read on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'nvba-media');

drop policy if exists nvba_media_staff_insert on storage.objects;
create policy nvba_media_staff_insert on storage.objects
  for insert to authenticated
  with check (bucket_id = 'nvba-media' and public.is_nvba_media_staff(name));

drop policy if exists nvba_media_staff_update on storage.objects;
create policy nvba_media_staff_update on storage.objects
  for update to authenticated
  using (bucket_id = 'nvba-media' and public.is_nvba_media_staff(name))
  with check (bucket_id = 'nvba-media' and public.is_nvba_media_staff(name));

drop policy if exists nvba_media_staff_delete on storage.objects;
create policy nvba_media_staff_delete on storage.objects
  for delete to authenticated
  using (bucket_id = 'nvba-media' and public.is_nvba_media_staff(name));

notify pgrst, 'reload schema';
