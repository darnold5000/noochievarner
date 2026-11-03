import type { Metadata } from "next";
import { AdminNav } from "@/components/admin/admin-nav";
import { requireNvbaStaff } from "@/lib/nvba-admin-auth";

export const metadata: Metadata = {
  title: "NVBA Owner Portal",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireNvbaStaff();
  return (
    <div className="min-h-screen bg-nv-ice text-nv-navy">
      <AdminNav />
      {children}
    </div>
  );
}
