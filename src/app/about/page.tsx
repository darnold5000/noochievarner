import Image from "next/image";
import PageIntro from "@/components/PageIntro";
import { SITE } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Noochie Varner Baseball Academy in Georgetown, Kentucky trains baseball and softball players with individual instruction, from tee ball ages through advanced prospects.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="Georgetown, Kentucky" title="About the Academy">
        <p>
          The focus at NVBA is on the individual. Instructors evaluate each player&apos;s swing and build on what that
          player already does well.
        </p>
      </PageIntro>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2">
        <div className="space-y-4 text-sm leading-relaxed text-zinc-700">
          <p>
            There are similarities in every good swing, and none are exactly the same. Lessons start with an
            evaluation: natural abilities, goals, and, for younger players, what is age-appropriate. Instructors look
            at strength, balance, conditioning, technique, vision, and footwork.
          </p>
          <p>
            Players are encouraged to stay with one coach so instruction stays consistent. The staff is broad enough
            that a player can also sample another instructor&apos;s approach.
          </p>
          <p>
            The academy&apos;s other message is practice. The indoor facility at {SITE.address.full} opened in early
            December 2016. It is 16,000 square feet, with a 7,000 square foot infield practice area.
          </p>
          <p>
            Instructors train players of all ages and skill levels, from Little Leaguers to MLB prospects. Services
            include private, group, and team lessons, facility and cage rentals, camps, and clinics. Batting and
            pitching lessons are offered for softball and baseball, along with catching, defensive drills, and speed
            and agility work.
          </p>
          <p>
            Noochie Varner teaches private hitting and has 8 years of professional playing experience. The academy
            site notes he played those 8 years without a stay on the disabled list, and uses that as part of the
            conversation around speed, power, and staying healthy.
          </p>
        </div>
        <div className="grid gap-4">
          <Image
            src="/images/facility/facility.jpg"
            alt="Noochie Varner inside the indoor facility"
            width={1600}
            height={900}
            className="h-auto w-full rounded-2xl"
          />
          <Image
            src="/images/facility/about-2.jpg"
            alt="Ribbon cutting at the academy, with framed Varner jerseys"
            width={1024}
            height={576}
            className="h-auto w-full rounded-2xl"
          />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-wide text-nv-navy">Facility video</h2>
        <video
          className="mt-4 w-full rounded-2xl bg-black"
          controls
          playsInline
          poster="/images/facility/facility.jpg"
          preload="none"
        >
          <source src={SITE.facilityVideo} type="video/mp4" />
        </video>
        <p className="mt-6 text-sm text-zinc-700">
          {SITE.address.full}
          <br />
          <a className="font-semibold text-nv-blue" href={SITE.phoneHref}>
            {SITE.phone}
          </a>
          {" · "}
          <a className="font-semibold text-nv-blue" href={SITE.emailHref}>
            {SITE.email}
          </a>
        </p>
      </section>
    </>
  );
}
