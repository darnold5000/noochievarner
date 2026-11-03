# NVBA Owner Portal CMS — Production Setup

## Prerequisites

- Shared Signal Works Supabase project (same platform as Sluggers Ohio)
- NVBA tenant row in `public.tenants`
- Owner user with active `tenant_memberships` and **`manage_website`** permission
- Vercel env vars on the **noochievarner** project

## Environment variables

Set in `.env.local` (development) and Vercel (production):

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser / cookie auth (required for owner login on `/login`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only reads & seed script (**never** expose to client) |
| `TENANT_ID` | UUID of the NVBA tenant row |

**Vercel:** Set all four Supabase variables above. Without them, `/login` only shows EZFacility. After changing env, redeploy the noochievarner project.
| `NEXT_PUBLIC_SITE_URL` | Public site URL for metadata |

## Database migration

Apply **only** to the intended Supabase project after reviewing SQL:

```bash
cd noochievarner
# Using Supabase CLI linked to the shared project:
supabase db push
# Or apply manually:
# supabase/migrations/001_nvba_cms_platform.sql
```

Migration `001_nvba_cms_platform.sql`:

- Extends `tenant_content_items` content types for NVBA (does not remove Sluggers types)
- Adds `is_nvba_tenant()` helper
- Creates **`nvba-media`** storage bucket and staff upload policies

Tenant provisioning notes: `supabase/manual/nvba-tenant.sql`

## Owner access

Link an existing Supabase Auth user to the NVBA tenant with the **`tenant_owner`** role (includes **`manage_website`** for `/admin`):

```bash
cd noochievarner
# By email (user must already exist in Supabase Auth):
STAFF_EMAIL=owner@example.com npm run db:provision-owner-staff
# Or by Auth user UUID:
STAFF_AUTH_USER_ID=<uuid> npm run db:provision-owner-staff
```

Requires `TENANT_ID`, Supabase URL, and service role in `.env.local`. Does not create passwords — use **Owner portal sign in** at `/login` with that account.

## Seed current website content (idempotent)

Imports static content from `scripts/nvba-cms-seed-data.mjs` into `tenant_content_items` for **`TENANT_ID` only**.

- **Does not overwrite** existing rows (insert-only for missing `content_type + slug`)
- **Refuses to run** if `TENANT_ID` is not an NVBA tenant

```bash
cd noochievarner
# Ensure .env.local has Supabase URL, service role, and TENANT_ID
npm run db:seed-cms
```

Re-run safely after adding new seed rows to the script.

## Owner access

1. Deploy with env vars configured.
2. Sign in at `/login` → **Staff login** (Supabase Auth). Use **Forgot password?** to reset via email.
3. Manage content at `/admin`.

Public pages read CMS data with static fallbacks when Supabase is unset. After seeding, the site should match pre-CMS appearance.

## Verification checklist

- [ ] Migration applied to correct Supabase project
- [ ] `TENANT_ID` matches NVBA tenant UUID
- [ ] Owner has `manage_website`
- [ ] `npm run db:seed-cms` inserted expected row count
- [ ] `/admin` loads; edit + save persists
- [ ] Public `/about`, `/lessons`, footer/header reflect CMS after revalidation (~60s)

## Not verified automatically

Production Supabase credentials, tenant UUID, and owner permissions must be confirmed in your environment. This repo does not store live credentials.
