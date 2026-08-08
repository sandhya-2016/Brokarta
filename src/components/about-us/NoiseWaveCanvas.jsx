"use client";

import { useEffect, useRef } from "react";

export default function NoiseWaveCanvas({ className }) {
  const meshCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = meshCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let isVisible = true;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Permutation table for noise generator
    const PERM = new Uint8Array(512);
    for (let i = 0; i < 256; i++) PERM[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [PERM[i], PERM[j]] = [PERM[j], PERM[i]];
    }
    for (let i = 0; i < 256; i++) PERM[i + 256] = PERM[i];

    const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (a, b, t) => a + (b - a) * t;
    const G = [
      [1, 1],
      [-1, 1],
      [1, -1],
      [-1, -1],
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    const dot = (g, x, y) => g[0] * x + g[1] * y;

    const noise = (x, y) => {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      x -= Math.floor(x);
      y -= Math.floor(y);
      const u = fade(x);
      const v = fade(y);
      const a = PERM[X] + Y;
      const b = PERM[X + 1] + Y;
      return lerp(
        lerp(dot(G[PERM[a] & 7], x, y), dot(G[PERM[b] & 7], x - 1, y), u),
        lerp(
          dot(G[PERM[a + 1] & 7], x, y - 1),
          dot(G[PERM[b + 1] & 7], x - 1, y - 1),
          u
        ),
        v
      );
    };

    const BANDS = 18;
    const palette = [
      [0, 204, 156],
      [40, 110, 255],
      [246, 162, 0],
    ];

    const bandColor = (f, t) => {
      const shift = t * 0.008 + f * 2;
      const idx = shift % palette.length;
      const i0 = Math.floor(idx);
      const i1 = (i0 + 1) % palette.length;
      const fr = idx - i0;
      const r = lerp(palette[i0][0], palette[i1][0], fr);
      const g = lerp(palette[i0][1], palette[i1][1], fr);
      const b = lerp(palette[i0][2], palette[i1][2], fr);
      const cd = Math.abs(f - 0.5) * 2;
      const alpha = 0.05 + 0.18 * (1 - cd);
      return `rgba(${r | 0},${g | 0},${b | 0},${alpha})`;
    };

    let t = 0;
    const draw = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }
      ctx.clearRect(0, 0, W, H);
      const bh = H / BANDS;
      for (let b = 0; b < BANDS; b++) {
        const frac = b / BANDS;
        const top = [];
        const bot = [];
        for (let s = 0; s <= 60; s++) {
          const xf = s / 60;
          const x = xf * W;
          const n = noise(xf * 1.8 + b * 0.1, t * 0.008 + b * 0.15);
          const wy = frac * H + n * 120;
          const th = bh * (0.8 + 0.4 * n);
          top.push({ x, y: wy - th });
          bot.push({ x, y: wy + th });
        }
        ctx.beginPath();
        ctx.moveTo(top[0].x, top[0].y);
        for (let s = 1; s <= 60; s++) ctx.lineTo(top[s].x, top[s].y);
        for (let s = 60; s >= 0; s--) ctx.lineTo(bot[s].x, bot[s].y);
        ctx.closePath();
        ctx.fillStyle = bandColor(frac, t);
        ctx.fill();
      }
      t += 0.3;
      animationFrameId = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          draw();
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    draw();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={meshCanvasRef} className={className} />;
}
