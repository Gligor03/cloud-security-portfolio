"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/data/site";
import profileImage from "../../public/images/profile.jpg";
import styles from "./Hero.module.css";

function splitDisplayName(author: string): { first: string; rest: string } {
  const parts = author.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { first: author, rest: "" };
  if (parts.length === 1) return { first: parts[0]!, rest: "" };
  return { first: parts[0]!, rest: parts.slice(1).join(" ") };
}

export function Hero() {
  const { first, rest } = useMemo(() => splitDisplayName(site.author), []);
  const phrases = useMemo(() => Array.from(site.heroTypingPhrases), []);
  const [typedLine, setTypedLine] = useState("");

  const dashedRingRef = useRef<HTMLDivElement>(null);
  const solidRingRef = useRef<HTMLDivElement>(null);
  const pipeRef = useRef<HTMLSpanElement>(null);

  const typingRef = useRef({
    phraseIndex: 0,
    phase: "typing" as "typing" | "pauseTyped" | "deleting" | "pauseEmpty",
    phaseStart: 0,
  });

  /* Web Animations API — not affected by CSS Modules or stylesheet order */
  useEffect(() => {
    const dashed = dashedRingRef.current;
    const solid = solidRingRef.current;
    const pipe = pipeRef.current;
    const running: Animation[] = [];

    if (dashed) {
      running.push(
        dashed.animate(
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(360deg)" },
          ],
          { duration: 52000, iterations: Infinity, easing: "linear" },
        ),
      );
    }
    if (solid) {
      running.push(
        solid.animate(
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(-360deg)" },
          ],
          { duration: 64000, iterations: Infinity, easing: "linear" },
        ),
      );
    }
    if (pipe) {
      running.push(
        pipe.animate(
          [
            { opacity: 1, offset: 0 },
            { opacity: 1, offset: 0.49 },
            { opacity: 0, offset: 0.5 },
            { opacity: 0, offset: 1 },
          ],
          { duration: 900, iterations: Infinity },
        ),
      );
    }

    return () => {
      for (const a of running) {
        try {
          a.cancel();
        } catch {
          /* ignore */
        }
      }
    };
  }, []);

  useEffect(() => {
    const typeMs = 38;
    const pauseFullMs = 2200;
    const deleteMs = 28;
    const pauseEmptyMs = 480;

    const t = typingRef.current;
    t.phraseIndex = 0;
    t.phase = "typing";
    t.phaseStart = performance.now();
    setTypedLine("");

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
      setTypedLine(slice);
    };

    const typingTick = () => {
      if (cancelled) return;
      const text = phrases[t.phraseIndex % phrases.length] ?? "";
      if (t.phase !== "typing") return;

      const now = performance.now();
      const n = Math.min(text.length, Math.floor((now - t.phaseStart) / typeMs));
      emit(text.slice(0, n));

      if (n >= text.length) {
        t.phase = "pauseTyped";
        t.phaseStart = now;
        timeoutId = window.setTimeout(() => {
          if (cancelled) return;
          t.phase = "deleting";
          t.phaseStart = performance.now();
          deleteTick();
        }, pauseFullMs);
        return;
      }

      rafId = requestAnimationFrame(typingTick);
    };

    const deleteTick = () => {
      if (cancelled) return;
      const text = phrases[t.phraseIndex % phrases.length] ?? "";
      if (t.phase !== "deleting") return;

      const now = performance.now();
      const gone = Math.floor((now - t.phaseStart) / deleteMs);
      const n = Math.max(0, text.length - gone);
      emit(text.slice(0, n));

      if (n === 0) {
        t.phase = "pauseEmpty";
        t.phaseStart = now;
        timeoutId = window.setTimeout(() => {
          if (cancelled) return;
          t.phraseIndex++;
          t.phase = "typing";
          t.phaseStart = performance.now();
          lastEmitted = "";
          setTypedLine("");
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
  }, [phrases]);

  return (
    <section id="home" className={`section ${styles.hero}`}>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <motion.p
              className={styles.kicker}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className={styles.kickerRule} aria-hidden />
              {site.heroKicker}
            </motion.p>

            <motion.div
              className={styles.nameBlock}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06 }}
            >
              <span className={styles.firstName}>{first}</span>
              {rest ? <span className={styles.lastName}>{rest}</span> : null}
            </motion.div>

            <motion.p
              className={styles.typingLine}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              aria-live="polite"
            >
              <span className={styles.typedChars}>{typedLine}</span>
              <span ref={pipeRef} className={styles.pipe} aria-hidden>
                |
              </span>
            </motion.p>

            <motion.div
              className={styles.ctas}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
            >
              <Link href="/#projects" className={styles.btnPrimary}>
                VIEW PROJECTS
              </Link>
              <Link href="/#contact" className={styles.btnGhost}>
                GET IN TOUCH
              </Link>
            </motion.div>
          </div>

          <motion.div
            className={styles.avatarCol}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className={styles.hud}>
              <div
                ref={dashedRingRef}
                className={`${styles.hudRing} ${styles.ringDashed}`}
              />
              <div
                ref={solidRingRef}
                className={`${styles.hudRing} ${styles.ringSolid}`}
              />
              <div className={styles.photoShell}>
                <Image
                  src={profileImage}
                  alt={`${site.author} portrait`}
                  fill
                  priority
                  sizes="(max-width: 900px) 78vw, 420px"
                  className={styles.photoImg}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
