import {
  addMonths,
  dayNumber,
  isPastDate,
  isSameMonth,
  monthGrid,
  monthLabel,
  startOfMonth,
  todayISO,
  weekdayLabel,
} from "@/lib/booking";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarMonth({
  monthISO,
  selected,
  available,
  onSelect,
  onMonthChange,
  onClear,
}: {
  monthISO: string;
  selected: string | null;
  available: Set<string>;
  onSelect: (iso: string) => void;
  onMonthChange: (iso: string) => void;
  onClear: () => void;
}) {
  const today = todayISO();
  const days = monthGrid(monthISO);
  const monthStart = startOfMonth(monthISO);

  return (
    <div className="rounded-2xl border border-nv-navy/10 bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-2xl font-bold tracking-wide text-nv-navy">{monthLabel(monthStart)}</h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-md border border-nv-navy/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide"
            onClick={() => onMonthChange(addMonths(monthStart, -1))}
          >
            Prev
          </button>
          <button
            type="button"
            className="rounded-md border border-nv-navy/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide"
            onClick={() => onMonthChange(today)}
          >
            Today
          </button>
          <button
            type="button"
            className="rounded-md border border-nv-navy/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide"
            onClick={() => onMonthChange(addMonths(monthStart, 1))}
          >
            Next
          </button>
          <button
            type="button"
            className="rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-zinc-500"
            onClick={onClear}
          >
            Clear date
          </button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase tracking-wide text-zinc-500">
        {WEEKDAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {days.map((iso) => {
          const inMonth = isSameMonth(iso, monthStart);
          const past = isPastDate(iso);
          const open = available.has(iso);
          const active = selected === iso;
          const isToday = iso === today;
          return (
            <button
              key={iso}
              type="button"
              disabled={past || !open}
              onClick={() => onSelect(iso)}
              className={`flex min-h-12 flex-col items-center justify-center rounded-lg text-sm font-semibold ${
                active
                  ? "bg-nv-blue text-white"
                  : !inMonth
                    ? "text-zinc-300"
                    : past || !open
                      ? "text-zinc-400"
                      : isToday
                        ? "bg-nv-ice text-nv-navy"
                        : "text-nv-navy hover:bg-nv-ice"
              }`}
              aria-label={iso}
            >
              {dayNumber(iso)}
              {open && !past ? (
                <span className={`mt-0.5 h-1 w-1 rounded-full ${active ? "bg-white" : "bg-nv-blue"}`} />
              ) : null}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-zinc-500">
        {weekdayLabel(today, "long")} {dayNumber(today)} is today. Dots mark days with sample openings.
      </p>
    </div>
  );
}
