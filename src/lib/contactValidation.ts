/** Shared validation for the contact API — keeps messages bounded and emails sane. */

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 4000;

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  website?: string; // honeypot — should be empty
};

export function validateContactBody(body: unknown): {
  ok: true;
  data: ContactPayload;
} | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid JSON body." };
  }

  const b = body as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";
  const website = typeof b.website === "string" ? b.website : "";

  // Honeypot: bots often fill hidden fields
  if (website.length > 0) {
    return { ok: false, error: "Unable to send message." };
  }

  if (name.length < 2 || name.length > MAX_NAME) {
    return { ok: false, error: "Please enter a valid name." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > MAX_EMAIL) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (message.length < 10 || message.length > MAX_MESSAGE) {
    return {
      ok: false,
      error: "Message should be between 10 and 4000 characters.",
    };
  }

  return { ok: true, data: { name, email, message } };
}
