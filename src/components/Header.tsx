"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { bookingUrl } from "@/config/booking";
import { MORE_LINKS, NAV, SITE } from "@/content/site";
import { btnOnDark } from "@/lib/styles";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MainNavLink({
  href,
  label,
  onClick,
  suppressActive,
}: {
  href: string;
  label: string;
  onClick?: () => void;
  suppressActive?: boolean;
}) {
  const pathname = usePathname();
  const active = !suppressActive && isActivePath(pathname, href);
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold tracking-wide ${
        active ? "bg-white/10 text-white" : "text-nv-silver hover:bg-white/5 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

function MoreMenuLink({ href, label, onNavigate }: { href: string; label: string; onNavigate: () => void }) {
  const pathname = usePathname();
  const active = isActivePath(pathname, href);
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`block rounded-md px-3 py-2.5 text-sm font-semibold tracking-wide ${
        active ? "bg-white/10 text-white" : "text-nv-silver hover:bg-white/5 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const moreSectionActive = MORE_LINKS.some((item) => isActivePath(pathname, item.href));

  const close = () => {
    setOpen(false);
    setMoreOpen(false);
  };

  useEffect(() => {
    if (!moreOpen) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (moreRef.current?.contains(target)) return;
      setMoreOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMoreOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-nv-navy text-white">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={close}>
          <Image
            src="/images/brand/mark.jpg"
            alt="Noochie Varner Baseball Academy"
            width={64}
            height={48}
            className="h-11 w-auto rounded-sm bg-white object-contain"
            priority
          />
          <span className="hidden min-w-0 leading-none sm:block">
            <span className="block font-display text-lg font-bold tracking-wide">NOOCHIE VARNER</span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-nv-silver">
              Baseball Academy
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-0.5 xl:flex">
          {NAV.map((item) => (
            <MainNavLink
              key={item.href}
              href={item.href}
              label={item.label}
              suppressActive={moreOpen}
              onClick={() => setMoreOpen(false)}
            />
          ))}
          <div ref={moreRef} className="relative">
            <button
              type="button"
              className={`rounded-md px-3 py-2 text-sm font-semibold tracking-wide ${
                moreOpen || moreSectionActive
                  ? "bg-white/10 text-white"
                  : "text-nv-silver hover:bg-white/5 hover:text-white"
              }`}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              onClick={() => setMoreOpen((value) => !value)}
            >
              More
            </button>
            {moreOpen ? (
              <div
                role="menu"
                className="absolute right-0 top-full z-50 mt-2 min-w-[11rem] rounded-lg border border-white/10 bg-nv-navy p-1.5 shadow-xl"
              >
                {MORE_LINKS.map((item) => (
                  <MoreMenuLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    onNavigate={() => setMoreOpen(false)}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-4">
          <a
            href={bookingUrl("login")}
            className="hidden text-sm font-bold uppercase tracking-wide text-nv-silver hover:text-white xl:inline"
          >
            Sign In
          </a>
          <Link href="/book" className={`${btnOnDark} px-4 py-2.5`}>
            Book Now
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-white/10 xl:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => {
              setMoreOpen(false);
              setOpen((value) => !value);
            }}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-white/10 bg-nv-navy px-4 py-4 xl:hidden">
          <div className="grid gap-1">
            {NAV.map((item) => (
              <MainNavLink key={item.href} href={item.href} label={item.label} onClick={close} />
            ))}
          </div>
          <p className="mt-4 px-3 text-xs font-bold uppercase tracking-[0.16em] text-nv-silver">More</p>
          <div className="mt-1 grid gap-1">
            {MORE_LINKS.map((item) => (
              <MainNavLink key={item.href} href={item.href} label={item.label} onClick={close} />
            ))}
          </div>
          <div className="mt-4 grid gap-2">
            <Link href="/book" onClick={close} className={btnOnDark}>
              Book Now
            </Link>
            <a
              href={bookingUrl("login")}
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/20 text-sm font-bold uppercase tracking-wide"
            >
              Sign In
            </a>
          </div>
          <p className="mt-4 px-1 text-xs text-nv-silver">{SITE.address.full}</p>
        </nav>
      ) : null}
    </header>
  );
}
