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

    const id = window.setInterval(() => {
      const now = performance.now();
      const text = phrases[t.phraseIndex % phrases.length] ?? "";

      if (t.phase === "typing") {
        const n = Math.min(text.length, Math.floor((now - t.phaseStart) / typeMs));
        const slice = text.slice(0, n);
        setTypedLine((prev) => (prev === slice ? prev : slice));
        if (n >= text.length) {
          t.phase = "pauseTyped";
          t.phaseStart = now;
        }
      } else if (t.phase === "pauseTyped") {
        if (now - t.phaseStart > pauseFullMs) {
          t.phase = "deleting";
          t.phaseStart = now;
        }
      } else if (t.phase === "deleting") {
        const gone = Math.floor((now - t.phaseStart) / deleteMs);
        const n = Math.max(0, text.length - gone);
        const slice = text.slice(0, n);
        setTypedLine((prev) => (prev === slice ? prev : slice));
        if (n === 0) {
          t.phase = "pauseEmpty";
          t.phaseStart = now;
        }
      } else {
        setTypedLine((prev) => (prev === "" ? prev : ""));
        if (now - t.phaseStart > pauseEmptyMs) {
          t.phraseIndex++;
          t.phase = "typing";
          t.phaseStart = now;
        }
      }
    }, 24);

    return () => window.clearInterval(id);
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
