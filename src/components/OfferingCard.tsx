import Image from "next/image";
import Link from "next/link";
import BookingLink from "@/components/BookingLink";
import type { Offering } from "@/content/site";
import { btnOutline, btnPrimary } from "@/lib/styles";

export default function OfferingCard({
  offering,
  href,
}: {
  offering: Offering;
  href: string;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-nv-navy/10 bg-white shadow-sm">
      {offering.image ? (
        <div className="relative aspect-[16/10] bg-nv-ice">
          <Image
            src={offering.image}
            alt={offering.imageAlt ?? offering.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-nv-blue">{offering.eyebrow}</p>
        <h2 className="mt-1 font-display text-3xl font-bold tracking-wide text-nv-navy">{offering.name}</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">{offering.summary}</p>
        <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
          {offering.ages ? (
            <div>
              <dt className="text-xs uppercase tracking-wide text-zinc-500">Ages</dt>
              <dd className="font-semibold">{offering.ages}</dd>
            </div>
          ) : null}
          {offering.price ? (
            <div>
              <dt className="text-xs uppercase tracking-wide text-zinc-500">Price</dt>
              <dd className="font-semibold">{offering.price}</dd>
            </div>
          ) : null}
          {offering.dates ? (
            <div className="col-span-2">
              <dt className="text-xs uppercase tracking-wide text-zinc-500">Dates</dt>
              <dd className="font-semibold">{offering.dates}</dd>
            </div>
          ) : null}
        </dl>
        <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row">
          <Link href={href} className={btnOutline}>
            View Details
          </Link>
          {offering.bookingKey ? (
            <BookingLink destination={offering.bookingKey} className={btnPrimary}>
              {offering.cta}
            </BookingLink>
          ) : (
            <Link href="/contact" className={btnPrimary}>
              {offering.cta}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
