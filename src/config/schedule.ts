import { SITE } from "@/content/site";

/** Sample inventory for the sales demo. Not live EZFacility availability. */
export const DEMO_AVAILABILITY_NOTICE =
  "Sample demo availability. These times are not live openings and completing this form does not reserve a real appointment.";

export const FACILITY_LOCATION = SITE.address.full;

export const TIMEZONE = "America/New_York";

export type BookingCategory = "lessons" | "camps" | "rentals";
export type LessonService = "hitting" | "pitching" | "fielding" | "catching";
export type DurationMinutes = 30 | 60 | 90 | 120;
export type CoachId = "noochie" | "jordan" | "corey" | "nvba";
export type ProgramId = "bat-speed-clinic" | "rookie-development" | "tee-ball-winter-league";
export type RentalId = "cages" | "field" | "party";

export type Coach = {
  id: CoachId;
  name: string;
  specialty: string;
  shortBio: string;
  tags: string[];
  photo: string;
  photoPosition: string;
  photoFit: "cover" | "contain";
  services: LessonService[];
  contact: string[];
};

export type LessonType = {
  id: LessonService;
  label: string;
  durations: DurationMinutes[];
  prices: Partial<Record<DurationMinutes, string>>;
};

export const COACHES: Coach[] = [
  {
    id: "noochie",
    name: "Noochie Varner",
    specialty: "Hitting",
    shortBio:
      "Hitting instruction for baseball and softball. Mechanics, consistency, and HitTrax in every lesson.",
    tags: ["Hitting", "HitTrax", "Mechanics"],
    photo: "/images/coaches/noochie.jpg",
    photoPosition: "center top",
    photoFit: "cover",
    services: ["hitting"],
    contact: ["(859) 421-4062", "noochie@noochievarnerbaseball.com"],
  },
  {
    id: "jordan",
    name: "Jordan Fox",
    specialty: "Pitching",
    shortBio: "Pitching instruction on mechanics, velocity, command, and mound confidence.",
    tags: ["Pitching", "Velocity", "Command"],
    photo: "/images/coaches/jordan.jpg",
    photoPosition: "center top",
    photoFit: "cover",
    services: ["pitching"],
    contact: ["(859) 559-1125", "Jordanfox2828@gmail.com"],
  },
  {
    id: "corey",
    name: "Corey Alsop",
    specialty: "Fielding",
    shortBio: "Fielding fundamentals: footwork, glove work, positioning, and game situations.",
    tags: ["Fielding", "Footwork", "Glove work"],
    photo: "/images/coaches/corey.jpg",
    photoPosition: "center top",
    photoFit: "cover",
    services: ["fielding"],
    contact: ["(859) 797-3778", "coreyalsop@gmail.com"],
  },
  {
    id: "nvba",
    name: "NVBA instructors",
    specialty: "Catching",
    shortBio: "Position-specific catching and defensive workouts with the academy staff.",
    tags: ["Catching", "Defense"],
    photo: "/images/coaches/nvba.jpg",
    photoPosition: "center",
    photoFit: "contain",
    services: ["catching"],
    contact: [SITE.phone],
  },
];

export const LESSON_TYPES: LessonType[] = [
  {
    id: "hitting",
    label: "Hitting",
    durations: [30, 60],
    prices: { 30: "$45", 60: "$85" },
  },
  {
    id: "pitching",
    label: "Pitching",
    durations: [30, 60],
    prices: { 30: "$45", 60: "$80" },
  },
  {
    id: "fielding",
    label: "Fielding",
    durations: [30, 60],
    prices: {},
  },
  {
    id: "catching",
    label: "Catching",
    durations: [30, 60],
    prices: { 30: "$45", 60: "$80" },
  },
];

/**
 * Weekday patterns for demo private-lesson openings.
 * 0 = Sunday. Times are 24-hour HH:mm local Eastern.
 */
export const DEMO_LESSON_HOURS: Record<CoachId, { weekdays: number[]; times: string[] }> = {
  noochie: {
    weekdays: [1, 2, 3, 4],
    times: ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30"],
  },
  jordan: {
    weekdays: [1, 3, 5],
    times: ["15:00", "15:30", "16:00", "16:30", "17:00"],
  },
  corey: {
    weekdays: [2, 4, 6],
    times: ["16:00", "16:30", "17:00", "17:30"],
  },
  nvba: {
    weekdays: [1, 2, 3, 4, 5],
    times: ["15:00", "15:30", "16:00", "16:30"],
  },
};

export const PROGRAMS_FOR_BOOKING = [
  {
    id: "bat-speed-clinic" as const,
    name: "Bat Speed Clinic",
    summary: "8-week clinic. Ages 8 & up. Tuesdays and Thursdays, 7:00–8:30 p.m.",
    ages: "8 & up",
    price: "$495",
    timeLabel: "7:00–8:30 p.m.",
    dates: [
      "2026-11-03",
      "2026-11-05",
      "2026-11-10",
      "2026-11-12",
      "2026-11-17",
      "2026-11-19",
      "2026-11-24",
      "2026-12-01",
      "2026-12-03",
      "2026-12-08",
      "2026-12-10",
      "2026-12-15",
      "2026-12-17",
      "2026-12-22",
    ],
  },
  {
    id: "rookie-development" as const,
    name: "Rookie Development Program",
    summary: "Wednesdays, 7:00–8:30 p.m. Ages 5–11. 13 sessions.",
    ages: "5–11",
    price: "$679",
    timeLabel: "7:00–8:30 p.m.",
    dates: weeklyDates("2026-12-02", "2027-02-24", 3),
  },
  {
    id: "tee-ball-winter-league" as const,
    name: "Winter Tee Ball League",
    summary: "Saturday evenings. Ages 4–6. 8 games.",
    ages: "4–6",
    price: "$80 per player",
    timeLabel: "Saturday evenings",
    dates: weeklyDates("2026-11-07", "2027-01-02", 6),
  },
];

export const RENTALS = [
  {
    id: "cages" as const,
    name: "Cage rental",
    summary: "Batting cages in 30- and 60-minute blocks.",
    durations: [30, 60] as DurationMinutes[],
    prices: { 30: "$20", 60: "$35" } as Partial<Record<DurationMinutes, string>>,
  },
  {
    id: "field" as const,
    name: "Field rental",
    summary: "7,000 sq. ft. infield practice area.",
    durations: [90, 120] as DurationMinutes[],
    prices: { 90: "$100", 120: "$180" } as Partial<Record<DurationMinutes, string>>,
  },
  {
    id: "party" as const,
    name: "Birthday party",
    summary: "2-hour party with a staff member and field space. Members receive 10% off.",
    durations: [120] as DurationMinutes[],
    prices: { 120: "$200" } as Partial<Record<DurationMinutes, string>>,
  },
];

export const DEMO_RENTAL_HOURS: Record<RentalId, { weekdays: number[]; times: string[] }> = {
  cages: {
    weekdays: [1, 2, 3, 4, 5, 6],
    times: ["10:00", "10:30", "11:00", "16:00", "16:30", "17:00", "17:30"],
  },
  field: {
    weekdays: [0, 6],
    times: ["09:00", "10:30", "13:00", "15:00"],
  },
  party: {
    weekdays: [0, 6],
    times: ["10:00", "13:00"],
  },
};

export function coachById(id: string | null | undefined) {
  return COACHES.find((coach) => coach.id === id);
}

export function lessonTypeById(id: string | null | undefined) {
  return LESSON_TYPES.find((type) => type.id === id);
}

export function programById(id: string | null | undefined) {
  return PROGRAMS_FOR_BOOKING.find((program) => program.id === id);
}

export function rentalById(id: string | null | undefined) {
  return RENTALS.find((rental) => rental.id === id);
}

export function coachesForService(service: LessonService) {
  return COACHES.filter((coach) => coach.services.includes(service));
}

export function lessonHref(coachId: CoachId, service: LessonService) {
  return `/book?category=lessons&coach=${coachId}&service=${service}`;
}

export function programHref(programId: ProgramId) {
  return `/book?category=camps&program=${programId}`;
}

export const LESSON_BOOKING_HREFS: Record<string, string> = {
  hitting: lessonHref("noochie", "hitting"),
  pitching: lessonHref("jordan", "pitching"),
  fielding: lessonHref("corey", "fielding"),
  catching: lessonHref("nvba", "catching"),
};

const CAMP_BOOKING_KEYS: Partial<Record<string, ProgramId>> = {
  batSpeed: "bat-speed-clinic",
  rookie: "rookie-development",
  teeBall: "tee-ball-winter-league",
};

export function campRegisterHref(bookingKey?: string) {
  const programId = bookingKey ? CAMP_BOOKING_KEYS[bookingKey] : undefined;
  return programId ? programHref(programId) : null;
}

function weeklyDates(start: string, end: string, weekday: number) {
  const dates: string[] = [];
  const cursor = parseISODate(start);
  const last = parseISODate(end);
  while (cursor.getUTCDay() !== weekday) {
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  while (cursor.getTime() <= last.getTime()) {
    dates.push(isoFromUTC(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 7);
  }
  return dates;
}

function parseISODate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function isoFromUTC(date: Date) {
  return date.toISOString().slice(0, 10);
}
