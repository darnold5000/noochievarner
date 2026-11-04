/** Static NVBA website content for one-time CMS seeding (mirrors src/content/site.ts). */

export const SITE = {
  name: "Noochie Varner Baseball Academy",
  shortName: "NVBA",
  phone: "(859) 421-4062",
  email: "noochie@noochievarnerbaseball.com",
  tagline:
    "Indoor baseball and softball training for players of all ages, from Little Leaguers to MLB prospects.",
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
  facilityVideo:
    "https://cdn2.sportngin.com/attachments/video_file/9b28-332948/Baseball_complex_final_1080.mp4",
  social: {
    facebook: "https://www.facebook.com/NVBaseballAcademy/",
    x: "https://twitter.com/NVBA15",
    youtube: "https://www.youtube.com/channel/UC4jPuwVhKzY1lms8y0Ttk_A",
    instagram: "https://instagram.com/noochievarnerbaseball",
  },
};

export const CAMPS = [
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
  },
];

export const INSTRUCTORS = [
  {
    slug: "noochie",
    coachId: "noochie",
    name: "Noochie Varner",
    title: "Hitting instructor",
    shortBio:
      "Hitting instruction for baseball and softball. Mechanics, consistency, and HitTrax in every lesson.",
    fullBio:
      "Founder and hitting instructor. Full career biography and testimonials are on the About page.",
    photoUrl: "/images/coaches/noochie.jpg",
    phone: "(859) 421-4062",
    email: "noochie@noochievarnerbaseball.com",
    featuredOnHomepage: "yes",
    sort: 1,
  },
  {
    slug: "jordan",
    coachId: "jordan",
    name: "Jordan Fox",
    title: "Pitching",
    shortBio: "Pitching instruction on mechanics, velocity, command, and mound confidence.",
    fullBio:
      "Jordan Fox provides individual pitching instruction on mechanics, velocity, command, and developing a complete pitcher. His coaching is aimed at confidence on the mound.",
    photoUrl: "/images/coaches/jordan.jpg",
    phone: "(859) 559-1125",
    email: "Jordanfox2828@gmail.com",
    featuredOnHomepage: "yes",
    sort: 2,
  },
  {
    slug: "corey",
    coachId: "corey",
    name: "Corey Alsop",
    title: "Fielding",
    shortBio: "Fielding fundamentals: footwork, glove work, positioning, and game situations.",
    fullBio:
      "Corey works with players on fielding fundamentals: footwork, glove work, positioning, reaction, and game situations.",
    photoUrl: "/images/coaches/corey.jpg",
    phone: "(859) 797-3778",
    email: "coreyalsop@gmail.com",
    featuredOnHomepage: "no",
    sort: 3,
  },
  {
    slug: "nvba",
    coachId: "nvba",
    name: "NVBA instructors",
    title: "Catching",
    shortBio:
      "The academy offers catching and other position-specific defensive workouts, with published 30- and 60-minute lesson rates.",
    fullBio:
      "The academy offers catching and other position-specific defensive workouts, with published 30- and 60-minute lesson rates.",
    photoUrl: "/images/coaches/nvba.jpg",
    phone: SITE.phone,
    email: SITE.email,
    featuredOnHomepage: "no",
    sort: 4,
  },
];

export const LESSONS = [
  {
    slug: "hitting",
    name: "Private Hitting",
    instructorName: "Noochie Varner",
    category: "hitting",
    description:
      "Noochie works with baseball and softball players of all ages. Instruction focuses on sound mechanics, consistency, and a confident approach at the plate. He has 8 years of professional playing experience. HitTrax is used in all of his hitting lessons.",
    focusAreas: ["Mechanics", "Consistency", "Approach", "Results"],
    bookingKey: "noochieHitting",
    imageUrl: "/images/flyers/hitting.jpg",
    featuredOnHomepage: "yes",
    sort: 1,
  },
  {
    slug: "pitching",
    name: "Pitching Instruction",
    instructorName: "Jordan Fox",
    category: "pitching",
    description:
      "Jordan Fox provides individual pitching instruction on mechanics, velocity, command, and developing a complete pitcher. His coaching is aimed at confidence on the mound.",
    focusAreas: ["Mechanics", "Velocity", "Control", "Confidence"],
    bookingKey: "jordanFox",
    imageUrl: "/images/flyers/pitching.jpg",
    featuredOnHomepage: "yes",
    sort: 2,
  },
  {
    slug: "fielding",
    name: "Fielding Instruction",
    instructorName: "Corey Alsop",
    category: "fielding",
    description:
      "Corey works with players on fielding fundamentals: footwork, glove work, positioning, reaction, and game situations.",
    focusAreas: ["Fundamentals", "Footwork", "Glove work", "Game situations"],
    bookingKey: "coreyAlsop",
    imageUrl: "/images/flyers/fielding.jpg",
    featuredOnHomepage: "yes",
    sort: 3,
  },
  {
    slug: "catching",
    name: "Catching",
    instructorName: "NVBA instructors",
    category: "catching",
    description:
      "The academy offers catching and other position-specific defensive workouts, with published 30- and 60-minute lesson rates.",
    focusAreas: ["Receiving", "Defensive drills"],
    bookingKey: "catching",
    featuredOnHomepage: "no",
    sort: 4,
  },
];

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
};

export const SERVICES_INTRO =
  "Our state-of-the-art batting cages and pitching tunnel are available to the public in 30- and 60-minute blocks. Teams can also book the entire facility or indoor turf field in one- or two-hour blocks.";

export const SERVICES_FACILITY_IMAGE = {
  src: "/images/facility/services-indoor-field.jpg",
  alt: "Indoor turf infield and batting cages at Noochie Varner Baseball Academy",
};

export const SERVICES = [
  {
    name: "Cage rentals",
    rates: [
      { label: "30 minutes", price: "$20" },
      { label: "60 minutes", price: "$35" },
    ],
  },
  {
    name: "Field rental",
    lead: "Take advantage of our 7,000 sq. ft. infield practice area.",
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

export const SPONSORS = [
  {
    slug: "just-4-you-home-loans",
    name: "Just 4 You Home Loans",
    note: "Scott Porter and the Just 4 You team proudly support NVBA athletes, families, and the Georgetown community.",
    image: "/images/sponsors/just-4-you-home-loans.jpg",
    href: "https://www.just4youhomeloans.com/",
    cta: "Visit our sponsor",
    featuredOnHomepage: "yes",
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
];

export const GALLERY = [
  { slug: "infield", src: "/images/gallery/infield.jpg", caption: "Infield clinic", category: "training" },
  { slug: "rookie", src: "/images/gallery/rookie.jpg", caption: "Rookie Development Program", category: "camps" },
  { slug: "batspeed", src: "/images/gallery/batspeed.jpg", caption: "Bat Speed Clinic", category: "camps" },
  { slug: "hitting", src: "/images/gallery/hitting.jpg", caption: "Hitting clinic", category: "training" },
  { slug: "hittrax", src: "/images/gallery/hittrax.jpg", caption: "HitTrax", category: "training" },
  { slug: "soccer", src: "/images/gallery/soccer.jpg", caption: "Soccer training", category: "events" },
  { slug: "stars-18u", src: "/images/gallery/stars-18u.jpg", caption: "18U NV Stars practice", category: "events" },
  { slug: "stars-14u", src: "/images/gallery/stars-14u.jpg", caption: "14U NV Stars practice", category: "events" },
  { slug: "stars-9u", src: "/images/gallery/stars-9u.jpg", caption: "9U NV Stars indoor practice", category: "events" },
  { slug: "about-3", src: "/images/facility/about-3.jpg", caption: "Player instruction", category: "facility" },
  { slug: "about-2", src: "/images/facility/about-2.jpg", caption: "Facility opening", category: "facility" },
  { slug: "about-1", src: "/images/facility/about-1.jpg", caption: "Around the academy", category: "facility" },
];

export const NV_STARS_GALLERY = [
  { slug: "nv-stars-01", src: "/images/nv-stars/nv-stars-01.jpg", caption: "", category: "nv-stars-team", featuredOnHomepage: true, sort: 101 },
  { slug: "nv-stars-02", src: "/images/nv-stars/nv-stars-02.jpg", caption: "NV Stars organization update", category: "nv-stars-news", sort: 201 },
  { slug: "nv-stars-03", src: "/images/nv-stars/nv-stars-03.jpg", caption: "", category: "nv-stars-team", sort: 100 },
  { slug: "nv-stars-04", src: "/images/nv-stars/nv-stars-04.jpg", caption: "", category: "nv-stars-team", sort: 102 },
  { slug: "nv-stars-05", src: "/images/nv-stars/nv-stars-05.jpg", caption: "", category: "nv-stars-team", sort: 103 },
  { slug: "nv-stars-06", src: "/images/nv-stars/nv-stars-06.jpg", caption: "", category: "nv-stars-team", sort: 104 },
  { slug: "nv-stars-07", src: "/images/nv-stars/nv-stars-07.jpg", caption: "", category: "nv-stars-team", sort: 105 },
  { slug: "nv-stars-08", src: "/images/nv-stars/nv-stars-08.jpg", caption: "", category: "nv-stars-team", featuredOnHomepage: true, sort: 106 },
  { slug: "nv-stars-09", src: "/images/nv-stars/nv-stars-09.jpg", caption: "", category: "nv-stars-news", sort: 203 },
  { slug: "nv-stars-10", src: "/images/nv-stars/nv-stars-10.jpg", caption: "", category: "nv-stars-team", featuredOnHomepage: true, sort: 107 },
  { slug: "nv-stars-11", src: "/images/nv-stars/nv-stars-11.jpg", caption: "", category: "nv-stars-team", sort: 108 },
  { slug: "nv-stars-12", src: "/images/nv-stars/nv-stars-12.jpg", caption: "", category: "nv-stars-team", sort: 109 },
  { slug: "nv-stars-13", src: "/images/nv-stars/nv-stars-13.jpg", caption: "", category: "nv-stars-team", sort: 101 },
];

export const ABOUT = {
  introEyebrow: "Georgetown, Kentucky",
  introTitle: "About the Academy",
  introText:
    "The focus at NVBA is on the individual. Instructors evaluate each player's strengths and build a plan around what that player already does well.",
  storyParagraphs: [
    "Every good swing shares common principles, but no two hitters are built the same. Lessons begin with an evaluation of natural ability, goals, and age-appropriate expectations. Instructors address strength, balance, conditioning, technique, vision, and footwork.",
    "Players are encouraged to work consistently with one coach. Our staff is large enough that a player can also learn from another instructor when that helps their development.",
    "Practice is at the heart of NVBA. The indoor facility at 115 Etter Lane, Georgetown, KY 40324 opened in December 2016. The building offers 16,000 square feet of training space, including a 7,000 sq. ft. infield practice area.",
    "We train baseball and softball players from tee-ball ages through advanced prospects. Offerings include private, group, and team lessons, cage and field rentals, camps, and clinics—plus hitting, pitching, catching, defense, and speed and agility work.",
  ],
  founderHomeSummary:
    "Born and raised in Cynthiana, Kentucky, Noochie Varner won two state titles at Harrison County High School and was MVP of the 1998 Kentucky State Baseball Tournament. At St. Catharine College he earned NJCAA All-Region and All-American honors before the Cincinnati Reds drafted him in 2000. After eight professional seasons and a .299 career average, he founded NVBA in Georgetown to help the next generation develop at the plate.",
  founderCareerPosterUrl: "/images/founder/career-stats-poster.jpg",
  founderTestimonialsFlyerUrl: "/images/founder/testimonials-flyer.jpg",
  testimonialBradName: "Brad Shelton",
  testimonialBradTitle: "Former Head Baseball Coach, University of the Cumberlands",
  testimonialBradQuote:
    "Noochie Varner is one of the best hitters I have coached in 22 years at the college level. His work ethic and approach to hitting was second to none. From the first time I saw him hit, I knew he was a pro. I have no doubt he can help young players improve their baseball skills.",
  testimonialMacName: "Mac Whitaker",
  testimonialMacTitle: "Hall of Fame Baseball Coach, Harrison County High School",
  testimonialMacQuote:
    "Noochie Varner excelled in his baseball career beginning with Little League, continuing in high school and ultimately at the professional level because of his outstanding work ethic and leadership qualities. His ability to relate to players at all ages and levels will enable him to be successful in an instructional environment.",
  mainImageUrl: "/images/facility/facility.jpg",
  secondaryImageUrl: "/images/facility/about-2.jpg",
};

export const FACILITY_FEATURES = [
  { slug: "indoor-training", label: "Indoor training", description: "Year-round baseball and softball development in a climate-controlled facility.", sort: 1 },
  { slug: "infield-area", label: "Infield practice area", description: "Dedicated turf space for ground balls, footwork, and team defense.", sort: 2 },
  { slug: "hittrax", label: "HitTrax", description: "Measure exit velocity, launch angle, and more to track hitting progress.", sort: 3 },
];

export function slugify(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
