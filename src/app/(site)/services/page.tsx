import Image from "next/image";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { getPublicServices, getPublicServicesIntro } from "@/lib/nvba-public-content";
import { createPageMetadata } from "@/lib/seo";
import { btnGhost, btnOnDark } from "@/lib/styles";

export const metadata = createPageMetadata({
  title: "NVBA Services",
  description:
    "Cage rentals, field rental, team training, birthday parties, video analysis, and speed and agility training at Noochie Varner Baseball Academy in Georgetown, KY.",
  path: "/services",
});

export const revalidate = 60;

export default async function ServicesPage() {
  const [services, intro] = await Promise.all([getPublicServices(), getPublicServicesIntro()]);

  return (
    <>
      <PageIntro eyebrow="Facility" title="NVBA Services">
        <p>{intro.intro}</p>
      </PageIntro>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-4">
          {services.map((service) => (
            <article key={service.name} className="rounded-2xl border border-nv-navy/10 bg-white p-5 sm:p-6">
              <h2 className="font-display text-2xl font-bold tracking-wide text-nv-navy sm:text-3xl">
                {service.name}
              </h2>
              {service.lead ? <p className="mt-2 text-sm font-semibold text-nv-navy">{service.lead}</p> : null}
              {service.detail ? (
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{service.detail}</p>
              ) : null}
              {service.bullets?.length ? (
                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-zinc-700">
                  {service.bullets.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nv-blue" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {service.rates?.length ? (
                <dl className="mt-4 divide-y divide-zinc-100 text-sm">
                  {service.rates.map((rate) => (
                    <div key={rate.label} className="flex justify-between gap-4 py-2 font-semibold">
                      <dt className="text-zinc-600">{rate.label}</dt>
                      <dd className="text-nv-navy">{rate.price}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {service.price ? <p className="mt-3 text-sm font-semibold text-nv-blue">{service.price}</p> : null}
              {service.contact ? (
                <Link href="/contact" className="mt-3 inline-block text-sm font-bold uppercase tracking-wide text-nv-blue hover:text-nv-royal">
                  Contact us
                </Link>
              ) : null}
            </article>
          ))}
          <div className="rounded-2xl bg-nv-navy p-5 text-white sm:p-6">
            <h2 className="font-display text-2xl font-bold tracking-wide">Reserve facility time</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-200">
              Contact us to schedule cages, field time, team rentals, or parties.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/contact" className={btnOnDark}>
                Contact us
              </Link>
              <Link href="/lessons" className={btnGhost}>
                Looking for lessons?
              </Link>
            </div>
          </div>
        </div>
        <figure className="overflow-hidden rounded-2xl border border-nv-navy/10 bg-white lg:sticky lg:top-24">
          <Image
            src={intro.image.src}
            alt={intro.image.alt}
            width={1024}
            height={1008}
            className="h-auto w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </figure>
      </section>
    </>
  );
}
