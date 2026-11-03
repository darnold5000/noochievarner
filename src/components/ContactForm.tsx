"use client";

import { useState } from "react";
import { CONTACT_TOPICS, type ContactTopic } from "@/content/site";
import { btnPrimary } from "@/lib/styles";

const inputClass =
  "mt-1.5 w-full rounded-md border border-nv-navy/15 bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-nv-blue";

type FormState = {
  topic: ContactTopic;
  name: string;
  email: string;
  phone: string;
  message: string;
  company: string;
};

const initialState: FormState = {
  topic: "general",
  name: "",
  email: "",
  phone: "",
  message: "",
  company: "",
};

export default function ContactForm({
  topics = CONTACT_TOPICS,
}: {
  topics?: readonly { value: ContactTopic; label: string }[];
}) {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { error?: string; demo?: boolean; ok?: boolean };

      if (!res.ok) {
        setFeedback({ tone: "error", text: data.error ?? "Could not send your message. Please call or email us." });
        return;
      }

      setSent(true);
      setFeedback({
        tone: "ok",
        text: data.demo
          ? "Thanks — we received your message in demo mode. Email delivery will activate once Resend is configured for this site."
          : "Thanks! Your message was sent. We will get back to you soon.",
      });
      setForm(initialState);
    } catch {
      setFeedback({ tone: "error", text: "Could not send your message. Please try again or call the academy." });
    } finally {
      setSubmitting(false);
    }
  }

  if (sent && feedback?.tone === "ok") {
    return (
      <div className="rounded-2xl border border-nv-blue/30 bg-white p-6 sm:p-8">
        <h2 className="font-display text-2xl font-bold tracking-wide text-nv-navy">Message sent</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{feedback.text}</p>
        <button
          type="button"
          className={`${btnPrimary} mt-6`}
          onClick={() => {
            setSent(false);
            setFeedback(null);
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-nv-navy/10 bg-white p-6 sm:p-8"
      noValidate
    >
      <h2 className="font-display text-2xl font-bold tracking-wide text-nv-navy sm:text-3xl">Send a message</h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">
        Tell us what you are interested in — lessons, camps, memberships, facility time, or equipment. We will follow
        up by email or phone.
      </p>

      <div className="mt-6 space-y-4">
        <label className="block text-sm font-semibold text-nv-navy">
          What can we help with?
          <select
            className={inputClass}
            value={form.topic}
            onChange={(e) => update("topic", e.target.value as ContactTopic)}
            required
          >
            {topics.map((topic) => (
              <option key={topic.value} value={topic.value}>
                {topic.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-semibold text-nv-navy">
          Name
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            autoComplete="name"
            required
            maxLength={120}
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-nv-navy">
            Email
            <input
              type="email"
              className={inputClass}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              autoComplete="email"
              required
              maxLength={160}
            />
          </label>
          <label className="block text-sm font-semibold text-nv-navy">
            Phone
            <input
              type="tel"
              className={inputClass}
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              autoComplete="tel"
              required
              maxLength={40}
            />
          </label>
        </div>

        <label className="block text-sm font-semibold text-nv-navy">
          Message <span className="font-normal text-zinc-500">(optional)</span>
          <textarea
            className={`${inputClass} min-h-[7rem] resize-y`}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            maxLength={4000}
            placeholder="Player age, program interest, preferred days, or anything else we should know."
          />
        </label>

        <label className="sr-only" aria-hidden="true">
          Company
          <input
            tabIndex={-1}
            autoComplete="off"
            className={inputClass}
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </label>
      </div>

      {feedback?.tone === "error" ? (
        <p className="mt-4 text-sm font-medium text-red-700" role="alert">
          {feedback.text}
        </p>
      ) : null}

      <button type="submit" className={`${btnPrimary} mt-6 w-full sm:w-auto`} disabled={submitting}>
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
