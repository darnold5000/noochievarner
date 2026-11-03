export function getNvbaTenantId(): string {
  const tenantId = process.env.TENANT_ID?.trim();
  if (!tenantId) throw new Error("TENANT_ID is not configured.");
  return tenantId;
}

export function isNvbaCmsConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      process.env.TENANT_ID?.trim(),
  );
}

/** Show owner email/password sign-in (Supabase Auth). Admin saves still need full CMS env. */
export function isNvbaOwnerPortalLoginEnabled(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.TENANT_ID?.trim(),
  );
}
