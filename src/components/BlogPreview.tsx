"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import styles from "./BlogPreview.module.css";

export function BlogPreview() {
  const [typed, setTyped] = useState("");
  const stateRef = useRef({
    phase: "typing" as "typing" | "pauseTyped" | "deleting" | "pauseEmpty",
    phaseStart: 0,
  });

  useEffect(() => {
    const text = "Coming soon...";
    const typeMs = 65;
    const pauseFullMs = 1100;
    const deleteMs = 42;
    const pauseEmptyMs = 380;

    const s = stateRef.current;
    s.phase = "typing";
    s.phaseStart = performance.now();
    setTyped("");

    const id = window.setInterval(() => {
      const now = performance.now();
      if (s.phase === "typing") {
        const n = Math.min(text.length, Math.floor((now - s.phaseStart) / typeMs));
        const next = text.slice(0, n);
        setTyped((prev) => (prev === next ? prev : next));
        if (n >= text.length) {
          s.phase = "pauseTyped";
          s.phaseStart = now;
        }
      } else if (s.phase === "pauseTyped") {
        if (now - s.phaseStart > pauseFullMs) {
          s.phase = "deleting";
          s.phaseStart = now;
        }
      } else if (s.phase === "deleting") {
        const gone = Math.floor((now - s.phaseStart) / deleteMs);
        const n = Math.max(0, text.length - gone);
        const next = text.slice(0, n);
        setTyped((prev) => (prev === next ? prev : next));
        if (n === 0) {
          s.phase = "pauseEmpty";
          s.phaseStart = now;
        }
      } else if (now - s.phaseStart > pauseEmptyMs) {
        s.phase = "typing";
        s.phaseStart = now;
      }
    }, 24);

    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="blog" className="section">
      <div className="container">
        <SectionHeader title="Blog" section="blog" />
        <p className={styles.subtitle}>
          Posts are not published yet. New articles will appear here once they are
          written.
        </p>
        <div className={`card ${styles.placeholder}`}>
          <span className={styles.typing} aria-live="polite">
            {typed}
          </span>
          <span className={styles.caret} aria-hidden>
            |
          </span>
        </div>
      </div>
    </section>
  );
}
