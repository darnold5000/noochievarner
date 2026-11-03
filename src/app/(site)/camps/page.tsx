import CampProgramCard from "@/components/CampProgramCard";
import PageIntro from "@/components/PageIntro";
import { sortCampsByStartDate } from "@/lib/camp-sort";
import { getPublicCamps } from "@/lib/nvba-public-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Camps & Clinics",
  description:
    "Current baseball camps and clinics at Noochie Varner Baseball Academy in Georgetown, KY, including the Advanced Pitching Clinic, Bat Speed Clinic, Rookie Development, and Winter Tee Ball.",
  path: "/camps",
});

export const revalidate = 60;

export default async function CampsPage() {
  const camps = sortCampsByStartDate(await getPublicCamps());

  return (
    <>
      <PageIntro eyebrow="Georgetown, KY" title="Camps & Clinics">
        <p>
          Seasonal clinics, development programs, and leagues at the indoor facility. Dates, ages, times, and prices
          are listed on each program below.
        </p>
      </PageIntro>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-8 pb-10 sm:px-6 sm:py-10 sm:pb-12 lg:grid-cols-2 lg:gap-5">
        {camps.map((camp) => (
          <CampProgramCard key={camp.slug} offering={camp} href={`/camps/${camp.slug}`} />
        ))}
      </section>
    </>
  );
}
