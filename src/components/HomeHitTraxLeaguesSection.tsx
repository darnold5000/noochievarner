"use client";

import Image from "next/image";
import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import HomeSectionHeader from "@/components/HomeSectionHeader";
import { HITTRAX_LEAGUES, HITTRAX_LEAGUES_FORMAT, type HitTraxLeague } from "@/content/hittrax-leagues";
import { btnOutline, btnPrimary } from "@/lib/styles";

function HitTraxLeagueCard({
  league,
  onViewFlyer,
}: {
  league: HitTraxLeague;
  onViewFlyer: (league: HitTraxLeague) => void;
}) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-nv-navy/10 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-nv-blue/35 hover:shadow-md hover:shadow-nv-navy/10 sm:p-5">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-nv-blue/10 text-nv-blue">
        <Trophy className="h-5 w-5" strokeWidth={2} aria-hidden />
      </span>

      <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-nv-blue">{league.eyebrow}</p>
      <h3 className="mt-1 font-display text-lg font-bold leading-tight tracking-wide text-nv-navy sm:text-xl">
        {league.title}
      </h3>
      <p className="mt-1 text-xs font-semibold text-zinc-600">{league.ages}</p>

      <ul className="mt-3 space-y-1.5 text-xs text-zinc-700 sm:text-sm">
        <li>
          <span className="font-semibold text-zinc-500">Start </span>
          {league.startDate.replace(/^League begins /i, "")}
        </li>
        <li>
          <span className="font-semibold text-zinc-500">Schedule </span>
          {league.schedule}
        </li>
        <li>
          <span className="font-semibold text-zinc-500">Deadline </span>
          {league.registrationDeadline.replace(/^Registration deadline: /i, "")}
        </li>
      </ul>

      <div className="mt-auto flex flex-col gap-3 pt-4">
        <p className="font-display text-xl font-bold tracking-wide text-nv-blue sm:text-2xl">{league.price}</p>
        <a
          href={league.registerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnPrimary} w-full justify-center px-4 py-2.5 text-xs sm:text-sm`}
        >
          Register now
        </a>
        <button
          type="button"
          onClick={() => onViewFlyer(league)}
          className={`${btnOutline} w-full justify-center px-4 py-2.5 text-xs sm:text-sm`}
        >
          View flyer
        </button>
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

export default function HomeHitTraxLeaguesSection() {
  const [flyerLeague, setFlyerLeague] = useState<HitTraxLeague | null>(null);

  return (
    <section className="border-t border-nv-navy/8 bg-nv-ice/80 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <HomeSectionHeader
          eyebrow="Now registering"
          title="Upcoming HitTrax Leagues"
          description={HITTRAX_LEAGUES_FORMAT}
        />
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {HITTRAX_LEAGUES.map((league) => (
            <HitTraxLeagueCard key={league.id} league={league} onViewFlyer={setFlyerLeague} />
          ))}
        </div>
      </div>
      {flyerLeague ? <FlyerLightbox league={flyerLeague} onClose={() => setFlyerLeague(null)} /> : null}
    </section>
  );
}
