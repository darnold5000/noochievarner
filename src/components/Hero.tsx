import Image from "next/image";
import Link from "next/link";
import { bookingUrl } from "@/config/booking";
import { SITE } from "@/content/site";
import { btnGhost, btnOnDark } from "@/lib/styles";

export default function Hero() {
  return (
    <section className="bg-nv-navy text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:py-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-nv-silver">
            Georgetown, Kentucky
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-[0.9] tracking-wide sm:text-6xl lg:text-7xl">
            NOOCHIE
            <br />
            VARNER
          </h1>
          <p className="mt-2 font-display text-2xl font-semibold tracking-[0.14em] text-nv-silver sm:text-3xl">
            BASEBALL ACADEMY
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-100">{SITE.tagline}</p>
          <p className="mt-3 text-sm text-nv-silver">{SITE.address.full}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/lessons" className={btnOnDark}>
              Book a Lesson
            </Link>
            <Link href="/camps" className={btnGhost}>
              Camps & Clinics
            </Link>
            <a href={bookingUrl("login")} className={btnGhost}>
              Sign In
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-3 -top-3 hidden h-full w-full rounded-2xl border border-nv-silver/40 lg:block" />
          <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl shadow-black/40">
            <Image
              src="/images/facility/facility.jpg"
              alt="Noochie Varner in the indoor training facility"
              width={1600}
              height={900}
              priority
              className="h-auto w-full object-cover"
            />
            <div className="absolute bottom-3 left-3 flex items-center gap-3 rounded-lg bg-white/95 px-2 py-2 pr-4 shadow">
              <Image
                src="/images/brand/mark.jpg"
                alt=""
                width={72}
                height={54}
                className="h-12 w-auto"
              />
              <p className="text-xs font-bold uppercase leading-tight tracking-wide text-nv-navy">
                16,000 sq. ft.
                <br />
                indoor facility
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
