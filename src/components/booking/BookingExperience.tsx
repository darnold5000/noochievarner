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

  const times = useMemo(() => {
    if (!date) return [];
    if (category === "lessons") return lessonStartTimes(lesson.coach.id, lesson.duration, date, today);
    if (category === "camps") return program.dates.includes(date) && date >= today ? ["19:00"] : [];
    return rentalStartTimes(rental.id, duration, date, today);
  }, [category, date, duration, lesson.coach.id, lesson.duration, program.dates, rental.id, today]);

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
    category === "camps" && date ? program.timeLabel : time ? formatTime(time) : null;

  const summaryReady = Boolean(date && (category === "camps" || time));

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
            {date ? (
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">When</dt>
                <dd>
                  {formatLongDate(date)}
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
      <section className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
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
          date={date}
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <p className="rounded-xl bg-nv-navy px-4 py-3 text-sm text-nv-silver">{DEMO_AVAILABILITY_NOTICE}</p>

      <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {(
          [
            ["lessons", "Private Lessons"],
            ["camps", "Camps & Clinics"],
            ["rentals", "Rentals"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => selectCategory(id)}
            className={`min-h-12 rounded-xl border text-sm font-bold uppercase tracking-wide ${
              category === id ? "border-nv-blue bg-nv-blue text-white" : "border-nv-navy/10 bg-white text-nv-navy"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {category === "lessons" ? (
        <div className="mt-6 space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">Coach</p>
            <div className="mt-2 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {COACHES.map((coach) => {
                const active = lesson.coach.id === coach.id;
                return (
                  <button
                    key={coach.id}
                    type="button"
                    onClick={() => selectCoach(coach.id)}
                    className={`overflow-hidden rounded-2xl border text-left ${
                      active ? "border-nv-blue ring-2 ring-nv-blue/30" : "border-nv-navy/10 bg-white"
                    }`}
                  >
                    <span className="relative block h-28 overflow-hidden bg-nv-ice">
                      <Image
                        src={coach.photo}
                        alt=""
                        fill
                        className="object-cover"
                        style={{ objectPosition: coach.photoPosition }}
                        sizes="160px"
                      />
                    </span>
                    <span className="block p-3">
                      <span className="block font-display text-lg font-bold tracking-wide text-nv-navy">{coach.name}</span>
                      <span className="block text-xs font-bold uppercase tracking-wide text-nv-blue">{coach.specialty}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row">
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
        <div className="mt-6 grid gap-3 md:grid-cols-3">
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
        <div className="mt-6 space-y-4">
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

      <div className="mt-8 grid min-w-0 gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="min-w-0 space-y-4">
          <div className="min-w-0 lg:hidden">
            <DateStrip
              weekStart={weekISO}
              selected={date}
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
              selected={date}
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

        <aside className="rounded-2xl border border-nv-navy/10 bg-white p-5 shadow-sm lg:sticky lg:top-24">
          {category === "lessons" ? (
            <div className="flex gap-3 border-b border-zinc-100 pb-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-nv-ice">
                <Image
                  src={lesson.coach.photo}
                  alt=""
                  fill
                  className="object-cover"
                  style={{ objectPosition: lesson.coach.photoPosition }}
                  sizes="64px"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-nv-blue">Selected coach</p>
                <p className="font-display text-2xl font-bold tracking-wide text-nv-navy">{lesson.coach.name}</p>
                <p className="text-sm text-zinc-600">{lesson.coach.specialty}</p>
              </div>
            </div>
          ) : (
            <div className="border-b border-zinc-100 pb-4">
              <p className="text-xs font-bold uppercase tracking-wide text-nv-blue">
                {category === "camps" ? "Selected program" : "Selected rental"}
              </p>
              <p className="font-display text-2xl font-bold tracking-wide text-nv-navy">
                {category === "camps" ? program.name : rental.name}
              </p>
            </div>
          )}

          {category === "lessons" ? (
            <>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{lesson.coach.shortBio}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {lesson.coach.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-nv-ice px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-nv-navy">
                    {tag}
                  </span>
                ))}
              </div>
              <button type="button" className="mt-3 text-xs font-bold uppercase tracking-wide text-nv-blue" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Change coach
              </button>
            </>
          ) : null}

          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
              {date ? formatLongDate(date) : "Available times"}
            </p>
            <div className="mt-3">
              {date ? (
                category === "camps" ? (
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
                )
              ) : (
                <p className="text-sm text-zinc-600">Select a date to see sample times.</p>
              )}
            </div>
          </div>

          <div className="mt-5 border-t border-zinc-100 pt-4 text-sm">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">Lesson summary</p>
            <dl className="mt-3 space-y-2">
              {category === "lessons" ? <Row label="Coach" value={lesson.coach.name} /> : null}
              <Row
                label={category === "rentals" ? "Rental" : "Type"}
                value={category === "lessons" ? lesson.lesson.label : category === "camps" ? program.name : rental.name}
              />
              <Row label="Date" value={date ? formatLongDate(date) : "Choose a date"} />
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
            className={`${btnPrimary} mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40`}
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
      className={`min-h-10 rounded-full px-4 text-sm font-semibold ${
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
      <div className="mt-2 flex flex-wrap gap-2">{children}</div>
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
  date: string | null;
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
        <Row label="Date" value={date ? formatLongDate(date) : "—"} />
        <Row label="Time" value={timeLabel ?? "—"} />
        <Row label="Duration" value={duration} />
        <Row label="Location" value={FACILITY_LOCATION} />
        {price ? <Row label="Price" value={price} /> : null}
      </dl>
    </div>
  );
}
