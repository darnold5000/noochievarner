import Image from "next/image";
import Link from "next/link";
import BookingLink from "@/components/BookingLink";
import PageIntro from "@/components/PageIntro";
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
          Hitting, pitching, fielding, and catching with the academy staff. Baseball and softball players are both
          welcome.
        </p>
        <Link href="/book" className={`${btnOnDark} mt-6`}>
          Book Training
        </Link>
      </PageIntro>
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:px-6 lg:grid-cols-2">
        {COACHES.map((coach) => (
          <article key={coach.id} className="overflow-hidden rounded-2xl border border-nv-navy/10 bg-white">
            <div className="relative h-56 bg-nv-ice sm:h-64">
              <Image
                src={coach.photo}
                alt={`${coach.name}, ${coach.specialty} instructor`}
                fill
                className="object-cover"
                style={{ objectPosition: coach.photoPosition }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-nv-blue">{coach.specialty}</p>
              <h2 className="mt-1 font-display text-3xl font-bold tracking-wide text-nv-navy">{coach.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{coach.shortBio}</p>
              <p className="mt-3 text-sm text-zinc-500">{coach.tags.join(" · ")}</p>
              <p className="mt-2 text-sm text-zinc-700">{coach.contact.join(" · ")}</p>
              <Link href={LESSON_BOOKING_HREFS[coach.services[0]]} className={`${btnPrimary} mt-5 w-full`}>
                Book Private Lesson
              </Link>
            </div>
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
      </section>
    </>
  );
}
