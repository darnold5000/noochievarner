import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { SERVICES, SITE } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";
import { btnPrimary } from "@/lib/styles";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Cage rentals, field rental, team training, birthday parties, video analysis, and speed work at Noochie Varner Baseball Academy.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="Facility" title="Services">
        <p>
          Cage and field time is reserved with the academy directly. Lesson booking stays on the lessons page so
          those two paths stay separate.
        </p>
      </PageIntro>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2">
        {SERVICES.map((service) => (
          <article key={service.name} className="rounded-2xl bg-white p-5">
            <h2 className="font-display text-3xl font-bold tracking-wide text-nv-navy">{service.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">{service.detail}</p>
            <p className="mt-3 text-sm font-semibold text-nv-blue">{service.price}</p>
          </article>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <div className="rounded-2xl bg-nv-navy p-6 text-white">
          <h2 className="font-display text-3xl font-bold tracking-wide">Reserve facility time</h2>
          <p className="mt-2 text-sm text-zinc-200">
            <a className="font-semibold text-white underline" href={SITE.phoneHref}>
              {SITE.phone}
            </a>{" "}
            ·{" "}
            <a className="underline" href={SITE.emailHref}>
              {SITE.email}
            </a>
          </p>
          <Link href="/lessons" className={`${btnPrimary} mt-5 bg-white text-nv-navy hover:bg-nv-silver`}>
            Looking for lessons?
          </Link>
        </div>
      </section>
    </>
  );
}
