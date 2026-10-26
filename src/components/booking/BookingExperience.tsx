"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import CalendarMonth from "@/components/booking/CalendarMonth";
import DateStrip from "@/components/booking/DateStrip";
import TimeGrid from "@/components/booking/TimeGrid";
import {
  COACHES,
  DEMO_AVAILABILITY_NOTICE,
  FACILITY_LOCATION,
  LESSON_TYPES,
  PROGRAMS_FOR_BOOKING,
  RENTALS,
  type BookingCategory,
  type CoachId,
  type DurationMinutes,
  type LessonService,
  type ProgramId,
  type RentalId,
  coachesForService,
  programById,
  rentalById,
} from "@/config/schedule";
import {
  datesWithLessonOpenings,
  datesWithRentalOpenings,
  defaultOpenDate,
  durationLabel,
  formatLongDate,
  formatTime,
  lessonStartTimes,
  priceForLesson,
  priceForRental,
  rentalStartTimes,
  resolvedLessonSelection,
  startOfMonth,
  startOfWeek,
  todayISO,
  upcomingProgramDates,
} from "@/lib/booking";
import { btnOutline, btnPrimary } from "@/lib/styles";

type Step = "schedule" | "details" | "review" | "done";

type Customer = {
  parentName: string;
  email: string;
  phone: string;
  playerName: string;
  playerAge: string;
  notes: string;
};

const EMPTY_CUSTOMER: Customer = {
  parentName: "",
  email: "",
  phone: "",
  playerName: "",
  playerAge: "",
  notes: "",
};

const FORM_KEY = "nvba-demo-booking-form";

function parseCategory(value: string | null): BookingCategory {
  if (value === "camps" || value === "rentals") return value;
  return "lessons";
}

export default function BookingExperience() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const today = todayISO();

  const category = parseCategory(searchParams.get("category"));
  const lesson = resolvedLessonSelection({
    coach: searchParams.get("coach"),
    service: searchParams.get("service"),
    duration: searchParams.get("duration"),
  });
  const programId = (searchParams.get("program") as ProgramId | null) ?? PROGRAMS_FOR_BOOKING[0].id;
  const program = programById(programId) ?? PROGRAMS_FOR_BOOKING[0];
  const rentalId = (searchParams.get("rental") as RentalId | null) ?? RENTALS[0].id;
  const rental = rentalById(rentalId) ?? RENTALS[0];
  const rentalDuration = (Number(searchParams.get("duration")) as DurationMinutes) || rental.durations[0];
  const duration = rental.durations.includes(rentalDuration) ? rentalDuration : rental.durations[0];

  const [step, setStep] = useState<Step>("schedule");
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [monthISO, setMonthISO] = useState(startOfMonth(today));
  const [weekISO, setWeekISO] = useState(startOfWeek(today));
  const [customer, setCustomer] = useState<Customer>(() => {
    if (typeof window === "undefined") return EMPTY_CUSTOMER;
    try {
      const saved = sessionStorage.getItem(FORM_KEY);
      return saved ? { ...EMPTY_CUSTOMER, ...JSON.parse(saved) } : EMPTY_CUSTOMER;
    } catch {
      return EMPTY_CUSTOMER;
    }
  });
  const [confirmation, setConfirmation] = useState("");
  const [formError, setFormError] = useState("");
  const [coachBioOpen, setCoachBioOpen] = useState(false);

  useEffect(() => {
    sessionStorage.setItem(FORM_KEY, JSON.stringify(customer));
  }, [customer]);

  function clearSchedule() {
    setDate(null);
    setTime(null);
    setStep("schedule");
  }

  const availableDates = useMemo(() => {
    if (category === "lessons") {
      return datesWithLessonOpenings(lesson.coach.id, lesson.duration, today, 90, today);
    }
    if (category === "camps") {
      return new Set(upcomingProgramDates(program.id, today));
    }
    return datesWithRentalOpenings(rental.id, duration, today, 90, today);
  }, [category, duration, lesson.coach.id, lesson.duration, program.id, rental.id, today]);

  const selectedDate = date && availableDates.has(date) ? date : defaultOpenDate(availableDates, today);

  const times = useMemo(() => {
    if (category === "lessons") return lessonStartTimes(lesson.coach.id, lesson.duration, selectedDate, today);
    if (category === "camps") {
      return program.dates.includes(selectedDate) && selectedDate >= today ? ["19:00"] : [];
    }
    return rentalStartTimes(rental.id, duration, selectedDate, today);
  }, [category, duration, lesson.coach.id, lesson.duration, program.dates, rental.id, selectedDate, today]);

  function setParams(next: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    router.replace(`/book?${params.toString()}`, { scroll: false });
  }

  function selectCategory(next: BookingCategory) {
    clearSchedule();
    if (next === "lessons") {
      setParams({
        category: "lessons",
        coach: lesson.coach.id,
        service: lesson.service,
        duration: String(lesson.duration),
        program: null,
        rental: null,
      });
      return;
    }
    if (next === "camps") {
      setParams({
        category: "camps",
        program: program.id,
        coach: null,
        service: null,
        duration: null,
        rental: null,
      });
      return;
    }
    setParams({
      category: "rentals",
      rental: rental.id,
      duration: String(rental.durations[0]),
      coach: null,
      service: null,
      program: null,
    });
  }

  function selectCoach(id: CoachId) {
    clearSchedule();
    setCoachBioOpen(false);
    const coach = COACHES.find((item) => item.id === id)!;
    const service = coach.services.includes(lesson.service) ? lesson.service : coach.services[0];
    setParams({ category: "lessons", coach: id, service, duration: String(lesson.duration) });
  }

  function selectService(service: LessonService) {
    clearSchedule();
    const eligible = coachesForService(service);
    const coach = eligible.some((item) => item.id === lesson.coach.id) ? lesson.coach : eligible[0];
    const type = LESSON_TYPES.find((item) => item.id === service)!;
    const nextDuration = type.durations.includes(lesson.duration) ? lesson.duration : type.durations[0];
    setParams({
      category: "lessons",
      coach: coach.id,
      service,
      duration: String(nextDuration),
    });
  }

  const price =
    category === "lessons"
      ? priceForLesson(lesson.service, lesson.duration)
      : category === "camps"
        ? program.price
        : priceForRental(rental.id, duration);

  const timeLabel =
    category === "camps" && selectedDate ? program.timeLabel : time ? formatTime(time) : null;

  const summaryReady = Boolean(selectedDate && (category === "camps" || time));

  function continueToDetails() {
    if (!summaryReady) return;
    setStep("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submitDetails(event: React.FormEvent) {
    event.preventDefault();
    if (!customer.parentName || !customer.email || !customer.phone || !customer.playerName) {
      setFormError("Parent name, email, phone, and player name are required.");
      return;
    }
    setFormError("");
    setStep("review");
  }

  function confirmDemo() {
    setConfirmation(`NVBA-DEMO-${Date.now().toString().slice(-6)}`);
    setStep("done");
  }

  if (step === "done") {
    return (
      <section className="mx-auto max-w-xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-nv-navy/10 bg-white p-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-nv-blue">Demo only</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-wide text-nv-navy">Request captured</h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            This is a sales demo. No appointment has been reserved, no payment was taken, and no confirmation email
            was sent.
          </p>
          <p className="mt-4 font-semibold text-nv-navy">Reference {confirmation}</p>
          <dl className="mt-6 space-y-2 text-left text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Customer</dt>
              <dd>{customer.parentName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Player</dt>
              <dd>{customer.playerName}</dd>
            </div>
            {selectedDate ? (
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">When</dt>
                <dd>
                  {formatLongDate(selectedDate)}
                  {timeLabel ? ` · ${timeLabel}` : ""}
                </dd>
              </div>
            ) : null}
          </dl>
          <Link href="/book" className={`${btnPrimary} mt-8 w-full`} onClick={() => setStep("schedule")}>
            Book another demo
          </Link>
        </div>
      </section>
    );
  }

  if (step === "details" || step === "review") {
    return (
      <section className="mx-auto max-w-2xl px-4 py-8 pb-32 sm:px-6 lg:pb-8">
        <button type="button" className="text-sm font-semibold text-nv-blue" onClick={() => setStep("schedule")}>
          ← Change coach, date, or time
        </button>
        <SummaryBlock
          category={category}
          coachName={lesson.coach.name}
          serviceLabel={
            category === "lessons"
              ? lesson.lesson.label
              : category === "camps"
                ? program.name
                : rental.name
          }
          date={selectedDate}
          timeLabel={timeLabel}
          duration={category === "camps" ? program.timeLabel : durationLabel(category === "lessons" ? lesson.duration : duration)}
          price={price}
        />
        {step === "details" ? (
          <form onSubmit={submitDetails} className="mt-6 space-y-4 rounded-2xl bg-white p-5">
            <h2 className="font-display text-3xl font-bold tracking-wide text-nv-navy">Your details</h2>
            <p className="text-sm text-zinc-600">No account is required. This stays on the academy site.</p>
            <Field label="Parent / customer name" value={customer.parentName} onChange={(value) => setCustomer({ ...customer, parentName: value })} required />
            <Field label="Email" type="email" value={customer.email} onChange={(value) => setCustomer({ ...customer, email: value })} required />
            <Field label="Phone" type="tel" value={customer.phone} onChange={(value) => setCustomer({ ...customer, phone: value })} required />
            <Field label="Player name" value={customer.playerName} onChange={(value) => setCustomer({ ...customer, playerName: value })} required />
            <Field label="Player age" value={customer.playerAge} onChange={(value) => setCustomer({ ...customer, playerAge: value })} />
            <label className="block text-sm">
              <span className="font-semibold text-nv-navy">Notes</span>
              <textarea
                className="mt-1 min-h-24 w-full rounded-lg border border-nv-navy/15 px-3 py-2"
                value={customer.notes}
                onChange={(event) => setCustomer({ ...customer, notes: event.target.value })}
              />
            </label>
            {formError ? <p className="text-sm text-red-700">{formError}</p> : null}
            <button type="submit" className={`${btnPrimary} w-full`}>
              Review demo booking
            </button>
          </form>
        ) : (
          <div className="mt-6 rounded-2xl bg-white p-5">
            <h2 className="font-display text-3xl font-bold tracking-wide text-nv-navy">Review</h2>
            <p className="mt-2 text-sm text-zinc-600">{DEMO_AVAILABILITY_NOTICE}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <Row label="Parent" value={customer.parentName} />
              <Row label="Email" value={customer.email} />
              <Row label="Phone" value={customer.phone} />
              <Row label="Player" value={`${customer.playerName}${customer.playerAge ? `, age ${customer.playerAge}` : ""}`} />
              {customer.notes ? <Row label="Notes" value={customer.notes} /> : null}
            </dl>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button type="button" className={btnOutline} onClick={() => setStep("details")}>
                Edit details
              </button>
              <button type="button" className={`${btnPrimary} sm:flex-1`} onClick={confirmDemo}>
                Submit demo booking
              </button>
            </div>
          </div>
        )}
      </section>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 pb-32 sm:px-6 lg:py-8 lg:pb-8">
      <p className="rounded-xl bg-nv-navy px-3 py-2.5 text-xs text-nv-silver lg:px-4 lg:py-3 lg:text-sm">
        {DEMO_AVAILABILITY_NOTICE}
      </p>

      <div
        className="mt-4 grid grid-cols-3 overflow-hidden rounded-xl border border-nv-navy/10 bg-white lg:mt-6 lg:grid-cols-3 lg:gap-2 lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent"
        role="tablist"
        aria-label="Booking category"
      >
        {(
          [
            ["lessons", "Private Lessons", "Lessons"],
            ["camps", "Camps & Clinics", "Camps"],
            ["rentals", "Rentals", "Rentals"],
          ] as const
        ).map(([id, label, shortLabel], index) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={category === id}
            onClick={() => selectCategory(id)}
            className={`min-h-10 px-1 py-2 text-[10px] font-bold uppercase leading-tight tracking-wide sm:text-xs lg:min-h-12 lg:rounded-xl lg:border lg:px-3 lg:py-3 lg:text-sm ${
              index > 0 ? "border-l border-nv-navy/10 lg:border-l-0" : ""
            } ${
              category === id
                ? "bg-nv-blue text-white lg:border-nv-blue"
                : "bg-white text-nv-navy lg:border-nv-navy/10"
            }`}
          >
            <span className="lg:hidden">{shortLabel}</span>
            <span className="hidden lg:inline">{label}</span>
          </button>
        ))}
      </div>

      {category === "lessons" ? (
        <div className="mt-4 space-y-3 lg:mt-6 lg:space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">Coach</p>
            <div className="mt-1.5 grid grid-cols-2 gap-2 lg:mt-2 lg:grid-cols-2 lg:gap-3 xl:grid-cols-4">
              {COACHES.map((coach) => {
                const active = lesson.coach.id === coach.id;
                return (
                  <button
                    key={coach.id}
                    type="button"
                    onClick={() => selectCoach(coach.id)}
                    className={`flex min-h-[5.5rem] items-start gap-2 rounded-xl border p-2 text-left lg:min-h-0 lg:items-center lg:gap-3 lg:rounded-2xl lg:p-3 ${
                      active
                        ? "border-nv-blue bg-white ring-2 ring-nv-blue/30"
                        : "border-nv-navy/10 bg-white"
                    }`}
                  >
                    <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-nv-ice lg:h-16 lg:w-16 lg:rounded-xl">
                      <Image
                        src={coach.photo}
                        alt=""
                        fill
                        className={coach.photoFit === "contain" ? "object-contain p-0.5 lg:p-1" : "object-cover"}
                        style={{ objectPosition: coach.photoPosition }}
                        sizes="(max-width: 1023px) 44px, 64px"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-sm font-bold leading-snug tracking-wide text-nv-navy lg:text-lg">
                        {coach.name}
                      </span>
                      <span className="mt-0.5 block text-[10px] font-bold uppercase leading-tight tracking-wide text-nv-blue lg:text-xs">
                        {coach.specialty}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
            <FilterGroup label="Lesson type">
              {LESSON_TYPES.map((type) => (
                <Chip
                  key={type.id}
                  active={lesson.service === type.id}
                  onClick={() => selectService(type.id)}
                  label={type.label}
                />
              ))}
            </FilterGroup>
            <FilterGroup label="Duration">
              {lesson.lesson.durations.map((item) => (
                <Chip
                  key={item}
                  active={lesson.duration === item}
                  onClick={() => {
                    clearSchedule();
                    setParams({ duration: String(item) });
                  }}
                  label={durationLabel(item)}
                />
              ))}
            </FilterGroup>
          </div>
        </div>
      ) : null}

      {category === "camps" ? (
        <div className="mt-4 grid gap-3 md:grid-cols-3 lg:mt-6">
          {PROGRAMS_FOR_BOOKING.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                clearSchedule();
                setParams({ category: "camps", program: item.id });
              }}
              className={`rounded-2xl border p-4 text-left ${
                program.id === item.id ? "border-nv-blue bg-white ring-2 ring-nv-blue/20" : "border-nv-navy/10 bg-white"
              }`}
            >
              <p className="font-display text-2xl font-bold tracking-wide text-nv-navy">{item.name}</p>
              <p className="mt-1 text-sm text-zinc-600">{item.summary}</p>
              <p className="mt-2 text-sm font-semibold text-nv-blue">{item.price}</p>
            </button>
          ))}
        </div>
      ) : null}

      {category === "rentals" ? (
        <div className="mt-4 space-y-3 lg:mt-6 lg:space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            {RENTALS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  clearSchedule();
                  setParams({ category: "rentals", rental: item.id, duration: String(item.durations[0]) });
                }}
                className={`rounded-2xl border p-4 text-left ${
                  rental.id === item.id ? "border-nv-blue bg-white ring-2 ring-nv-blue/20" : "border-nv-navy/10 bg-white"
                }`}
              >
                <p className="font-display text-2xl font-bold tracking-wide text-nv-navy">{item.name}</p>
                <p className="mt-1 text-sm text-zinc-600">{item.summary}</p>
              </button>
            ))}
          </div>
          <FilterGroup label="Duration">
            {rental.durations.map((item) => (
              <Chip
                key={item}
                active={duration === item}
                onClick={() => {
                  clearSchedule();
                  setParams({ duration: String(item) });
                }}
                label={durationLabel(item)}
              />
            ))}
          </FilterGroup>
        </div>
      ) : null}

      <div className="mt-4 grid min-w-0 gap-4 lg:mt-8 lg:gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="min-w-0 space-y-3 lg:space-y-4">
          <div className="min-w-0 lg:hidden">
            <DateStrip
              weekStart={weekISO}
              selected={selectedDate}
              available={availableDates}
              onSelect={(iso) => {
                setDate(iso);
                setTime(category === "camps" ? "19:00" : null);
              }}
              onWeekChange={(iso) => setWeekISO(startOfWeek(iso))}
            />
          </div>
          <div className="hidden lg:block">
            <CalendarMonth
              monthISO={monthISO}
              selected={selectedDate}
              available={availableDates}
              onSelect={(iso) => {
                setDate(iso);
                setTime(category === "camps" ? "19:00" : null);
              }}
              onMonthChange={(iso) => setMonthISO(startOfMonth(iso))}
              onClear={() => {
                setDate(null);
                setTime(null);
              }}
            />
          </div>
        </div>

        <aside className="rounded-2xl border border-nv-navy/10 bg-white p-4 shadow-sm lg:sticky lg:top-24 lg:p-5">
          {category === "lessons" ? (
            <div className="flex gap-2.5 border-b border-zinc-100 pb-3 lg:gap-3 lg:pb-4">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-nv-ice lg:h-16 lg:w-16 lg:rounded-xl">
                <Image
                  src={lesson.coach.photo}
                  alt=""
                  fill
                  className={lesson.coach.photoFit === "contain" ? "object-contain p-0.5 lg:p-1" : "object-cover"}
                  style={{ objectPosition: lesson.coach.photoPosition }}
                  sizes="(max-width: 1023px) 48px, 64px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wide text-nv-blue lg:text-xs">Selected coach</p>
                <p className="font-display text-xl font-bold leading-tight tracking-wide text-nv-navy lg:text-2xl">
                  {lesson.coach.name}
                </p>
                <p className="text-sm text-zinc-600">{lesson.coach.specialty}</p>
                <button
                  type="button"
                  className="mt-1 text-left text-xs font-semibold text-nv-blue lg:hidden"
                  aria-expanded={coachBioOpen}
                  onClick={() => setCoachBioOpen((open) => !open)}
                >
                  {coachBioOpen ? "Hide coach details" : "About this coach"}
                </button>
              </div>
            </div>
          ) : (
            <div className="border-b border-zinc-100 pb-3 lg:pb-4">
              <p className="text-xs font-bold uppercase tracking-wide text-nv-blue">
                {category === "camps" ? "Selected program" : "Selected rental"}
              </p>
              <p className="font-display text-xl font-bold tracking-wide text-nv-navy lg:text-2xl">
                {category === "camps" ? program.name : rental.name}
              </p>
            </div>
          )}

          {category === "lessons" ? (
            <>
              {coachBioOpen ? (
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 lg:hidden">{lesson.coach.shortBio}</p>
              ) : null}
              <div className="mt-3 hidden lg:block">
                <p className="text-sm leading-relaxed text-zinc-600">{lesson.coach.shortBio}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {lesson.coach.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-nv-ice px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-nv-navy"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-3 text-xs font-bold uppercase tracking-wide text-nv-blue"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Change coach
                </button>
              </div>
            </>
          ) : null}

          <div className="mt-3 lg:mt-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
              {formatLongDate(selectedDate)}
            </p>
            <div className="mt-2 lg:mt-3">
              {category === "camps" ? (
                times.length ? (
                  <button
                    type="button"
                    className="min-h-12 w-full rounded-lg bg-nv-blue text-sm font-bold uppercase tracking-wide text-white"
                    onClick={() => setTime("19:00")}
                  >
                    {program.timeLabel}
                  </button>
                ) : (
                  <p className="text-sm text-zinc-600">No openings on this date. Try another day.</p>
                )
              ) : (
                <TimeGrid times={times} selected={time} onSelect={setTime} />
              )}
            </div>
          </div>

          <div className="mt-3 border-t border-zinc-100 pt-3 text-sm lg:mt-5 lg:pt-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">Lesson summary</p>
            <dl className="mt-2 space-y-1.5 lg:mt-3 lg:space-y-2">
              {category === "lessons" ? <Row label="Coach" value={lesson.coach.name} /> : null}
              <Row
                label={category === "rentals" ? "Rental" : "Type"}
                value={category === "lessons" ? lesson.lesson.label : category === "camps" ? program.name : rental.name}
              />
              <Row label="Date" value={formatLongDate(selectedDate)} />
              <Row label="Time" value={timeLabel ?? "Choose a time"} />
              {category !== "camps" ? (
                <Row label="Duration" value={durationLabel(category === "lessons" ? lesson.duration : duration)} />
              ) : null}
              <Row label="Location" value={FACILITY_LOCATION} />
              {price ? <Row label="Price" value={price} /> : null}
            </dl>
          </div>

          <button
            type="button"
            disabled={!summaryReady}
            onClick={continueToDetails}
            className={`${btnPrimary} mt-4 w-full disabled:cursor-not-allowed disabled:opacity-40 lg:mt-6`}
          >
            {category === "camps" ? "Continue to register →" : "Continue to book lesson →"}
          </button>
        </aside>
      </div>
    </div>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-9 rounded-full px-3 text-sm font-semibold lg:min-h-10 lg:px-4 ${
        active ? "bg-nv-blue text-white" : "bg-white text-nv-navy ring-1 ring-nv-navy/10"
      }`}
    >
      {label}
    </button>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">{label}</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5 lg:mt-2 lg:gap-2">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="font-semibold text-nv-navy">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded-lg border border-nv-navy/15 px-3 py-2"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-zinc-500">{label}</dt>
      <dd className="text-right font-semibold text-nv-navy">{value}</dd>
    </div>
  );
}

function SummaryBlock({
  category,
  coachName,
  serviceLabel,
  date,
  timeLabel,
  duration,
  price,
}: {
  category: BookingCategory;
  coachName: string;
  serviceLabel: string;
  date: string;
  timeLabel: string | null;
  duration: string;
  price?: string;
}) {
  return (
    <div className="mt-4 rounded-2xl bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-nv-blue">Selected booking</p>
      <dl className="mt-3 space-y-2 text-sm">
        {category === "lessons" ? <Row label="Coach" value={coachName} /> : null}
        <Row label="Type" value={serviceLabel} />
        <Row label="Date" value={formatLongDate(date)} />
        <Row label="Time" value={timeLabel ?? "—"} />
        <Row label="Duration" value={duration} />
        <Row label="Location" value={FACILITY_LOCATION} />
        {price ? <Row label="Price" value={price} /> : null}
      </dl>
    </div>
  );
}
