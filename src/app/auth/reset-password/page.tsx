import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { StaffResetPasswordForm } from "@/components/admin/staff-reset-password-form";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Reset password",
  description: "Set a new password for your NVBA staff website account.",
  path: "/auth/reset-password",
});

export default function ResetPasswordPage() {
  return (
    <>
      <PageIntro eyebrow="Staff" title="Set a new password">
        <p>Choose a new password for your staff website account.</p>
      </PageIntro>
      <section className="mx-auto max-w-xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-nv-navy/10 bg-white p-6 shadow-sm">
          <StaffResetPasswordForm />
        </div>
        <p className="mt-6 text-center">
          <Link href="/login" className="text-sm font-semibold text-nv-blue hover:underline">
            Back to staff login
          </Link>
        </p>
      </section>
    </>
  );
}
