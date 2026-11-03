import Link from "next/link";
import SiteLink from "@/components/SiteLink";
import { campRegisterHref } from "@/config/schedule";
import type { Offering } from "@/content/site";
import { btnOutline, btnPrimary } from "@/lib/styles";

/** Text-focused program card for the /camps catalog (no flyer images). */
export default function CampProgramCard({ offering, href }: { offering: Offering; href: string }) {
  const registerHref = campRegisterHref(offering.bookingKey);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-nv-navy/10 bg-white p-5 shadow-md shadow-nv-navy/5 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-nv-blue">{offering.eyebrow}</p>
      <h2 className="mt-2 font-display text-2xl font-bold tracking-wide text-nv-navy sm:text-3xl">{offering.name}</h2>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-600">{offering.summary}</p>

      <dl className="mt-5 space-y-3 border-t border-nv-navy/8 pt-5 text-sm">
        {offering.ages ? (
          <div className="flex justify-between gap-4">
            <dt className="text-xs font-bold uppercase tracking-wide text-zinc-500">Ages</dt>
            <dd className="text-right font-semibold text-nv-navy">{offering.ages}</dd>
          </div>
        ) : null}
        {offering.dates ? (
          <div className="flex justify-between gap-4">
            <dt className="shrink-0 text-xs font-bold uppercase tracking-wide text-zinc-500">Dates</dt>
            <dd className="text-right font-semibold leading-snug text-nv-navy">{offering.dates}</dd>
          </div>
        ) : null}
      </dl>

      {offering.price ? (
        <p className="mt-5 font-display text-2xl font-bold tracking-wide text-nv-blue sm:text-3xl">{offering.price}</p>
      ) : null}

      <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row">
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
    </article>
  );
}
