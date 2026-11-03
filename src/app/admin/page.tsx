import Link from "next/link";
import { requireNvbaStaff } from "@/lib/nvba-admin-auth";
import { adminSections, websiteContentNav } from "@/lib/nvba-admin-sections";

export default async function AdminDashboardPage() {
  await requireNvbaStaff();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-nv-navy sm:text-4xl">Website content</h1>
      <p className="mt-3 max-w-2xl text-sm text-zinc-600">
        Choose a section to edit what appears on the public site. Unpublished items stay hidden from visitors.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {websiteContentNav.map(([slug, label]) => {
          const section = adminSections[slug];
          return (
            <Link
              key={slug}
              href={`/admin/${slug}`}
              className="rounded-xl border border-nv-navy/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-nv-blue/40"
            >
              <h2 className="font-display text-lg font-bold text-nv-navy">{label}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{section?.description ?? "Manage this section."}</p>
              <span className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.14em] text-nv-blue">Open section →</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 rounded-xl border border-nv-navy/10 bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg font-bold text-nv-navy">Related tools</h2>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <li>
            <Link href="/admin/services-intro" className="font-semibold text-nv-blue hover:underline">
              Services Intro
            </Link>
          </li>
          <li>
            <Link href="/admin/facility-features" className="font-semibold text-nv-blue hover:underline">
              Facility Features
            </Link>
          </li>
          <li>
            <Link href="/admin/contact-topics" className="font-semibold text-nv-blue hover:underline">
              Contact Topics
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
