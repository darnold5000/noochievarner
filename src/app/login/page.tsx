import Link from "next/link";
import { bookingUrl } from "@/config/booking";
import PageIntro from "@/components/PageIntro";
import { StaffLoginForm } from "@/components/admin/staff-login-form";
import { isNvbaCmsConfigured } from "@/lib/nvba-config";
import { createPageMetadata } from "@/lib/seo";
import { btnPrimary } from "@/lib/styles";

export const metadata = createPageMetadata({
  title: "Staff Login",
  description: "Sign in to your Noochie Varner Baseball Academy account or owner website portal.",
  path: "/login",
});

const loginErrors: Record<string, string> = {
  cms_unavailable: "The owner website portal is not configured yet.",
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
  const cmsReady = isNvbaCmsConfigured();
  const errorMessage = params.error ? loginErrors[params.error] ?? "Sign in failed." : "";

  return (
    <>
      <PageIntro eyebrow="Staff" title="Staff Login">
        <p>Sign in to book lessons, manage memberships, and access your academy account.</p>
      </PageIntro>
      <section className="mx-auto flex max-w-xl flex-col gap-8 px-4 py-10 sm:px-6">
        <div>
          <h2 className="font-display text-xl font-bold text-nv-navy">SportsEngine / EZFacility</h2>
          <p className="mt-2 text-sm text-zinc-600">Customer and staff booking account.</p>
          <a href={bookingUrl("login")} className={`${btnPrimary} mt-4 inline-flex`}>
            Sign In
          </a>
        </div>
        {cmsReady ? (
          <div className="rounded-2xl border border-nv-navy/10 bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-nv-navy">Owner website portal</h2>
            <p className="mt-2 text-sm text-zinc-600">Edit homepage copy, camps, gallery photos, and other public content.</p>
            {errorMessage ? <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{errorMessage}</p> : null}
            <div className="mt-5">
              <StaffLoginForm returnTo={returnTo} />
            </div>
          </div>
        ) : (
          <p className="text-sm text-zinc-600">
            The owner website portal requires Supabase configuration (<code className="text-xs">TENANT_ID</code>, service role, and
            staff permissions).
          </p>
        )}
        <Link href="/" className="text-center text-sm font-semibold text-nv-blue">
          Back to home
        </Link>
      </section>
    </>
  );
}
