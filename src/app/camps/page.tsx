import OfferingCard from "@/components/OfferingCard";
import PageIntro from "@/components/PageIntro";
import { CAMPS } from "@/content/site";
import { sortCampsByStartDate } from "@/lib/camp-sort";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Camps & Clinics",
  description:
    "Current baseball camps and clinics at Noochie Varner Baseball Academy in Georgetown, KY, including the Advanced Pitching Clinic, Bat Speed Clinic, Rookie Development, and Winter Tee Ball.",
  path: "/camps",
});

const sortedCamps = sortCampsByStartDate(CAMPS);

export default function CampsPage() {
  return (
    <>
      <PageIntro eyebrow="Georgetown, KY" title="Camps & Clinics">
        <p>
          Seasonal clinics, development programs, and leagues at the indoor facility. Dates, ages, times, and prices
          are listed on each program below.
        </p>
      </PageIntro>
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-8 pb-10 sm:px-6 sm:py-10 sm:pb-12 lg:grid-cols-2">
        {sortedCamps.map((camp) => (
          <OfferingCard key={camp.slug} offering={camp} href={`/camps/${camp.slug}`} />
        ))}
      </section>
    </>
  );
}
