"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function StaffLoginForm({ returnTo = "/admin" }: { returnTo?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError("Could not sign in. Check your email and password.");
        return;
      }
      router.push(returnTo.startsWith("/") ? returnTo : "/admin");
      router.refresh();
    } catch {
      setError("Staff login is unavailable. Confirm Supabase is configured.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error ? <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p> : null}
      <div className="space-y-2">
        <label htmlFor="staff-email" className="text-sm font-semibold text-nv-navy">
          Email
        </label>
        <input
          id="staff-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
          className="admin-input"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="staff-password" className="text-sm font-semibold text-nv-navy">
          Password
        </label>
        <input
          id="staff-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
          className="admin-input"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-nv-blue px-4 py-3 text-sm font-bold text-white disabled:opacity-70"
      >
        {loading ? "Signing in…" : "Staff login"}
      </button>
    </form>
  );
}
