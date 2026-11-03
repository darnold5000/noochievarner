-- Allow authenticated staff to call permission RPC from the browser-bound Supabase client.
grant execute on function public.has_tenant_permission(uuid, text) to authenticated;

-- Client portal owners need CMS access; some projects were missing this link on tenant_owner.
insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
cross join public.permissions p
where r.slug = 'tenant_owner'
  and r.tenant_id is null
  and p.name = 'manage_website'
on conflict do nothing;

-- Align DB tenant guard with production NVBA slug.
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
        lower(t.display_name) like '%noochie varner%'
        or lower(t.display_name) in (
          'noochie varner baseball academy',
          'noochie varner baseball academy (nvba)',
          'nvba'
        )
        or lower(t.slug) in (
          'noochie-varner-baseball-academy',
          'noochie-varner-baseball-softball-academy-2',
          'noochie-varner',
          'nvba',
          'noochievarner'
        )
      )
  );
$$;

notify pgrst, 'reload schema';
