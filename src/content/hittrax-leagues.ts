export type HitTraxLeague = {
  id: string;
  eyebrow: string;
  title: string;
  ages: string;
  startDate: string;
  schedule: string;
  price: string;
  registrationDeadline: string;
  registerUrl: string;
  flyerSrc: string;
  flyerAlt: string;
};

export const HITTRAX_LEAGUES_FORMAT =
  "Each league runs four weeks, followed by a single-elimination tournament.";

export const HITTRAX_LEAGUES: HitTraxLeague[] = [
  {
    id: "7u-8u",
    eyebrow: "HitTrax · Coach pitch",
    title: "7U–8U Coach Pitch League",
    ages: "Ages 7U–8U",
    startDate: "League begins November 20, 2026",
    schedule: "Fridays 7:00–9:00 PM · Saturdays 3:00–5:00 PM if necessary",
    price: "$85 per player",
    registrationDeadline: "Registration deadline: Nov. 18",
    registerUrl:
      "https://tms.ezfacility.com/OnlineRegistrations/Register.aspx?CompanyID=5559&GroupID=4141789",
    flyerSrc: "/images/leagues/hittrax-7u-8u-coach-pitch.jpg",
    flyerAlt: "HitTrax 7U–8U Coach Pitch League flyer — Noochie Varner Baseball Academy",
  },
  {
    id: "9u-10u",
    eyebrow: "HitTrax · Baseball",
    title: "9U–10U Baseball League",
    ages: "Ages 9U–10U",
    startDate: "League begins November 21, 2026",
    schedule: "Saturdays 5:30–8:30 PM",
    price: "$85 per player",
    registrationDeadline: "Registration deadline: Nov. 18",
    registerUrl:
      "https://tms.ezfacility.com/OnlineRegistrations/Register.aspx?CompanyID=5559&GroupID=4141853",
    flyerSrc: "/images/leagues/hittrax-9u-10u-baseball.jpg",
    flyerAlt: "HitTrax 9U–10U Baseball League flyer — Noochie Varner Baseball Academy",
  },
];
