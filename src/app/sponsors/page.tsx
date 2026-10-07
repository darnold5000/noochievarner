import Image from "next/image";
import PageIntro from "@/components/PageIntro";
import { SPONSORS } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Sponsors",
  description: "Partners who support Noochie Varner Baseball Academy in Georgetown, Kentucky.",
  path: "/sponsors",
});

export default function SponsorsPage() {
  return (
    <>
      <PageIntro eyebrow="Partners" title="Proudly supported by our partners">
        <p>Sponsor names and links below are the ones published on the current academy site.</p>
      </PageIntro>
      <section className="mx-auto grid max-w-4xl gap-4 px-4 py-10 sm:px-6">
        {SPONSORS.map((sponsor) => {
          const body = (
            <article className="flex items-center gap-5 rounded-2xl bg-white p-5">
              {sponsor.image ? (
                <Image src={sponsor.image} alt="" width={120} height={120} className="h-20 w-20 object-contain" />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-nv-ice font-display text-3xl font-bold text-nv-navy">
                  W
                </div>
              )}
              <div>
                <h2 className="font-display text-3xl font-bold tracking-wide text-nv-navy">{sponsor.name}</h2>
                <p className="mt-1 text-sm text-zinc-600">{sponsor.note}</p>
                {sponsor.href ? <p className="mt-2 text-sm font-semibold text-nv-blue">Visit website</p> : null}
              </div>
            </article>
          );
          return sponsor.href ? (
            <a key={sponsor.name} href={sponsor.href} target="_blank" rel="noreferrer">
              {body}
            </a>
          ) : (
            <div key={sponsor.name}>{body}</div>
          );
        })}
      </section>
    </>
  );
}
