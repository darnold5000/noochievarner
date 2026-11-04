import Image from "next/image";
import NvStarsPhotoGrid from "@/components/NvStarsPhotoGrid";
import { getNvStarsCollegeFeature, getPublicNvStarsTeams } from "@/lib/nvba-public-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "NV Stars Teams",
  description:
    "Meet the NV Stars baseball teams representing Noochie Varner Baseball Academy in Georgetown, Kentucky.",
  path: "/nv-stars",
});

export const revalidate = 60;

export default async function NvStarsPage() {
  const [college, teams] = await Promise.all([getNvStarsCollegeFeature(), getPublicNvStarsTeams()]);

  return (
    <>
      <section className="bg-nv-navy text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-nv-silver">NV Stars</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-wide sm:text-4xl lg:text-5xl">Meet the NV Stars</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-200 sm:text-base">
            Meet the teams and players representing the NV Stars baseball organization.
          </p>
        </div>
      </section>

      <section className="border-b border-nv-navy/8 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
          <h2 className="font-display text-2xl font-bold tracking-wide text-nv-navy sm:text-3xl">{college.title}</h2>
          {college.summary ? (
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600 sm:text-base">{college.summary}</p>
          ) : null}
          <div className="relative mt-6 aspect-[4/3] max-w-4xl overflow-hidden rounded-xl border border-nv-navy/10 bg-nv-ice/50 shadow-sm">
            <Image
              src={college.image.src}
              alt={college.image.alt}
              fill
              priority
              className="object-contain p-2"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <h2 className="font-display text-2xl font-bold tracking-wide text-nv-navy sm:text-3xl">NV Stars Teams</h2>
        <div className="mt-6">
          {teams.length ? (
            <NvStarsPhotoGrid images={teams} variant="team" />
          ) : (
            <p className="rounded-xl border border-dashed border-nv-navy/15 bg-nv-ice/50 p-8 text-center text-sm text-zinc-600">
              Team photos will appear here once they are published in the Owner Portal under Gallery (NV Stars Team category).
            </p>
          )}
        </div>
      </section>
    </>
  );
}
