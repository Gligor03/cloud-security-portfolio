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

    let cancelled = false;
    let rafId = 0;
    let timeoutId = 0;

    const clearTimers = () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      rafId = 0;
      timeoutId = 0;
    };

    let lastEmitted = "";

    const emit = (slice: string) => {
      if (slice === lastEmitted) return;
      lastEmitted = slice;
      setTyped(slice);
    };

    const typingTick = () => {
      if (cancelled) return;
      if (s.phase !== "typing") return;

      const now = performance.now();
      const n = Math.min(text.length, Math.floor((now - s.phaseStart) / typeMs));
      emit(text.slice(0, n));

      if (n >= text.length) {
        s.phase = "pauseTyped";
        s.phaseStart = now;
        timeoutId = window.setTimeout(() => {
          if (cancelled) return;
          s.phase = "deleting";
          s.phaseStart = performance.now();
          deleteTick();
        }, pauseFullMs);
        return;
      }

      rafId = requestAnimationFrame(typingTick);
    };

    const deleteTick = () => {
      if (cancelled) return;
      if (s.phase !== "deleting") return;

      const now = performance.now();
      const gone = Math.floor((now - s.phaseStart) / deleteMs);
      const n = Math.max(0, text.length - gone);
      emit(text.slice(0, n));

      if (n === 0) {
        s.phase = "pauseEmpty";
        s.phaseStart = now;
        timeoutId = window.setTimeout(() => {
          if (cancelled) return;
          s.phase = "typing";
          s.phaseStart = performance.now();
          lastEmitted = "";
          setTyped("");
          typingTick();
        }, pauseEmptyMs);
        return;
      }

      rafId = requestAnimationFrame(deleteTick);
    };

    typingTick();

    return () => {
      cancelled = true;
      clearTimers();
    };
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
