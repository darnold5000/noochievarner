/** Static fallback when NV Stars gallery CMS rows are not seeded yet. */
/** Tournament graphics in the main team grid on /nv-stars (not under news). */
export const NV_STARS_TEAM_GRID_SLUGS = ["nv-stars-03", "nv-stars-13"] as const;

export type NvStarsPhoto = {
  slug: string;
  src: string;
  alt: string;
  caption: string;
  category: "nv-stars-team" | "nv-stars-news";
  teamLabel?: string;
  season?: string;
  featuredOnHomepage?: boolean;
  sort: number;
};

export const NV_STARS_PHOTOS: NvStarsPhoto[] = [
  { slug: "nv-stars-01", src: "/images/nv-stars/nv-stars-01.jpg", alt: "NV Stars team photo", caption: "", category: "nv-stars-team", featuredOnHomepage: true, sort: 1 },
  { slug: "nv-stars-02", src: "/images/nv-stars/nv-stars-02.jpg", alt: "NV Stars organization update", caption: "NV Stars organization update", category: "nv-stars-news", sort: 1 },
  { slug: "nv-stars-03", src: "/images/nv-stars/nv-stars-03.jpg", alt: "Kentucky USSSA Fall State tournament", caption: "", category: "nv-stars-team", sort: 0 },
  { slug: "nv-stars-04", src: "/images/nv-stars/nv-stars-04.jpg", alt: "NV Stars team photo", caption: "", category: "nv-stars-team", sort: 2 },
  { slug: "nv-stars-05", src: "/images/nv-stars/nv-stars-05.jpg", alt: "NV Stars team photo", caption: "", category: "nv-stars-team", sort: 3 },
  { slug: "nv-stars-06", src: "/images/nv-stars/nv-stars-06.jpg", alt: "NV Stars team photo", caption: "", category: "nv-stars-team", sort: 4 },
  { slug: "nv-stars-07", src: "/images/nv-stars/nv-stars-07.jpg", alt: "NV Stars team photo", caption: "", category: "nv-stars-team", sort: 5 },
  { slug: "nv-stars-08", src: "/images/nv-stars/nv-stars-08.jpg", alt: "NV Stars team on the field", caption: "", category: "nv-stars-team", featuredOnHomepage: true, sort: 6 },
  { slug: "nv-stars-09", src: "/images/nv-stars/nv-stars-09.jpg", alt: "NV Stars tournament highlight", caption: "", category: "nv-stars-news", sort: 3 },
  { slug: "nv-stars-10", src: "/images/nv-stars/nv-stars-10.jpg", alt: "NV Stars team photo", caption: "", category: "nv-stars-team", featuredOnHomepage: true, sort: 7 },
  { slug: "nv-stars-11", src: "/images/nv-stars/nv-stars-11.jpg", alt: "NV Stars team photo", caption: "", category: "nv-stars-team", sort: 8 },
  { slug: "nv-stars-12", src: "/images/nv-stars/nv-stars-12.jpg", alt: "NV Stars team photo", caption: "", category: "nv-stars-team", sort: 9 },
  { slug: "nv-stars-13", src: "/images/nv-stars/nv-stars-13.jpg", alt: "Big League Chew Classic champions", caption: "", category: "nv-stars-team", sort: 1 },
];
