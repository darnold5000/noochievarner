import Image from "next/image";
import Link from "next/link";
import BookingLink from "@/components/BookingLink";
import PageIntro from "@/components/PageIntro";
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
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <dl className="grid gap-3 sm:grid-cols-2">
            {facts.map(([label, value]) => (
              <div key={label} className="rounded-xl border border-nv-navy/10 bg-white p-4">
                <dt className="text-xs font-bold uppercase tracking-wide text-zinc-500">{label}</dt>
                <dd className="mt-1 font-semibold text-nv-navy">{value}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-zinc-700">
            {offering.details.map((detail) => (
              <li key={detail} className="rounded-xl bg-white p-4">
                {detail}
              </li>
            ))}
          </ul>
          {offering.contactLines ? (
            <p className="mt-4 text-sm text-zinc-600">{offering.contactLines.join(" · ")}</p>
          ) : null}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {offering.bookingKey ? (
              <BookingLink destination={offering.bookingKey} className={btnPrimary}>
                {offering.cta}
              </BookingLink>
            ) : (
              <Link href="/contact" className={btnPrimary}>
                {offering.cta}
              </Link>
            )}
            <Link href={backHref} className={btnOutline}>
              {backLabel}
            </Link>
          </div>
        </div>
        {offering.image ? (
          <figure className="overflow-hidden rounded-2xl border border-nv-navy/10 bg-white">
            <Image
              src={offering.image}
              alt={offering.imageAlt ?? `${offering.name} flyer`}
              width={900}
              height={1100}
              className="h-auto w-full"
            />
            <figcaption className="px-4 py-3 text-xs text-zinc-500">
              Original flyer, kept as a reference. The details above are the information to use.
            </figcaption>
          </figure>
        ) : null}
      </section>
    </>
  );
}
