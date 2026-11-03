"use client";

import { useFormStatus } from "react-dom";

const baseClass =
  "inline-flex min-h-9 items-center justify-center gap-2 text-sm font-semibold disabled:cursor-wait disabled:opacity-70";

export function AdminPendingSubmitButton({
  children,
  pendingLabel,
  className = "text-zinc-600 hover:text-nv-navy",
}: {
  children: React.ReactNode;
  pendingLabel: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} aria-busy={pending} className={`${baseClass} ${className}`}>
      {pending ? (
        <span className="size-3.5 shrink-0 animate-spin rounded-full border-2 border-current/25 border-t-current" aria-hidden />
      ) : null}
      <span>{pending ? pendingLabel : children}</span>
    </button>
  );
}
