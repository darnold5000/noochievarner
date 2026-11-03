import Image from "next/image";
import CopyAccessCode from "@/components/CopyAccessCode";
import { PRO_SHOP, STORES } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";
import { btnOnDark, btnOutline, btnPrimary } from "@/lib/styles";

export const metadata = createPageMetadata({
  title: "Pro Shop",
  description:
    "NVBA Pro Shop — Wilson partner catalog and NVBA team apparel. Access code 18DD053. Orders through Petey Reynolds.",
  path: "/pro-shop",
});

export default function ProShopPage() {
  const contact = STORES.catalogContact;
  const { hero, wilson, apparel, orderSteps } = PRO_SHOP;

  return (
    <>
      <section className="relative overflow-hidden bg-nv-navy text-white">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-nv-blue/25 via-transparent to-nv-navy"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-10 lg:py-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-nv-silver">{hero.label}</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[0.95] tracking-wide sm:text-5xl lg:text-6xl">
              {hero.lines[0]}
              <span className="mt-1 block text-nv-silver">{hero.lines[1]}</span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-zinc-200 sm:text-base">{hero.subtitle}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {hero.highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-nv-blue/40 bg-nv-blue/15 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white sm:text-xs"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-black/40 ring-1 ring-white/10">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[5/4]">
              <Image
                src={hero.image}
                alt={hero.imageAlt}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-12">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 lg:order-1">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-nv-blue">{wilson.brand}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">{wilson.tagline}</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-wide text-nv-navy sm:text-4xl">
              {wilson.heading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">{wilson.description}</p>
            <div className="mt-6 flex flex-col gap-3 rounded-xl border border-nv-navy/10 bg-nv-ice p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Access code</p>
                <p className="font-display text-2xl font-bold tracking-wide text-nv-blue">{wilson.accessCode}</p>
              </div>
              <CopyAccessCode code={wilson.accessCode} />
            </div>
            <a
              href={wilson.href}
              className={`${btnPrimary} mt-6 inline-flex w-full sm:w-auto`}
              target="_blank"
              rel="noreferrer"
            >
              {wilson.cta}
            </a>
          </div>
          <div className="relative order-1 overflow-hidden rounded-2xl shadow-lg shadow-nv-navy/10 ring-1 ring-nv-navy/10 lg:order-2">
            <div className="relative aspect-[4/3]">
              <Image
                src={wilson.image}
                alt={wilson.imageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-nv-navy/8 bg-nv-ice/80 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <article className="overflow-hidden rounded-2xl border border-nv-navy/10 bg-white shadow-lg shadow-nv-navy/5">
            <div className="relative aspect-[16/9] w-full bg-nv-navy sm:aspect-[21/9]">
              <Image
                src={apparel.image}
                alt={apparel.imageAlt}
                fill
                className="object-contain object-center"
                sizes="100vw"
              />
            </div>
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
              <div>
                <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-nv-navy sm:text-4xl">
                  {apparel.heading}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">{apparel.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {apparel.options.map((option) => (
                    <li
                      key={option}
                      className="rounded-full border border-nv-blue/20 bg-nv-ice px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-nv-navy"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-start lg:items-end">
                <a
                  href={apparel.href}
                  className={`${btnPrimary} w-full sm:w-auto`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {apparel.cta}
                </a>
                <p className="mt-3 max-w-sm text-xs leading-relaxed text-zinc-500 lg:text-right">
                  Opens the external team shop catalog. NVBA does not checkout on this site — email or call Petey to
                  complete your order.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 pb-14 sm:px-6 sm:py-12">
        <h2 className="text-center font-display text-3xl font-bold tracking-wide text-nv-navy sm:text-4xl">
          How to order
        </h2>
        <ol className="mt-8 space-y-4">
          {orderSteps.map((step, index) => (
            <li
              key={step}
              className="flex gap-4 rounded-xl border border-nv-navy/10 bg-white p-4 shadow-sm sm:p-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-nv-blue font-display text-lg font-bold text-white">
                {index + 1}
              </span>
              <p className="pt-1 text-sm leading-relaxed text-zinc-700 sm:text-base">{step}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 rounded-2xl bg-nv-navy p-6 text-white sm:p-8">
          <p className="font-display text-xl font-bold tracking-wide">{contact.name}</p>
          <p className="mt-1 text-sm text-nv-silver">{contact.role}</p>
          <p className="mt-4 text-sm">
            <a className="font-semibold underline hover:text-nv-silver" href={contact.emailHref}>
              {contact.email}
            </a>
          </p>
          <p className="mt-1 text-sm">
            <a className="font-semibold underline hover:text-nv-silver" href={contact.phoneHref}>
              {contact.phone}
            </a>
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={contact.emailHref} className={`${btnOnDark} w-full sm:w-auto`}>
              Email Petey
            </a>
            <a href={contact.phoneHref} className={`${btnOutline} w-full border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10 sm:w-auto`}>
              Call Petey
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
