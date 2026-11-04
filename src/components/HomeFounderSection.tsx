"use client";

import Image from "next/image";
import Link from "next/link";
import type { FounderPublicContent } from "@/lib/nvba-public-content";
import { btnOutline } from "@/lib/styles";

export default function HomeFounderSection({ founder }: { founder: FounderPublicContent }) {
  return (
    <section className="border-b border-nv-navy/8 bg-gradient-to-b from-nv-ice/40 to-white py-10 sm:py-12">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl shadow-lg shadow-nv-navy/10 ring-1 ring-nv-navy/10 lg:mx-0 lg:max-w-none">
          <Image
            src={founder.photoUrl}
            alt="Noochie Varner, founder of Noochie Varner Baseball Academy"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 90vw, 50vw"
            priority={false}
          />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-nv-blue">Meet Noochie Varner</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-wide text-nv-navy sm:text-4xl">
            Founder &amp; hitting instructor
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-700 sm:text-base">{founder.homeSummary}</p>
          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {founder.stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-nv-navy/10 bg-white px-3 py-3 text-center">
                <dt className="text-[0.65rem] font-bold uppercase tracking-wide text-nv-blue sm:text-xs">{stat.label}</dt>
                <dd className="mt-1 font-display text-2xl font-bold text-nv-navy">{stat.value}</dd>
              </div>
            ))}
          </dl>
          <Link href="/about#noochie-varner" className={`${btnOutline} mt-6 inline-flex`}>
            Read his story
          </Link>
        </div>
      </div>
    </section>
  );
}
