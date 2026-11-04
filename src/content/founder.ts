/** Default founder assets (override via CMS About & Facility / instructor photo). */
export const FOUNDER_PHOTO = "/images/coaches/noochie.jpg";
export const FOUNDER_CAREER_POSTER = "/images/founder/career-stats-poster.jpg";
export const FOUNDER_TESTIMONIALS_FLYER = "/images/founder/testimonials-flyer.jpg";

export const FOUNDER_CAREER_STATS = [
  { label: "Seasons", value: "8" },
  { label: "AVG", value: ".299" },
  { label: "Hits", value: "903" },
  { label: "Games", value: "831" },
] as const;

/** ~80 words for homepage founder block. */
export const FOUNDER_HOME_SUMMARY =
  "Born and raised in Cynthiana, Kentucky, Noochie Varner won two state titles at Harrison County High School and was MVP of the 1998 Kentucky State Baseball Tournament. At St. Catharine College he earned NJCAA All-Region and All-American honors before the Cincinnati Reds drafted him in 2000. After eight professional seasons and a .299 career average, he founded NVBA in Georgetown to help the next generation develop at the plate.";

export type FounderBioSection = { heading: string; paragraphs: string[] };

export const FOUNDER_BIO_SECTIONS: FounderBioSection[] = [
  {
    heading: "",
    paragraphs: [
      "Born and raised in Cynthiana, Kentucky, Noochie Varner developed his passion for baseball at Harrison County High School, where he was part of two state championship teams and earned MVP honors at the 1998 Kentucky State Baseball Tournament.",
      "Following high school, Noochie received a baseball scholarship to St. Catharine College in Springfield, Kentucky. As a freshman, he put together an outstanding season, batting .524 with 15 home runs, 72 RBIs, and 87 hits. His performance earned him NJCAA All-Region and All-American honors.",
    ],
  },
  {
    heading: "Eight years of professional baseball",
    paragraphs: [
      "In 2000, Noochie was selected in the 10th round of the MLB Draft by the Cincinnati Reds, fulfilling his lifelong dream of playing professional baseball.",
      "He began his professional career with the Billings Mustangs, the Reds’ rookie-league affiliate. In 2001, he hit .351, led the Pioneer League with 102 hits, and earned postseason All-Star recognition.",
      "In 2002, he advanced to the Dayton Dragons, where he earned another All-Star selection before being traded to the Detroit Tigers organization.",
      "His career continued through several major-league organizations, including the Milwaukee Brewers and Arizona Diamondbacks. During the 2004 season, Noochie played at both Double-A and Triple-A, batting .323 across 458 at-bats.",
      "In 2006, he returned to the Cincinnati Reds organization, playing for the Chattanooga Lookouts alongside future major-league players Joey Votto, Ryan Hanigan, and Homer Bailey. That season, he earned Southern League All-Star honors and hit a home run in the All-Star Game.",
      "Noochie finished his professional career in 2007 with the Corpus Christi Hooks, the Houston Astros’ Double-A affiliate. He was selected to the Texas League All-Star Game, where he went 3-for-4, and finished as runner-up in the Home Run Derby.",
    ],
  },
  {
    heading: "Professional career highlights",
    paragraphs: [
      "8 seasons of professional baseball.",
      "831 games played.",
      "903 career hits.",
      "3,019 at-bats.",
      ".299 career batting average.",
      "Multiple minor-league All-Star selections.",
      "Reached the Triple-A level.",
    ],
  },
  {
    heading: "Sharing his experience with the next generation",
    paragraphs: [
      "After eight seasons of professional baseball, Noochie turned his attention toward helping young athletes develop their own skills and confidence.",
      "As the founder of Noochie Varner Baseball Academy in Georgetown, Kentucky, he brings firsthand professional experience and a deep understanding of hitting mechanics, consistency, and player development.",
      "His coaching philosophy focuses on helping each athlete improve their individual abilities, develop sound fundamentals, and build confidence at the plate.",
      "From Little League players to advanced prospects, Noochie’s passion is sharing the knowledge and experience gained throughout his baseball career to help the next generation reach its potential.",
    ],
  },
];

export const FOUNDER_TESTIMONIALS = [
  {
    name: "Brad Shelton",
    title: "Former Head Baseball Coach, University of the Cumberlands",
    quote:
      "Noochie Varner is one of the best hitters I have coached in 22 years at the college level. His work ethic and approach to hitting was second to none. From the first time I saw him hit, I knew he was a pro. I have no doubt he can help young players improve their baseball skills.",
  },
  {
    name: "Mac Whitaker",
    title: "Hall of Fame Baseball Coach, Harrison County High School",
    quote:
      "Noochie Varner excelled in his baseball career beginning with Little League, continuing in high school and ultimately at the professional level because of his outstanding work ethic and leadership qualities. His ability to relate to players at all ages and levels will enable him to be successful in an instructional environment.",
  },
] as const;
