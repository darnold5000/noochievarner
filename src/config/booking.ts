/**
 * Live booking stays on EZFacility while the in-site scheduler is parked.
 * Flip `useInternalBooking` to true to restore /book (calendar, times, demo checkout).
 * Do not delete that flow; it is only unlinked and redirected while this is false.
 */
export const useInternalBooking = false;

const ezSessions = "https://12331.ezfacility.com/Sessions";

export const booking = {
  provider: "ezfacility" as const,
  loginUrl: "https://12331.ezfacility.com/login",
  registrationUrl: ezSessions,
  privateLessonsUrl: useInternalBooking ? "/book" : ezSessions,
  lessonPackagesUrl: "https://12331.ezfacility.com/Package",
  membershipsUrl: "https://12331.ezfacility.com/login",
  destinations: {
    login: "https://12331.ezfacility.com/login",
    sessions: "https://12331.ezfacility.com/Sessions",
    packages: "https://12331.ezfacility.com/Package",
    memberships: "https://12331.ezfacility.com/login",
    noochieHitting: "https://12331.ezfacility.com/Sessions",
    jordanFox: "https://12331.ezfacility.com/login",
    coreyAlsop: "https://12331.ezfacility.com/Sessions",
    catching: "https://12331.ezfacility.com/Sessions",
    rookie:
      "https://tms.ezfacility.com/OnlineRegistrations/Register.aspx?CompanyID=5559&GroupID=4112505",
    teeBall:
      "https://tms.ezfacility.com/OnlineRegistrations/Register.aspx?CompanyID=5559&GroupID=4115723",
    batSpeed:
      "https://tms.ezfacility.com/OnlineRegistrations/Register.aspx?CompanyID=5559&GroupID=4111214",
  },
} as const;

export type BookingKey = keyof typeof booking.destinations;

export function bookingUrl(key: BookingKey): string {
  return booking.destinations[key];
}

/** Header, footer, and dock “Book” actions. */
export function bookTrainingHref() {
  return useInternalBooking ? "/book" : booking.registrationUrl;
}
