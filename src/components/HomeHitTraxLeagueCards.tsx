"use client";

import Image from "next/image";
import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import type { HitTraxLeague } from "@/content/hittrax-leagues";
import { btnOutline, btnPrimary } from "@/lib/styles";

function LeagueDetails({ league }: { league: HitTraxLeague }) {
  return (
    <dl className="mt-1 space-y-1 text-[0.68rem] leading-snug text-zinc-700 sm:text-xs">
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
          <dd className="mt-0.5 text-zinc-700">{league.schedule}</dd>
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
}: {
  league: HitTraxLeague;
  hasFlyer: boolean;
  onViewFlyer: (league: HitTraxLeague) => void;
}) {
  const btnClass = `${btnPrimary} min-h-11 w-full justify-center px-3 py-2.5 text-[0.62rem] leading-tight sm:min-h-10 sm:text-xs`;
  const btnOutlineClass = `${btnOutline} min-h-11 w-full justify-center px-3 py-2.5 text-[0.62rem] leading-tight sm:min-h-10 sm:text-xs`;

  return (
    <div className="pt-2.5">
      {league.price ? (
        <p className="font-display text-sm font-bold tracking-wide text-nv-blue sm:text-base">{league.price}</p>
      ) : null}
      {league.secondaryPrice ? (
        <p className="mt-0.5 text-[0.65rem] font-semibold leading-snug text-zinc-700 sm:text-xs">
          {league.secondaryPrice}
        </p>
      ) : null}
      <div className={`flex flex-col gap-1.5 ${league.price || league.secondaryPrice ? "mt-2" : ""}`}>
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

function FlyerPanel({
  league,
  onViewFlyer,
}: {
  league: HitTraxLeague;
  onViewFlyer: (league: HitTraxLeague) => void;
}) {
  if (!league.flyerSrc) return null;

  return (
    <button
      type="button"
      onClick={() => onViewFlyer(league)}
      className="relative flex min-h-[10.5rem] w-full shrink-0 flex-col self-stretch overflow-hidden rounded-lg bg-white p-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-nv-blue sm:min-h-0 sm:flex-[0.42] sm:basis-[42%] sm:p-1"
      aria-label={`View full-size flyer for ${league.title}`}
    >
      <span className="relative min-h-[10.5rem] w-full flex-1 sm:min-h-[12.5rem]">
        <Image
          src={league.flyerSrc}
          alt=""
          fill
          className="object-contain object-top transition duration-300 group-hover:opacity-95"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 30vw"
        />
      </span>
    </button>
  );
}

function HitTraxLeagueCard({
  league,
  onViewFlyer,
}: {
  league: HitTraxLeague;
  onViewFlyer: (league: HitTraxLeague) => void;
}) {
  const hasFlyer = Boolean(league.flyerSrc);

  return (
    <article className="group flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-nv-navy/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-nv-blue/35 hover:shadow-md hover:shadow-nv-navy/10">
      <div className="flex min-h-0 flex-1 flex-col gap-2.5 p-2.5 sm:flex-row sm:items-stretch sm:gap-2 sm:p-3">
        <div className="min-w-0 sm:flex-[0.58] sm:basis-[58%]">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-nv-blue/10 text-nv-blue">
            <Trophy className="h-3 w-3" strokeWidth={2} aria-hidden />
          </span>

          <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-nv-blue sm:text-[10px]">
            {league.eyebrow}
          </p>
          <h3 className="mt-0.5 font-display text-[0.8rem] font-bold leading-tight tracking-wide text-nv-navy sm:text-sm">
            {league.title}
          </h3>
          {league.ages ? <p className="mt-0.5 text-[0.65rem] font-semibold text-zinc-600 sm:text-xs">{league.ages}</p> : null}

          <LeagueDetails league={league} />
        </div>

        <FlyerPanel league={league} onViewFlyer={onViewFlyer} />
      </div>

      <div className="border-t border-nv-navy/8 px-2.5 pb-2.5 sm:px-3 sm:pb-3">
        <CardActions league={league} hasFlyer={hasFlyer} onViewFlyer={onViewFlyer} />
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

  return (
    <>
      <div className="mt-6 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {leagues.map((league) => (
          <HitTraxLeagueCard key={league.id} league={league} onViewFlyer={setFlyerLeague} />
        ))}
      </div>
      {flyerLeague ? <FlyerLightbox league={flyerLeague} onClose={() => setFlyerLeague(null)} /> : null}
    </>
  );
}
