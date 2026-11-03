import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import SponsorCard from "@/components/SponsorCard";
import { SITE } from "@/content/site";
import { getPublicSponsors, getPublicSponsorsIntro } from "@/lib/nvba-public-content";
import { createPageMetadata } from "@/lib/seo";
import { btnOutline } from "@/lib/styles";

export const metadata = createPageMetadata({
  title: "Sponsors",
  description:
    "Partners who support Noochie Varner Baseball Academy in Georgetown, Kentucky, including Just 4 You Home Loans.",
  path: "/sponsors",
});

export const revalidate = 60;

export default async function SponsorsPage() {
  const [sponsors, intro] = await Promise.all([getPublicSponsors(), getPublicSponsorsIntro()]);

  return (
    <>
      <PageIntro eyebrow="Partners" title="Our sponsors">
        <p>{intro}</p>
      </PageIntro>
      <section className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6">
        {sponsors.map((sponsor) => (
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
