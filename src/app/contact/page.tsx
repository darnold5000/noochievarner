import PageIntro from "@/components/PageIntro";
import { SITE } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";
import { btnPrimary } from "@/lib/styles";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Contact Noochie Varner Baseball Academy at 115 Etter Lane, Georgetown, KY 40324.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Georgetown, KY" title="Contact">
        <p>Call, email, or get directions to the indoor facility.</p>
      </PageIntro>
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl bg-white p-6 text-sm leading-relaxed">
          <p className="font-display text-3xl font-bold tracking-wide text-nv-navy">{SITE.name}</p>
          <p className="mt-3">{SITE.address.full}</p>
          <p className="mt-2">
            <a className="font-semibold text-nv-blue" href={SITE.phoneHref}>
              {SITE.phone}
            </a>
          </p>
          <p>
            <a className="font-semibold text-nv-blue" href={SITE.emailHref}>
              {SITE.email}
            </a>
          </p>
          <a href={SITE.address.mapUrl} className={`${btnPrimary} mt-6`} target="_blank" rel="noreferrer">
            Open in Maps
          </a>
        </div>
      </section>
    </>
  );
}
