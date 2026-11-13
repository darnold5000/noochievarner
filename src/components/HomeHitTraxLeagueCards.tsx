"use client";

import Image from "next/image";
import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import type { HitTraxLeague } from "@/content/hittrax-leagues";
import { btnOutline, btnPrimary } from "@/lib/styles";

const cardShell =
  "group flex h-full flex-col overflow-hidden rounded-xl border border-nv-navy/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-nv-blue/35 hover:shadow-md hover:shadow-nv-navy/10 xl:min-h-[16.5rem] xl:flex-row";

function LeagueDetails({ league }: { league: HitTraxLeague }) {
  return (
    <dl className="mt-1 space-y-1 text-[0.7rem] leading-snug text-zinc-700 sm:text-xs">
      {league.startDate ? (
        <div>
          <dt className="text-[0.6rem] font-bold uppercase tracking-wide text-zinc-500">Start</dt>
          <dd className="mt-0.5 font-medium text-zinc-800">
            {league.startDate.replace(/^League begins /i, "")}
          </dd>
        </div>
      ) : null}
      {league.schedule ? (
        <div>
          <dt className="text-[0.6rem] font-bold uppercase tracking-wide text-zinc-500">Schedule</dt>
          <dd className="mt-0.5 text-zinc-700">{league.schedule}</dd>
        </div>
      ) : null}
      {league.registrationDeadline ? (
        <div>
          <dt className="text-[0.6rem] font-bold uppercase tracking-wide text-zinc-500">Deadline</dt>
          <dd className="mt-0.5 font-medium text-zinc-800">
            {league.registrationDeadline.replace(/^Registration deadline: /i, "")}
          </dd>
        </div>
      ) : null}
    </dl>
  );
}

function CardActions({
  league,
  hasFlyer,
  onViewFlyer,
  compact,
}: {
  league: HitTraxLeague;
  hasFlyer: boolean;
  onViewFlyer: (league: HitTraxLeague) => void;
  compact?: boolean;
}) {
  const btnClass = compact
    ? `${btnPrimary} min-h-10 w-full justify-center px-2 py-2 text-[0.6rem] leading-tight sm:text-[0.65rem]`
    : `${btnPrimary} min-h-10 w-auto px-3 py-2 text-[0.65rem] sm:text-xs`;
  const btnOutlineClass = compact
    ? `${btnOutline} min-h-10 w-full justify-center px-2 py-2 text-[0.6rem] leading-tight sm:text-[0.65rem]`
    : `${btnOutline} min-h-10 w-auto px-3 py-2 text-[0.65rem] sm:text-xs`;
  const buttonWrap = compact ? "flex flex-col gap-1.5" : "flex flex-wrap items-center gap-2";

  return (
    <div className="border-t border-nv-navy/8 pt-2.5">
      {league.price ? (
        <p className="font-display text-base font-bold tracking-wide text-nv-blue sm:text-lg">{league.price}</p>
      ) : null}
      {league.secondaryPrice ? (
        <p className="mt-0.5 text-xs font-semibold text-zinc-700">{league.secondaryPrice}</p>
      ) : null}
      <div className={`${buttonWrap} ${league.price || league.secondaryPrice ? "mt-2" : ""}`}>
        {league.registerUrl ? (
          <a href={league.registerUrl} target="_blank" rel="noopener noreferrer" className={btnClass}>
            {league.registerCtaLabel}
          </a>
        ) : null}
        {league.secondaryRegisterUrl ? (
          <a
            href={league.secondaryRegisterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={btnOutlineClass}
          >
            {league.secondaryRegisterCtaLabel}
          </a>
        ) : null}
        {hasFlyer ? (
          <button type="button" onClick={() => onViewFlyer(league)} className={btnOutlineClass}>
            View flyer
          </button>
        ) : null}
      </div>
    </div>
  );
}

function FlyerPreview({
  league,
  onViewFlyer,
  layout,
  compact,
}: {
  league: HitTraxLeague;
  onViewFlyer: (league: HitTraxLeague) => void;
  layout: "mobile" | "desktop";
  compact?: boolean;
}) {
  if (!league.flyerSrc) return null;

  const layoutClass =
    layout === "mobile"
      ? "flex min-h-0 flex-1 flex-col p-1 xl:hidden"
      : `hidden min-h-0 shrink-0 self-stretch flex-col bg-white p-0.5 xl:flex ${
          compact ? "w-[44%] max-w-[8.75rem]" : "w-[46%] max-w-[10rem]"
        }`;

  return (
    <button
      type="button"
      onClick={() => onViewFlyer(league)}
      className={`${layoutClass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-nv-blue`}
      aria-label={`View full-size flyer for ${league.title}`}
    >
      <span
        className={
          layout === "mobile"
            ? "relative mx-auto my-1 block aspect-[5/7] w-full max-w-[14rem] min-h-[12rem] sm:max-w-[16rem]"
            : "relative min-h-0 w-full flex-1"
        }
      >
        <Image
          src={league.flyerSrc}
          alt=""
          fill
          className="object-contain object-center transition duration-300 group-hover:opacity-95"
          sizes={layout === "mobile" ? "(max-width: 640px) 256px, 320px" : "140px"}
        />
      </span>
    </button>
  );
}

function HitTraxLeagueCard({
  league,
  onViewFlyer,
  compact,
}: {
  league: HitTraxLeague;
  onViewFlyer: (league: HitTraxLeague) => void;
  compact?: boolean;
}) {
  const hasFlyer = Boolean(league.flyerSrc);
  const textColumnClass = compact
    ? "flex min-h-0 min-w-0 flex-1 flex-col px-3 pb-3 pt-3 xl:max-w-[56%] xl:py-3 xl:pl-3 xl:pr-2"
    : "flex min-h-0 min-w-0 flex-1 flex-col px-4 pt-4 md:max-w-[54%] md:py-4";

  return (
    <article className={cardShell}>
      <div className={textColumnClass}>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-nv-blue/10 text-nv-blue">
          <Trophy className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        </span>

        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-nv-blue">{league.eyebrow}</p>
        <h3 className="mt-0.5 font-display text-sm font-bold leading-tight tracking-wide text-nv-navy sm:text-base">
          {league.title}
        </h3>
        {league.ages ? <p className="mt-0.5 text-[0.7rem] font-semibold text-zinc-600">{league.ages}</p> : null}

        <LeagueDetails league={league} />

        <div className="mt-auto hidden xl:block">
          <CardActions league={league} hasFlyer={hasFlyer} onViewFlyer={onViewFlyer} compact={compact} />
        </div>
      </div>

      <FlyerPreview league={league} onViewFlyer={onViewFlyer} layout="mobile" compact={compact} />
      <FlyerPreview league={league} onViewFlyer={onViewFlyer} layout="desktop" compact={compact} />

      <div className="mt-auto px-3 pb-3 xl:hidden">
        <CardActions league={league} hasFlyer={hasFlyer} onViewFlyer={onViewFlyer} compact={compact} />
      </div>
    </article>
  );
}

function FlyerLightbox({ league, onClose }: { league: HitTraxLeague; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!league.flyerSrc) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={league.flyerAlt}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white"
        onClick={onClose}
      >
        Close
      </button>
      <div className="relative h-[85vh] w-full max-w-lg sm:max-w-xl" onClick={(event) => event.stopPropagation()}>
        <Image src={league.flyerSrc} alt={league.flyerAlt} fill className="object-contain" sizes="(max-width: 640px) 95vw, 576px" />
      </div>
    </div>
  );
}

export default function HomeHitTraxLeagueCards({ leagues }: { leagues: HitTraxLeague[] }) {
  const [flyerLeague, setFlyerLeague] = useState<HitTraxLeague | null>(null);
  const compact = leagues.length >= 3;

  return (
    <>
      <div className="mt-6 grid grid-cols-1 items-stretch gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
        {leagues.map((league) => (
          <HitTraxLeagueCard key={league.id} league={league} onViewFlyer={setFlyerLeague} compact={compact} />
        ))}
      </div>
      {flyerLeague ? <FlyerLightbox league={flyerLeague} onClose={() => setFlyerLeague(null)} /> : null}
    </>
  );
}
