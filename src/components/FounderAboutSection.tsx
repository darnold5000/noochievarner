"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { FounderPublicContent } from "@/lib/nvba-public-content";

function FounderLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20"
        onClick={onClose}
      >
        Close
      </button>
      <div className="relative h-[min(85vh,720px)] w-full max-w-3xl" onClick={(event) => event.stopPropagation()}>
        <Image src={src} alt={alt} fill className="object-contain" sizes="90vw" />
      </div>
    </div>
  );
}

function FounderMainGraphic({
  src,
  alt,
  onEnlarge,
}: {
  src: string;
  alt: string;
  onEnlarge: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onEnlarge}
      className="block w-full max-w-sm overflow-hidden rounded-2xl bg-nv-navy ring-1 ring-nv-navy/10 transition hover:ring-nv-blue/40"
    >
      <span className="relative block aspect-[2/3]">
        <Image src={src} alt={alt} fill className="object-contain object-center" sizes="420px" />
      </span>
      <span className="block px-3 py-2 text-center text-xs font-semibold text-nv-blue">Enlarge image</span>
    </button>
  );
}

function FounderFlyerGraphic({
  src,
  alt,
  onEnlarge,
}: {
  src: string;
  alt: string;
  onEnlarge: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onEnlarge}
      className="group block w-full max-w-sm text-left transition hover:opacity-95"
    >
      <Image
        src={src}
        alt={alt}
        width={1024}
        height={1021}
        className="h-auto w-full max-w-[220px] rounded-xl shadow-md shadow-nv-navy/10"
        sizes="220px"
      />
      <span className="mt-2 block text-xs font-semibold text-nv-blue group-hover:underline">Enlarge image</span>
    </button>
  );
}

export default function FounderAboutSection({ founder }: { founder: FounderPublicContent }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const close = useCallback(() => setLightbox(null), []);

  return (
    <>
      <section id="noochie-varner" className="scroll-mt-28 border-t border-nv-navy/8 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
            <div className="mx-auto flex w-full max-w-sm flex-col gap-4 lg:mx-0">
              <FounderMainGraphic
                src={founder.mainImageUrl}
                alt="Noochie Varner — founder and professional baseball career highlights"
                onEnlarge={() => setLightbox(founder.mainImageUrl)}
              />
              <FounderFlyerGraphic
                src={founder.testimonialsFlyerUrl}
                alt="Testimonials from Brad Shelton and Mac Whitaker"
                onEnlarge={() => setLightbox(founder.testimonialsFlyerUrl)}
              />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-nv-blue">Founder biography</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-wide text-nv-navy sm:text-4xl">
                Meet Noochie Varner
              </h2>
              <p className="mt-2 text-sm font-semibold text-zinc-600">
                Founder &amp; Hitting Instructor · Noochie Varner Baseball Academy
              </p>
              <div className="mt-6 space-y-8">
                {founder.bioSections.map((section) => (
                  <div key={section.heading || section.paragraphs[0]?.slice(0, 32)}>
                    {section.heading ? (
                      <h3 className="font-display text-xl font-bold tracking-wide text-nv-navy sm:text-2xl">
                        {section.heading}
                      </h3>
                    ) : null}
                    <div className={`space-y-3 text-sm leading-relaxed text-zinc-700 ${section.heading ? "mt-3" : ""}`}>
                      {section.paragraphs.map((paragraph) =>
                        section.heading === "Professional career highlights" ? (
                          <p key={paragraph} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nv-blue" />
                            <span>{paragraph}</span>
                          </p>
                        ) : (
                          <p key={paragraph}>{paragraph}</p>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {lightbox ? <FounderLightbox src={lightbox} alt="Enlarged graphic" onClose={close} /> : null}
    </>
  );
}
