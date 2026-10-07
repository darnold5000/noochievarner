import PageIntro from "@/components/PageIntro";
import { STORES } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";
import { btnPrimary } from "@/lib/styles";

export const metadata = createPageMetadata({
  title: "Team Store",
  description:
    "NVBA apparel and the Wilson catalog for Noochie Varner Baseball Academy. Orders can also be placed with Petey Reynolds.",
  path: "/store",
});

export default function StorePage() {
  return (
    <>
      <PageIntro eyebrow="Apparel & equipment" title="Team Store">
        <p>Shop the existing team store and Wilson catalog. This site does not take payment for gear.</p>
      </PageIntro>
      <section className="mx-auto grid max-w-5xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2">
        <article className="rounded-2xl bg-white p-6">
          <h2 className="font-display text-3xl font-bold tracking-wide text-nv-navy">NV apparel</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            The academy links its Wilson team store from the current site.
          </p>
          <a href={STORES.teamShop} className={`${btnPrimary} mt-5`} target="_blank" rel="noreferrer">
            Visit the team store
          </a>
        </article>
        <article className="rounded-2xl bg-white p-6">
          <h2 className="font-display text-3xl font-bold tracking-wide text-nv-navy">Wilson catalog</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            Visitors can browse the Wilson catalog. Access code <span className="font-semibold">{STORES.accessCode}</span>.
            Orders can be placed by emailing {STORES.catalogContact.name}, {STORES.catalogContact.role}, at{" "}
            {STORES.catalogContact.email} or calling {STORES.catalogContact.phone}.
          </p>
          <a href={STORES.wilsonJoin} className={`${btnPrimary} mt-5`} target="_blank" rel="noreferrer">
            Open Wilson catalog
          </a>
        </article>
      </section>
    </>
  );
}
