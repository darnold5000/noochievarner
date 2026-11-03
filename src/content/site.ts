import type { BookingKey } from "@/config/booking";

export const SITE = {
  name: "Noochie Varner Baseball Academy",
  shortName: "NVBA",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: "(859) 421-4062",
  phoneHref: "tel:+18594214062",
  smsHref: "sms:+18594214062",
  email: "noochie@noochievarnerbaseball.com",
  emailHref: "mailto:noochie@noochievarnerbaseball.com",
  address: {
    street: "115 Etter Lane",
    city: "Georgetown",
    state: "KY",
    zip: "40324",
    full: "115 Etter Lane, Georgetown, KY 40324",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=115+Etter+Lane+Georgetown+KY+40324",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=115+Etter+Lane,+Georgetown,+KY+40324",
    mapEmbedUrl:
      "https://www.google.com/maps?q=115+Etter+Lane,+Georgetown,+KY+40324&output=embed",
  },
  facility:
    "16,000 sq. ft. indoor training facility in Georgetown, Kentucky. The academy opened in early December 2016.",
  infield: "7,000 sq. ft. infield practice area",
  tagline:
    "Indoor baseball and softball training for players of all ages, from Little Leaguers to MLB prospects.",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/NVBaseballAcademy/" },
    { label: "X", href: "https://twitter.com/NVBA15" },
    {
      label: "YouTube",
      href: "https://www.youtube.com/channel/UC4jPuwVhKzY1lms8y0Ttk_A",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/noochievarnerbaseball",
    },
  ],
  facilityVideo:
    "https://cdn2.sportngin.com/attachments/video_file/9b28-332948/Baseball_complex_final_1080.mp4",
} as const;

export const NAV = [
  { label: "Camps & Clinics", href: "/camps" },
  { label: "Lessons", href: "/lessons" },
  { label: "Memberships", href: "/memberships" },
  { label: "Pro Shop", href: "/pro-shop" },
  { label: "NVBA Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Lower-priority pages linked from the footer (not in desktop header). */
export const FOOTER_MORE_LINKS = [
  { label: "News", href: "/news" },
  { label: "Gallery", href: "/gallery" },
  { label: "Sponsors", href: "/sponsors" },
] as const;

export const MOBILE_NAV = [
  { label: "Home", href: "/" },
  ...NAV,
  ...FOOTER_MORE_LINKS,
] as const;

export type Offering = {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  ages?: string;
  dates?: string;
  days?: string;
  times?: string;
  price?: string;
  instructor?: string;
  limit?: string;
  details: string[];
  sections?: { title: string; items: string[] }[];
  bookingKey?: BookingKey;
  cta: string;
  image?: string;
  imageAlt?: string;
  contactLines?: string[];
};

export const CAMPS: Offering[] = [
  {
    slug: "advanced-pitching-clinic",
    name: "Advanced Pitching Clinic",
    eyebrow: "Pitching clinic",
    summary:
      "Three Sunday sessions led by Jordan Fox and Cade McKee, former Scott County High School All-American pitchers.",
    ages: "12–16",
    dates: "February 1 – February 15",
    days: "Sundays",
    times: "7:00–8:30 p.m.",
    price: "$119 + tax",
    instructor: "Jordan Fox & Cade McKee",
    limit: "First 16 players · 3 sessions",
    details: [
      "This pitching clinic features two former Scott County High School All-American pitchers.",
    ],
    sections: [
      {
        title: "Pitching instruction focused on",
        items: [
          "Band work",
          "Pitching mechanics",
          "Pitching grips",
          "Pickoff moves",
          "Pitching drills",
          "Proper leg drive",
          "Arm care",
        ],
      },
    ],
    bookingKey: "pitchingClinic",
    cta: "Register",
    image: "/images/flyers/pitching-clinic.jpg",
    imageAlt: "Advanced Pitching Clinic with Jordan Fox and Cade McKee",
  },
  {
    slug: "bat-speed-clinic",
    name: "Bat Speed Clinic",
    eyebrow: "Session 1",
    summary:
      "An 8-week clinic focused on a faster, more powerful swing. Instructors track hitting metrics on HitTrax.",
    ages: "8 & up",
    dates: "November 3, 2026 – December 22, 2026",
    days: "Tuesdays and Thursdays",
    times: "7:00–8:30 p.m.",
    price: "$495",
    instructor: "Noochie Varner & full NVBA staff",
    limit: "First 15 players",
    details: [
      "Sessions: 11/3, 11/5, 11/10, 11/12, 11/17, 11/19, 11/24, 12/1, 12/3, 12/8, 12/10, 12/15, 12/17, and 12/22.",
      "Drills focus on core, hip, and wrist strength.",
      "HitTrax metrics tracked through the clinic: exit velocity, launch angle, distance, point of impact, and projected play outcomes.",
      "The academy states this annual clinic has helped players increase exit velocity over the past five years.",
    ],
    bookingKey: "batSpeed",
    cta: "Register",
    image: "/images/flyers/batspeed.jpg",
    imageAlt: "Bat Speed Clinic Session 1 flyer",
  },
  {
    slug: "rookie-development",
    name: "Rookie Development Program",
    eyebrow: "Player development",
    summary:
      "Building a strong foundation for the next level. Weekly sessions are designed to raise each player's baseball IQ.",
    ages: "5–11",
    dates: "December 2, 2026 – February 24, 2027",
    days: "Every Wednesday",
    times: "7:00–8:30 p.m.",
    price: "$679",
    instructor: "Noochie Varner & full NVBA staff",
    limit: "First 15 players · 13 sessions",
    details: [
      "Each week, sessions are designed to enhance each player's overall baseball IQ.",
      "Attendees receive a Rookie Development shirt and 2 free private hitting lessons with Noochie after camp.",
      "After week 7, instructors sit down with each player and parent to discuss performance and progress from week 1 to week 7.",
      "Post-session interviews at the end of camp give parents and players a chance to share their takeaways.",
    ],
    sections: [
      {
        title: "Fielding",
        items: [
          "Footwork drills",
          "On-field communication",
          "Holding runners",
          "Arm strength and accuracy, with proper throwing technique",
        ],
      },
      {
        title: "Hitting",
        items: [
          "Hitting data from week 1 to week 14 is captured and reviewed using HitTrax",
          "Drills are unique and specific to each player's needs",
          "Understanding body movements and how they affect the swing",
          "Understanding the approach at the plate",
        ],
      },
      {
        title: "Baserunning",
        items: [
          "Primary and secondary leadoffs",
          "Steals: what to watch for, finding timing, and understanding body positioning",
          "Home-to-first time is recorded",
        ],
      },
    ],
    bookingKey: "rookie",
    cta: "Register",
    image: "/images/flyers/rookie.jpg",
    imageAlt: "Rookie Development Program flyer",
  },
  {
    slug: "tee-ball-winter-league",
    name: "Winter Tee Ball League",
    eyebrow: "Youth league",
    summary:
      "A low-pressure winter league for young players: learn, play, and have fun. Games are on Saturday evenings.",
    ages: "4–6",
    dates: "Saturday, November 7, 2026 – Saturday, January 2, 2027",
    days: "Saturday evenings",
    times: "Game days",
    price: "$80 per player",
    instructor: "Contact DJ Lemons",
    limit: "8 games guaranteed · 8 kids per team",
    details: [
      "Develop skills and confidence in fun, low-pressure games.",
      "Every player is a winner. The league is also a chance to make friends.",
      "Season contact: DJ Lemons, (859) 588-9521.",
    ],
    bookingKey: "teeBall",
    cta: "Register",
    image: "/images/flyers/teeball.jpg",
    imageAlt: "NVBA Winter Tee Ball League flyer",
    contactLines: ["DJ Lemons", "(859) 588-9521"],
  },
];

export const LESSONS = [
  {
    slug: "hitting",
    name: "Private Hitting",
    coach: "Noochie Varner",
    role: "Hitting instructor",
    bio: "Noochie works with baseball and softball players of all ages. Instruction focuses on sound mechanics, consistency, and a confident approach at the plate. He has 8 years of professional playing experience. HitTrax is used in all of his hitting lessons.",
    focus: ["Mechanics", "Consistency", "Approach", "Results"],
    bookingKey: "noochieHitting" as BookingKey,
    image: "/images/flyers/hitting.jpg",
    imageAlt: "Private hitting instruction with Noochie Varner",
    contact: ["(859) 421-4062", "noochie@noochievarnerbaseball.com"],
  },
  {
    slug: "pitching",
    name: "Pitching Instruction",
    coach: "Jordan Fox",
    role: "Former collegiate pitcher",
    bio: "Jordan Fox provides individual pitching instruction on mechanics, velocity, command, and developing a complete pitcher. His coaching is aimed at confidence on the mound.",
    focus: ["Mechanics", "Velocity", "Control", "Confidence"],
    bookingKey: "jordanFox" as BookingKey,
    image: "/images/flyers/pitching.jpg",
    imageAlt: "Pitching instruction with Jordan Fox",
    contact: ["(859) 559-1125", "Jordanfox2828@gmail.com"],
  },
  {
    slug: "fielding",
    name: "Fielding Instruction",
    coach: "Corey Alsop",
    role: "Former collegiate player",
    bio: "Corey works with players on fielding fundamentals: footwork, glove work, positioning, reaction, and game situations.",
    focus: ["Fundamentals", "Footwork", "Glove work", "Game situations"],
    bookingKey: "coreyAlsop" as BookingKey,
    image: "/images/flyers/fielding.jpg",
    imageAlt: "Fielding instruction with Corey Alsop",
    contact: ["(859) 797-3778", "coreyalsop@gmail.com"],
  },
  {
    slug: "catching",
    name: "Catching",
    coach: "NVBA instructors",
    role: "Position-specific defensive work",
    bio: "The academy offers catching and other position-specific defensive workouts, with published 30- and 60-minute lesson rates.",
    focus: ["Receiving", "Defensive drills"],
    bookingKey: "catching" as BookingKey,
    contact: [SITE.phone],
  },
] as const;

export const LESSON_RATES = [
  {
    category: "Batting",
    note: "HitTrax is used in all hitting lessons with Noochie Varner. Lessons are offered for baseball and softball.",
    rates: [
      { length: "30 minutes", price: "$45" },
      { length: "60 minutes", price: "$85" },
    ],
  },
  {
    category: "Pitching",
    note: "Pitching lessons are offered for baseball and softball players.",
    rates: [
      { length: "30 minutes", price: "$45" },
      { length: "60 minutes", price: "$80" },
    ],
  },
  {
    category: "Catching",
    note: "Position-specific catching instruction.",
    rates: [
      { length: "30 minutes", price: "$45" },
      { length: "60 minutes", price: "$80" },
    ],
  },
] as const;

export const BULK_PACKAGES = [
  { sessions: "6", price: "$260" },
  { sessions: "12", price: "$500" },
  { sessions: "25", price: "$950" },
] as const;

export const MEMBERSHIP = {
  name: "Big League Membership",
  term: "12-month membership",
  annual: "$500 one-time payment",
  monthly: "$50.00 monthly installments",
  initiation: "$75.00 initiation fee for the monthly option",
  includes: [
    "Package of 3 HitTrax 30-minute lessons",
    "Discounted NVBA gear",
    "10% off bulk lesson pricing",
    "NVBA t-shirt",
    "Cage use up to 60 minutes a day, when the cage is not in use",
    "Player's Lounge access",
    "Baseline assessment on HitTrax",
    "Exit velocity reading",
    "Priority scheduling",
    "Gym access",
  ],
} as const;

export const SERVICES_INTRO =
  "Our state-of-the-art batting cages and pitching tunnel are available to the public in 30- and 60-minute blocks. Teams can also book the entire facility or indoor turf field in one- or two-hour blocks.";

export const SERVICES_FACILITY_IMAGE = {
  src: "/images/facility/services-indoor-field.jpg",
  alt: "Indoor turf infield and batting cages at Noochie Varner Baseball Academy",
} as const;

export type FacilityService = {
  name: string;
  lead?: string;
  detail?: string;
  bullets?: string[];
  rates?: { label: string; price: string }[];
  price?: string;
  contact?: boolean;
};

export const SERVICES: FacilityService[] = [
  {
    name: "Cage rentals",
    rates: [
      { label: "30 minutes", price: "$20" },
      { label: "60 minutes", price: "$35" },
    ],
  },
  {
    name: "Field rental",
    lead: `Take advantage of our ${SITE.infield.toLowerCase()}.`,
    rates: [
      { label: "1.5 hours", price: "$100" },
      { label: "2 hours", price: "$180" },
    ],
  },
  {
    name: "Team rentals",
    detail: "Book the full facility or indoor turf for your team.",
    contact: true,
  },
  {
    name: "Birthday parties",
    detail:
      "Host your child's birthday party at NVBA. We offer a 2-hour party and will work with you to create the right event.",
    bullets: [
      "One staff member at your service",
      "Full access to our field space for games and fun",
      "Kickball, dodgeball, wiffle ball, and soccer available",
    ],
    price: "$200 · Members receive 10% off",
  },
  {
    name: "Video analysis",
    detail:
      "A picture is worth a thousand words, and that is what makes video analysis such a valuable addition to any sports academy. A typical video segment is two to three minutes in length and can be viewed repeatedly to clearly demonstrate correct, as well as incorrect, technique. It is also a great tool to show a player's progress over time.",
  },
  {
    name: "Speed and agility training",
    lead: "What it takes to be a five-tool player:",
    bullets: [
      "Above-average hitter",
      "Hit for power",
      "Above-average defensive player",
      "Above-average arm",
      "Above-average foot speed",
    ],
    detail:
      "To be a complete baseball player you need all five tools in your arsenal. NVBA knows that a slow bat is a bad bat, and our instructors work with players on the proper training to develop speed and power while avoiding injuries. Learn how Noochie made it through eight years of professional baseball without a disabled-list stint.",
  },
];

export type Sponsor = {
  name: string;
  note: string;
  image: string;
  imageAlt: string;
  href: string;
  cta: string;
};

export const SPONSORS: Sponsor[] = [
  {
    name: "Just 4 You Home Loans",
    note: "Scott Porter and the Just 4 You team proudly support NVBA athletes, families, and the Georgetown community.",
    image: "/images/sponsors/just-4-you-home-loans.jpg",
    imageAlt: "Just 4 You Home Loans logo",
    href: "https://www.just4youhomeloans.com/",
    cta: "Visit our sponsor",
  },
];

export const SPONSORS_INTRO =
  "Thank you to the local partners who invest in youth baseball and softball at Noochie Varner Baseball Academy.";

export const CONTACT_TOPICS = [
  { value: "general", label: "General question" },
  { value: "lessons", label: "Private lessons" },
  { value: "camps", label: "Camps & clinics" },
  { value: "membership", label: "Membership" },
  { value: "facility", label: "Facility rental & services" },
  { value: "pro-shop", label: "Pro shop & equipment" },
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number]["value"];

export const STORES = {
  teamShop: "https://www.team.shop/en-us",
  wilsonJoin: "http://www.wilsonteamshop.com/join",
  accessCode: "18DD053",
  catalogContact: {
    name: "Petey Reynolds",
    role: "Director of Equipment and Sales",
    email: "peteyreynolds@icloud.com",
    emailHref: "mailto:peteyreynolds@icloud.com",
    phone: "(859) 298-0174",
    phoneDisplay: "859-298-0174",
    phoneHref: "tel:+18592980174",
  },
} as const;

export const PRO_SHOP = {
  hero: {
    label: "NVBA Pro Shop",
    lines: ["Gear Up.", "Play Your Best."] as const,
    subtitle:
      "Browse Wilson equipment and NVBA team apparel with exclusive partner pricing and local ordering support.",
    highlights: ["Wilson partner pricing", "Team apparel", "Local order support"] as const,
    image: "/images/pro-shop/hero-banner.webp",
    imageAlt: "Team shop baseball apparel and equipment",
  },
  wilson: {
    brand: "Wilson",
    tagline: "Official equipment partner",
    heading: "Gear Up with Wilson",
    description:
      "Browse discounted Wilson apparel and equipment through NVBA's partner catalog. Orders are placed with our equipment director after you choose items in the Wilson store.",
    image: "/images/pro-shop/wilson-gear.webp",
    imageAlt: "Baseball player in Wilson and EvoShield equipment",
    href: STORES.wilsonJoin,
    accessCode: STORES.accessCode,
    cta: "Browse Wilson catalog",
  },
  apparel: {
    heading: "Rep your academy.",
    description:
      "Show your NVBA pride with custom team jerseys, spirit wear, and academy gear. Browse the team shop catalog, then contact Petey Reynolds to place your order.",
    image: "/images/pro-shop/nvba-apparel.jpg",
    imageAlt: "Custom, design-your-own, and stock team jerseys available through NVBA apparel",
    href: STORES.teamShop,
    cta: "Shop NVBA apparel",
    options: ["Custom team jerseys", "Design-your-own looks", "Stock team styles"] as const,
  },
  orderSteps: [
    "Browse the Wilson or NVBA apparel catalog.",
    "Find the products you're interested in.",
    "Contact Petey Reynolds to place your order.",
  ] as const,
} as const;

export const GALLERY = [
  {
    src: "/images/gallery/infield.jpg",
    alt: "NVBA infield clinic",
    caption: "Infield clinic",
  },
  {
    src: "/images/gallery/rookie.jpg",
    alt: "Rookie Development Program at NVBA",
    caption: "Rookie Development Program",
  },
  {
    src: "/images/gallery/batspeed.jpg",
    alt: "Bat speed clinic at NVBA",
    caption: "Bat Speed Clinic",
  },
  {
    src: "/images/gallery/hitting.jpg",
    alt: "Free hitting clinic at NVBA",
    caption: "Hitting clinic",
  },
  {
    src: "/images/gallery/hittrax.jpg",
    alt: "HitTrax session at NVBA",
    caption: "HitTrax",
  },
  {
    src: "/images/gallery/soccer.jpg",
    alt: "Soccer training at NVBA",
    caption: "Soccer training",
  },
  {
    src: "/images/gallery/stars-18u.jpg",
    alt: "18U NV Stars practice",
    caption: "18U NV Stars practice",
  },
  {
    src: "/images/gallery/stars-14u.jpg",
    alt: "14U NV Stars practice",
    caption: "14U NV Stars practice",
  },
  {
    src: "/images/gallery/stars-9u.jpg",
    alt: "9U NV Stars indoor practice",
    caption: "9U NV Stars indoor practice",
  },
  {
    src: "/images/facility/about-3.jpg",
    alt: "Coach working with a young player inside the academy",
    caption: "Player instruction",
  },
  {
    src: "/images/facility/about-2.jpg",
    alt: "Ribbon cutting inside the Noochie Varner Baseball Academy",
    caption: "Facility opening",
  },
  {
    src: "/images/facility/about-1.jpg",
    alt: "Noochie Varner with youth players",
    caption: "Around the academy",
  },
] as const;

export function campBySlug(slug: string) {
  return CAMPS.find((camp) => camp.slug === slug);
}
