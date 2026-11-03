import Image from "next/image";
import PageIntro from "@/components/PageIntro";
import { getPublicNewsArticles } from "@/lib/nvba-public-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "News",
  description: "Academy media from Noochie Varner Baseball Academy, including former NV Stars players in college baseball.",
  path: "/news",
});

export const revalidate = 60;

const fallbackArticle = {
  headline: "Former NV Stars players playing college baseball",
  summary: "Former NV Stars players who went on to play college baseball.",
  image: "/images/brand/college-alumni.png",
};

export default async function NewsPage() {
  const articles = await getPublicNewsArticles();
  const items = articles.length
    ? articles
    : [{ slug: "college-alumni", ...fallbackArticle, body: fallbackArticle.summary, publicationDate: "" }];

  return (
    <>
      <PageIntro eyebrow="Media" title="In the News">
        <p>Updates and highlights from Noochie Varner Baseball Academy.</p>
      </PageIntro>
      <section className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6">
        {items.map((article) => (
          <article key={article.slug} className="overflow-hidden rounded-2xl bg-white">
            <Image
              src={article.image}
              alt={article.headline}
              width={1200}
              height={900}
              className="h-auto w-full"
            />
            <div className="p-5">
              <h2 className="font-display text-3xl font-bold tracking-wide text-nv-navy">{article.headline}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{article.summary || article.body}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
