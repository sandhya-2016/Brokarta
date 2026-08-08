"use client";

import { useEffect, useRef } from "react";

export default function DiagonalWavesCanvas({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let isVisible = true;

    const setCanvasDimensions = () => {
      if (!canvas) return { w: window.innerWidth || 360, h: 400 };
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(Math.round(rect.width) || canvas.clientWidth || canvas.offsetWidth || window.innerWidth || 360, 200);
      const h = Math.max(Math.round(rect.height) || canvas.clientHeight || canvas.offsetHeight || 350, 200);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w, h };
    };

    let { w: W, h: H } = setCanvasDimensions();

    const handleResize = () => {
      if (!canvas) return;
      const dims = setCanvasDimensions();
      W = dims.w;
      H = dims.h;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    const WAVE_COUNT = 8;
    const palettes = [
      ["rgba(0,220,170,0.55)", "rgba(0,180,230,0.35)", "rgba(0,120,200,0.1)"],
      ["rgba(0,200,240,0.5)", "rgba(80,230,200,0.35)", "rgba(0,160,200,0.08)"],
      ["rgba(246,162,0,0.45)", "rgba(255,120,60,0.3)", "rgba(220,60,140,0.08)"],
      ["rgba(0,210,180,0.5)", "rgba(0,160,240,0.3)", "rgba(100,60,220,0.08)"],
      ["rgba(255,200,50,0.4)", "rgba(0,220,170,0.3)", "rgba(0,180,230,0.07)"],
      ["rgba(100,200,255,0.5)", "rgba(0,204,156,0.35)", "rgba(246,162,0,0.08)"],
      ["rgba(0,204,156,0.45)", "rgba(80,200,255,0.3)", "rgba(246,162,0,0.1)"],
    ];

    const waves = Array.from({ length: WAVE_COUNT }, (_, i) => ({
      progress: i / WAVE_COUNT,
      speed: 0.0001 + Math.random() * 0.0001,
      amplitude: 30 + Math.random() * 30,
      frequency: 0.007 + Math.random() * 0.005,
      phaseOffset: Math.random() * Math.PI * 2,
      thickness: 15 + Math.random() * 25,
      palette: palettes[i % palettes.length],
      foam: Math.random() > 0.4,
    }));

    const progressToCenter = (p, w, h) => {
      return {
        x: w * 1.3 - p * (w * 1.6),
        y: h * 1.1 - p * (h * 1.2),
      };
    };

    const dLen = Math.sqrt(1.6 * 1.6 + 1.2 * 1.2);
    const dx = -1.6 / dLen;
    const dy = -1.2 / dLen;
    const px = dy;
    const py = -dx;

    const drawWave = (wave, t, w, h) => {
      const { progress, amplitude, frequency, phaseOffset, thickness, palette, foam } = wave;
      const fade = Math.min(progress * 5, 1) * Math.min((1 - progress) * 5, 1);
      if (fade <= 0) return;

      // Scale wave dimensions proportionally to screen width so waves don't overlap/merge on mobile
      const scale = Math.min(Math.max(w / 1200, 0.4), 1.0);
      const scaledThickness = thickness * scale;
      const scaledAmplitude = amplitude * scale;

      const STEPS = 100;
      const diagLen = Math.sqrt((w * 1.6) ** 2 + (h * 1.2) ** 2);
      const upper = [];
      const lower = [];

      for (let s = 0; s <= STEPS; s++) {
        const frac = s / STEPS;
        const offset = (frac - 0.5) * diagLen;
        const c = progressToCenter(progress, w, h);
        const cx = c.x + dx * offset;
        const cy = c.y + dy * offset;
        const ripple = Math.sin(frac * diagLen * frequency + phaseOffset + t) * scaledAmplitude;
        const taper = 0.5 + 0.5 * Math.sin(frac * Math.PI);
        const halfT = (scaledThickness / 2) * taper;

        upper.push({ x: cx + px * (ripple + halfT), y: cy + py * (ripple + halfT) });
        lower.push({ x: cx + px * (ripple - halfT), y: cy + py * (ripple - halfT) });
      }

      ctx.save();
      ctx.globalAlpha = fade * 0.9;

      const c0 = progressToCenter(progress, w, h);
      const enter = { x: c0.x + dx * (-diagLen / 2), y: c0.y + dy * (-diagLen / 2) };
      const exitP = { x: c0.x + dx * (diagLen / 2), y: c0.y + dy * (diagLen / 2) };
      const grad = ctx.createLinearGradient(enter.x, enter.y, exitP.x, exitP.y);
      grad.addColorStop(0, palette[2]);
      grad.addColorStop(0.3, palette[0]);
      grad.addColorStop(0.7, palette[1]);
      grad.addColorStop(1, palette[2]);

      ctx.beginPath();
      ctx.moveTo(upper[0].x, upper[0].y);
      for (let s = 1; s <= STEPS; s++) ctx.lineTo(upper[s].x, upper[s].y);
      for (let s = STEPS; s >= 0; s--) ctx.lineTo(lower[s].x, lower[s].y);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      if (foam) {
        ctx.beginPath();
        ctx.moveTo(upper[0].x, upper[0].y);
        for (let s = 1; s <= STEPS; s++) ctx.lineTo(upper[s].x, upper[s].y);
        ctx.strokeStyle = `rgba(255,255,255,${0.35 * fade})`;
        ctx.lineWidth = 1.0 * scale;
        ctx.stroke();
      }

      ctx.restore();
    };

    let t = 0;
    const animate = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }
      ctx.clearRect(0, 0, W, H);
      t += 0.02;
      for (const wave of waves) {
        drawWave(wave, t, W, H);
        wave.progress += wave.speed;
        if (wave.progress > 1.1) {
          wave.progress = -0.1;
          wave.speed = 0.0015 + Math.random() * 0.0012;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          animate();
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className}></canvas>;
}
