"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export type NvStarsGridPhoto = {
  src: string;
  alt: string;
  caption: string;
  teamLabel?: string;
  season?: string;
};

const SWIPE_THRESHOLD_PX = 48;

export default function NvStarsPhotoGrid({
  images,
  variant = "team",
}: {
  images: NvStarsGridPhoto[];
  variant?: "team" | "news";
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const count = images.length;
  const currentIndex = selected ?? 0;
  const current = images[currentIndex];

  const goTo = useCallback(
    (delta: number) => {
      if (count === 0) return;
      setSelected((prev) => {
        if (prev === null) return 0;
        return (prev + delta + count) % count;
      });
    },
    [count],
  );

  const open = (index: number) => setSelected(index);
  const close = () => setSelected(null);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") goTo(-1);
      if (event.key === "ArrowRight") goTo(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, goTo]);

  if (!count || !current) return null;

  const gridClass =
    variant === "news"
      ? "grid grid-cols-1 gap-4 sm:grid-cols-2"
      : "grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      <div className={gridClass}>
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => open(index)}
            className="group overflow-hidden rounded-xl border border-nv-navy/10 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-nv-blue/35 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nv-blue"
          >
            <span className="relative block aspect-[4/3] bg-nv-ice/80">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain p-1 transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading={index < 3 ? "eager" : "lazy"}
              />
            </span>
            {(image.teamLabel || image.season || image.caption) && variant === "team" ? (
              <span className="block border-t border-nv-navy/8 px-4 py-3">
                {image.teamLabel ? (
                  <span className="block font-display text-lg font-bold tracking-wide text-nv-navy">{image.teamLabel}</span>
                ) : null}
                {image.season ? <span className="mt-0.5 block text-xs font-semibold uppercase tracking-wide text-nv-blue">{image.season}</span> : null}
                {image.caption ? <span className="mt-1 block text-sm text-zinc-600">{image.caption}</span> : null}
              </span>
            ) : null}
            {variant === "news" && image.caption ? (
              <span className="block border-t border-nv-navy/8 px-4 py-3 text-sm text-zinc-700">{image.caption}</span>
            ) : null}
          </button>
        ))}
      </div>

      {selected !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={close}
          onTouchStart={(event) => setTouchStartX(event.changedTouches[0]?.clientX ?? null)}
          onTouchEnd={(event) => {
            if (touchStartX === null) return;
            const delta = event.changedTouches[0]?.clientX - touchStartX;
            if (Math.abs(delta) >= SWIPE_THRESHOLD_PX) goTo(delta > 0 ? -1 : 1);
            setTouchStartX(null);
          }}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20"
            onClick={close}
          >
            Close
          </button>
          {count > 1 ? (
            <>
              <button
                type="button"
                className="absolute left-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-4"
                onClick={(event) => {
                  event.stopPropagation();
                  goTo(-1);
                }}
                aria-label="Previous photo"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                className="absolute right-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-4"
                onClick={(event) => {
                  event.stopPropagation();
                  goTo(1);
                }}
                aria-label="Next photo"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          ) : null}
          <div className="relative h-[min(80vh,720px)] w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <Image src={current.src} alt={current.alt} fill className="object-contain" sizes="90vw" priority />
          </div>
          {current.caption || current.teamLabel ? (
            <p className="absolute bottom-4 left-1/2 max-w-lg -translate-x-1/2 px-4 text-center text-sm text-white/90">
              {[current.teamLabel, current.season, current.caption].filter(Boolean).join(" · ")}
            </p>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
