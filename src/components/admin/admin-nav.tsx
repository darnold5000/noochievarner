"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { websiteContentNav } from "@/lib/nvba-admin-sections";

export function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-nv-navy/10 bg-nv-navy text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between sm:px-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-nv-silver">NVBA Owner Portal</p>
          <Link href="/" className="mt-1 inline-block text-sm text-white/90 hover:text-white">
            ← Back to website
          </Link>
        </div>
        <nav className="flex w-full flex-wrap gap-x-3 gap-y-2 text-sm lg:w-auto lg:justify-end">
          <Link
            href="/admin"
            aria-current={pathname === "/admin" ? "page" : undefined}
            className={pathname === "/admin" ? "font-semibold text-white underline" : "text-nv-silver hover:text-white"}
          >
            Dashboard
          </Link>
          {websiteContentNav.map(([href, label]) => (
            <Link
              key={href}
              href={`/admin/${href}`}
              aria-current={pathname === `/admin/${href}` ? "page" : undefined}
              className={
                pathname === `/admin/${href}` ? "font-semibold text-white underline" : "text-nv-silver hover:text-white"
              }
            >
              {label}
            </Link>
          ))}
          <form action="/api/auth/signout" method="post">
            <button type="submit" className="text-nv-silver hover:text-white">
              Sign out
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
