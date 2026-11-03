import GalleryGrid from "@/components/GalleryGrid";
import PageIntro from "@/components/PageIntro";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Gallery",
  description: "Photos from Noochie Varner Baseball Academy clinics, HitTrax sessions, and NV Stars practices.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageIntro eyebrow="NVBA in action" title="Photo Gallery">
        <p>Photos from lessons, clinics, team practices, and life at the academy.</p>
      </PageIntro>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <GalleryGrid />
      </section>
    </>
  );
}
