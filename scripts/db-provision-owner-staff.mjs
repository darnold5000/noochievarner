#!/usr/bin/env node
/**
 * Grant NVBA owner website portal access (/admin) via tenant_memberships + tenant_owner role.
 *
 * Usage:
 *   STAFF_EMAIL=noochie@noochievarnerbaseball.com npm run db:provision-owner-staff
 *   STAFF_AUTH_USER_ID=<uuid> npm run db:provision-owner-staff
 *
 * Requires .env.local: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, TENANT_ID (NVBA tenant only).
 * Does not create Auth users or passwords.
 */
import { loadEnvLocal, projectRoot } from "./load-env.mjs";

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const tenantId = process.env.TENANT_ID?.trim();
const staffEmailInput = process.env.STAFF_EMAIL?.trim().toLowerCase();
const staffAuthUserIdInput = process.env.STAFF_AUTH_USER_ID?.trim();

const NVBA_SLUGS = new Set([
  "noochie-varner-baseball-academy",
  "noochie-varner-baseball-softball-academy-2",
  "noochie-varner",
  "nvba",
  "noochievarner",
]);

function isNvbaTenant(record) {
  if (!record) return false;
  const slug = record.slug?.trim().toLowerCase() ?? "";
  const name = record.display_name?.trim().toLowerCase() ?? "";
  return (
    NVBA_SLUGS.has(slug) ||
    name.includes("noochie varner") ||
    ["noochie varner baseball academy", "nvba"].includes(name)
  );
}

if (!url || !serviceKey || !tenantId) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, or TENANT_ID");
  process.exit(1);
}

if (!staffEmailInput && !staffAuthUserIdInput) {
  console.error("Set STAFF_EMAIL or STAFF_AUTH_USER_ID for an existing Supabase Auth user.");
  process.exit(1);
}

async function rest(path, options = {}) {
  const res = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  return { res, data };
}

async function fetchAuthUserById(authUserId) {
  const res = await fetch(`${url}/auth/v1/admin/users/${authUserId}`, {
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
  });
  if (!res.ok) return null;
  return res.json();
}

async function findAuthUserId(email) {
  let page = 1;
  while (page <= 10) {
    const res = await fetch(`${url}/auth/v1/admin/users?page=${page}&per_page=200`, {
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
    });
    if (!res.ok) throw new Error(`Auth lookup failed: ${res.status}`);
    const payload = await res.json();
    const users = payload.users ?? payload;
    const match = users.find((user) => user.email?.toLowerCase() === email);
    if (match?.id) return match;
    if (!users.length || users.length < 200) break;
    page += 1;
  }
  return null;
}

const { data: tenantRows } = await rest(
  `tenants?id=eq.${tenantId}&select=id,slug,display_name,status`,
);
const tenant = tenantRows?.[0];
if (!tenant || !isNvbaTenant(tenant)) {
  console.error(
    `Refusing to provision: TENANT_ID ${tenantId} is not the NVBA tenant (found ${tenant?.slug ?? "none"}).`,
  );
  process.exit(1);
}

let authUser = null;
if (staffAuthUserIdInput) {
  authUser = await fetchAuthUserById(staffAuthUserIdInput);
} else {
  authUser = await findAuthUserId(staffEmailInput);
}

if (!authUser?.id) {
  console.error("No Supabase Auth user found. Create the account first (sign up or Dashboard), then rerun.");
  process.exit(1);
}

const email = (authUser.email ?? staffEmailInput ?? "").toLowerCase();
const userId = authUser.id;

await rest("profiles", {
  method: "POST",
  headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
  body: JSON.stringify({ id: userId, email, active: true }),
});

const { data: roleRows, res: roleRes } = await rest(
  "roles?slug=eq.tenant_owner&tenant_id=is.null&select=id,slug&limit=1",
);
if (!roleRes.ok || !roleRows?.[0]?.id) {
  console.error("Could not load platform tenant_owner role:", roleRows);
  process.exit(1);
}
const roleId = roleRows[0].id;

const { data: existingMembership } = await rest(
  `tenant_memberships?tenant_id=eq.${tenantId}&user_id=eq.${userId}&select=id,status,role_id`,
);

const membershipRow = {
  tenant_id: tenantId,
  user_id: userId,
  role_id: roleId,
  status: "active",
};

if (existingMembership?.[0]?.id) {
  const { res, data } = await rest(`tenant_memberships?id=eq.${existingMembership[0].id}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(membershipRow),
  });
  if (!res.ok) {
    console.error("Membership update failed:", data);
    process.exit(1);
  }
  console.log(`Updated tenant_memberships (tenant_owner) for ${email} on ${tenant.slug}`);
} else {
  const { res, data } = await rest("tenant_memberships", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(membershipRow),
  });
  if (!res.ok) {
    console.error("Membership create failed:", data);
    process.exit(1);
  }
  console.log(`Created tenant_memberships (tenant_owner) for ${email} on ${tenant.slug}`);
}

console.log(`NVBA owner portal ready: ${email} (${userId})`);
console.log(`Sign in at /login → Owner website portal, then open /admin`);
console.log(`Project: ${projectRoot}`);
