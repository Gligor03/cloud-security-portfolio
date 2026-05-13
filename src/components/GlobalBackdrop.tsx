"use client";

import { useEffect, useRef } from "react";
import styles from "./GlobalBackdrop.module.css";

type ParticleTone = "mint" | "aqua" | "sky" | "ice";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  tone: ParticleTone;
  /** Gentle yaw on velocity (rad/s) for smoother curved paths */
  drift: number;
};

function smoothstep01(t: number): number {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

/** Sparse graph: short edges first, capped degree. */
const MAX_EDGES = 72;
const MAX_DEGREE = 2;

type LinkCand = { i: number; j: number; d: number };

function spawnParticle(w: number, h: number): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speedPps = 26 + Math.random() * 152;
  const roll = Math.random();
  let tone: ParticleTone;
  if (roll > 0.88) tone = "ice";
  else if (roll > 0.62) tone = "sky";
  else if (roll > 0.31) tone = "aqua";
  else tone = "mint";

  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: Math.cos(angle) * speedPps,
    vy: Math.sin(angle) * speedPps,
    r: Math.random() * 0.82 + 0.56,
    a: Math.random() * 0.18 + 0.5,
    tone,
    drift: (Math.random() - 0.5) * 0.62,
  };
}

function particleFill(p: Particle): string {
  switch (p.tone) {
    case "ice":
      return `rgba(224, 242, 254, ${p.a * 0.97})`;
    case "sky":
      return `rgba(125, 211, 252, ${p.a * 0.94})`;
    case "aqua":
      return `rgba(34, 211, 238, ${p.a})`;
    default:
      return `rgba(45, 212, 191, ${p.a})`;
  }
}

export function GlobalBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = mq.matches;
    /** Skip animated links when user requests reduced motion (a11y). */
    let skipNetworkLinks = reduceMotion;

    const onMq = () => {
      reduceMotion = mq.matches;
      skipNetworkLinks = reduceMotion;
    };
    mq.addEventListener("change", onMq);

    let rafId = 0;
    let tabVisible = document.visibilityState !== "hidden";
    let particles: Particle[] = [];
    let lastTs = performance.now();
    let dpr = 1;
    /** Smoothed stroke alpha per pair key "i,j" with i < j */
    const linkAlphaSmooth = new Map<string, number>();
    const candsBuf: LinkCand[] = [];
    const staleLinkKeys: string[] = [];

    const makeParticles = (w: number, h: number) => {
      const area = w * h;
      const count = Math.min(140, Math.max(52, Math.floor(area / 10000)));
      particles = Array.from({ length: count }, () => spawnParticle(w, h));
    };

    function edgeKey(i: number, j: number): string {
      return i < j ? `${i},${j}` : `${j},${i}`;
    }

    const layout = () => {
      dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      linkAlphaSmooth.clear();
      makeParticles(w, h);
      lastTs = performance.now();
    };

    function drawNetworkLinks(
      c: CanvasRenderingContext2D,
      w: number,
      h: number,
      dt: number,
    ): void {
      const n = particles.length;
      if (n < 2) return;

      const area = Math.max(1, w * h);
      const spacing = Math.sqrt(area / Math.max(n, 6));
      const linkMin = 2;
      const linkBreak = Math.min(210, Math.max(84, spacing * 1.85));
      const linkSoftMax = linkBreak * 1.38;
      /** Never draw a segment longer than this (stops wrap “teleport” streaks). */
      const maxDrawDist = linkSoftMax;
      const span = Math.max(1e-6, linkSoftMax - linkMin);

      candsBuf.length = 0;
      for (let i = 0; i < n; i++) {
        const pi = particles[i]!;
        for (let j = i + 1; j < n; j++) {
          const pj = particles[j]!;
          const d = Math.hypot(pj.x - pi.x, pj.y - pi.y);
          if (d <= linkMin || d >= linkSoftMax) continue;
          candsBuf.push({ i, j, d });
        }
      }

      candsBuf.sort((a, b) => a.d - b.d);

      const degree = new Uint8Array(n);
      const hairline = Math.max(1 / Math.max(dpr, 1), 0.75);
      const smoothK = 1 - Math.exp(-(reduceMotion ? 5.5 : 12) * dt);
      const decayK = Math.exp(-(reduceMotion ? 4.2 : 8.5) * dt);

      c.save();
      c.lineCap = "round";
      c.lineJoin = "round";

      type Edge = { i: number; j: number; target: number };
      const picked: Edge[] = [];

      let drawn = 0;
      for (const { i, j, d } of candsBuf) {
        if (drawn >= MAX_EDGES) break;
        if (degree[i] >= MAX_DEGREE || degree[j] >= MAX_DEGREE) continue;

        const u = (d - linkMin) / span;
        const envelope = 1 - smoothstep01(u);
        const target = Math.min(0.42, (0.1 + 0.32 * envelope * envelope) * envelope);

        if (target < 0.018) continue;

        picked.push({ i, j, target });
        degree[i]++;
        degree[j]++;
        drawn++;
      }

      const pickedKeys = new Set(picked.map((e) => edgeKey(e.i, e.j)));

      const strokeEdge = (i: number, j: number, alpha: number) => {
        if (alpha < 0.028) return;
        const pi = particles[i]!;
        const pj = particles[j]!;
        const d = Math.hypot(pj.x - pi.x, pj.y - pi.y);
        if (d > maxDrawDist) return;
        c.beginPath();
        c.strokeStyle = `rgba(56, 189, 198, ${Math.min(0.44, alpha)})`;
        c.lineWidth = hairline;
        c.moveTo(pi.x, pi.y);
        c.lineTo(pj.x, pj.y);
        c.stroke();
      };

      staleLinkKeys.length = 0;
      for (const [key, prev] of linkAlphaSmooth) {
        if (pickedKeys.has(key)) continue;
        const parts = key.split(",");
        const ia = Number(parts[0]);
        const ja = Number(parts[1]);
        if (
          !(ia >= 0 && ja >= 0 && ia < n && ja < n) ||
          Number.isNaN(ia) ||
          Number.isNaN(ja)
        ) {
          staleLinkKeys.push(key);
          continue;
        }
        const sep = Math.hypot(
          particles[ja]!.x - particles[ia]!.x,
          particles[ja]!.y - particles[ia]!.y,
        );
        /* Pair was close, then one particle wrapped — drop immediately (no cross-screen fade). */
        if (sep > maxDrawDist) {
          staleLinkKeys.push(key);
          continue;
        }
        const ns = prev * decayK;
        if (ns < 0.007) {
          staleLinkKeys.push(key);
          continue;
        }
        linkAlphaSmooth.set(key, ns);
        strokeEdge(ia, ja, ns);
      }
      for (const k of staleLinkKeys) {
        linkAlphaSmooth.delete(k);
      }

      for (const { i, j, target } of picked) {
        const key = edgeKey(i, j);
        const prev = linkAlphaSmooth.get(key) ?? target;
        const blended = prev + (target - prev) * smoothK;
        linkAlphaSmooth.set(key, blended);
        strokeEdge(i, j, blended);
      }

      c.restore();
    }

    const tick = (now: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      let dt = (now - lastTs) / 1000;
      lastTs = now;
      if (dt > 0.1) dt = 0.1;
      if (dt <= 0) dt = 1 / 60;

      const speedMul = reduceMotion ? 0.42 : 1;

      ctx.clearRect(0, 0, w, h);

      const driftMul = speedMul * dt;
      for (const p of particles) {
        p.x += p.vx * dt * speedMul;
        p.y += p.vy * dt * speedMul;
        const turn = p.drift * driftMul;
        const c = Math.cos(turn);
        const s = Math.sin(turn);
        const nvx = p.vx * c - p.vy * s;
        const nvy = p.vx * s + p.vy * c;
        p.vx = nvx;
        p.vy = nvy;
        if (p.x < -6) p.x = w + 6;
        if (p.x > w + 6) p.x = -6;
        if (p.y < -6) p.y = h + 6;
        if (p.y > h + 6) p.y = -6;
      }

      if (skipNetworkLinks) {
        linkAlphaSmooth.clear();
      } else {
        drawNetworkLinks(ctx, w, h, dt);
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = particleFill(p);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (tabVisible) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const onVisibility = () => {
      tabVisible = document.visibilityState !== "hidden";
      if (tabVisible) {
        lastTs = performance.now();
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(rafId);
      }
    };

    layout();
    window.addEventListener("resize", layout);
    document.addEventListener("visibilitychange", onVisibility);
    rafId = requestAnimationFrame(tick);

    return () => {
      mq.removeEventListener("change", onMq);
      window.removeEventListener("resize", layout);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={styles.wrap} aria-hidden>
      <div className={styles.gradientMesh} />
      <div className={styles.gridMesh} />
      <div className={styles.vignette} />
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
