import Link from "next/link";
import { bookingUrl } from "@/config/booking";

const actions = [
  { label: "Book a Lesson", href: "/lessons", detail: "Hitting, pitching, fielding, catching" },
  { label: "Camps & Clinics", href: "/camps", detail: "Current dates, ages, and prices" },
  { label: "Memberships", href: "/memberships", detail: "Big League membership" },
  { label: "Programs", href: "/programs", detail: "Development, tee ball, NV Stars" },
] as const;

export default function QuickActions() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="rounded-xl border border-nv-navy/10 bg-white p-4 shadow-sm transition hover:border-nv-blue"
          >
            <p className="font-display text-xl font-bold tracking-wide text-nv-navy">{action.label}</p>
            <p className="mt-1 text-sm text-zinc-600">{action.detail}</p>
          </Link>
        ))}
        <a
          href={bookingUrl("login")}
          className="rounded-xl border border-nv-navy bg-nv-navy p-4 text-white shadow-sm"
        >
          <p className="font-display text-xl font-bold tracking-wide">Sign In</p>
          <p className="mt-1 text-sm text-nv-silver">Open your academy account</p>
        </a>
      </div>
    </section>
  );
}
