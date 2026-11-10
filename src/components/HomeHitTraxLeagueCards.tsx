"use client";

import Image from "next/image";
import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import type { HitTraxLeague } from "@/content/hittrax-leagues";
import { btnOutline, btnPrimary } from "@/lib/styles";

const cardShell =
  "group flex h-full flex-col overflow-hidden rounded-xl border border-nv-navy/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-nv-blue/35 hover:shadow-md hover:shadow-nv-navy/10 md:min-h-[20.5rem] md:flex-row";

function LeagueDetails({ league }: { league: HitTraxLeague }) {
  return (
    <dl className="mt-1.5 space-y-1 text-xs leading-snug text-zinc-700 sm:text-[0.8125rem]">
      {league.startDate ? (
        <div>
          <dt className="text-[0.65rem] font-bold uppercase tracking-wide text-zinc-500">Start</dt>
          <dd className="mt-0.5 font-medium text-zinc-800">
            {league.startDate.replace(/^League begins /i, "")}
          </dd>
        </div>
      ) : null}
      {league.schedule ? (
        <div>
          <dt className="text-[0.65rem] font-bold uppercase tracking-wide text-zinc-500">Schedule</dt>
          <dd className="mt-0.5 text-zinc-700">{league.schedule}</dd>
        </div>
      ) : null}
      {league.registrationDeadline ? (
        <div>
          <dt className="text-[0.65rem] font-bold uppercase tracking-wide text-zinc-500">Deadline</dt>
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
  return (
    <div className="border-t border-nv-navy/8 pt-3">
      {league.price ? (
        <p className="font-display text-lg font-bold tracking-wide text-nv-blue sm:text-xl">{league.price}</p>
      ) : null}
      <div className={`flex flex-wrap items-center gap-2 ${league.price ? "mt-2" : ""}`}>
        {league.registerUrl ? (
          <a
            href={league.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnPrimary} min-h-11 w-auto px-4 py-2.5 text-[0.65rem] sm:min-h-10 sm:text-xs`}
          >
            Register now
          </a>
        ) : null}
        {hasFlyer ? (
          <button
            type="button"
            onClick={() => onViewFlyer(league)}
            className={`${btnOutline} min-h-11 w-auto px-3 py-2.5 text-[0.65rem] sm:min-h-10 sm:text-xs`}
          >
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
}: {
  league: HitTraxLeague;
  onViewFlyer: (league: HitTraxLeague) => void;
  layout: "mobile" | "desktop";
}) {
  if (!league.flyerSrc) return null;

  const layoutClass =
    layout === "mobile"
      ? "flex min-h-0 flex-1 flex-col p-1 md:hidden"
      : "hidden min-h-0 w-[46%] max-w-[15.5rem] shrink-0 self-stretch flex-col bg-white p-0.5 md:flex";

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
            ? "relative mx-auto my-1 block aspect-[5/7] w-full max-w-[16rem] min-h-[14rem] sm:max-w-[18rem] sm:min-h-[16rem]"
            : "relative min-h-0 w-full flex-1"
        }
      >
        <Image
          src={league.flyerSrc}
          alt=""
          fill
          className="object-contain object-center transition duration-300 group-hover:opacity-95"
          sizes={layout === "mobile" ? "(max-width: 640px) 288px, 320px" : "248px"}
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
    <article className={cardShell}>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col px-4 pt-4 md:max-w-[54%] md:py-4 md:pl-4 md:pr-3 lg:pl-5 lg:pr-3.5">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-nv-blue/10 text-nv-blue">
          <Trophy className="h-4 w-4" strokeWidth={2} aria-hidden />
        </span>

        <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-nv-blue">{league.eyebrow}</p>
        <h3 className="mt-0.5 font-display text-base font-bold leading-tight tracking-wide text-nv-navy sm:text-lg">
          {league.title}
        </h3>
        {league.ages ? <p className="mt-0.5 text-xs font-semibold text-zinc-600">{league.ages}</p> : null}

        <LeagueDetails league={league} />

        <div className="mt-auto hidden md:block">
          <CardActions league={league} hasFlyer={hasFlyer} onViewFlyer={onViewFlyer} />
        </div>
      </div>

      <FlyerPreview league={league} onViewFlyer={onViewFlyer} layout="mobile" />
      <FlyerPreview league={league} onViewFlyer={onViewFlyer} layout="desktop" />

      <div className="mt-auto px-4 pb-4 md:hidden">
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
      <div className="mt-6 grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
        {leagues.map((league) => (
          <HitTraxLeagueCard key={league.id} league={league} onViewFlyer={setFlyerLeague} />
        ))}
      </div>
      {flyerLeague ? <FlyerLightbox league={flyerLeague} onClose={() => setFlyerLeague(null)} /> : null}
    </>
  );
}
