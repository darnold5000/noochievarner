"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "signin" | "forgot";

export function StaffLoginForm({ returnTo = "/admin" }: { returnTo?: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  async function onSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setInfo("");
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

  async function onForgotPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setInfo("");
    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent("/auth/reset-password")}`;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo });
      if (resetError) {
        setError("Could not send a reset email. Check the address and try again.");
        return;
      }
      setInfo("If an account exists for that email, we sent a link to reset your password.");
    } catch {
      setError("Password reset is unavailable. Confirm Supabase is configured.");
    } finally {
      setLoading(false);
    }
  }

  if (mode === "forgot") {
    return (
      <form onSubmit={onForgotPassword} className="space-y-5">
        <p className="text-sm text-zinc-600">
          Enter the email on your staff account. We will send a link to choose a new password.
        </p>
        {error ? <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p> : null}
        {info ? <p className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-900">{info}</p> : null}
        <div className="space-y-2">
          <label htmlFor="staff-email-reset" className="text-sm font-semibold text-nv-navy">
            Email
          </label>
          <input
            id="staff-email-reset"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            className="admin-input"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-nv-blue px-4 py-3 text-sm font-bold text-white disabled:opacity-70"
        >
          {loading ? "Sending…" : "Send reset link"}
        </button>
        <p className="text-center text-sm">
          <button
            type="button"
            className="font-semibold text-nv-blue hover:underline"
            onClick={() => {
              setMode("signin");
              setError("");
              setInfo("");
            }}
          >
            Back to staff login
          </button>
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={onSignIn} className="space-y-5">
      {error ? <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p> : null}
      {info ? <p className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-900">{info}</p> : null}
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
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="staff-password" className="text-sm font-semibold text-nv-navy">
            Password
          </label>
          <button
            type="button"
            className="text-xs font-semibold text-nv-blue hover:underline"
            onClick={() => {
              setMode("forgot");
              setError("");
              setInfo("");
            }}
          >
            Forgot password?
          </button>
        </div>
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
