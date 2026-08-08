"use client";

import { useEffect, useRef } from "react";

export default function SilkRibbonCanvas({ className }) {
  const silkCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = silkCanvasRef.current;
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

    let offset = 0;
    const drawSilk = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }
      ctx.clearRect(0, 0, W, H);
      offset += 0.008;

      const ribbons = [
        { amp: 45, freq: 0.003, speed: 0.3, yFrac: 0.5, color: "rgba(0,204,156,0.04)" },
        { amp: 65, freq: 0.004, speed: -0.4, yFrac: 0.52, color: "rgba(246,162,0,0.03)" },
        { amp: 25, freq: 0.002, speed: 0.2, yFrac: 0.48, color: "rgba(2,100,126,0.05)" },
      ];

      ribbons.forEach((r) => {
        ctx.beginPath();
        ctx.moveTo(0, r.yFrac * H);
        for (let x = 0; x <= W; x += 10) {
          const y =
            r.yFrac * H +
            Math.sin(x * r.freq + offset * r.speed) * r.amp * Math.sin((x / W) * Math.PI);
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 15;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(drawSilk);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          drawSilk();
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    drawSilk();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={silkCanvasRef} className={className}></canvas>;
}
