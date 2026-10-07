"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bookingUrl } from "@/config/booking";

const items = [
  { label: "Book", href: "/book" },
  { label: "Programs", href: "/programs" },
  { label: "Lessons", href: "/lessons" },
  { label: "Members", href: "/memberships" },
] as const;

export default function MobileDock() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-nv-navy/95 backdrop-blur md:hidden"
      aria-label="Quick actions"
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex min-h-16 items-center justify-center px-1 text-center text-[11px] font-bold uppercase tracking-wide ${
                  active ? "text-white" : "text-nv-silver"
                }`}
              >
                {item.label}
              </Link>
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
