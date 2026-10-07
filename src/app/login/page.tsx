import Link from "next/link";
import { bookingUrl } from "@/config/booking";
import PageIntro from "@/components/PageIntro";
import { createPageMetadata } from "@/lib/seo";
import { btnPrimary } from "@/lib/styles";

export const metadata = createPageMetadata({
  title: "Staff Login",
  description: "Staff tools are not part of this academy preview.",
  path: "/login",
});

export default function StaffLoginPage() {
  return (
    <>
      <PageIntro eyebrow="Staff" title="Staff Login">
        <p>This preview does not include a staff portal. Member accounts sign in through the academy account.</p>
      </PageIntro>
      <section className="mx-auto flex max-w-xl flex-col gap-3 px-4 py-10 sm:px-6">
        <a href={bookingUrl("login")} className={btnPrimary}>
          Sign In
        </a>
        <Link href="/" className="text-center text-sm font-semibold text-nv-blue">
          Back to the academy site
        </Link>
      </section>
    </>
  );
}
