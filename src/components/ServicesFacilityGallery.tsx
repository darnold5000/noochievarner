"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { GalleryImage } from "@/components/GalleryGrid";

const SWIPE_THRESHOLD_PX = 48;

export default function ServicesFacilityGallery({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const count = images.length;
  const current = images[index] ?? images[0];

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex((next + count) % count);
    },
    [count],
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, goNext, goPrev]);

  if (!count || !current) return null;

  return (
    <figure className="overflow-hidden rounded-2xl border border-nv-navy/10 bg-white lg:sticky lg:top-24">
      <div
        className="relative touch-pan-y"
        onTouchStart={(event) => setTouchStartX(event.changedTouches[0]?.clientX ?? null)}
        onTouchEnd={(event) => {
          if (touchStartX === null) return;
          const delta = event.changedTouches[0]?.clientX - touchStartX;
          if (Math.abs(delta) >= SWIPE_THRESHOLD_PX) {
            if (delta > 0) goPrev();
            else goNext();
          }
          setTouchStartX(null);
        }}
      >
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="group relative block aspect-[4/3] w-full bg-nv-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nv-blue"
          aria-label={`View larger: ${current.alt}`}
        >
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            className="object-cover transition duration-300 group-hover:brightness-105"
            sizes="(max-width: 1024px) 100vw, 42vw"
            priority={index === 0}
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nv-navy/35 via-transparent to-transparent" />
        </button>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-nv-navy/75 text-white shadow-md backdrop-blur-[2px] transition hover:bg-nv-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-nv-blue"
              aria-label="Previous photo"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-nv-navy/75 text-white shadow-md backdrop-blur-[2px] transition hover:bg-nv-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-nv-blue"
              aria-label="Next photo"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </>
        ) : null}
      </div>

      {current.caption ? (
        <figcaption className="border-b border-nv-navy/8 px-4 py-2.5 text-center text-xs font-medium text-zinc-600 sm:text-sm">
          {current.caption}
        </figcaption>
      ) : null}

      {count > 1 ? (
        <div className="grid grid-cols-4 gap-2 p-3 sm:gap-2.5 sm:p-4" role="tablist" aria-label="Facility photo thumbnails">
          {images.map((image, thumbIndex) => {
            const selected = thumbIndex === index;
            return (
              <button
                key={image.src}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={`Show photo: ${image.caption || image.alt}`}
                onClick={() => setIndex(thumbIndex)}
                className={`relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nv-blue ${
                  selected ? "border-nv-blue ring-1 ring-nv-blue/30" : "border-transparent opacity-80 hover:opacity-100"
                }`}
              >
                <Image src={image.src} alt="" fill className="object-cover" sizes="(max-width: 1024px) 22vw, 10vw" />
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="border-t border-nv-navy/8 px-4 py-3 text-center">
        <Link href="/gallery" className="text-sm font-semibold text-nv-blue hover:text-nv-royal hover:underline">
          View Full Gallery →
        </Link>
      </div>

      {lightboxOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white"
            onClick={() => setLightboxOpen(false)}
          >
            Close
          </button>
          {count > 1 ? (
            <>
              <button
                type="button"
                className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-2 text-white sm:block"
                onClick={(event) => {
                  event.stopPropagation();
                  goPrev();
                }}
                aria-label="Previous photo"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-2 text-white sm:block"
                onClick={(event) => {
                  event.stopPropagation();
                  goNext();
                }}
                aria-label="Next photo"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          ) : null}
          <div className="relative h-[80vh] w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <Image src={current.src} alt={current.alt} fill className="object-contain" sizes="90vw" />
          </div>
          {current.caption ? <p className="absolute bottom-4 left-1/2 max-w-lg -translate-x-1/2 text-center text-sm text-white/90">{current.caption}</p> : null}
        </div>
      ) : null}
    </figure>
  );
}
