import { redirect } from "next/navigation";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { getNvbaTenantId, isNvbaCmsConfigured } from "@/lib/nvba-config";
import { isNvbaTenantRecord } from "@/lib/nvba-tenant";

export type NvbaAdminRole = "platform_admin" | "tenant_owner" | "tenant_member" | "staff";

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

  const { data: allowed, error: permissionError } = await supabase.rpc("has_tenant_permission", {
    target_tenant_id: tenantId,
    permission_name: "manage_website",
  });

  if (permissionError || !allowed) {
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
