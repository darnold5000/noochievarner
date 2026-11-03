import Image from "next/image";
import Link from "next/link";
import SiteLink from "@/components/SiteLink";
import { bookTrainingHref } from "@/config/booking";
import { SITE } from "@/content/site";
import { dataString } from "@/lib/nvba-cms";
import { btnGhost, btnHeroPrimary } from "@/lib/styles";

export const HOME_HERO_IMAGE = "/images/facility/home-hero-indoor.jpg";

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
  const heroImage = content?.heroImageUrl || HOME_HERO_IMAGE;
  const badgeLabel = content?.facilityBadgeLabel || "Indoor facility";
  const badgeText = content?.facilityBadgeText || "16,000 sq. ft.";
  const primaryText = content?.primaryButtonText || "Book a Lesson";
  const primaryHref = content?.primaryButtonHref || bookTrainingHref();
  const secondaryText = content?.secondaryButtonText || "Camps & Clinics";
  const secondaryHref = content?.secondaryButtonHref || "/camps";

  return (
    <section className="relative isolate h-[clamp(30rem,74vw,35rem)] overflow-hidden bg-nv-navy text-white sm:h-[clamp(28.125rem,38vw,31.25rem)]">
      <Image
        src={heroImage}
        alt="Indoor training facility at Noochie Varner Baseball Academy"
        fill
        priority
        className="object-cover object-[52%_78%] sm:object-[58%_72%]"
        sizes="100vw"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-nv-navy/92 via-nv-navy/55 to-nv-navy/10 sm:via-nv-navy/40 sm:to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nv-navy/45 via-transparent to-nv-navy/25 sm:to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 py-8 sm:px-6 sm:py-9 lg:py-10">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-nv-silver">{locationLabel}</p>
          <h1 className="mt-2 font-display font-bold tracking-wide drop-shadow-sm">
            <span className="block text-[clamp(2rem,7vw,3.75rem)] leading-[0.92] text-white sm:text-[clamp(2.25rem,5vw,3.75rem)]">
              {headlinePrimary}
            </span>
            <span className="mt-1 block text-[clamp(1rem,3vw,1.5rem)] font-semibold leading-tight tracking-[0.2em] text-nv-silver sm:mt-1.5">
              {headlineSecondary}
            </span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-snug text-zinc-100 sm:mt-3.5 sm:text-base sm:leading-relaxed">{heroDescription}</p>
          <p className="mt-1.5 text-sm text-nv-silver/90">{SITE.address.full}</p>
          <div className="mt-3.5 inline-flex max-w-full items-center gap-3 rounded-xl border border-white/20 bg-nv-navy/75 px-3 py-2 shadow-lg backdrop-blur-sm sm:mt-4 sm:py-2.5 sm:pr-5">
            <div className="relative h-9 w-11 shrink-0 overflow-hidden rounded-md bg-white/95 sm:h-10 sm:w-12">
              <Image src="/images/brand/icon.png" alt="" fill className="object-contain p-0.5" sizes="48px" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-nv-silver">{badgeLabel}</p>
              <p className="font-display text-base font-bold leading-none tracking-wide text-white sm:text-lg">{badgeText}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:flex-row sm:flex-wrap sm:gap-3">
            <SiteLink href={primaryHref} className={`${btnHeroPrimary} w-full sm:w-auto`}>
              {primaryText}
            </SiteLink>
            <Link href={secondaryHref} className={`${btnGhost} w-full sm:w-auto`}>
              {secondaryText}
            </Link>
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
