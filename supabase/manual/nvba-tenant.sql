-- Manual reference: ensure NVBA tenant exists on the shared Signal Works platform before seeding CMS content.
-- Replace :tenant_id after creating the tenant in Supabase.

-- Example:
-- insert into public.tenants (slug, display_name) values
--   ('noochie-varner-baseball-academy', 'Noochie Varner Baseball Academy')
-- on conflict do nothing;

-- Grant an owner user manage_website on that tenant via tenant_memberships + role permissions.
