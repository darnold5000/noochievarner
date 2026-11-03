"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { websiteContentNav } from "@/lib/nvba-admin-sections";

const navLinks = [
  { href: "/admin", label: "Dashboard" },
  ...websiteContentNav
    .filter(([slug]) => slug !== "settings")
    .map(([slug, label]) => ({
      href: `/admin/${slug}`,
      label: label.replace("Lessons — ", "").replace("NVBA ", ""),
    })),
] as const;

function navLinkClass(active: boolean) {
  return active
    ? "shrink-0 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold text-white"
    : "shrink-0 rounded-full px-3 py-1.5 text-sm text-nv-silver transition hover:bg-white/10 hover:text-white";
}

export function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-nv-navy/20 bg-nv-navy text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <Image
              src="/images/brand/icon.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-md bg-white/10 object-contain p-0.5"
            />
            <span className="hidden font-display text-sm font-bold tracking-wide text-white sm:inline">NVBA</span>
          </Link>
          <span className="hidden h-5 w-px bg-white/20 sm:block" aria-hidden />
          <Link href="/" className="truncate text-sm text-nv-silver hover:text-white">
            Back to website
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/admin/settings"
            className={
              pathname === "/admin/settings"
                ? "rounded-lg bg-white/15 px-3 py-2 text-sm font-semibold text-white"
                : "rounded-lg px-3 py-2 text-sm text-nv-silver hover:bg-white/10 hover:text-white"
            }
          >
            Site settings
          </Link>
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="rounded-lg border border-white/25 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      <nav
        className="mx-auto max-w-7xl overflow-x-auto px-4 pb-3 sm:px-6 [scrollbar-width:thin]"
        aria-label="Website content sections"
      >
        <div className="flex w-max min-w-full gap-1">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href || (href !== "/admin" && pathname.startsWith(`${href}/`));
            return (
              <Link key={href} href={href} aria-current={active ? "page" : undefined} className={navLinkClass(active)}>
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
