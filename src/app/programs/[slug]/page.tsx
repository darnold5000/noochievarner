import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OfferingDetail from "@/components/OfferingDetail";
import { PROGRAMS, programBySlug } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return PROGRAMS.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = programBySlug(slug);
  if (!program) return {};
  return createPageMetadata({
    title: program.name,
    description: program.summary,
    path: `/programs/${program.slug}`,
  });
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = programBySlug(slug);
  if (!program) notFound();
  return <OfferingDetail offering={program} backHref="/programs" backLabel="All programs" />;
}
