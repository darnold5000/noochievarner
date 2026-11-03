import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import SiteLink from "@/components/SiteLink";
import OfferingCard from "@/components/OfferingCard";
import QuickActions from "@/components/QuickActions";
import { COACHES, LESSON_BOOKING_HREFS } from "@/config/schedule";
import SponsorCard from "@/components/SponsorCard";
import { CAMPS, LESSONS, MEMBERSHIP, SITE, SPONSORS } from "@/content/site";
import { btnOnDark, btnPrimary } from "@/lib/styles";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickActions />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-nv-blue">Now registering</p>
            <h2 className="font-display text-4xl font-bold tracking-wide text-nv-navy">Camps & Clinics</h2>
          </div>
          <Link href="/camps" className="text-sm font-bold uppercase tracking-wide text-nv-blue">
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {CAMPS.map((camp) => (
            <OfferingCard key={camp.slug} offering={camp} href={`/camps/${camp.slug}`} />
          ))}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-nv-blue">Private instruction</p>
          <h2 className="font-display text-4xl font-bold tracking-wide text-nv-navy">Lessons</h2>
          <div className="mt-6 grid items-stretch gap-5 md:grid-cols-2">
            {LESSONS.map((lesson) => {
              const coach = COACHES.find((item) => item.services[0] === lesson.slug);
              const flyer = "image" in lesson ? lesson.image : null;
              const flyerAlt = "imageAlt" in lesson ? lesson.imageAlt : `${lesson.coach}, ${lesson.name}`;
              return (
                <article
                  key={lesson.slug}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-nv-navy/10 bg-white shadow-sm"
                >
                  <div className="relative aspect-[3/2] bg-nv-navy">
                    {flyer ? (
                      <Image
                        src={flyer}
                        alt={flyerAlt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : coach ? (
                      <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center text-white">
                        <div className="relative h-36 w-36">
                          <Image
                            src={coach.photo}
                            alt=""
                            fill
                            className={coach.photoFit === "contain" ? "object-contain" : "object-cover"}
                            sizes="96px"
                          />
                        </div>
                        <p className="font-display text-3xl font-bold tracking-wide">Catching</p>
                        <p className="text-sm text-nv-silver">NVBA instructors</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-nv-blue">{lesson.role}</p>
                    <h3 className="mt-1 font-display text-2xl font-bold tracking-wide text-nv-navy">{lesson.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-zinc-800">{lesson.coach}</p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600">{lesson.bio}</p>
                    <SiteLink href={LESSON_BOOKING_HREFS[lesson.slug]} className={`${btnPrimary} mt-auto w-full pt-4`}>
                      Book Lesson
                    </SiteLink>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <Image
          src="/images/facility/about-3.jpg"
          alt="Instructor working with a young player at the academy"
          width={768}
          height={1024}
          className="h-auto w-full rounded-2xl object-cover"
        />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-nv-blue">The facility</p>
          <h2 className="font-display text-4xl font-bold tracking-wide text-nv-navy">Train indoors in Georgetown</h2>
          <p className="mt-4 leading-relaxed text-zinc-700">{SITE.facility}</p>
          <p className="mt-3 text-sm text-zinc-600">
            Lessons, team training, cage time, and a {SITE.infield.toLowerCase()} are available. Call {SITE.phone} or
            email {SITE.email}.
          </p>
          <Link href="/about" className={`${btnPrimary} mt-6`}>
            About the Academy
          </Link>
        </div>
      </section>

      <section className="bg-nv-navy py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-nv-silver">Membership</p>
            <h2 className="font-display text-4xl font-bold tracking-wide">{MEMBERSHIP.name}</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-200">
              {MEMBERSHIP.annual}, or {MEMBERSHIP.monthly}. Includes HitTrax lessons, cage time, gym access, and
              priority scheduling.
            </p>
          </div>
          <Link href="/memberships" className={btnOnDark}>
            See Membership
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h2 className="text-center font-display text-3xl font-bold tracking-wide text-nv-navy">Our sponsors</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-zinc-600">
          Local partners who support NVBA athletes and the Georgetown community.
        </p>
        <div className="mt-6 space-y-4">
          {SPONSORS.map((sponsor) => (
            <SponsorCard key={sponsor.name} sponsor={sponsor} featured />
          ))}
        </div>
        <p className="mt-6 text-center">
          <Link href="/sponsors" className="text-sm font-semibold text-nv-blue hover:underline">
            Sponsor information
          </Link>
        </p>
      </section>
    </>
  );
}
