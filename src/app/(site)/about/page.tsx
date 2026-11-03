import Image from "next/image";
import PageIntro from "@/components/PageIntro";
import { SITE } from "@/content/site";
import { getPublicAboutContent, getResolvedSiteContact } from "@/lib/nvba-public-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Noochie Varner Baseball Academy in Georgetown, Kentucky trains baseball and softball players with individual instruction, from tee ball ages through advanced prospects.",
  path: "/about",
});

export const revalidate = 60;

const FALLBACK_PARAGRAPHS = [
  "There are similarities in every good swing, and none are exactly the same. Lessons start with an evaluation: natural abilities, goals, and, for younger players, what is age-appropriate. Instructors look at strength, balance, conditioning, technique, vision, and footwork.",
  "Players are encouraged to stay with one coach so instruction stays consistent. The staff is broad enough that a player can also sample another instructor's approach.",
  `The academy's other message is practice. The indoor facility at ${SITE.address.full} opened in early December 2016. It is 16,000 square feet, with a 7,000 square foot infield practice area.`,
  "Instructors train players of all ages and skill levels, from Little Leaguers to MLB prospects. Services include private, group, and team lessons, facility and cage rentals, camps, and clinics. Batting and pitching lessons are offered for softball and baseball, along with catching, defensive drills, and speed and agility work.",
  "Noochie Varner teaches private hitting and has 8 years of professional playing experience. The academy site notes he played those 8 years without a stay on the disabled list, and uses that as part of the conversation around speed, power, and staying healthy.",
];

export default async function AboutPage() {
  const [cms, contactFallback] = await Promise.all([getPublicAboutContent(), getResolvedSiteContact()]);
  const contact = cms?.contact ?? contactFallback;
  const introEyebrow = cms?.introEyebrow ?? "Georgetown, Kentucky";
  const introTitle = cms?.introTitle ?? "About the Academy";
  const introText =
    cms?.introText ??
    "The focus at NVBA is on the individual. Instructors evaluate each player's swing and build on what that player already does well.";
  const paragraphs = cms?.storyParagraphs.length ? cms.storyParagraphs : FALLBACK_PARAGRAPHS;
  const mainImage = cms?.mainImageUrl ?? "/images/facility/facility.jpg";
  const secondaryImage = cms?.secondaryImageUrl ?? "/images/facility/about-2.jpg";
  const facilityVideo = cms?.facilityVideoUrl ?? SITE.facilityVideo;

  return (
    <>
      <PageIntro eyebrow={introEyebrow} title={introTitle}>
        <p>{introText}</p>
      </PageIntro>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2">
        <div className="space-y-4 text-sm leading-relaxed text-zinc-700">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
          {cms?.features.length ? (
            <ul className="mt-4 space-y-2">
              {cms.features.map((feature) => (
                <li key={feature.label} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nv-blue" />
                  <span>
                    <span className="font-semibold text-nv-navy">{feature.label}:</span> {feature.description}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="grid gap-4">
          <Image
            src={mainImage}
            alt="Noochie Varner inside the indoor facility"
            width={1600}
            height={900}
            className="h-auto w-full rounded-2xl"
          />
          <Image
            src={secondaryImage}
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
          poster={mainImage}
          preload="none"
        >
          <source src={facilityVideo} type="video/mp4" />
        </video>
        <p className="mt-6 text-sm text-zinc-700">
          {contact.address.full}
          <br />
          <a className="font-semibold text-nv-blue" href={contact.phoneHref}>
            {contact.phone}
          </a>
          {" · "}
          <a className="font-semibold text-nv-blue" href={contact.emailHref}>
            {contact.email}
          </a>
        </p>
      </section>
    </>
  );
}
