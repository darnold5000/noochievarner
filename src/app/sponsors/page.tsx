import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import SponsorCard from "@/components/SponsorCard";
import { SITE, SPONSORS, SPONSORS_INTRO } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";
import { btnOutline } from "@/lib/styles";

export const metadata = createPageMetadata({
  title: "Sponsors",
  description:
    "Partners who support Noochie Varner Baseball Academy in Georgetown, Kentucky, including Just 4 You Home Loans.",
  path: "/sponsors",
});

export default function SponsorsPage() {
  return (
    <>
      <PageIntro eyebrow="Partners" title="Our sponsors">
        <p>{SPONSORS_INTRO}</p>
      </PageIntro>
      <section className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6">
        {SPONSORS.map((sponsor) => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} featured />
        ))}
        <article className="rounded-2xl bg-nv-ice p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold tracking-wide text-nv-navy">Become a sponsor</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            Interested in supporting NVBA athletes and families in Georgetown? Contact the academy to learn about
            sponsorship opportunities.
          </p>
          <Link href="/contact" className={`${btnOutline} mt-5`}>
            Contact NVBA
          </Link>
          <p className="mt-4 text-sm text-zinc-600">
            <a className="font-semibold text-nv-blue hover:underline" href={SITE.emailHref}>
              {SITE.email}
            </a>
            {" · "}
            <a className="font-semibold text-nv-blue hover:underline" href={SITE.phoneHref}>
              {SITE.phone}
            </a>
          </p>
        </article>
      </section>
    </>
  );
}
