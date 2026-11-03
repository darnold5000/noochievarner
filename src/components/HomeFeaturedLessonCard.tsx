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
      <div className="relative aspect-[5/4] bg-nv-navy sm:aspect-[3/2]">
        {lesson.image ? (
          <Image
            src={lesson.image}
            alt={lesson.imageAlt ?? `${lesson.coach}, ${lesson.name}`}
            fill
            className="object-contain p-1"
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
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-nv-blue">{lesson.role}</p>
        <h3 className="mt-1 font-display text-2xl font-bold tracking-wide text-nv-navy sm:text-[1.65rem]">
          {lesson.name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-zinc-800">{lesson.coach}</p>
        <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-zinc-600">{lesson.bio}</p>
        <SiteLink href={bookHref} className={`${btnPrimary} mt-auto w-full pt-5`}>
          Book Lesson
        </SiteLink>
      </div>
    </article>
  );
}
