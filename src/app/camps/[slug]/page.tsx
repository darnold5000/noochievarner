import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OfferingDetail from "@/components/OfferingDetail";
import { getPublicCampBySlug, getPublicCampSlugs } from "@/lib/nvba-public-content";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPublicCampSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const camp = await getPublicCampBySlug(slug);
  if (!camp) return {};
  return createPageMetadata({
    title: camp.name,
    description: camp.summary,
    path: `/camps/${camp.slug}`,
  });
}

export default async function CampDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const camp = await getPublicCampBySlug(slug);
  if (!camp) notFound();
  return <OfferingDetail offering={camp} backHref="/camps" backLabel="All camps" />;
}
