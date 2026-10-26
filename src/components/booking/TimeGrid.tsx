import { formatTime } from "@/lib/booking";

export default function TimeGrid({
  times,
  selected,
  onSelect,
}: {
  times: string[];
  selected: string | null;
  onSelect: (time: string) => void;
}) {
  if (times.length === 0) {
    return (
      <p className="rounded-xl bg-nv-ice px-4 py-5 text-sm text-zinc-600">
        No openings on this date. Try another day.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {times.map((time) => {
        const active = selected === time;
        return (
          <button
            key={time}
            type="button"
            onClick={() => onSelect(time)}
            className={`min-h-12 rounded-lg border text-sm font-semibold transition ${
              active
                ? "border-nv-blue bg-nv-blue text-white"
                : "border-nv-navy/10 bg-white text-nv-navy hover:border-nv-blue"
            }`}
          >
            {formatTime(time)}
          </button>
        );
      })}
    </div>
  );
}
