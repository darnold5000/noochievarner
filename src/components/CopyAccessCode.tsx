"use client";

import { useState } from "react";

export default function CopyAccessCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="shrink-0 rounded-md border border-nv-navy/15 bg-white px-3 py-2 text-xs font-bold uppercase tracking-wide text-nv-navy transition hover:border-nv-blue hover:text-nv-blue"
    >
      {copied ? "Copied" : "Copy code"}
    </button>
  );
}
