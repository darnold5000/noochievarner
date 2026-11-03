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
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-nv-navy/10 bg-white shadow-md shadow-nv-navy/5">
      <div className="relative aspect-[16/10] w-full bg-nv-navy">
        {lesson.image ? (
          <Image
            src={lesson.image}
            alt={lesson.imageAlt ?? `${lesson.coach}, ${lesson.name}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : photo ? (
          <Image
            src={photo}
            alt=""
            fill
            className={photoFit === "contain" ? "object-contain p-3" : "object-cover object-top"}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-nv-blue sm:text-xs">{lesson.role}</p>
        <h3 className="mt-0.5 font-display text-lg font-bold tracking-wide text-nv-navy sm:text-xl">{lesson.name}</h3>
        <p className="mt-0.5 text-xs font-semibold text-zinc-800 sm:text-sm">{lesson.coach}</p>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-zinc-600 sm:text-sm">{lesson.bio}</p>
        <SiteLink href={bookHref} className={`${btnPrimary} mt-auto w-full pt-3 text-sm sm:pt-4`}>
          Book Lesson
        </SiteLink>
      </div>
    </article>
  );
}
