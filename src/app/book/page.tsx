import Link from "next/link";
import BookingLink from "@/components/BookingLink";
import PageIntro from "@/components/PageIntro";
import { bookingUrl, type BookingKey } from "@/config/booking";
import { createPageMetadata } from "@/lib/seo";
import { btnPrimary } from "@/lib/styles";

export const metadata = createPageMetadata({
  title: "Book Now",
  description:
    "Choose a lesson, camp, program, membership, or facility service at Noochie Varner Baseball Academy before you continue to registration.",
  path: "/book",
});

const groups: {
  title: string;
  items: { label: string; detail: string; destination?: BookingKey; href?: string }[];
}[] = [
  {
    title: "Private lessons",
    items: [
      { label: "Hitting with Noochie Varner", detail: "Book a hitting session", destination: "noochieHitting" },
      { label: "Pitching with Jordan Fox", detail: "Book pitching instruction", destination: "jordanFox" },
      { label: "Fielding with Corey Alsop", detail: "Book fielding instruction", destination: "coreyAlsop" },
      { label: "Catching", detail: "Book a catching lesson", destination: "catching" },
      { label: "Lesson packages", detail: "6, 12, or 25 session packages", destination: "packages" },
    ],
  },
  {
    title: "Camps & clinics",
    items: [
      { label: "Bat Speed Clinic", detail: "Nov 3 – Dec 22, 2026", destination: "batSpeed" },
      { label: "Rookie Development Program", detail: "Dec 2, 2026 – Feb 24, 2027", destination: "rookie" },
      { label: "Winter Tee Ball League", detail: "Ages 4–6", destination: "teeBall" },
    ],
  },
  {
    title: "Programs & memberships",
    items: [
      { label: "NV Stars", detail: "2026–2027 teams", href: "/programs/nv-stars" },
      { label: "Big League Membership", detail: "Join or purchase", destination: "memberships" },
    ],
  },
  {
    title: "Facility",
    items: [
      {
        label: "Cages, field, and parties",
        detail: "Reserve by phone. Rates are on the services page.",
        href: "/services",
      },
    ],
  },
];

export default function BookPage() {
  return (
    <>
      <PageIntro eyebrow="Registration" title="Book Now">
        <p>
          Pick what you want here. You only leave this site when it is time to finish booking or payment in the
          academy account system.
        </p>
      </PageIntro>
      <section className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6">
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="font-display text-3xl font-bold tracking-wide text-nv-navy">{group.title}</h2>
            <ul className="mt-3 divide-y divide-nv-navy/10 overflow-hidden rounded-2xl border border-nv-navy/10 bg-white">
              {group.items.map((item) => (
                <li key={item.label} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-nv-navy">{item.label}</p>
                    <p className="text-sm text-zinc-600">{item.detail}</p>
                  </div>
                  {item.destination ? (
                    <BookingLink destination={item.destination} className={btnPrimary}>
                      Continue
                    </BookingLink>
                  ) : (
                    <Link href={item.href ?? "/contact"} className={btnPrimary}>
                      View
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="text-sm text-zinc-600">
          Already have an account?{" "}
          <a className="font-semibold text-nv-blue" href={bookingUrl("login")}>
            Sign In
          </a>
        </p>
      </section>
    </>
  );
}
