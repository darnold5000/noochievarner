import {
  COACHES,
  DEMO_LESSON_HOURS,
  DEMO_RENTAL_HOURS,
  LESSON_TYPES,
  TIMEZONE,
  coachById,
  lessonTypeById,
  programById,
  rentalById,
  type CoachId,
  type DurationMinutes,
  type LessonService,
  type RentalId,
} from "@/config/schedule";

export function todayISO(now = new Date()) {
  return now.toLocaleDateString("en-CA", { timeZone: TIMEZONE });
}

export function parseISODate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDays(iso: string, days: number) {
  const date = parseISODate(iso);
  date.setDate(date.getDate() + days);
  return formatISODate(date);
}

export function addMonths(iso: string, count: number) {
  const date = parseISODate(iso);
  date.setDate(1);
  date.setMonth(date.getMonth() + count);
  return formatISODate(date);
}

export function startOfMonth(iso: string) {
  const date = parseISODate(iso);
  date.setDate(1);
  return formatISODate(date);
}

export function startOfWeek(iso: string) {
  const date = parseISODate(iso);
  date.setDate(date.getDate() - date.getDay());
  return formatISODate(date);
}

export function monthLabel(iso: string) {
  return parseISODate(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function weekdayLabel(iso: string, width: "short" | "long" = "short") {
  return parseISODate(iso).toLocaleDateString("en-US", { weekday: width });
}

export function dayNumber(iso: string) {
  return parseISODate(iso).getDate();
}

export function formatLongDate(iso: string) {
  return parseISODate(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(time: string) {
  const [hourRaw, minute] = time.split(":").map(Number);
  const suffix = hourRaw >= 12 ? "PM" : "AM";
  const hour = hourRaw % 12 || 12;
  return `${hour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

export function addMinutes(time: string, minutes: number) {
  const [hour, minute] = time.split(":").map(Number);
  const total = hour * 60 + minute + minutes;
  const nextHour = Math.floor(total / 60);
  const nextMinute = total % 60;
  return `${String(nextHour).padStart(2, "0")}:${String(nextMinute).padStart(2, "0")}`;
}

export function durationLabel(minutes: DurationMinutes) {
  if (minutes === 30) return "30 minutes";
  if (minutes === 60) return "60 minutes";
  if (minutes === 90) return "1.5 hours";
  return "2 hours";
}

export function monthGrid(monthISO: string) {
  const start = startOfMonth(monthISO);
  const gridStart = startOfWeek(start);
  return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
}

export function weekDays(weekISO: string) {
  const start = startOfWeek(weekISO);
  return Array.from({ length: 7 }, (_, index) => addDays(start, index));
}

export function isPastDate(iso: string, today = todayISO()) {
  return iso < today;
}

export function isSameMonth(iso: string, monthISO: string) {
  return iso.slice(0, 7) === monthISO.slice(0, 7);
}

function demoTimesForDate(weekdays: number[], times: string[], iso: string, today = todayISO()) {
  if (isPastDate(iso, today)) return [];
  const weekday = parseISODate(iso).getDay();
  if (!weekdays.includes(weekday)) return [];
  if (iso === today) {
    const nowHour = Number(
      new Date().toLocaleString("en-US", { timeZone: TIMEZONE, hour: "2-digit", hour12: false }),
    );
    return times.filter((time) => Number(time.slice(0, 2)) > nowHour);
  }
  return times;
}

export function lessonStartTimes(coachId: CoachId, duration: DurationMinutes, iso: string, today = todayISO()) {
  const pattern = DEMO_LESSON_HOURS[coachId];
  const starts = demoTimesForDate(pattern.weekdays, pattern.times, iso, today);
  if (duration === 30) return starts;
  return starts.filter((time) => starts.includes(addMinutes(time, 30)));
}

export function rentalStartTimes(rentalId: RentalId, duration: DurationMinutes, iso: string, today = todayISO()) {
  const pattern = DEMO_RENTAL_HOURS[rentalId];
  const starts = demoTimesForDate(pattern.weekdays, pattern.times, iso, today);
  if (rentalId === "cages" && duration === 60) {
    return starts.filter((time) => starts.includes(addMinutes(time, 30)));
  }
  return starts;
}

export function datesWithLessonOpenings(
  coachId: CoachId,
  duration: DurationMinutes,
  fromISO: string,
  days: number,
  today = todayISO(),
) {
  const open = new Set<string>();
  for (let index = 0; index < days; index += 1) {
    const iso = addDays(fromISO, index);
    if (lessonStartTimes(coachId, duration, iso, today).length > 0) open.add(iso);
  }
  return open;
}

export function datesWithRentalOpenings(
  rentalId: RentalId,
  duration: DurationMinutes,
  fromISO: string,
  days: number,
  today = todayISO(),
) {
  const open = new Set<string>();
  for (let index = 0; index < days; index += 1) {
    const iso = addDays(fromISO, index);
    if (rentalStartTimes(rentalId, duration, iso, today).length > 0) open.add(iso);
  }
  return open;
}

/** Prefer today when it has openings; otherwise the next open day. */
export function defaultOpenDate(available: Set<string>, today = todayISO()) {
  if (available.has(today)) return today;
  return Array.from(available).sort()[0] ?? today;
}

export function resolvedLessonSelection(params: {
  coach?: string | null;
  service?: string | null;
  duration?: string | null;
}) {
  const requestedService = lessonTypeById(params.service)?.id;
  const requestedCoach = coachById(params.coach);
  const coach =
    requestedCoach && requestedService && !requestedCoach.services.includes(requestedService)
      ? coachesForRequestedService(requestedService)[0]
      : requestedCoach ?? (requestedService ? coachesForRequestedService(requestedService)[0] : COACHES[0]);
  const service = requestedService && coach.services.includes(requestedService) ? requestedService : coach.services[0];
  const lesson = lessonTypeById(service)!;
  const requestedDuration = Number(params.duration) as DurationMinutes;
  const duration = lesson.durations.includes(requestedDuration) ? requestedDuration : lesson.durations[0];
  return { coach, service, duration, lesson };
}

function coachesForRequestedService(service: LessonService) {
  return COACHES.filter((coach) => coach.services.includes(service));
}

export function priceForLesson(service: LessonService, duration: DurationMinutes) {
  return LESSON_TYPES.find((type) => type.id === service)?.prices[duration];
}

export function priceForRental(rentalId: RentalId, duration: DurationMinutes) {
  return rentalById(rentalId)?.prices[duration];
}

export function upcomingProgramDates(programId: string, today = todayISO()) {
  return programById(programId)?.dates.filter((date) => date >= today) ?? [];
}
