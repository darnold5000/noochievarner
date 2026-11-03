"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function ProgramFlyerSection({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <section className="mt-10 rounded-2xl border border-nv-navy/10 bg-nv-ice/50 p-5 sm:p-6">
      <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-nv-blue">Original program flyer</h2>
      <p className="mt-2 text-sm text-zinc-600">
        Downloadable-style artwork from the academy. Structured details above are the easiest way to compare programs.
      </p>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 block w-full max-w-xs overflow-hidden rounded-xl border border-nv-navy/10 bg-white text-left shadow-sm transition hover:border-nv-blue/30 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nv-blue"
      >
        <div className="relative aspect-[4/5] max-h-52 w-full">
          <Image src={src} alt={alt} fill className="object-contain p-2" sizes="320px" />
        </div>
        <span className="block border-t border-nv-navy/8 px-3 py-2 text-xs font-bold uppercase tracking-wide text-nv-blue">
          View flyer
        </span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-nv-navy/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={close}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-md bg-white/10 px-3 py-1.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-white/20"
            onClick={close}
          >
            Close
          </button>
          <div
            className="relative max-h-[90vh] max-w-4xl overflow-auto rounded-xl bg-white p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={900}
              height={1200}
              className="h-auto max-h-[85vh] w-full object-contain"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
