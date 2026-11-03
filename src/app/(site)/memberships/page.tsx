import BookingLink from "@/components/BookingLink";
import PageIntro from "@/components/PageIntro";
import { getPublicMembership } from "@/lib/nvba-public-content";
import { createPageMetadata } from "@/lib/seo";
import { btnPrimary } from "@/lib/styles";

export const metadata = createPageMetadata({
  title: "Memberships",
  description:
    "Big League Membership at Noochie Varner Baseball Academy: HitTrax lessons, cage time, gym access, and priority scheduling in Georgetown, KY.",
  path: "/memberships",
});

export const revalidate = 60;

export default async function MembershipsPage() {
  const membership = await getPublicMembership();

  return (
    <>
      <PageIntro eyebrow="12-month membership" title="Memberships">
        <p>
          Train year-round with indoor access, HitTrax lessons, cage time, and priority scheduling. Sign in to
          purchase or manage your membership.
        </p>
      </PageIntro>
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <article className="rounded-2xl border border-nv-navy/10 bg-white p-6 sm:p-8">
          <h2 className="font-display text-4xl font-bold tracking-wide text-nv-navy">{membership.name}</h2>
          <p className="mt-2 text-sm text-zinc-600">{membership.term}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-nv-ice p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Annual</p>
              <p className="mt-1 font-display text-3xl font-bold text-nv-navy">{membership.annual}</p>
            </div>
            <div className="rounded-xl bg-nv-ice p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Monthly</p>
              <p className="mt-1 font-display text-3xl font-bold text-nv-navy">{membership.monthly}</p>
              <p className="mt-1 text-sm text-zinc-600">{membership.initiation}</p>
            </div>
          </div>
          <h3 className="mt-8 font-display text-2xl font-bold tracking-wide">What it includes</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700">
            {membership.includes.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nv-blue" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <BookingLink destination="memberships" className={`${btnPrimary} mt-8`}>
            Sign in for membership
          </BookingLink>
        </article>
      </section>
    </>
  );
}
