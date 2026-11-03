import Image from "next/image";
import SiteLink from "@/components/SiteLink";
import { COACHES } from "@/config/schedule";
import type { BookingKey } from "@/config/booking";
import { btnPrimary } from "@/lib/styles";

type FeaturedLesson = {
  slug: string;
  name: string;
  coach: string;
  role: string;
  bio: string;
  bookingKey: BookingKey;
  image?: string;
  imageAlt?: string;
};

export default function HomeFeaturedLessonCard({
  lesson,
  bookHref,
}: {
  lesson: FeaturedLesson;
  bookHref: string;
}) {
  const coach = COACHES.find((item) => item.services[0] === lesson.slug);
  const photo = coach?.photo;
  const photoFit = coach?.photoFit;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-nv-navy/10 bg-white shadow-md shadow-nv-navy/5">
      <div className="relative aspect-[3/2] w-full bg-nv-navy">
        {lesson.image ? (
          <Image
            src={lesson.image}
            alt={lesson.imageAlt ?? `${lesson.coach}, ${lesson.name}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : photo ? (
          <Image
            src={photo}
            alt=""
            fill
            className={photoFit === "contain" ? "object-contain p-4" : "object-cover object-top"}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-nv-blue">{lesson.role}</p>
        <h3 className="mt-1 font-display text-2xl font-bold tracking-wide text-nv-navy">{lesson.name}</h3>
        <p className="mt-1 text-sm font-semibold text-zinc-800">{lesson.coach}</p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600">{lesson.bio}</p>
        <SiteLink href={bookHref} className={`${btnPrimary} mt-auto w-full pt-4`}>
          Book Lesson
        </SiteLink>
      </div>
    </article>
  );
}
