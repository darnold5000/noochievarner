import Image from "next/image";
import Link from "next/link";
import BookingLink from "@/components/BookingLink";
import Hero from "@/components/Hero";
import OfferingCard from "@/components/OfferingCard";
import QuickActions from "@/components/QuickActions";
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
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {CAMPS.map((camp) => (
            <OfferingCard key={camp.slug} offering={camp} href={`/camps/${camp.slug}`} />
          ))}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-nv-blue">Private instruction</p>
          <h2 className="font-display text-4xl font-bold tracking-wide text-nv-navy">Lessons</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {LESSONS.map((lesson) => (
              <article key={lesson.slug} className="rounded-2xl border border-nv-navy/10 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-nv-blue">{lesson.role}</p>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-wide">{lesson.name}</h3>
                <p className="mt-1 text-sm font-semibold text-zinc-800">{lesson.coach}</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{lesson.bio}</p>
                <BookingLink destination={lesson.bookingKey} className={`${btnPrimary} mt-5 w-full`}>
                  Book Lesson
                </BookingLink>
              </article>
            ))}
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

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="text-center font-display text-3xl font-bold tracking-wide text-nv-navy">
          Proudly supported by our partners
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {SPONSORS.map((sponsor) => (
            <div key={sponsor.name} className="flex items-center gap-4 rounded-2xl border border-nv-navy/10 bg-white p-5">
              {sponsor.image ? (
                <Image src={sponsor.image} alt="" width={96} height={96} className="h-16 w-16 object-contain" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-nv-ice font-display text-xl font-bold text-nv-navy">
                  W
                </div>
              )}
              <div>
                <p className="font-display text-2xl font-bold tracking-wide">{sponsor.name}</p>
                <p className="text-sm text-zinc-600">{sponsor.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
