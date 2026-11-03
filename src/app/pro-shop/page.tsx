import Image from "next/image";
import Link from "next/link";
import { PRO_SHOP, STORES } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";
import { btnGhost, btnOnDark, btnOutline, btnPrimary } from "@/lib/styles";

export const metadata = createPageMetadata({
  title: "Pro Shop",
  description:
    "NVBA catalog links for Wilson discounted apparel and equipment. Access code 18DD053. Orders through Petey Reynolds, Director of Equipment and Sales.",
  path: "/pro-shop",
});

export default function ProShopPage() {
  const contact = STORES.catalogContact;

  return (
    <>
      <section className="relative isolate min-h-[22rem] overflow-hidden bg-nv-navy text-white sm:min-h-[26rem]">
        <Image
          src={PRO_SHOP.heroImage}
          alt={PRO_SHOP.heroImageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nv-navy via-nv-navy/85 to-nv-navy/55" />
        <div className="relative mx-auto flex max-w-7xl flex-col justify-end px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-nv-silver">Apparel & equipment</p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold tracking-wide sm:text-6xl">
            {PRO_SHOP.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-200">{PRO_SHOP.subtitle}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {PRO_SHOP.highlights.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="rounded-2xl border border-nv-navy/10 bg-white p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-nv-blue">Vendor partner</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-wide text-nv-navy sm:text-4xl">
            {PRO_SHOP.partner.name}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600">{PRO_SHOP.partner.detail}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-wide text-nv-navy sm:text-4xl">NVBA catalog links</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600">
          Browse the catalogs below, then contact Petey Reynolds to place your order.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {PRO_SHOP.catalogLinks.map((link) => (
            <article
              key={link.name}
              className="flex flex-col rounded-2xl border border-nv-navy/10 bg-white p-6 sm:p-7"
            >
              <h3 className="font-display text-2xl font-bold tracking-wide text-nv-navy sm:text-3xl">{link.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">{link.detail}</p>
              {"accessCode" in link && link.accessCode ? (
                <p className="mt-4 rounded-xl bg-nv-ice px-4 py-3 text-sm text-zinc-700">
                  <span className="font-bold uppercase tracking-wide text-nv-navy">Access code</span>
                  <span className="mt-1 block font-display text-2xl font-bold tracking-wide text-nv-blue">
                    {link.accessCode}
                  </span>
                </p>
              ) : null}
              <a href={link.href} className={`${btnPrimary} mt-5 w-full sm:w-auto`} target="_blank" rel="noreferrer">
                {link.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <article className="rounded-2xl border border-nv-navy/10 bg-nv-ice p-6 sm:p-8">
          <h2 className="font-display text-3xl font-bold tracking-wide text-nv-navy">Order process</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-700">{PRO_SHOP.orderProcess}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={contact.emailHref} className={btnOutline}>
              Email {contact.name}
            </a>
            <a href={contact.phoneHref} className={btnOutline}>
              Call {contact.phoneDisplay}
            </a>
          </div>
          <p className="mt-4 text-sm text-zinc-600">
            {contact.name}, {contact.role} ·{" "}
            <a className="font-semibold text-nv-blue hover:underline" href={contact.emailHref}>
              {contact.email}
            </a>
            {" · "}
            <a className="font-semibold text-nv-blue hover:underline" href={contact.phoneHref}>
              {contact.phone}
            </a>
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
        <div className="rounded-2xl bg-nv-navy p-6 text-white sm:p-8">
          <h2 className="font-display text-3xl font-bold tracking-wide">Not sure what you need?</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-200">
            Need help choosing a bat, glove, or training gear? Talk with {contact.name} before you order.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a href={contact.phoneHref} className={btnOnDark}>
              Call or text {contact.phone}
            </a>
            <Link href="/sponsors" className={btnGhost}>
              View sponsors
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
