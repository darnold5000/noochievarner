import type { MetadataRoute } from "next";
import { useInternalBooking } from "@/config/booking";
import { CAMPS, SITE } from "@/content/site";

const paths = [
  "",
  ...(useInternalBooking ? ["/book"] : []),
  "/camps",
  "/lessons",
  "/memberships",
  "/services",
  "/about",
  "/sponsors",
  "/news",
  "/gallery",
  "/pro-shop",
  "/contact",
  ...CAMPS.map((camp) => `/camps/${camp.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
