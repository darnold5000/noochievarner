import { SITE } from "@/content/site";

/** About page story blocks (also seeded to CMS — keep scripts/nvba-cms-seed-data.mjs ABOUT in sync). */
export const ABOUT_STORY_PARAGRAPHS = [
  "Every good swing shares common principles, but no two hitters are built the same. Lessons begin with an evaluation of natural ability, goals, and age-appropriate expectations. Instructors address strength, balance, conditioning, technique, vision, and footwork.",
  "Players are encouraged to work consistently with one coach. Our staff is large enough that a player can also learn from another instructor when that helps their development.",
  `Practice is at the heart of NVBA. The indoor facility at ${SITE.address.full} opened in December 2016. The building offers 16,000 square feet of training space, including ${SITE.infield.toLowerCase()}.`,
  "We train baseball and softball players from tee-ball ages through advanced prospects. Offerings include private, group, and team lessons, cage and field rentals, camps, and clinics—plus hitting, pitching, catching, defense, and speed and agility work.",
] as const;

export const ABOUT_INTRO_TEXT =
  "The focus at NVBA is on the individual. Instructors evaluate each player's strengths and build a plan around what that player already does well.";

export const FACILITY_VIDEO_POSTER = "/images/facility/facility-video-poster.jpg";
export const FACILITY_VIDEO_POSTER_ALT =
  "Home of the NV Stars — Noochie Varner Baseball Academy facility entrance";
