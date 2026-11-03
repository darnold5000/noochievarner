import Image from "next/image";
import Link from "next/link";
import SiteLink from "@/components/SiteLink";
import { campRegisterHref } from "@/config/schedule";
import type { Offering } from "@/content/site";
import { btnOutline, btnPrimary } from "@/lib/styles";

export default function OfferingCard({
  offering,
  href,
  flyerContain = false,
}: {
  offering: Offering;
  href: string;
  /** Use object-contain for promotional flyers (homepage). */
  flyerContain?: boolean;
}) {
  const registerHref = campRegisterHref(offering.bookingKey);
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-nv-navy/10 bg-white shadow-md shadow-nv-navy/5">
      {offering.image ? (
        <div
          className={`relative bg-nv-ice ${flyerContain ? "aspect-[5/4] sm:h-64 sm:aspect-auto" : "aspect-[16/10]"}`}
        >
          <Image
            src={offering.image}
            alt={offering.imageAlt ?? offering.name}
            fill
            className={flyerContain ? "object-contain p-2" : "object-cover object-top"}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-nv-blue">{offering.eyebrow}</p>
        <h2 className="mt-1 font-display text-2xl font-bold tracking-wide text-nv-navy sm:text-3xl">
          {offering.name}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">{offering.summary}</p>
        <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
          {offering.ages ? (
            <div>
              <dt className="text-xs uppercase tracking-wide text-zinc-500">Ages</dt>
              <dd className="font-semibold text-nv-navy">{offering.ages}</dd>
            </div>
          ) : null}
          {offering.price ? (
            <div>
              <dt className="text-xs uppercase tracking-wide text-zinc-500">Price</dt>
              <dd className="font-semibold text-nv-navy">{offering.price}</dd>
            </div>
          ) : null}
          {offering.dates ? (
            <div className="col-span-2">
              <dt className="text-xs uppercase tracking-wide text-zinc-500">Dates</dt>
              <dd className="font-semibold text-nv-navy">{offering.dates}</dd>
            </div>
          ) : null}
        </dl>
        <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row">
          <Link href={href} className={`${btnOutline} w-full sm:w-auto`}>
            View Details
          </Link>
          {registerHref ? (
            <SiteLink href={registerHref} className={`${btnPrimary} w-full sm:w-auto`}>
              {offering.cta}
            </SiteLink>
          ) : (
            <Link href="/contact" className={`${btnPrimary} w-full sm:w-auto`}>
              {offering.cta}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
