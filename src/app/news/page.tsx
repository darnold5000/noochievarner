import Image from "next/image";
import PageIntro from "@/components/PageIntro";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "News",
  description: "Academy media from Noochie Varner Baseball Academy, including former NV Stars players in college baseball.",
  path: "/news",
});

export default function NewsPage() {
  return (
    <>
      <PageIntro eyebrow="Media" title="In the News">
        <p>Academy-specific items from the current site. The old news page was a general sports article feed, so it is not carried over.</p>
      </PageIntro>
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <article className="overflow-hidden rounded-2xl bg-white">
          <Image
            src="/images/brand/college-alumni.png"
            alt="Former NV Stars players playing college baseball"
            width={1200}
            height={900}
            className="h-auto w-full"
          />
          <div className="p-5">
            <h2 className="font-display text-3xl font-bold tracking-wide text-nv-navy">
              Former NV Stars players playing college baseball
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              The academy publishes this graphic of former NV Stars players who went on to play college baseball.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
