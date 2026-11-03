import Link from "next/link";

export default function HomeSectionHeader({
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel = "View all",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-nv-blue">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-wide text-nv-navy sm:text-4xl">{title}</h2>
        {description ? (
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">{description}</p>
        ) : null}
      </div>
      {actionHref ? (
        <Link
          href={actionHref}
          className="shrink-0 text-sm font-bold uppercase tracking-wide text-nv-blue hover:text-nv-royal"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
