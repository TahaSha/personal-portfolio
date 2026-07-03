"use server";

import { Resend } from "resend";

export interface ContactState {
  status: "idle" | "sent" | "fallback" | "error";
  error?: string;
  mailto?: string;
}

const TOPICS = ["Engineering role", "Teaching role", "Something else"];

export async function sendContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const topic = String(formData.get("topic") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const honeypot = String(formData.get("company") ?? "").trim();

  if (honeypot) {
    return { status: "sent" };
  }
  if (!name || !email || !message) {
    return { status: "error", error: "Please fill in every field." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", error: "That email address doesn't look right." };
  }
  if (!TOPICS.includes(topic)) {
    return { status: "error", error: "Please pick a topic." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    const to = process.env.CONTACT_TO_EMAIL ?? "tahashalaby93@gmail.com";
    const subject = encodeURIComponent(`Portfolio contact (${topic}): ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    return {
      status: "fallback",
      mailto: `mailto:${to}?subject=${subject}&body=${body}`,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? "tahashalaby93@gmail.com",
      replyTo: email,
      subject: `Portfolio contact (${topic}): ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`,
    });
    if (error) {
      return { status: "error", error: "Sending failed. Please email me directly." };
    }
    return { status: "sent" };
  } catch {
    return { status: "error", error: "Sending failed. Please email me directly." };
  }
}
