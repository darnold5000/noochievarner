import OfferingCard from "@/components/OfferingCard";
import PageIntro from "@/components/PageIntro";
import { CAMPS, PROGRAMS } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Programs",
  description:
    "Player development, youth tee ball, and NV Stars teams at Noochie Varner Baseball Academy in Georgetown, Kentucky.",
  path: "/programs",
});

const groups = [
  {
    title: "Player development",
    items: CAMPS.filter((camp) => camp.slug === "rookie-development").map((offering) => ({
      offering,
      href: `/camps/${offering.slug}`,
    })),
  },
  {
    title: "Leagues",
    items: CAMPS.filter((camp) => camp.slug === "tee-ball-winter-league").map((offering) => ({
      offering,
      href: `/camps/${offering.slug}`,
    })),
  },
  {
    title: "Teams",
    items: PROGRAMS.map((offering) => ({
      offering,
      href: `/programs/${offering.slug}`,
    })),
  },
];

export default function ProgramsPage() {
  return (
    <>
      <PageIntro eyebrow="Year-round development" title="Programs">
        <p>
          Recurring development, the winter tee ball league, and NV Stars travel teams. Camps with a set clinic
          schedule stay on the camps page.
        </p>
      </PageIntro>
      <section className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6">
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="font-display text-3xl font-bold tracking-wide text-nv-navy">{group.title}</h2>
            <div className="mt-4 grid gap-5 lg:grid-cols-2">
              {group.items.map(({ offering, href }) => (
                <OfferingCard key={offering.slug} offering={offering} href={href} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
