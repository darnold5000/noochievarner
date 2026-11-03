import { redirect } from "next/navigation";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { getNvbaTenantId, isNvbaCmsConfigured } from "@/lib/nvba-config";
import { isNvbaTenantRecord } from "@/lib/nvba-tenant";

export type NvbaAdminRole = "platform_admin" | "tenant_owner" | "tenant_member" | "staff";

async function userCanManageWebsite(
  serviceDb: ReturnType<typeof createServiceClient>,
  userId: string,
  tenantId: string,
): Promise<boolean> {
  const { data: membership, error: membershipError } = await serviceDb
    .from("tenant_memberships")
    .select("role_id")
    .eq("tenant_id", tenantId)
    .eq("user_id", userId)
    .eq("status", "active")
    .maybeSingle();

  if (membershipError || !membership?.role_id) return false;

  const { data: rolePerms, error: permError } = await serviceDb
    .from("role_permissions")
    .select("permissions(name)")
    .eq("role_id", membership.role_id);

  if (permError || !rolePerms?.length) {
    return await membershipHasOwnerWebsiteRole(serviceDb, userId, tenantId);
  }

  const hasPermission = rolePerms.some((row) => {
    const permission = row.permissions as { name?: string } | { name?: string }[] | null;
    const names = Array.isArray(permission)
      ? permission.map((item) => item.name)
      : [permission?.name];
    return names.includes("manage_website");
  });

  if (hasPermission) return true;
  return membershipHasOwnerWebsiteRole(serviceDb, userId, tenantId);
}

async function membershipHasOwnerWebsiteRole(
  serviceDb: ReturnType<typeof createServiceClient>,
  userId: string,
  tenantId: string,
): Promise<boolean> {
  const { data: membership, error } = await serviceDb
    .from("tenant_memberships")
    .select("roles(slug)")
    .eq("tenant_id", tenantId)
    .eq("user_id", userId)
    .eq("status", "active")
    .maybeSingle();

  if (error || !membership) return false;
  const slug = (membership.roles as { slug?: string } | null)?.slug;
  return slug === "tenant_owner" || slug === "platform_admin" || slug === "website_manager";
}

export async function requireNvbaStaff() {
  if (!isNvbaCmsConfigured()) {
    redirect("/login?error=cms_unavailable");
  }

  const tenantId = getNvbaTenantId();
  const serviceDb = createServiceClient();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: tenant } = await serviceDb
    .from("tenants")
    .select("id, slug, display_name")
    .eq("id", tenantId)
    .maybeSingle();

  if (!tenant || tenant.id !== tenantId || !isNvbaTenantRecord(tenant)) {
    redirect("/login?error=tenant_misconfigured");
  }

  if (!user) redirect("/login?returnTo=/admin");

  const { data: rpcAllowed, error: permissionError } = await supabase.rpc("has_tenant_permission", {
    target_tenant_id: tenantId,
    permission_name: "manage_website",
  });

  const allowed =
    !permissionError && rpcAllowed
      ? true
      : await userCanManageWebsite(serviceDb, user.id, tenantId);

  if (!allowed) {
    redirect("/login?error=staff_not_authorized");
  }

  const { data: membership } = await serviceDb
    .from("tenant_memberships")
    .select("roles(slug)")
    .eq("tenant_id", tenantId)
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  const role = ((membership?.roles as { slug?: string } | null)?.slug ?? "staff") as NvbaAdminRole;
  return { user, db: serviceDb, tenantId, role };
}
