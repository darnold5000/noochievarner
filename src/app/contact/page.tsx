import ContactForm from "@/components/ContactForm";
import ContactMapEmbed from "@/components/ContactMapEmbed";
import { getPublicContactTopics, getResolvedSiteContact } from "@/lib/nvba-public-content";
import { createPageMetadata } from "@/lib/seo";
import { btnOutline } from "@/lib/styles";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Noochie Varner Baseball Academy in Georgetown, KY for lessons, camps, memberships, facility rentals, and pro shop questions.",
  path: "/contact",
});

export const revalidate = 60;

export default async function ContactPage() {
  const [contact, topics] = await Promise.all([getResolvedSiteContact(), getPublicContactTopics()]);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-nv-blue">Contact</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-wide text-nv-navy sm:text-5xl">
          Get in touch
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
          Questions about lessons, camps, memberships, facility rentals, or equipment? Send a message and we will follow
          up. You can also call, text, or email the academy directly.
        </p>
      </section>

      <section className="border-t border-nv-navy/10 bg-white/60">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <ContactForm topics={topics} />

          <aside className="space-y-6">
            <div className="rounded-2xl border border-nv-navy/10 bg-white p-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-nv-blue">Reach us directly</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a className="font-semibold text-nv-navy hover:text-nv-blue" href={contact.phoneHref}>
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a className="font-semibold text-nv-navy hover:text-nv-blue" href={contact.phoneHref}>
                    Text {contact.phone}
                  </a>
                </li>
                <li>
                  <a className="font-semibold text-nv-navy hover:text-nv-blue" href={contact.emailHref}>
                    {contact.email}
                  </a>
                </li>
                {contact.social.map((link) => (
                  <li key={link.label}>
                    <a
                      className="font-semibold text-nv-navy hover:text-nv-blue"
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <ContactMapEmbed />
              <address className="mt-4 not-italic text-sm leading-relaxed text-zinc-600">
                <p className="font-semibold text-nv-navy">{contact.name}</p>
                <p>{contact.address.street}</p>
                <p>
                  {contact.address.city}, {contact.address.state} {contact.address.zip}
                </p>
              </address>
              <a
                href={contact.address.directionsUrl}
                className={`${btnOutline} mt-4`}
                target="_blank"
                rel="noreferrer"
              >
                Open in Maps
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
