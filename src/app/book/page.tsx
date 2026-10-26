import { Suspense } from "react";
import BookingExperience from "@/components/booking/BookingExperience";
import PageIntro from "@/components/PageIntro";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Book Training",
  description:
    "Book private lessons, camps, clinics, and facility rentals at Noochie Varner Baseball Academy in Georgetown, KY.",
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <PageIntro eyebrow="Academy booking" title="Book Training">
        <p>
          Choose a coach, date, and time on this site. This preview uses sample availability so you can see how a
          built-in booking flow would work.
        </p>
      </PageIntro>
      <Suspense fallback={<p className="px-4 py-12 text-center text-sm text-zinc-600">Loading booking…</p>}>
        <BookingExperience />
      </Suspense>
    </>
  );
}
