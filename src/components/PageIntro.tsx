export default function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-nv-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-nv-silver">{eyebrow}</p>
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold tracking-wide sm:text-6xl">{title}</h1>
        {children ? <div className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-200">{children}</div> : null}
      </div>
    </section>
  );
}
