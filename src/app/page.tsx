import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import HomeFeaturedLessonCard from "@/components/HomeFeaturedLessonCard";
import HomeSectionHeader from "@/components/HomeSectionHeader";
import OfferingCard from "@/components/OfferingCard";
import QuickActions from "@/components/QuickActions";
import SponsorCard from "@/components/SponsorCard";
import { LESSON_BOOKING_HREFS } from "@/config/schedule";
import { sortCampsByStartDate } from "@/lib/camp-sort";
import { CAMPS, LESSONS, MEMBERSHIP, SITE, SPONSORS } from "@/content/site";
import { btnOnDark, btnOutline, btnPrimary } from "@/lib/styles";

const FEATURED_LESSON_SLUGS = ["hitting", "pitching"] as const;

const sortedCamps = sortCampsByStartDate(CAMPS);

export default function HomePage() {
  const featuredLessons = FEATURED_LESSON_SLUGS.map((slug) => LESSONS.find((l) => l.slug === slug)).filter(
    (lesson): lesson is (typeof LESSONS)[number] => Boolean(lesson),
  );

  return (
    <>
      <Hero />
      <QuickActions />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <HomeSectionHeader
          eyebrow="Now registering"
          title="Camps & Clinics"
          description="Develop your skills with camps, clinics, and programs designed for every level."
          actionHref="/camps"
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {sortedCamps.map((camp) => (
            <OfferingCard
              key={camp.slug}
              offering={camp}
              href={`/camps/${camp.slug}`}
              flyerContain
            />
          ))}
        </div>
      </section>

      <section className="border-y border-nv-navy/5 bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <HomeSectionHeader
            eyebrow="Private instruction"
            title="Train with experienced coaches"
            description="Personalized baseball and softball instruction focused on skills, confidence, and development."
          />
          <div className="mt-8 grid items-stretch gap-5 md:grid-cols-2">
            {featuredLessons.map((lesson) => (
              <HomeFeaturedLessonCard
                key={lesson.slug}
                lesson={lesson}
                bookHref={LESSON_BOOKING_HREFS[lesson.slug]}
              />
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link href="/lessons" className={`${btnOutline} inline-flex`}>
              View all lessons
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-nv-ice to-white py-10 sm:py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
          <div className="relative overflow-hidden rounded-2xl shadow-lg shadow-nv-navy/10 ring-1 ring-nv-navy/10">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]">
              <Image
                src="/images/facility/about-3.jpg"
                alt="Instructor working with a young player at the academy"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-nv-blue">The facility</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-wide text-nv-navy sm:text-4xl">
              16,000 sq. ft. built for development.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-700 sm:text-base">
              Train year-round in our indoor baseball and softball facility in Georgetown, Kentucky.
            </p>
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
              About the Academy
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-nv-navy py-12 text-white sm:py-16">
        <div className="absolute left-0 top-0 h-1 w-full bg-nv-blue" aria-hidden />
        <div className="absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-nv-blue/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center lg:max-w-none lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-nv-silver">Membership</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-wide sm:text-4xl lg:text-5xl">
              {MEMBERSHIP.name}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-200 lg:mx-0 lg:text-base">
              Train year-round with HitTrax lessons, daily cage access, gym access, and priority scheduling. Choose a
              one-time payment or monthly installments — see membership details for full pricing.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Link href="/memberships" className={btnOnDark}>
                See membership
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-nv-blue">Our sponsors</p>
        <div className="mt-4">
          {SPONSORS.map((sponsor) => (
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
