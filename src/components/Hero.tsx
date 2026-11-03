import Image from "next/image";
import Link from "next/link";
import SiteLink from "@/components/SiteLink";
import { bookTrainingHref } from "@/config/booking";
import { SITE } from "@/content/site";
import { dataString } from "@/lib/nvba-cms";
import { btnGhost, btnHeroPrimary } from "@/lib/styles";

export const DEFAULT_HERO_IMAGE = "/images/facility/hero-infield.jpg";

export type HeroContent = {
  locationLabel?: string;
  headlinePrimary?: string;
  headlineSecondary?: string;
  heroDescription?: string;
  heroImageUrl?: string;
  facilityBadgeLabel?: string;
  facilityBadgeText?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
};

export default function Hero({ content }: { content?: HeroContent | null }) {
  const locationLabel = content?.locationLabel || "Georgetown, Kentucky";
  const headlinePrimary = content?.headlinePrimary || "NOOCHIE VARNER";
  const headlineSecondary = content?.headlineSecondary || "BASEBALL ACADEMY";
  const heroDescription = content?.heroDescription || SITE.tagline;
  const heroImage = content?.heroImageUrl || DEFAULT_HERO_IMAGE;
  const badgeLabel = content?.facilityBadgeLabel || "Indoor facility";
  const badgeText = content?.facilityBadgeText || "16,000 sq. ft.";
  const primaryText = content?.primaryButtonText || "Book a Lesson";
  const primaryHref = content?.primaryButtonHref || bookTrainingHref();
  const secondaryText = content?.secondaryButtonText || "Camps & Clinics";
  const secondaryHref = content?.secondaryButtonHref || "/camps";

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
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-nv-silver">{locationLabel}</p>
          <h1 className="mt-4 font-display font-bold tracking-wide">
            <span className="block text-[clamp(2.25rem,7vw,4.25rem)] leading-[0.95] text-white">{headlinePrimary}</span>
            <span className="mt-2 block text-[clamp(1.125rem,3.2vw,1.75rem)] font-semibold leading-tight tracking-[0.2em] text-nv-silver">
              {headlineSecondary}
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-100 sm:text-lg">{heroDescription}</p>
          <p className="mt-3 text-sm text-nv-silver/90">{SITE.address.full}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <SiteLink href={primaryHref} className={`${btnHeroPrimary} w-full sm:w-auto`}>
              {primaryText}
            </SiteLink>
            <Link href={secondaryHref} className={`${btnGhost} w-full sm:w-auto`}>
              {secondaryText}
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
                src={heroImage}
                alt="Indoor infield at Noochie Varner Baseball Academy"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto">
              <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-nv-navy/90 px-3 py-2.5 shadow-lg backdrop-blur-sm sm:pr-5">
                <div className="relative h-11 w-14 shrink-0 overflow-hidden rounded-md bg-white/95">
                  <Image src="/images/brand/icon.png" alt="" fill className="object-contain p-0.5" sizes="56px" />
                </div>
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-nv-silver">{badgeLabel}</p>
                  <p className="font-display text-lg font-bold leading-none tracking-wide text-white sm:text-xl">{badgeText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function heroContentFromData(data: Record<string, unknown> | null | undefined): HeroContent | null {
  if (!data) return null;
  return {
    locationLabel: dataString(data, "locationLabel"),
    headlinePrimary: dataString(data, "headlinePrimary"),
    headlineSecondary: dataString(data, "headlineSecondary"),
    heroDescription: dataString(data, "heroDescription"),
    heroImageUrl: dataString(data, "heroImageUrl"),
    facilityBadgeLabel: dataString(data, "facilityBadgeLabel"),
    facilityBadgeText: dataString(data, "facilityBadgeText"),
    primaryButtonText: dataString(data, "primaryButtonText"),
    primaryButtonHref: dataString(data, "primaryButtonHref"),
    secondaryButtonText: dataString(data, "secondaryButtonText"),
    secondaryButtonHref: dataString(data, "secondaryButtonHref"),
  };
}
