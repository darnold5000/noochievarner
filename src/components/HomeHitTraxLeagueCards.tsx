"use client";

import Image from "next/image";
import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import type { HitTraxLeague } from "@/content/hittrax-leagues";
import { btnOutline, btnPrimary } from "@/lib/styles";

const cardShell =
  "group flex h-full min-h-0 flex-row overflow-hidden rounded-xl border border-nv-navy/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-nv-blue/35 hover:shadow-md hover:shadow-nv-navy/10";

function LeagueDetails({ league, tight }: { league: HitTraxLeague; tight?: boolean }) {
  return (
    <dl className={`${tight ? "mt-0.5 space-y-0.5" : "mt-1 space-y-1"} text-[0.68rem] leading-snug text-zinc-700`}>
      {league.startDate ? (
        <div>
          <dt className="text-[0.58rem] font-bold uppercase tracking-wide text-zinc-500">Start</dt>
          <dd className="mt-0.5 font-medium text-zinc-800">
            {league.startDate.replace(/^League begins /i, "")}
          </dd>
        </div>
      ) : null}
      {league.schedule ? (
        <div>
          <dt className="text-[0.58rem] font-bold uppercase tracking-wide text-zinc-500">Schedule</dt>
          <dd className="mt-0.5 line-clamp-4 text-zinc-700">{league.schedule}</dd>
        </div>
      ) : null}
      {league.registrationDeadline ? (
        <div>
          <dt className="text-[0.58rem] font-bold uppercase tracking-wide text-zinc-500">Deadline</dt>
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
  const btnClass = `${btnPrimary} min-h-9 w-full justify-center px-2 py-1.5 text-[0.58rem] leading-tight sm:min-h-9 sm:text-[0.62rem]`;
  const btnOutlineClass = `${btnOutline} min-h-9 w-full justify-center px-2 py-1.5 text-[0.58rem] leading-tight sm:min-h-9 sm:text-[0.62rem]`;

  return (
    <div className={`border-t border-nv-navy/8 ${compact ? "pt-2" : "pt-2.5"}`}>
      {league.price ? (
        <p className={`font-display font-bold tracking-wide text-nv-blue ${compact ? "text-sm" : "text-base sm:text-lg"}`}>
          {league.price}
        </p>
      ) : null}
      {league.secondaryPrice ? (
        <p className="mt-0.5 text-[0.65rem] font-semibold leading-snug text-zinc-700">{league.secondaryPrice}</p>
      ) : null}
      <div className={`flex flex-col gap-1 ${league.price || league.secondaryPrice ? "mt-1.5" : ""}`}>
        {league.registerUrl ? (
          <a href={league.registerUrl} target="_blank" rel="noopener noreferrer" className={btnClass}>
            {league.registerCtaLabel}
          </a>
        ) : null}
        {league.secondaryRegisterUrl ? (
          <a href={league.secondaryRegisterUrl} target="_blank" rel="noopener noreferrer" className={btnOutlineClass}>
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

function FlyerThumb({
  league,
  onViewFlyer,
  compact,
}: {
  league: HitTraxLeague;
  onViewFlyer: (league: HitTraxLeague) => void;
  compact?: boolean;
}) {
  if (!league.flyerSrc) return null;

  return (
    <button
      type="button"
      onClick={() => onViewFlyer(league)}
      className={`flex shrink-0 flex-col self-stretch bg-white p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-nv-blue ${
        compact ? "w-[5.25rem] sm:w-[5.75rem]" : "w-[6.5rem] sm:w-[7rem]"
      }`}
      aria-label={`View full-size flyer for ${league.title}`}
    >
      <span className="relative min-h-0 w-full flex-1">
        <Image
          src={league.flyerSrc}
          alt=""
          fill
          className="object-contain object-center transition duration-300 group-hover:opacity-95"
          sizes="92px"
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

  return (
    <article className={cardShell}>
      <div className={`flex min-h-0 min-w-0 flex-1 flex-col ${compact ? "px-2.5 pb-2.5 pt-2.5" : "px-3 py-3 sm:px-3.5 sm:py-3"}`}>
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-nv-blue/10 text-nv-blue">
          <Trophy className="h-3 w-3" strokeWidth={2} aria-hidden />
        </span>

        <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-nv-blue sm:text-[10px]">{league.eyebrow}</p>
        <h3 className="mt-0.5 font-display text-[0.8rem] font-bold leading-tight tracking-wide text-nv-navy sm:text-sm">
          {league.title}
        </h3>
        {league.ages ? <p className="mt-0.5 text-[0.65rem] font-semibold text-zinc-600">{league.ages}</p> : null}

        <LeagueDetails league={league} tight={compact} />

        <div className="mt-auto">
          <CardActions league={league} hasFlyer={hasFlyer} onViewFlyer={onViewFlyer} compact={compact} />
        </div>
      </div>

      <FlyerThumb league={league} onViewFlyer={onViewFlyer} compact={compact} />
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
      <div className="mt-6 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {leagues.map((league) => (
          <HitTraxLeagueCard key={league.id} league={league} onViewFlyer={setFlyerLeague} compact={compact} />
        ))}
      </div>
      {flyerLeague ? <FlyerLightbox league={flyerLeague} onClose={() => setFlyerLeague(null)} /> : null}
    </>
  );
}
