import type { MetadataRoute } from "next";
import { CAMPS, PROGRAMS, SITE } from "@/content/site";

const paths = [
  "",
  "/book",
  "/camps",
  "/lessons",
  "/programs",
  "/memberships",
  "/services",
  "/about",
  "/sponsors",
  "/news",
  "/gallery",
  "/store",
  "/contact",
  ...CAMPS.map((camp) => `/camps/${camp.slug}`),
  ...PROGRAMS.map((program) => `/programs/${program.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
