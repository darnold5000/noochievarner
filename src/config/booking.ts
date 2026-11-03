/**
 * Live booking stays on EZFacility while the in-site scheduler is parked.
 * Flip `useInternalBooking` to true to restore /book (calendar, times, demo checkout).
 * Do not delete that flow; it is only unlinked and redirected while this is false.
 */
export const useInternalBooking = false;

const ezSessions = "https://12331.ezfacility.com/Sessions";
const ezLogin = "https://12331.ezfacility.com/login";
export const sportsEngineSignInUrl = "https://user.sportngin.com/users/sign_in";

export const booking = {
  provider: "ezfacility" as const,
  loginUrl: sportsEngineSignInUrl,
  registrationUrl: ezSessions,
  privateLessonsUrl: useInternalBooking ? "/book" : ezSessions,
  lessonPackagesUrl: "https://12331.ezfacility.com/Package",
  membershipsUrl: ezLogin,
  destinations: {
    login: sportsEngineSignInUrl,
    sessions: "https://12331.ezfacility.com/Sessions",
    packages: "https://12331.ezfacility.com/Package",
    memberships: ezLogin,
    noochieHitting: "https://12331.ezfacility.com/Sessions",
    jordanFox: ezLogin,
    coreyAlsop: "https://12331.ezfacility.com/Sessions",
    catching: "https://12331.ezfacility.com/Sessions",
    rookie:
      "https://tms.ezfacility.com/OnlineRegistrations/Register.aspx?CompanyID=5559&GroupID=4112505",
    teeBall:
      "https://tms.ezfacility.com/OnlineRegistrations/Register.aspx?CompanyID=5559&GroupID=4115723",
    batSpeed:
      "https://tms.ezfacility.com/OnlineRegistrations/Register.aspx?CompanyID=5559&GroupID=4111214",
    pitchingClinic:
      "https://tms.ezfacility.com/OnlineRegistrations/Register.aspx?CompanyID=5559&GroupID=3990935",
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
