import OfferingCard from "@/components/OfferingCard";
import PageIntro from "@/components/PageIntro";
import { CAMPS } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Camps & Clinics",
  description:
    "Current baseball camps and clinics at Noochie Varner Baseball Academy in Georgetown, KY, including Bat Speed Clinic, Rookie Development, and Winter Tee Ball.",
  path: "/camps",
});

export default function CampsPage() {
  return (
    <>
      <PageIntro eyebrow="Georgetown, KY" title="Camps & Clinics">
        <p>
          Dates, ages, times, and prices are listed on each program. Registration opens the matching signup page
          only after you choose one.
        </p>
      </PageIntro>
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:px-6 lg:grid-cols-3">
        {CAMPS.map((camp) => (
          <OfferingCard key={camp.slug} offering={camp} href={`/camps/${camp.slug}`} />
        ))}
      </section>
    </>
  );
}
