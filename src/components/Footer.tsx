import Link from "next/link";
import { bookingUrl } from "@/config/booking";
import { MORE_LINKS, NAV, SITE } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-nv-navy text-nv-silver">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl font-bold tracking-wide text-white">NOOCHIE VARNER</p>
          <p className="text-xs font-semibold uppercase tracking-[0.18em]">Baseball Academy</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed">{SITE.tagline}</p>
          <p className="mt-4 text-sm">
            <a className="font-semibold text-white hover:underline" href={SITE.phoneHref}>
              {SITE.phone}
            </a>
            <br />
            <a className="hover:text-white" href={SITE.emailHref}>
              {SITE.email}
            </a>
            <br />
            {SITE.address.full}
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            {[...NAV, ...MORE_LINKS].map((item) => (
              <li key={item.href}>
                <Link className="hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white">Get started</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="hover:text-white" href="/book">
                Book Now
              </Link>
            </li>
            <li>
              <a className="hover:text-white" href={bookingUrl("login")}>
                Sign In
              </a>
            </li>
            <li>
              <Link className="hover:text-white" href="/login">
                Staff Login
              </Link>
            </li>
          </ul>
          <ul className="mt-6 space-y-2 text-sm">
            {SITE.social.map((item) => (
              <li key={item.href}>
                <a className="hover:text-white" href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} {SITE.name}</p>
          <a
            href="https://hiresignalworks.com"
            target="_blank"
            rel="noreferrer"
            title="Professional websites, software & AI solutions."
            className="hover:text-white"
          >
            Powered by the <span className="font-semibold text-white">Signal Works Platform</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
