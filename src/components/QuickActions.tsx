import SiteLink from "@/components/SiteLink";
import { bookTrainingHref, bookingUrl } from "@/config/booking";

const actions = [
  { label: "Book a Lesson", href: bookTrainingHref(), detail: "Hitting, pitching, fielding, catching" },
  { label: "Camps & Clinics", href: "/camps", detail: "Programs, ages, and dates" },
  { label: "Memberships", href: "/memberships", detail: "Big League membership" },
  { label: "Sign In", href: bookingUrl("login"), detail: "Academy account" },
];

const cardClass =
  "flex h-full min-h-[5.5rem] flex-col justify-center rounded-xl border border-nv-navy/8 bg-white/90 px-4 py-3.5 transition hover:border-nv-blue/35 hover:bg-white hover:shadow-sm";

export default function QuickActions() {
  return (
    <section className="border-b border-nv-navy/5 bg-nv-ice/80">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-7">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
          {actions.map((action) =>
            action.label === "Sign In" ? (
              <a key={action.label} href={action.href} className={cardClass}>
                <p className="font-display text-base font-bold tracking-wide text-nv-navy sm:text-lg">{action.label}</p>
                <p className="mt-0.5 line-clamp-2 text-xs text-zinc-500 sm:text-sm">{action.detail}</p>
              </a>
            ) : (
              <SiteLink key={action.label} href={action.href} className={cardClass}>
                <p className="font-display text-base font-bold tracking-wide text-nv-navy sm:text-lg">{action.label}</p>
                <p className="mt-0.5 line-clamp-2 text-xs text-zinc-500 sm:text-sm">{action.detail}</p>
              </SiteLink>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
