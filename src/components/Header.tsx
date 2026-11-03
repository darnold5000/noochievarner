"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { bookTrainingHref, bookingUrl } from "@/config/booking";
import SiteLink from "@/components/SiteLink";
import {
  ACADEMY_LINKS,
  HEADER_CONTACT,
  HEADER_NAV,
  MOBILE_NAV,
  SITE,
} from "@/content/site";
import type { SiteBranding } from "@/lib/nvba-public-content";
import { btnOnDark } from "@/lib/styles";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MainNavLink({
  href,
  label,
  onClick,
  compact,
  suppressActive,
}: {
  href: string;
  label: string;
  onClick?: () => void;
  compact?: boolean;
  suppressActive?: boolean;
}) {
  const pathname = usePathname();
  const active = !suppressActive && isActivePath(pathname, href);
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`whitespace-nowrap rounded-md font-semibold tracking-wide transition-colors ${
        compact
          ? "px-3 py-2.5 text-sm"
          : "border-b-2 px-2 py-2 text-xs xl:px-2.5 xl:text-sm"
      } ${
        active
          ? compact
            ? "bg-white/10 text-white"
            : "border-nv-blue text-white"
          : compact
            ? "text-nv-silver hover:bg-white/5 hover:text-white"
            : "border-transparent text-nv-silver hover:border-white/20 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

function AcademyMenuLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const active = isActivePath(pathname, href);
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onNavigate}
      className={`block rounded-md px-3 py-2.5 text-sm font-semibold tracking-wide ${
        active ? "bg-white/10 text-white" : "text-nv-silver hover:bg-white/5 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Header({ branding }: { branding?: SiteBranding }) {
  const logoUrl = branding?.logoUrl || "/images/brand/icon.png";
  const addressLine = branding?.address.full ?? SITE.address.full;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [academyOpen, setAcademyOpen] = useState(false);
  const [mobileAcademyOpen, setMobileAcademyOpen] = useState(false);
  const academyRef = useRef<HTMLDivElement>(null);
  const academyMenuId = useId();

  const academySectionActive = ACADEMY_LINKS.some((item) => isActivePath(pathname, item.href));

  const close = () => {
    setOpen(false);
    setAcademyOpen(false);
    setMobileAcademyOpen(false);
  };

  useEffect(() => {
    if (!academyOpen) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (academyRef.current?.contains(target)) return;
      setAcademyOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setAcademyOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [academyOpen]);

  const openAcademyMenu = () => setAcademyOpen(true);
  const closeAcademyMenu = () => setAcademyOpen(false);
  const toggleAcademyMenu = () => setAcademyOpen((value) => !value);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-nv-navy text-white">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2.5 sm:px-6">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3" onClick={close}>
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-white">
            <Image
              src={logoUrl}
              alt="Noochie Varner Baseball Academy"
              fill
              className="object-contain object-[center_52%] p-1.5"
              sizes="44px"
              priority
            />
          </span>
          <span className="hidden min-w-0 leading-none sm:block">
            <span className="block font-display text-base font-bold tracking-wide lg:text-lg">NOOCHIE VARNER</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-nv-silver lg:text-[11px]">
              Baseball Academy
            </span>
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-end gap-0 xl:flex" aria-label="Primary">
          {HEADER_NAV.map((item) => (
            <MainNavLink
              key={item.href}
              href={item.href}
              label={item.label}
              suppressActive={academyOpen}
            />
          ))}
          <div
            ref={academyRef}
            className="relative"
            onMouseEnter={openAcademyMenu}
            onMouseLeave={closeAcademyMenu}
          >
            <button
              type="button"
              id={`${academyMenuId}-button`}
              aria-expanded={academyOpen}
              aria-haspopup="menu"
              aria-controls={`${academyMenuId}-menu`}
              className={`whitespace-nowrap rounded-md border-b-2 px-2 py-2 text-xs font-semibold tracking-wide xl:px-2.5 xl:text-sm ${
                academyOpen || academySectionActive
                  ? "border-nv-blue text-white"
                  : "border-transparent text-nv-silver hover:border-white/20 hover:text-white"
              }`}
              onClick={toggleAcademyMenu}
            >
              Academy
            </button>
            {academyOpen ? (
              <div className="absolute right-0 top-full z-[60] min-w-[13rem] pt-2">
                <div
                  id={`${academyMenuId}-menu`}
                  role="menu"
                  aria-labelledby={`${academyMenuId}-button`}
                  className="rounded-lg border border-white/10 bg-nv-navy p-1.5 shadow-xl"
                >
                  {ACADEMY_LINKS.map((item) => (
                    <AcademyMenuLink
                      key={item.href}
                      href={item.href}
                      label={item.label}
                      onNavigate={closeAcademyMenu}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <MainNavLink href={HEADER_CONTACT.href} label={HEADER_CONTACT.label} suppressActive={academyOpen} />
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 xl:ml-3">
          <a
            href={bookingUrl("login")}
            className="hidden text-xs font-bold uppercase tracking-wide text-nv-silver transition hover:text-white sm:inline xl:text-sm"
          >
            Sign In
          </a>
          <SiteLink href={bookTrainingHref()} className={`${btnOnDark} px-3 py-2 text-xs sm:px-4 sm:py-2.5 sm:text-sm`}>
            Book Now
          </SiteLink>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 xl:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => {
              setAcademyOpen(false);
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
        <nav className="border-t border-white/10 bg-nv-navy px-4 py-4 xl:hidden" aria-label="Mobile">
          <div className="grid gap-1">
            {MOBILE_NAV.map((item) => (
              <MainNavLink key={item.href} href={item.href} label={item.label} onClick={close} compact />
            ))}
          </div>
          <div className="mt-2 border-t border-white/10 pt-2">
            <button
              type="button"
              className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-semibold tracking-wide ${
                mobileAcademyOpen || academySectionActive ? "bg-white/10 text-white" : "text-nv-silver"
              }`}
              aria-expanded={mobileAcademyOpen}
              onClick={() => setMobileAcademyOpen((value) => !value)}
            >
              Academy
              <span className="text-xs">{mobileAcademyOpen ? "−" : "+"}</span>
            </button>
            {mobileAcademyOpen ? (
              <div className="mt-1 grid gap-1 pl-2">
                {ACADEMY_LINKS.map((item) => (
                  <MainNavLink key={item.href} href={item.href} label={item.label} onClick={close} compact />
                ))}
              </div>
            ) : null}
          </div>
          <div className="mt-4 grid gap-2">
            <SiteLink href={bookTrainingHref()} onClick={close} className={btnOnDark}>
              Book Now
            </SiteLink>
            <a
              href={bookingUrl("login")}
              onClick={close}
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/20 text-sm font-bold uppercase tracking-wide text-nv-silver hover:text-white"
            >
              Sign In
            </a>
          </div>
          <p className="mt-4 px-1 text-xs text-nv-silver">{addressLine}</p>
        </nav>
      ) : null}
    </header>
  );
}
