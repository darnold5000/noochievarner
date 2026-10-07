import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#071428",
    theme_color: "#071428",
    icons: [
      { src: "/images/brand/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcuts: [
      { name: "Book", short_name: "Book", url: "/book" },
      { name: "Programs", short_name: "Programs", url: "/programs" },
      { name: "Lessons", short_name: "Lessons", url: "/lessons" },
      { name: "Memberships", short_name: "Memberships", url: "/memberships" },
      { name: "Account", short_name: "Account", url: "/sign-in" },
    ],
  };
}
