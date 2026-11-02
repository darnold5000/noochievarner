"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bookTrainingHref, bookingUrl } from "@/config/booking";

const items = [
  { label: "Book", href: bookTrainingHref(), external: bookTrainingHref().startsWith("http") },
  { label: "Programs", href: "/programs", external: false },
  { label: "Lessons", href: "/lessons", external: false },
  { label: "Members", href: "/memberships", external: false },
];

export default function MobileDock() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-nv-navy/95 backdrop-blur md:hidden"
      aria-label="Quick actions"
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const active = !item.external && (pathname === item.href || pathname.startsWith(`${item.href}/`));
          const className = `flex min-h-16 items-center justify-center px-1 text-center text-[11px] font-bold uppercase tracking-wide ${
            active ? "text-white" : "text-nv-silver"
          }`;
          return (
            <li key={item.label}>
              {item.external ? (
                <a href={item.href} className={className}>
                  {item.label}
                </a>
              ) : (
                <Link href={item.href} className={className}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
        <li>
          <a
            href={bookingUrl("login")}
            className="flex min-h-16 items-center justify-center px-1 text-center text-[11px] font-bold uppercase tracking-wide text-nv-silver"
          >
            Account
          </a>
        </li>
      </ul>
    </nav>
  );
}
