"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: {
        error?: string;
        mode?: string;
        message?: string;
        ok?: boolean;
      } = {};
      try {
        data = (await res.json()) as typeof data;
      } catch {
        /* non-JSON body — fall through to status checks */
      }

      if (res.status === 429) {
        setStatus("err");
        setMessage(data.error ?? "Too many attempts.");
        return;
      }

      /* 503 + unconfigured must run before generic !res.ok (503 is not ok) */
      if (
        res.status === 503 &&
        (data.mode === "unconfigured" ||
          (data.ok === false && data.message?.includes("not configured")))
      ) {
        setStatus("err");
        setMessage(
          data.message?.trim() ||
            "Email API is not configured on the server yet. Use the mailto link or deploy with Resend keys.",
        );
        return;
      }

      if (!res.ok) {
        setStatus("err");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }

      setStatus("ok");
      setMessage("Thanks — your message was sent.");
      form.reset();
    } catch {
      setStatus("err");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form className={`card ${styles.form}`} onSubmit={onSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} required />
      </div>
      {/* Honeypot: hidden from users, bots often autofill */}
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="btn btnPrimary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {message ? (
        <p className={status === "ok" ? styles.ok : styles.err} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
