-- Run in Supabase SQL Editor on the NVBA / shared Signal Works project.
-- Fixes "not authorized to edit website content" when owners have tenant_owner but
-- role_permissions was never linked to manage_website on this database.

insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
cross join public.permissions p
where r.slug = 'tenant_owner'
  and r.tenant_id is null
  and p.name = 'manage_website'
on conflict do nothing;

-- Optional: Sluggers-style per-tenant website_manager for NVBA (replace tenant id if needed)
-- insert into public.roles (tenant_id, slug, name)
-- select 'ae8039cb-3626-4dd0-9e0b-8765e52ed0c4', 'website_manager', 'Website Manager'
-- where not exists (
--   select 1 from public.roles
--   where tenant_id = 'ae8039cb-3626-4dd0-9e0b-8765e52ed0c4' and slug = 'website_manager'
-- );

grant execute on function public.has_tenant_permission(uuid, text) to authenticated;
