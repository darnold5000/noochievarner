import Link from "next/link";
import { btnPrimary } from "@/lib/styles";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="font-display text-5xl font-bold tracking-wide text-nv-navy">Page not found</h1>
      <p className="mt-3 text-sm text-zinc-600">That page is not part of the academy site.</p>
      <Link href="/" className={`${btnPrimary} mt-6`}>
        Home
      </Link>
    </section>
  );
}
