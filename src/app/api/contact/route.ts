import { NextResponse } from "next/server";
import { CONTACT_TOPICS, SITE, type ContactTopic } from "@/content/site";

const topicValues = new Set(CONTACT_TOPICS.map((t) => t.value));

type ContactPayload = {
  topic?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  company?: string;
};

function topicLabel(value: ContactTopic) {
  return CONTACT_TOPICS.find((t) => t.value === value)?.label ?? value;
}

function parsePayload(body: ContactPayload | null) {
  if (!body || typeof body !== "object") return null;

  if (body.company?.trim()) {
    return { spam: true as const };
  }

  const topic = body.topic?.trim();
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!topic || !topicValues.has(topic as ContactTopic)) return null;
  if (!name || name.length > 120) return null;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160) return null;
  if (!phone || phone.length < 7 || phone.length > 40) return null;
  if (message.length > 4000) return null;

  return {
    spam: false as const,
    topic: topic as ContactTopic,
    name,
    email,
    phone,
    message,
  };
}

export async function POST(request: Request) {
  const parsed = parsePayload((await request.json().catch(() => null)) as ContactPayload | null);

  if (!parsed) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  if (parsed.spam) {
    return NextResponse.json({ ok: true });
  }

  const resendKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() ?? SITE.email;

  const subject = `NVBA contact: ${topicLabel(parsed.topic)} — ${parsed.name}`;
  const text = [
    `Topic: ${topicLabel(parsed.topic)}`,
    `Name: ${parsed.name}`,
    `Email: ${parsed.email}`,
    `Phone: ${parsed.phone}`,
    "",
    parsed.message ? `Message:\n${parsed.message}` : "Message: (none provided)",
  ].join("\n");

  if (!resendKey || !from) {
    return NextResponse.json({
      ok: true,
      demo: true,
      message: "Demo mode — configure RESEND_API_KEY and RESEND_FROM_EMAIL to deliver submissions.",
    });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: parsed.email,
      subject,
      text,
    }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Could not send your message right now. Please call or email the academy." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
