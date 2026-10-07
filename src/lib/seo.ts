import type { Metadata } from "next";
import { SITE } from "@/content/site";

const robots: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = path === "/" ? SITE.url : `${SITE.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE.name,
      url,
      title: `${title} | ${SITE.name}`,
      description,
      images: [
        {
          url: "/images/facility/facility.jpg",
          alt: "Noochie Varner inside the Georgetown training facility",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
      images: ["/images/facility/facility.jpg"],
    },
  };
}
