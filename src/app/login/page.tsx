import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { StaffLoginForm } from "@/components/admin/staff-login-form";
import { isNvbaCmsConfigured, isNvbaOwnerPortalLoginEnabled } from "@/lib/nvba-config";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Staff Login",
  description: "Staff sign in to manage the Noochie Varner Baseball Academy website.",
  path: "/login",
});

const loginErrors: Record<string, string> = {
  cms_unavailable: "Staff login is not configured yet.",
  tenant_misconfigured: "The academy tenant is not configured correctly.",
  staff_not_authorized: "This account is not authorized to edit website content.",
  auth_callback: "Sign in could not be completed. Please try again.",
};

export default async function StaffLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const returnTo = params.returnTo?.startsWith("/") ? params.returnTo : "/admin";
  const staffLoginReady = isNvbaOwnerPortalLoginEnabled();
  const cmsFullyConfigured = isNvbaCmsConfigured();
  const errorMessage = params.error ? loginErrors[params.error] ?? "Sign in failed." : "";

  return (
    <>
      <PageIntro eyebrow="Staff" title="Staff Login">
        <p>Sign in to edit homepage copy, camps, gallery, contact info, and other public website content.</p>
      </PageIntro>
      <section className="mx-auto flex max-w-xl flex-col gap-8 px-4 py-10 sm:px-6">
        {staffLoginReady ? (
          <div className="rounded-2xl border border-nv-navy/10 bg-white p-6 shadow-sm">
            {!cmsFullyConfigured ? (
              <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">
                Server env is incomplete (<code className="text-xs">SUPABASE_SERVICE_ROLE_KEY</code> on Vercel). You can
                sign in, but saving CMS changes may fail until it is set and the site is redeployed.
              </p>
            ) : null}
            {errorMessage ? (
              <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{errorMessage}</p>
            ) : null}
            <StaffLoginForm returnTo={returnTo} />
          </div>
        ) : (
          <div className="rounded-2xl border border-nv-navy/10 bg-zinc-50 p-6">
            <p className="text-sm text-zinc-600">
              Staff login is not available on this deployment yet. Set{" "}
              <code className="text-xs">NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
              <code className="text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, and{" "}
              <code className="text-xs">TENANT_ID</code> on Vercel, then redeploy.
            </p>
          </div>
        )}

        <Link href="/" className="text-center text-sm font-semibold text-nv-blue">
          Back to home
        </Link>
      </section>
    </>
  );
}
