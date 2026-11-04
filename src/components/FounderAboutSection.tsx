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

export default function FounderAboutSection({ founder }: { founder: FounderPublicContent }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const close = useCallback(() => setLightbox(null), []);

  return (
    <>
      <section id="noochie-varner" className="scroll-mt-28 border-t border-nv-navy/8 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
            <div className="space-y-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-nv-navy/10">
                <Image
                  src={founder.photoUrl}
                  alt="Noochie Varner"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 360px"
                />
              </div>
              <button
                type="button"
                onClick={() => setLightbox(founder.careerPosterUrl)}
                className="block w-full overflow-hidden rounded-lg border border-nv-navy/10 bg-nv-ice/30 transition hover:border-nv-blue/40 hover:shadow-md"
              >
                <span className="relative block aspect-[16/10]">
                  <Image
                    src={founder.careerPosterUrl}
                    alt="Noochie Varner career statistics"
                    fill
                    className="object-contain p-1"
                    sizes="360px"
                  />
                </span>
                <span className="block px-2 py-2 text-center text-xs font-semibold text-nv-blue">View career stats graphic</span>
              </button>
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

          <div className="mt-12 border-t border-nv-navy/8 pt-10">
            <h3 className="font-display text-2xl font-bold tracking-wide text-nv-navy sm:text-3xl">
              Respected by those who know the game
            </h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {founder.testimonials.map((item) => (
                <figure key={item.name} className="rounded-xl border border-nv-navy/10 bg-nv-ice/40 p-5">
                  <blockquote className="text-sm leading-relaxed text-zinc-700">&ldquo;{item.quote}&rdquo;</blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-nv-navy">
                    {item.name}
                    <span className="mt-0.5 block text-xs font-normal text-zinc-600">{item.title}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setLightbox(founder.testimonialsFlyerUrl)}
              className="mt-4 text-sm font-semibold text-nv-blue hover:text-nv-royal hover:underline"
            >
              View original testimonial graphic
            </button>
          </div>
        </div>
      </section>
      {lightbox ? <FounderLightbox src={lightbox} alt="Enlarged graphic" onClose={close} /> : null}
    </>
  );
}
