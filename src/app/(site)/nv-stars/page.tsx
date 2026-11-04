import Image from "next/image";
import NvStarsPhotoGrid from "@/components/NvStarsPhotoGrid";
import { getNvStarsMainImage, getPublicNvStarsHighlights, getPublicNvStarsTeams } from "@/lib/nvba-public-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "NV Stars Teams",
  description:
    "Meet the NV Stars baseball teams representing Noochie Varner Baseball Academy in Georgetown, Kentucky.",
  path: "/nv-stars",
});

export const revalidate = 60;

export default async function NvStarsPage() {
  const [mainImage, teams, highlights] = await Promise.all([
    getNvStarsMainImage(),
    getPublicNvStarsTeams(),
    getPublicNvStarsHighlights(),
  ]);

  return (
    <>
      <section className="bg-nv-navy text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-nv-silver">NV Stars Teams</p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-wide sm:text-4xl lg:text-5xl">Meet the NV Stars</h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-200 sm:text-base">
                Meet the teams and players representing the NV Stars baseball organization.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/15 bg-white shadow-lg">
              <Image
                src={mainImage.src}
                alt={mainImage.alt}
                fill
                priority
                className="object-contain p-1"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        {teams.length ? (
          <NvStarsPhotoGrid images={teams} variant="team" />
        ) : (
          <p className="rounded-xl border border-dashed border-nv-navy/15 bg-nv-ice/50 p-8 text-center text-sm text-zinc-600">
            Team photos will appear here once they are published in the Owner Portal under Gallery (NV Stars Team category).
          </p>
        )}
      </section>

      {highlights.length ? (
        <section className="border-t border-nv-navy/8 bg-nv-ice/50">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-nv-blue">Updates</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-wide text-nv-navy sm:text-3xl">
              NV Stars news &amp; highlights
            </h2>
            <div className="mt-6">
              <NvStarsPhotoGrid images={highlights} variant="news" />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
