import type { Offering } from "@/content/site";

const MONTH_INDEX: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

/** Parse the start of an offering `dates` string for homepage sort order. */
export function campStartTimestamp(dates?: string): number {
  if (!dates) return Number.POSITIVE_INFINITY;

  const withYear = dates.match(
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b\s+(\d{1,2}),?\s+(\d{4})/i,
  );
  if (withYear) {
    const month = MONTH_INDEX[withYear[1].toLowerCase()];
    if (month !== undefined) {
      return Date.UTC(parseInt(withYear[3], 10), month, parseInt(withYear[2], 10));
    }
  }

  const noYear = dates.match(
    /^\s*\b(January|February|March|April|May|June|July|August|September|October|November|December)\b\s+(\d{1,2})\s*[–-]/i,
  );
  if (noYear) {
    const month = MONTH_INDEX[noYear[1].toLowerCase()];
    if (month !== undefined) {
      const day = parseInt(noYear[2], 10);
      let year = new Date().getFullYear();
      let ts = Date.UTC(year, month, day);
      const sixtyDaysMs = 60 * 24 * 60 * 60 * 1000;
      if (ts < Date.now() - sixtyDaysMs) {
        year += 1;
        ts = Date.UTC(year, month, day);
      }
      return ts;
    }
  }

  return Number.POSITIVE_INFINITY;
}

export function sortCampsByStartDate(camps: Offering[]): Offering[] {
  return [...camps].sort((a, b) => campStartTimestamp(a.dates) - campStartTimestamp(b.dates));
}
