"use client";

import { useEffect, useRef } from "react";

export default function WavesCanvas({ className }) {
  const waveCanvasRef = useRef(null);

  useEffect(() => {
    const wc = waveCanvasRef.current;
    if (!wc) return;
    const wctx = wc.getContext("2d");
    let animationFrameId;
    let isVisible = true;

    let W = (wc.width = wc.offsetWidth);
    let H = (wc.height = wc.offsetHeight);

    const handleResize = () => {
      if (!wc) return;
      W = wc.width = wc.offsetWidth;
      H = wc.height = wc.offsetHeight;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    const waveDefs = [
      { dir: "lr", speed: 0.00112, amp: 80, freq: 0.01, yFrac: 0.3, color: "rgba(0,204,156,0.14)", _t: 0 },
      { dir: "lr", speed: 0.00088, amp: 55, freq: 0.007, yFrac: 0.55, color: "rgba(0,180,156,0.10)", _t: 2100 },
      { dir: "lr", speed: 0.00138, amp: 100, freq: 0.013, yFrac: 0.75, color: "rgba(0,204,156,0.08)", _t: 4300 },
      { dir: "rl", speed: 0.001, amp: 70, freq: 0.009, yFrac: 0.25, color: "rgba(246,162,0,0.13)", _t: 1000 },
      { dir: "rl", speed: 0.00075, amp: 50, freq: 0.006, yFrac: 0.62, color: "rgba(246,162,0,0.09)", _t: 3300 },
      { dir: "rl", speed: 0.0012, amp: 90, freq: 0.012, yFrac: 0.82, color: "rgba(230,140,0,0.07)", _t: 5100 },
      { dir: "bt", speed: 0.00095, amp: 60, freq: 0.011, xFrac: 0.3, color: "rgba(0,160,220,0.10)", _t: 700 },
      { dir: "bt", speed: 0.0007, amp: 45, freq: 0.008, xFrac: 0.7, color: "rgba(0,140,200,0.08)", _t: 2800 },
      { dir: "diag-up", speed: 0.00083, amp: 65, freq: 0.009, yFrac: 0.4, color: "rgba(0,204,156,0.07)", _t: 1500 },
      { dir: "diag-up", speed: 0.00108, amp: 85, freq: 0.012, yFrac: 0.7, color: "rgba(0,204,156,0.05)", _t: 3900 },
      { dir: "diag-dn", speed: 0.00088, amp: 70, freq: 0.01, yFrac: 0.35, color: "rgba(246,162,0,0.06)", _t: 300 },
      { dir: "diag-dn", speed: 0.00125, amp: 50, freq: 0.007, yFrac: 0.6, color: "rgba(246,162,0,0.05)", _t: 2500 },
    ];

    const drawWaves = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }
      wctx.clearRect(0, 0, W, H);
      waveDefs.forEach((w) => {
        w._t += w.speed * 16;
        const t = w._t;
        wctx.beginPath();
        wctx.fillStyle = w.color;
        if (w.dir === "lr") {
          const baseY = w.yFrac * H;
          wctx.moveTo(0, H);
          for (let x = 0; x <= W + 4; x += 4) {
            const y =
              baseY +
              Math.sin(x * w.freq - t * 0.003) * w.amp +
              Math.sin(x * w.freq * 1.6 - t * 0.002) * (w.amp * 0.35);
            wctx.lineTo(x, y);
          }
          wctx.lineTo(W, H);
          wctx.closePath();
        } else if (w.dir === "rl") {
          const baseY = w.yFrac * H;
          wctx.moveTo(0, H);
          for (let x = 0; x <= W + 4; x += 4) {
            const y =
              baseY +
              Math.sin(x * w.freq + t * 0.003) * w.amp +
              Math.sin(x * w.freq * 1.5 + t * 0.002) * (w.amp * 0.35);
            wctx.lineTo(x, y);
          }
          wctx.lineTo(W, H);
          wctx.closePath();
        } else if (w.dir === "bt") {
          const baseX = w.xFrac * W;
          wctx.moveTo(W, 0);
          for (let y = 0; y <= H + 4; y += 4) {
            const x =
              baseX +
              Math.sin(y * w.freq - t * 0.003) * w.amp +
              Math.sin(y * w.freq * 1.4 - t * 0.002) * (w.amp * 0.3);
            wctx.lineTo(x, y);
          }
          wctx.lineTo(W, H);
          wctx.closePath();
        } else if (w.dir === "diag-up") {
          const baseY = w.yFrac * H;
          wctx.moveTo(0, H);
          for (let x = 0; x <= W + 4; x += 4) {
            const y =
              baseY -
              (x / W) * H * 0.45 +
              Math.sin(x * w.freq - t * 0.003) * w.amp +
              Math.sin(x * w.freq * 1.3 - t * 0.0018) * (w.amp * 0.4);
            wctx.lineTo(x, y);
          }
          wctx.lineTo(W, 0);
          wctx.lineTo(0, 0);
          wctx.closePath();
        } else if (w.dir === "diag-dn") {
          const baseY = w.yFrac * H;
          wctx.moveTo(0, 0);
          for (let x = 0; x <= W + 4; x += 4) {
            const y =
              baseY +
              (x / W) * H * 0.45 +
              Math.sin(x * w.freq + t * 0.003) * w.amp +
              Math.sin(x * w.freq * 1.3 + t * 0.0018) * (w.amp * 0.4);
            wctx.lineTo(x, y);
          }
          wctx.lineTo(W, H);
          wctx.closePath();
        }
        wctx.fill();
      });
      animationFrameId = requestAnimationFrame(drawWaves);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          drawWaves();
        }
      },
      { threshold: 0 }
    );
    observer.observe(wc);

    drawWaves();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={waveCanvasRef} className={className} />;
}
