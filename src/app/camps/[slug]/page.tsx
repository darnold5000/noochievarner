import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OfferingDetail from "@/components/OfferingDetail";
import { CAMPS, campBySlug } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return CAMPS.map((camp) => ({ slug: camp.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const camp = campBySlug(slug);
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
  const camp = campBySlug(slug);
  if (!camp) notFound();
  return <OfferingDetail offering={camp} backHref="/camps" backLabel="All camps" />;
}
