import type { BookingKey } from "@/config/booking";

export const SITE = {
  name: "Noochie Varner Baseball Academy",
  shortName: "NVBA",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: "(859) 421-4062",
  phoneHref: "tel:+18594214062",
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
  { label: "Home", href: "/" },
  { label: "Camps & Clinics", href: "/camps" },
  { label: "Lessons", href: "/lessons" },
  { label: "Programs", href: "/programs" },
  { label: "Memberships", href: "/memberships" },
  { label: "About", href: "/about" },
] as const;

export const MORE_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "News", href: "/news" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team Store", href: "/store" },
  { label: "Contact", href: "/contact" },
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
  bookingKey?: BookingKey;
  cta: string;
  image?: string;
  imageAlt?: string;
  contactLines?: string[];
};

export const CAMPS: Offering[] = [
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
      "Fielding work includes footwork drills, on-field communication, holding runners, and arm strength and accuracy.",
      "Hitting data is captured and reviewed using HitTrax. Drills are specific to each player, including body movement and the approach at the plate.",
      "Baserunning covers primary and secondary leadoffs, steals, and recorded home-to-first times.",
      "Attendees receive a Rookie Development shirt and 2 free private hitting lessons with Noochie after the program.",
      "After week 7, instructors meet with each player and parent to review progress. A closing conversation is held at the end of the program.",
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

export const PROGRAMS: Offering[] = [
  {
    slug: "nv-stars",
    name: "NV Stars",
    eyebrow: "2026–2027 teams",
    summary:
      "Travel teams focused on player development in a fun, competitive environment. Teams practice twice per week and play through the region and beyond.",
    dates: "2026–2027 season",
    instructor: "NVBA indoor facility, Georgetown",
    details: [
      "Offseason training at the 16,000 sq. ft. NVBA indoor facility includes weekly team practices, speed and agility, skill development, and hitting through the winter.",
      "NV Stars fields two teams at each age group. Scout teams play a national schedule. Premier teams play a regional schedule.",
      "Published player amenities include membership to the indoor facility, 3 free hitting clinics (January–February), and winter speed and agility training.",
      "The academy slogan for the organization is: Developing players. Building character. Competing to win.",
      "No public registration link is posted for tryouts. Contact the academy to ask about NV Stars.",
    ],
    cta: "Contact the academy",
    image: "/images/flyers/stars.jpg",
    imageAlt: "NV Stars 2026–2027 information flyer",
    contactLines: [SITE.phone, SITE.email],
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

export const SERVICES = [
  {
    name: "Cage rentals",
    detail: "Batting cages are available to the public in 30- and 60-minute blocks.",
    price: "30 minutes $20 · 60 minutes $35",
  },
  {
    name: "Field rental",
    detail: `Use of the ${SITE.infield.toLowerCase()}.`,
    price: "1.5 hours $100 · 2 hours $180",
  },
  {
    name: "Team training",
    detail:
      "Teams can book the facility or the indoor turf. Contact the academy for team rental times.",
    price: "Call or email to schedule",
  },
  {
    name: "Birthday parties",
    detail:
      "A 2-hour party includes one staff member, field space, and kickball, dodgeball, wiffle ball, and soccer. Members receive 10% off this package.",
    price: "$200",
  },
  {
    name: "Video analysis",
    detail:
      "Short video segments, typically two to three minutes, can be replayed to show technique and progress over time.",
    price: "Ask when you book a lesson",
  },
  {
    name: "Speed and agility",
    detail:
      "Training aimed at foot speed, bat speed, and staying healthy. The academy describes this as part of developing a complete player.",
    price: "Ask the academy",
  },
] as const;

export const SPONSORS = [
  {
    name: "Just 4 You",
    note: "Scott Porter is recognized on the academy site for his sponsorship.",
    image: "/images/brand/just-4-you.png",
    href: undefined as string | undefined,
  },
  {
    name: "Wilson",
    note: "NVBA is a partner of Wilson for apparel and equipment orders.",
    image: undefined as string | undefined,
    href: "http://www.wilsonteamshop.com/join",
  },
] as const;

export const STORES = {
  teamShop: "https://www.team.shop/en-us",
  wilsonJoin: "http://www.wilsonteamshop.com/join",
  accessCode: "18DD053",
  catalogContact: {
    name: "Petey Reynolds",
    role: "Director of Equipment and Sales",
    email: "peteyreynolds@icloud.com",
    phone: "(859) 298-0174",
  },
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

export function programBySlug(slug: string) {
  return PROGRAMS.find((program) => program.slug === slug);
}
