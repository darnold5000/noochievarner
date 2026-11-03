import OfferingCard from "@/components/OfferingCard";
import PageIntro from "@/components/PageIntro";
import { CAMPS } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Camps & Clinics",
  description:
    "Current baseball camps and clinics at Noochie Varner Baseball Academy in Georgetown, KY, including the Advanced Pitching Clinic, Bat Speed Clinic, Rookie Development, and Winter Tee Ball.",
  path: "/camps",
});

export default function CampsPage() {
  return (
    <>
      <PageIntro eyebrow="Georgetown, KY" title="Camps & Clinics">
        <p>
          Seasonal clinics, development programs, and leagues at the indoor facility. Dates, ages, times, and prices
          are listed on each program below.
        </p>
      </PageIntro>
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:px-6 lg:grid-cols-2">
        {CAMPS.map((camp) => (
          <OfferingCard key={camp.slug} offering={camp} href={`/camps/${camp.slug}`} />
        ))}
      </section>
      <section className="mx-auto max-w-7xl space-y-12 px-4 pb-14 sm:px-6">
        {CAMPS.filter((camp) => camp.sections?.length).map((camp) => (
          <div key={camp.slug}>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-nv-blue">{camp.eyebrow}</p>
            <h2 className="mt-1 font-display text-4xl font-bold tracking-wide text-nv-navy">{camp.name}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-600">{camp.summary}</p>
            <div className={`mt-5 grid gap-4 ${camp.sections && camp.sections.length > 1 ? "lg:grid-cols-3" : ""}`}>
              {camp.sections?.map((section) => (
                <div key={section.title} className="rounded-2xl border border-nv-navy/10 bg-white p-5">
                  <h3 className="font-display text-2xl font-bold tracking-wide text-nv-navy">{section.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nv-blue" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-700">
              {camp.details.map((detail) => (
                <li key={detail} className="rounded-xl bg-white px-4 py-3">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
