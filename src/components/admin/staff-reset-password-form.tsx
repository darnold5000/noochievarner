"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function StaffResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState<boolean | null>(null);

  useEffect(() => {
    void createClient()
      .auth.getSession()
      .then(({ data }) => setReady(Boolean(data.session)))
      .catch(() => setReady(false));
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Use at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError("Could not update your password. Request a new reset link and try again.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again or contact Signal Works support.");
    } finally {
      setLoading(false);
    }
  }

  if (ready === null) {
    return <p className="text-sm text-zinc-600">Loading…</p>;
  }

  if (!ready) {
    return (
      <p className="text-sm text-zinc-600">
        This link may have expired.{" "}
        <Link href="/login" className="font-semibold text-nv-blue hover:underline">
          Request a new reset link
        </Link>
        .
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error ? <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p> : null}
      <div className="space-y-2">
        <label htmlFor="new-password" className="text-sm font-semibold text-nv-navy">
          New password
        </label>
        <input
          id="new-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          required
          minLength={8}
          className="admin-input"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="confirm-password" className="text-sm font-semibold text-nv-navy">
          Confirm password
        </label>
        <input
          id="confirm-password"
          type="password"
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
          autoComplete="new-password"
          required
          minLength={8}
          className="admin-input"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-nv-blue px-4 py-3 text-sm font-bold text-white disabled:opacity-70"
      >
        {loading ? "Saving…" : "Save password"}
      </button>
    </form>
  );
}
