"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import HomeSectionHeader from "@/components/HomeSectionHeader";
import type { FounderPublicContent } from "@/lib/nvba-public-content";

function TestimonialLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
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

export default function HomeTestimonialsSection({ founder }: { founder: FounderPublicContent }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const flyerAlt = "Testimonials from Brad Shelton and Mac Whitaker";

  return (
    <>
      <section className="border-t border-b border-nv-navy/8 bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <HomeSectionHeader
            eyebrow="Testimonials"
            title="Respected by those who know the game"
            description="College and high school coaches who have worked with Noochie share what they saw in his game and his ability to teach."
          />
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:gap-12">
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="group mx-auto block text-left lg:mx-0"
            >
              <Image
                src={founder.testimonialsFlyerUrl}
                alt={flyerAlt}
                width={1024}
                height={1021}
                className="h-auto w-full max-w-[260px] rounded-xl shadow-lg shadow-nv-navy/10 ring-1 ring-nv-navy/10 transition group-hover:ring-nv-blue/40 sm:max-w-[280px]"
                sizes="280px"
              />
              <span className="mt-2 block text-center text-xs font-semibold text-nv-blue group-hover:underline lg:text-left">
                Enlarge image
              </span>
            </button>
            <ul className="space-y-6">
              {founder.testimonials.map((item) => (
                <li key={item.name} className="rounded-2xl border border-nv-navy/10 bg-nv-ice/50 p-5 sm:p-6">
                  <blockquote className="text-sm leading-relaxed text-zinc-700 sm:text-base">
                    <span className="text-nv-blue">&ldquo;</span>
                    {item.quote}
                    <span className="text-nv-blue">&rdquo;</span>
                  </blockquote>
                  <footer className="mt-4 border-t border-nv-navy/10 pt-4">
                    <p className="font-display text-lg font-bold tracking-wide text-nv-navy">{item.name}</p>
                    <p className="mt-1 text-sm text-zinc-600">{item.title}</p>
                  </footer>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {lightboxOpen ? (
        <TestimonialLightbox src={founder.testimonialsFlyerUrl} alt={flyerAlt} onClose={closeLightbox} />
      ) : null}
    </>
  );
}
