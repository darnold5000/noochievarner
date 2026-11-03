import Link from "next/link";
import { GraduationCap, Target, Trophy, Zap, type LucideIcon } from "lucide-react";
import type { Offering } from "@/content/site";
import { btnPrimary } from "@/lib/styles";

const ICON_BY_SLUG: Record<string, LucideIcon> = {
  "bat-speed-clinic": Zap,
  "tee-ball-winter-league": Trophy,
  "rookie-development": GraduationCap,
  "advanced-pitching-clinic": Target,
};

function CampIcon({ slug }: { slug: string }) {
  const Icon = ICON_BY_SLUG[slug] ?? Target;
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-nv-blue/10 text-nv-blue">
      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
    </span>
  );
}

/** Compact homepage program card — full detail stays on /camps/[slug]. */
export default function HomeCampProgramCard({ offering, href }: { offering: Offering; href: string }) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-nv-navy/10 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-nv-blue/35 hover:shadow-md hover:shadow-nv-navy/10 sm:p-5">
      <CampIcon slug={offering.slug} />

      <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-nv-blue">{offering.eyebrow}</p>
      <h3 className="mt-1 font-display text-lg font-bold leading-tight tracking-wide text-nv-navy sm:text-xl">
        {offering.name}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-snug text-zinc-600">{offering.summary}</p>

      <ul className="mt-3 space-y-1 text-xs text-zinc-700">
        {offering.ages ? (
          <li>
            <span className="font-semibold text-zinc-500">Ages </span>
            {offering.ages}
          </li>
        ) : null}
        {offering.dates ? (
          <li className="line-clamp-2 leading-snug">
            <span className="font-semibold text-zinc-500">Dates </span>
            {offering.dates}
          </li>
        ) : null}
      </ul>

      <div className="mt-auto flex flex-col gap-3 pt-4">
        {offering.price ? (
          <p className="font-display text-xl font-bold tracking-wide text-nv-blue sm:text-2xl">{offering.price}</p>
        ) : null}
        <Link
          href={href}
          className={`${btnPrimary} w-full justify-center px-4 py-2.5 text-xs sm:text-sm`}
        >
          View program
        </Link>
      </div>
    </article>
  );
}
