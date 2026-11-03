import Link from "next/link";
import { requireNvbaStaff } from "@/lib/nvba-admin-auth";
import { adminSections, websiteContentNav } from "@/lib/nvba-admin-sections";

export default async function AdminDashboardPage() {
  const { db, tenantId } = await requireNvbaStaff();
  const { data: items, error: contentError } = await db
    .from("tenant_content_items")
    .select("content_type, published")
    .eq("tenant_id", tenantId);
  if (contentError) {
    console.error("NVBA admin dashboard summary failed", { tenantId, code: contentError.code, message: contentError.message });
  }
  const publishedCount = (type: string) => items?.filter((item) => item.content_type === type && item.published).length ?? 0;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-nv-blue">Website content</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-nv-navy">NVBA Owner Portal</h1>
      <p className="mt-3 max-w-2xl text-sm text-zinc-600">
        Manage public website content without editing code. Hidden items stay out of the live site.
      </p>
      {contentError ? (
        <p className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          We couldn’t load the content summary. Please try again.
        </p>
      ) : null}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Summary label="Published programs" value={publishedCount("program")} />
        <Summary label="Lessons" value={publishedCount("lesson")} />
        <Summary label="Gallery photos" value={publishedCount("gallery_photo")} />
        <Summary label="Sponsors" value={publishedCount("sponsor")} />
      </div>
      <div className="mt-10 border-t border-nv-navy/10 pt-8">
        <h2 className="font-display text-xl font-bold text-nv-navy">Website Content</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {websiteContentNav.map(([slug, label]) => {
            const section = adminSections[slug];
            return (
              <Link
                key={slug}
                href={`/admin/${slug}`}
                className="rounded-xl border border-nv-navy/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-nv-blue/40"
              >
                <h3 className="font-display text-lg font-bold text-nv-navy">{label}</h3>
                <p className="mt-2 text-sm text-zinc-600">{section?.description ?? "Manage this section."}</p>
                <span className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.14em] text-nv-blue">Manage →</span>
              </Link>
            );
          })}
        </div>
        <p className="mt-8 text-sm text-zinc-600">
          Related tools:{" "}
          <Link href="/admin/pro-shop-vendors" className="font-semibold text-nv-blue hover:underline">
            Pro Shop Vendors
          </Link>
          {" · "}
          <Link href="/admin/services-intro" className="font-semibold text-nv-blue hover:underline">
            Services Intro
          </Link>
          {" · "}
          <Link href="/admin/facility-features" className="font-semibold text-nv-blue hover:underline">
            Facility Features
          </Link>
          {" · "}
          <Link href="/admin/contact-topics" className="font-semibold text-nv-blue hover:underline">
            Contact Topics
          </Link>
        </p>
      </div>
    </main>
  );
}

function Summary({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-nv-navy/10 bg-white p-4 shadow-sm">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold text-nv-blue">{value}</p>
    </div>
  );
}
