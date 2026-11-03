import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import ProgramFlyerSection from "@/components/ProgramFlyerSection";
import SiteLink from "@/components/SiteLink";
import { campRegisterHref } from "@/config/schedule";
import type { Offering } from "@/content/site";
import { btnOutline, btnPrimary } from "@/lib/styles";

export default function OfferingDetail({
  offering,
  backHref,
  backLabel,
}: {
  offering: Offering;
  backHref: string;
  backLabel: string;
}) {
  const registerHref = campRegisterHref(offering.bookingKey);
  const facts = [
    ["Ages", offering.ages],
    ["Dates", offering.dates],
    ["Days", offering.days],
    ["Time", offering.times],
    ["Price", offering.price],
    ["Instructor", offering.instructor],
    ["Limit", offering.limit],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <>
      <PageIntro eyebrow={offering.eyebrow} title={offering.name}>
        <p>{offering.summary}</p>
      </PageIntro>
      <section className="mx-auto max-w-3xl px-4 py-8 pb-12 sm:px-6 sm:py-10">
        <dl className="grid gap-3 sm:grid-cols-2">
          {facts.map(([label, value]) => (
            <div key={label} className="rounded-xl border border-nv-navy/10 bg-white p-4 shadow-sm">
              <dt className="text-xs font-bold uppercase tracking-wide text-zinc-500">{label}</dt>
              <dd className="mt-1 font-semibold text-nv-navy">{value}</dd>
            </div>
          ))}
        </dl>

        {offering.sections?.length ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {offering.sections.map((section) => (
              <div key={section.title} className="rounded-xl border border-nv-navy/10 bg-white p-5 shadow-sm sm:col-span-2">
                <h2 className="font-display text-xl font-bold tracking-wide text-nv-navy sm:text-2xl">{section.title}</h2>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nv-blue" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}

        {offering.details.length ? (
          <div className="mt-8">
            <h2 className="font-display text-xl font-bold tracking-wide text-nv-navy">Program details</h2>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-700">
              {offering.details.map((detail) => (
                <li key={detail} className="rounded-xl border border-nv-navy/10 bg-white p-4 shadow-sm">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {offering.contactLines ? (
          <p className="mt-6 text-sm text-zinc-600">{offering.contactLines.join(" · ")}</p>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {registerHref ? (
            <SiteLink href={registerHref} className={btnPrimary}>
              {offering.cta}
            </SiteLink>
          ) : (
            <Link href="/contact" className={btnPrimary}>
              {offering.cta}
            </Link>
          )}
          <Link href={backHref} className={btnOutline}>
            {backLabel}
          </Link>
        </div>

        {offering.image ? (
          <ProgramFlyerSection src={offering.image} alt={offering.imageAlt ?? `${offering.name} program flyer`} />
        ) : null}
      </section>
    </>
  );
}
