import BookingLink from "@/components/BookingLink";
import PageIntro from "@/components/PageIntro";
import { MEMBERSHIP } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";
import { btnPrimary } from "@/lib/styles";

export const metadata = createPageMetadata({
  title: "Memberships",
  description:
    "Big League Membership at Noochie Varner Baseball Academy: HitTrax lessons, cage time, gym access, and priority scheduling in Georgetown, KY.",
  path: "/memberships",
});

export default function MembershipsPage() {
  return (
    <>
      <PageIntro eyebrow="12-month membership" title="Memberships">
        <p>
          One membership is published on the current academy site. Purchase continues through the existing account
          sign-in.
        </p>
      </PageIntro>
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <article className="rounded-2xl border border-nv-navy/10 bg-white p-6 sm:p-8">
          <h2 className="font-display text-4xl font-bold tracking-wide text-nv-navy">{MEMBERSHIP.name}</h2>
          <p className="mt-2 text-sm text-zinc-600">{MEMBERSHIP.term}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-nv-ice p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Annual</p>
              <p className="mt-1 font-display text-3xl font-bold text-nv-navy">{MEMBERSHIP.annual}</p>
            </div>
            <div className="rounded-xl bg-nv-ice p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Monthly</p>
              <p className="mt-1 font-display text-3xl font-bold text-nv-navy">{MEMBERSHIP.monthly}</p>
              <p className="mt-1 text-sm text-zinc-600">{MEMBERSHIP.initiation}</p>
            </div>
          </div>
          <h3 className="mt-8 font-display text-2xl font-bold tracking-wide">What it includes</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700">
            {MEMBERSHIP.includes.map((item) => (
              <li key={item} className="border-b border-zinc-100 pb-2">
                {item}
              </li>
            ))}
          </ul>
          <BookingLink destination="memberships" className={`${btnPrimary} mt-8`}>
            Join / Purchase Membership
          </BookingLink>
        </article>
      </section>
    </>
  );
}
