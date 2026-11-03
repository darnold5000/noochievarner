import Image from "next/image";
import type { Sponsor } from "@/content/site";
import { btnPrimary } from "@/lib/styles";

export default function SponsorCard({ sponsor, featured }: { sponsor: Sponsor; featured?: boolean }) {
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
