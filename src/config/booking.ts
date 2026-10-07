/**
 * EZFacility is the booking backend for this phase.
 * Pages should call `bookingUrl()` instead of embedding provider links.
 * Replacing the provider later means updating this file, not the page layout.
 */
export const booking = {
  provider: "ezfacility" as const,
  loginUrl: "https://12331.ezfacility.com/login",
  registrationUrl: "https://12331.ezfacility.com/Sessions",
  privateLessonsUrl: "https://12331.ezfacility.com/Sessions",
  lessonPackagesUrl: "https://12331.ezfacility.com/Package",
  /**
   * The current academy site sends "Purchase A Membership Here" to account login.
   */
  membershipsUrl: "https://12331.ezfacility.com/login",
  destinations: {
    login: "https://12331.ezfacility.com/login",
    sessions: "https://12331.ezfacility.com/Sessions",
    packages: "https://12331.ezfacility.com/Package",
    memberships: "https://12331.ezfacility.com/login",
    noochieHitting: "https://12331.ezfacility.com/Sessions",
    /** Jordan Fox's published lesson image links to account login. */
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
