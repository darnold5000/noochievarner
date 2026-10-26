/**
 * EZFacility remains the live account/membership backend during this phase.
 * Private lesson booking now uses the internal /book experience.
 * Keep these destinations for a future transition, login, memberships, and packages.
 */
export const booking = {
  provider: "ezfacility" as const,
  loginUrl: "https://12331.ezfacility.com/login",
  registrationUrl: "https://12331.ezfacility.com/Sessions",
  privateLessonsUrl: "/book",
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
