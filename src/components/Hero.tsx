import Image from "next/image";
import Link from "next/link";
import SiteLink from "@/components/SiteLink";
import { bookTrainingHref } from "@/config/booking";
import { SITE } from "@/content/site";
import { dataString } from "@/lib/nvba-cms";
import { btnGhost, btnHeroPrimary } from "@/lib/styles";

/** Homepage hero experiment — full-bleed facility photo (easy to revert in git). */
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
    <section className="relative isolate min-h-[min(88vh,920px)] overflow-hidden bg-nv-navy text-white">
      <Image
        src={heroImage}
        alt="Indoor training facility at Noochie Varner Baseball Academy"
        fill
        priority
        className="object-cover object-[center_42%]"
        sizes="100vw"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-nv-navy/95 via-nv-navy/78 to-nv-navy/35 sm:via-nv-navy/65 sm:to-nv-navy/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nv-navy/85 via-nv-navy/15 to-nv-navy/40"
        aria-hidden
      />
      <div className="relative mx-auto flex min-h-[min(88vh,920px)] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-nv-silver">{locationLabel}</p>
          <h1 className="mt-4 font-display font-bold tracking-wide drop-shadow-sm">
            <span className="block text-[clamp(2.5rem,8vw,4.75rem)] leading-[0.92] text-white">{headlinePrimary}</span>
            <span className="mt-2 block text-[clamp(1.125rem,3.5vw,1.875rem)] font-semibold leading-tight tracking-[0.2em] text-nv-silver">
              {headlineSecondary}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-100 sm:text-lg">{heroDescription}</p>
          <p className="mt-3 text-sm text-nv-silver/90">{SITE.address.full}</p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-white/20 bg-nv-navy/75 px-3 py-2.5 shadow-lg backdrop-blur-sm sm:pr-5">
            <div className="relative h-10 w-12 shrink-0 overflow-hidden rounded-md bg-white/95">
              <Image src="/images/brand/icon.png" alt="" fill className="object-contain p-0.5" sizes="48px" />
            </div>
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-nv-silver">{badgeLabel}</p>
              <p className="font-display text-base font-bold leading-none tracking-wide text-white sm:text-lg">{badgeText}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
