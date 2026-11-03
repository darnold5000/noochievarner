"use client";

import { useFormStatus } from "react-dom";

function DeleteSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="inline-flex min-h-9 items-center justify-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? (
        <span className="size-3.5 shrink-0 animate-spin rounded-full border-2 border-red-600/25 border-t-red-600" aria-hidden />
      ) : null}
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}

export function DeleteContentButton({
  action,
  id,
  title,
  noun,
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  title: string;
  noun: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(`Delete "${title}"?\n\nThis will permanently remove this ${noun.toLowerCase()} from the website.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <DeleteSubmitButton />
    </form>
  );
}
