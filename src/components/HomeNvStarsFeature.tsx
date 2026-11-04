import Image from "next/image";
import Link from "next/link";
import type { NvStarsGridPhoto } from "@/components/NvStarsPhotoGrid";
import { btnOutline } from "@/lib/styles";

export default function HomeNvStarsFeature({
  photos,
  mainImage,
}: {
  photos: NvStarsGridPhoto[];
  mainImage: { src: string; alt: string };
}) {
  if (!photos.length && !mainImage.src) return null;

  return (
    <section className="border-t border-nv-navy/8 bg-gradient-to-b from-white to-nv-ice/60 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-nv-blue">NV Stars</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-wide text-nv-navy sm:text-4xl">
              Proud home of the NV Stars
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
              Get to know the teams representing our baseball organization.
            </p>
          </div>
          <Link href="/nv-stars" className={`${btnOutline} shrink-0 self-start lg:self-auto`}>
            Meet the teams
          </Link>
        </div>
        <Link
          href="/nv-stars"
          className="group mt-6 block overflow-hidden rounded-xl border border-nv-navy/10 bg-white shadow-sm transition hover:border-nv-blue/30 hover:shadow-md"
        >
          <span className="relative block aspect-[4/3] max-h-[28rem] bg-nv-ice/80 sm:aspect-[16/10]">
            <Image
              src={mainImage.src}
              alt={mainImage.alt}
              fill
              className="object-contain p-2 transition group-hover:scale-[1.01]"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority={false}
            />
          </span>
        </Link>
        {photos.length ? (
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {photos.map((photo) => (
              <Link
                key={photo.src}
                href="/nv-stars"
                className="group overflow-hidden rounded-xl border border-nv-navy/10 bg-white shadow-sm transition hover:border-nv-blue/30 hover:shadow-md"
              >
                <span className="relative block aspect-[4/3] bg-nv-ice/80">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-contain p-1 transition group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    loading="lazy"
                  />
                </span>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
