"use client";

import Image from "next/image";
import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import type { HitTraxLeague } from "@/content/hittrax-leagues";
import { btnOutline, btnPrimary } from "@/lib/styles";

const cardShell =
  "group flex h-full min-h-[17rem] overflow-hidden rounded-xl border border-nv-navy/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-nv-blue/35 hover:shadow-md hover:shadow-nv-navy/10 sm:min-h-[18rem]";

function HitTraxLeagueCard({
  league,
  onViewFlyer,
}: {
  league: HitTraxLeague;
  onViewFlyer: (league: HitTraxLeague) => void;
}) {
  const hasFlyer = Boolean(league.flyerSrc);

  return (
    <article className={`${cardShell} flex-row`}>
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-nv-blue/10 text-nv-blue sm:h-10 sm:w-10">
          <Trophy className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} aria-hidden />
        </span>

        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-nv-blue">{league.eyebrow}</p>
        <h3 className="mt-1 font-display text-base font-bold leading-tight tracking-wide text-nv-navy sm:text-lg">
          {league.title}
        </h3>
        {league.ages ? <p className="mt-0.5 text-xs font-semibold text-zinc-600">{league.ages}</p> : null}

        <ul className="mt-2 space-y-1 text-xs leading-snug text-zinc-700">
          {league.startDate ? (
            <li>
              <span className="font-semibold text-zinc-500">Start </span>
              {league.startDate.replace(/^League begins /i, "")}
            </li>
          ) : null}
          {league.schedule ? (
            <li className="line-clamp-3">
              <span className="font-semibold text-zinc-500">Schedule </span>
              {league.schedule}
            </li>
          ) : null}
          {league.registrationDeadline ? (
            <li>
              <span className="font-semibold text-zinc-500">Deadline </span>
              {league.registrationDeadline.replace(/^Registration deadline: /i, "")}
            </li>
          ) : null}
        </ul>

        <div className="mt-auto pt-3 sm:pt-4">
          {league.price ? (
            <p className="font-display text-lg font-bold tracking-wide text-nv-blue sm:text-xl">{league.price}</p>
          ) : null}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {league.registerUrl ? (
              <a
                href={league.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnPrimary} min-h-10 w-auto px-4 py-2 text-[0.65rem] sm:text-xs`}
              >
                Register now
              </a>
            ) : null}
            {hasFlyer ? (
              <button
                type="button"
                onClick={() => onViewFlyer(league)}
                className={`${btnOutline} min-h-10 w-auto px-3 py-2 text-[0.65rem] sm:text-xs`}
              >
                Full flyer
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {hasFlyer ? (
        <button
          type="button"
          onClick={() => onViewFlyer(league)}
          className="relative w-[6.75rem] shrink-0 self-stretch border-l border-nv-navy/10 bg-nv-navy/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-nv-blue sm:w-[7.75rem]"
          aria-label={`View full flyer for ${league.title}`}
        >
          <Image
            src={league.flyerSrc}
            alt=""
            fill
            className="object-cover object-top transition duration-300 group-hover:brightness-105"
            sizes="124px"
          />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-nv-navy/70 to-transparent px-1.5 pb-1.5 pt-6 text-[0.6rem] font-bold uppercase tracking-wide text-white">
            Tap to enlarge
          </span>
        </button>
      ) : null}
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
