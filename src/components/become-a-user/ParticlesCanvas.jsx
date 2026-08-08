"use client";

import { useEffect, useRef } from "react";

export default function ParticlesCanvas({ className }) {
  const particleCanvasRef = useRef(null);

  useEffect(() => {
    const pc = particleCanvasRef.current;
    if (!pc) return;
    const pctx = pc.getContext("2d");
    let animationFrameId;
    let isVisible = true;

    let W = (pc.width = pc.offsetWidth);
    let H = (pc.height = pc.offsetHeight);

    const handleResize = () => {
      if (!pc) return;
      W = pc.width = pc.offsetWidth;
      H = pc.height = pc.offsetHeight;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    const PCOLS = ["#f6a200", "#00cc9c", "#ffffff", "#00b4d8"];
    const particles = [];

    const mkP = () => {
      return {
        x: Math.random() * W,
        y: H + 10,
        r: Math.random() * 2 + 0.4,
        vy: -(Math.random() * 0.4 + 0.1),
        vx: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.45 + 0.1,
        color: PCOLS[Math.floor(Math.random() * PCOLS.length)],
        life: 0,
        maxLife: Math.random() * 400 + 250,
      };
    };

    for (let i = 0; i < 70; i++) {
      const p = mkP();
      p.y = Math.random() * H;
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    const drawParticles = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }
      pctx.clearRect(0, 0, W, H);
      particles.forEach((p, i) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        if (p.life > p.maxLife) {
          particles[i] = mkP();
          return;
        }
        const fade =
          p.life < 40
            ? p.life / 40
            : p.life > p.maxLife - 40
            ? (p.maxLife - p.life) / 40
            : 1;
        pctx.save();
        pctx.beginPath();
        pctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        pctx.fillStyle = p.color;
        pctx.globalAlpha = p.alpha * fade;
        pctx.fill();
        pctx.restore();
      });
      animationFrameId = requestAnimationFrame(drawParticles);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          drawParticles();
        }
      },
      { threshold: 0 }
    );
    observer.observe(pc);

    drawParticles();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={particleCanvasRef} className={className} />;
}
