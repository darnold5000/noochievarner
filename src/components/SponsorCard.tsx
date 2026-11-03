import Image from "next/image";
import type { Sponsor } from "@/content/site";
import { btnPrimary } from "@/lib/styles";

export default function SponsorCard({
  sponsor,
  featured,
  compact,
}: {
  sponsor: Sponsor;
  featured?: boolean;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <article className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-nv-navy/10 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-6 sm:p-5">
        <div className="w-full max-w-[200px] shrink-0 sm:max-w-[180px]">
          <Image
            src={sponsor.image}
            alt={sponsor.imageAlt}
            width={640}
            height={320}
            className="h-auto w-full object-contain"
          />
        </div>
        <div className="flex flex-1 flex-col items-center text-center sm:items-start sm:text-left">
          <h2 className="font-display text-xl font-bold tracking-wide text-nv-navy sm:text-2xl">{sponsor.name}</h2>
          <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-zinc-600">{sponsor.note}</p>
          <a
            href={sponsor.href}
            className="mt-3 text-sm font-bold uppercase tracking-wide text-nv-blue hover:text-nv-royal"
            target="_blank"
            rel="noreferrer"
          >
            {sponsor.cta}
          </a>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`flex flex-col rounded-2xl border border-nv-navy/10 bg-white p-6 sm:p-8 ${
        featured ? "sm:flex-row sm:items-center sm:gap-8" : ""
      }`}
    >
      <div className={`shrink-0 ${featured ? "sm:w-64" : ""}`}>
        <Image
          src={sponsor.image}
          alt={sponsor.imageAlt}
          width={640}
          height={320}
          className={`h-auto w-full max-w-xs object-contain ${featured ? "mx-auto sm:mx-0" : ""}`}
        />
      </div>
      <div className={`mt-6 flex flex-1 flex-col ${featured ? "sm:mt-0" : ""}`}>
        <h2 className="font-display text-3xl font-bold tracking-wide text-nv-navy">{sponsor.name}</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">{sponsor.note}</p>
        <a
          href={sponsor.href}
          className={`${btnPrimary} mt-5 w-full sm:w-auto`}
          target="_blank"
          rel="noreferrer"
        >
          {sponsor.cta}
        </a>
      </div>
    </article>
  );
}
