import Image from "next/image";
import Link from "next/link";
import SiteLink from "@/components/SiteLink";
import { bookTrainingHref } from "@/config/booking";
import { SITE } from "@/content/site";
import { btnGhost, btnHeroPrimary } from "@/lib/styles";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-nv-navy text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nv-blue/20 via-transparent to-nv-navy"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-nv-blue/15 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:py-16">
        <div className="max-w-xl lg:max-w-none">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-nv-silver">Georgetown, Kentucky</p>
          <h1 className="mt-4 font-display font-bold tracking-wide">
            <span className="block text-[clamp(2.25rem,7vw,4.25rem)] leading-[0.95] text-white">
              NOOCHIE VARNER
            </span>
            <span className="mt-2 block text-[clamp(1.125rem,3.2vw,1.75rem)] font-semibold leading-tight tracking-[0.2em] text-nv-silver">
              BASEBALL ACADEMY
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-100 sm:text-lg">{SITE.tagline}</p>
          <p className="mt-3 text-sm text-nv-silver/90">{SITE.address.full}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <SiteLink href={bookTrainingHref()} className={`${btnHeroPrimary} w-full sm:w-auto`}>
              Book a Lesson
            </SiteLink>
            <Link href="/camps" className={`${btnGhost} w-full sm:w-auto`}>
              Camps & Clinics
            </Link>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div
            className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-br from-nv-blue/40 to-transparent opacity-60 lg:-inset-2"
            aria-hidden
          />
          <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl shadow-black/50 ring-1 ring-white/10">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[5/4]">
              <Image
                src="/images/facility/facility.jpg"
                alt="Noochie Varner in the indoor training facility"
                fill
                priority
                className="object-cover object-[center_35%] sm:object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto">
              <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-nv-navy/90 px-3 py-2.5 shadow-lg backdrop-blur-sm sm:pr-5">
                <div className="relative h-11 w-14 shrink-0 overflow-hidden rounded-md bg-white/95">
                  <Image src="/images/brand/mark.jpg" alt="" fill className="object-contain p-0.5" sizes="56px" />
                </div>
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-nv-silver">Indoor facility</p>
                  <p className="font-display text-lg font-bold leading-none tracking-wide text-white sm:text-xl">
                    16,000 sq. ft.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
