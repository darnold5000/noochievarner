import Image from "next/image";
import Link from "next/link";
import HomeFounderSection from "@/components/HomeFounderSection";
import HomeTestimonialsSection from "@/components/HomeTestimonialsSection";
import HomeNvStarsFeature from "@/components/HomeNvStarsFeature";
import HomeCampProgramCard from "@/components/HomeCampProgramCard";
import Hero, { HOME_HERO_IMAGE, heroContentFromData } from "@/components/Hero";
import HomeFeaturedLessonCard from "@/components/HomeFeaturedLessonCard";
import HomeHitTraxLeaguesSection from "@/components/HomeHitTraxLeaguesSection";
import HomeSectionHeader from "@/components/HomeSectionHeader";
import QuickActions from "@/components/QuickActions";
import SponsorCard from "@/components/SponsorCard";
import { LESSON_BOOKING_HREFS } from "@/config/schedule";
import { SITE } from "@/content/site";
import { sortCampsByStartDate } from "@/lib/camp-sort";
import { dataString, resolveCmsMediaUrl } from "@/lib/nvba-cms";
import {
  getFeaturedHomeCamps,
  getFeaturedHomeHitTraxLeagues,
  getFeaturedHomeLessons,
  getFeaturedHomeSponsors,
  getHitTraxLeaguesSectionCopy,
  getFeaturedNvStarsHomePhotos,
  getHomepageContent,
  getNvStarsMainImage,
  getPublicFounderContent,
  getPublicMembership,
} from "@/lib/nvba-public-content";
import { btnOnDark, btnOutline, btnPrimary } from "@/lib/styles";

export const revalidate = 60;

export default async function HomePage() {
  const [homepageData, camps, hittraxLeagues, featuredLessons, membership, sponsors, nvStarsFeatured, nvStarsMainImage, founder] =
    await Promise.all([
    getHomepageContent(),
    getFeaturedHomeCamps(),
    getFeaturedHomeHitTraxLeagues(),
    getFeaturedHomeLessons(),
    getPublicMembership(),
    getFeaturedHomeSponsors(),
    getFeaturedNvStarsHomePhotos(),
    getNvStarsMainImage(),
    getPublicFounderContent(),
  ]);

  const sortedCamps = sortCampsByStartDate(camps);
  const heroContent = heroContentFromData(homepageData ?? undefined);
  const campsEyebrow = homepageData ? dataString(homepageData, "campsSectionEyebrow") : "";
  const campsTitle = homepageData ? dataString(homepageData, "campsSectionTitle") : "";
  const campsDescription = homepageData ? dataString(homepageData, "campsSectionDescription") : "";
  const lessonsEyebrow = homepageData ? dataString(homepageData, "lessonsSectionEyebrow") : "";
  const lessonsTitle = homepageData ? dataString(homepageData, "lessonsSectionTitle") : "";
  const lessonsDescription = homepageData ? dataString(homepageData, "lessonsSectionDescription") : "";
  const facilityImage = homepageData
    ? resolveCmsMediaUrl(homepageData, "facilitySectionImageUrl", "/images/facility/about-3.jpg")
    : "/images/facility/about-3.jpg";
  const facilityTitle = homepageData ? dataString(homepageData, "facilitySectionTitle") : "16,000 sq. ft. built for development.";
  const facilityDescription =
    homepageData ? dataString(homepageData, "facilitySectionDescription") : "Train year-round in our indoor baseball and softball facility in Georgetown, Kentucky.";
  const facilityButton = homepageData ? dataString(homepageData, "facilitySectionButtonText") : "About the Academy";
  const membershipEyebrow = homepageData ? dataString(homepageData, "membershipSectionEyebrow") : "Membership";
  const membershipTitle = homepageData ? dataString(homepageData, "membershipSectionTitle") : membership.name;
  const membershipDescription =
    homepageData ? dataString(homepageData, "membershipSectionDescription") : "Train year-round with HitTrax lessons, daily cage access, gym access, and priority scheduling. Choose a one-time payment or monthly installments — see membership details for full pricing.";
  const hittraxSectionCopy = await getHitTraxLeaguesSectionCopy(homepageData ?? undefined);

  const homepageSponsors = sponsors;

  return (
    <>
      <Hero
        content={{
          ...(heroContent ?? {}),
          heroImageUrl: HOME_HERO_IMAGE,
        }}
      />
      <QuickActions />

      <HomeFounderSection founder={founder} />
      <HomeTestimonialsSection founder={founder} />

      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <HomeSectionHeader
            eyebrow={campsEyebrow || "Now registering"}
            title={campsTitle || "Camps & Clinics"}
            description={
              campsDescription || "Develop your skills with camps, clinics, and programs designed for every level."
            }
            actionHref="/camps"
          />
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {sortedCamps.map((camp) => (
              <HomeCampProgramCard key={camp.slug} offering={camp} href={`/camps/${camp.slug}`} />
            ))}
          </div>
        </div>
      </section>

      <HomeHitTraxLeaguesSection leagues={hittraxLeagues} sectionCopy={hittraxSectionCopy} />

      <section className="border-t border-nv-navy/8 bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <HomeSectionHeader
            eyebrow={lessonsEyebrow || "Private instruction"}
            title={lessonsTitle || "Train with experienced coaches"}
            description={
              lessonsDescription ||
              "Personalized baseball and softball instruction focused on skills, confidence, and development."
            }
          />
          <div className="mt-6 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {featuredLessons.map((lesson) => (
              <HomeFeaturedLessonCard
                key={lesson.slug}
                lesson={lesson}
                bookHref={LESSON_BOOKING_HREFS[lesson.slug as keyof typeof LESSON_BOOKING_HREFS]}
              />
            ))}
          </div>
          <p className="mt-6 text-center">
            <Link href="/lessons" className={`${btnOutline} inline-flex`}>
              View all lessons
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-nv-ice to-white py-10 sm:py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
          {facilityImage ? (
            <div className="relative overflow-hidden rounded-2xl shadow-lg shadow-nv-navy/10 ring-1 ring-nv-navy/10">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]">
                <Image
                  src={facilityImage}
                  alt="Instructor working with a young player at the academy"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          ) : null}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-nv-blue">The facility</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-wide text-nv-navy sm:text-4xl">{facilityTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-700 sm:text-base">{facilityDescription}</p>
            <ul className="mt-5 space-y-2 text-sm text-zinc-700">
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nv-blue" />
                Indoor training for baseball and softball
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nv-blue" />
                Private lessons, team training, and cage time
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nv-blue" />
                {SITE.infield} for infield work
              </li>
            </ul>
            <p className="mt-4 text-sm text-zinc-600">{SITE.facility}</p>
            <Link href="/about" className={`${btnPrimary} mt-6`}>
              {facilityButton}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-nv-navy py-12 text-white sm:py-16">
        <div className="absolute left-0 top-0 h-1 w-full bg-nv-blue" aria-hidden />
        <div className="absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-nv-blue/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center lg:max-w-none lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-nv-silver">{membershipEyebrow}</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-wide sm:text-4xl lg:text-5xl">{membershipTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-200 lg:mx-0 lg:text-base">
              {membershipDescription}
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Link href="/memberships" className={btnOnDark}>
                See membership
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HomeNvStarsFeature photos={nvStarsFeatured} mainImage={nvStarsMainImage} />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-nv-blue">Our sponsors</p>
        <div className="mt-4">
          {(homepageSponsors.length ? homepageSponsors : sponsors).map((sponsor) => (
            <SponsorCard key={sponsor.name} sponsor={sponsor} compact />
          ))}
        </div>
        <p className="mt-4 text-center">
          <Link href="/sponsors" className="text-sm font-semibold text-nv-blue hover:underline">
            Sponsor information
          </Link>
        </p>
      </section>
    </>
  );
}
