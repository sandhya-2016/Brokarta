"use client";

import { useEffect, useRef } from "react";

export default function ConfettiCanvas({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let isVisible = true;

    let W = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let H = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      W = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      H = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    const COLORS = ["#3ddc84", "#f6a200", "#1e8cff", "#ffffff"];
    let particles = [];

    const spawn = () => {
      return {
        x: W / 2 + (Math.random() - 0.5) * 100,
        y: H / 2 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 4,
        vy: -(Math.random() * 5 + 2),
        r: Math.random() * 3 + 2,
        alpha: 1,
        decay: Math.random() * 0.01 + 0.005,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    };

    // Initial burst
    for (let i = 0; i < 40; i++) {
      particles.push(spawn());
    }

    const tick = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1; // Gravity
        p.alpha -= p.decay;

        if (p.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          if (i % 2 === 0) {
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          } else {
            ctx.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
          }
          ctx.fill();
          ctx.restore();
        } else {
          particles[i] = spawn(); // Re-spawn for continuous effect
        }
      });
      animationFrameId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          tick();
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    tick();

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
