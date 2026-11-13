export type HitTraxLeague = {
  id: string;
  eyebrow: string;
  title: string;
  ages: string;
  startDate: string;
  schedule: string;
  price: string;
  /** Optional second price line (e.g. full-program option). */
  secondaryPrice: string;
  registrationDeadline: string;
  registerUrl: string;
  registerCtaLabel: string;
  secondaryRegisterUrl: string;
  secondaryRegisterCtaLabel: string;
  flyerSrc: string;
  flyerAlt: string;
};

export const DEFAULT_REGISTRATIONS_SECTION_DESCRIPTION =
  "Programs and leagues open for registration through EZFacility.";

/** Shown when CMS is not configured (local dev only). */
export const FALLBACK_HITTRAX_LEAGUES: HitTraxLeague[] = [
  {
    id: "7u-8u",
    eyebrow: "HitTrax · Coach pitch",
    title: "7U–8U Coach Pitch League",
    ages: "Ages 7U–8U",
    startDate: "November 20, 2026",
    schedule: "Fridays 7:00–9:00 PM · Saturdays 3:00–5:00 PM if necessary",
    price: "$85 per player",
    secondaryPrice: "",
    registrationDeadline: "Nov. 18",
    registerUrl:
      "https://tms.ezfacility.com/OnlineRegistrations/Register.aspx?CompanyID=5559&GroupID=4141789",
    registerCtaLabel: "Register now",
    secondaryRegisterUrl: "",
    secondaryRegisterCtaLabel: "",
    flyerSrc: "/images/leagues/hittrax-7u-8u-coach-pitch.jpg",
    flyerAlt: "HitTrax 7U–8U Coach Pitch League flyer — Noochie Varner Baseball Academy",
  },
  {
    id: "9u-10u",
    eyebrow: "HitTrax · Baseball",
    title: "9U–10U Baseball League",
    ages: "Ages 9U–10U",
    startDate: "November 21, 2026",
    schedule: "Saturdays 5:30–8:30 PM",
    price: "$85 per player",
    secondaryPrice: "",
    registrationDeadline: "Nov. 18",
    registerUrl:
      "https://tms.ezfacility.com/OnlineRegistrations/Register.aspx?CompanyID=5559&GroupID=4141853",
    registerCtaLabel: "Register now",
    secondaryRegisterUrl: "",
    secondaryRegisterCtaLabel: "",
    flyerSrc: "/images/leagues/hittrax-9u-10u-baseball.jpg",
    flyerAlt: "HitTrax 9U–10U Baseball League flyer — Noochie Varner Baseball Academy",
  },
  {
    id: "homeschool-training",
    eyebrow: "Homeschool training",
    title: "Homeschool Training with Noochie Varner",
    ages: "Only the first 6 to sign up",
    startDate: "November 30, 2026 – February 25, 2027",
    schedule: "Mon., Wed. & Thu. · 10:00 a.m.–2:00 p.m. (no training Thu., Dec. 24)",
    price: "$899 per month",
    secondaryPrice: "$2,100 full program (38 days)",
    registrationDeadline: "",
    registerUrl:
      "https://tms.ezfacility.com/OnlineRegistrations/Register.aspx?CompanyID=5559&GroupID=4143499",
    registerCtaLabel: "Monthly payment",
    secondaryRegisterUrl:
      "https://tms.ezfacility.com/OnlineRegistrations/Register.aspx?CompanyID=5559&GroupID=4143496",
    secondaryRegisterCtaLabel: "Full payment",
    flyerSrc: "/images/leagues/homeschool-training.jpg",
    flyerAlt: "Homeschool Training with Noochie Varner — Noochie Varner Baseball Academy",
  },
];

/** @deprecated use DEFAULT_REGISTRATIONS_SECTION_DESCRIPTION */
export const DEFAULT_HITTRAX_LEAGUES_FORMAT = DEFAULT_REGISTRATIONS_SECTION_DESCRIPTION;
