import Image from "next/image";
import BookingLink from "@/components/BookingLink";
import PageIntro from "@/components/PageIntro";
import SiteLink from "@/components/SiteLink";
import { bookTrainingHref } from "@/config/booking";
import { COACHES, LESSON_BOOKING_HREFS } from "@/config/schedule";
import { BULK_PACKAGES, LESSON_RATES } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";
import { btnOnDark, btnPrimary } from "@/lib/styles";

export const metadata = createPageMetadata({
  title: "Lessons",
  description:
    "Private hitting, pitching, fielding, and catching lessons at Noochie Varner Baseball Academy in Georgetown, KY. Baseball and softball.",
  path: "/lessons",
});

export default function LessonsPage() {
  return (
    <>
      <PageIntro eyebrow="Private instruction" title="Lessons">
        <p>
          Private lessons are the best way to work on what a specific player needs. Every student is built a little
          differently, physically, mentally, and emotionally, so instruction is tailored to that player.
        </p>
        <p className="mt-3">
          The first lesson sets a baseline. From there, each player gets a development plan and a purposeful routine
          built on the absolutes, not one fixed style. Players are expected to know their strengths, weaknesses, and
          style, and to bring hard work, self-discipline, and accountability.
        </p>
        <SiteLink href={bookTrainingHref()} className={`${btnOnDark} mt-6`}>
          Book Training
        </SiteLink>
      </PageIntro>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 lg:grid-cols-2">
        {COACHES.map((coach) => (
          <article key={coach.id} className="rounded-2xl border border-nv-navy/10 bg-white p-4 sm:p-5">
            <div className="flex items-start gap-4">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-nv-ice sm:h-28 sm:w-28">
                <Image
                  src={coach.photo}
                  alt={`${coach.name}, ${coach.specialty} instructor`}
                  fill
                  className={coach.photoFit === "contain" ? "object-contain p-1" : "object-cover"}
                  style={{ objectPosition: coach.photoPosition }}
                  sizes="112px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-nv-blue">{coach.specialty}</p>
                <h2 className="mt-1 font-display text-2xl font-bold tracking-wide text-nv-navy sm:text-3xl">
                  {coach.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{coach.shortBio}</p>
                <p className="mt-2 text-sm text-zinc-500">{coach.tags.join(" · ")}</p>
                <p className="mt-1 break-words text-sm text-zinc-700">{coach.contact.join(" · ")}</p>
              </div>
            </div>
            <SiteLink href={LESSON_BOOKING_HREFS[coach.services[0]]} className={`${btnPrimary} mt-4 w-full`}>
              Book Private Lesson
            </SiteLink>
          </article>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <h2 className="font-display text-4xl font-bold tracking-wide text-nv-navy">Lesson prices</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {LESSON_RATES.map((group) => (
            <div key={group.category} className="rounded-2xl bg-white p-5">
              <h3 className="font-display text-2xl font-bold tracking-wide">{group.category}</h3>
              <p className="mt-2 text-sm text-zinc-600">{group.note}</p>
              <ul className="mt-4 divide-y divide-zinc-100 text-sm">
                {group.rates.map((rate) => (
                  <li key={rate.length} className="flex justify-between py-2 font-semibold">
                    <span>{rate.length}</span>
                    <span>{rate.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border border-nv-navy/10 bg-white p-5">
          <h3 className="font-display text-2xl font-bold tracking-wide">Bulk lesson packages</h3>
          <p className="mt-2 text-sm text-zinc-600">Bulk lesson packages can be used for softball as well.</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {BULK_PACKAGES.map((pack) => (
              <li key={pack.sessions} className="rounded-xl bg-nv-ice p-4">
                <p className="text-sm text-zinc-500">{pack.sessions} sessions</p>
                <p className="font-display text-3xl font-bold text-nv-navy">{pack.price}</p>
              </li>
            ))}
          </ul>
          <BookingLink destination="packages" className={`${btnPrimary} mt-5`}>
            Purchase Lessons
          </BookingLink>
        </div>
        <div className="mt-5 rounded-2xl border border-nv-navy/10 bg-white p-5">
          <h2 className="font-display text-3xl font-bold tracking-wide text-nv-navy">Lesson terms and conditions</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-700">
            <li>24 hour notice is required when cancelling any lesson or batting cage time. You will be charged the full amount if you fail to do so.</li>
            <li>Scheduling and reservations are on a first come, first serve basis and are subject to availability.</li>
            <li>Payment is due prior to the start of lessons, clinics, etc.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
