  "use client";

  import { useEffect, useRef } from "react";

  export default function AuroraCanvas({ className }) {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let animId = null;
      let isVisible = true;

      const setCanvasDimensions = () => {
        if (!canvas) return { w: window.innerWidth || 360, h: 400 };
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.max(canvas.clientWidth || window.innerWidth || 360, 200);
        const h = Math.max(canvas.clientHeight || window.innerHeight || 400, 200);
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return { w, h };
      };

      let { w: W, h: H } = setCanvasDimensions();

      const resize = () => {
        if (!canvas) return;
        const dims = setCanvasDimensions();
        W = dims.w;
        H = dims.h;
      };
      window.addEventListener("resize", resize, { passive: true });

      // Perlin/Simplex Noise Help functions
      const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
      const lerp = (a, b, t) => a + t * (b - a);
      
      const perm = new Uint8Array(512);
      for (let i = 0; i < 256; i++) perm[i] = i;
      // Fisher-Yates shuffle with seed determinism
      let seed = 0.5;
      const random = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
      };
      for (let i = 255; i > 0; i--) {
        const j = (random() * (i + 1)) | 0;
        [perm[i], perm[j]] = [perm[j], perm[i]];
      }
      for (let i = 0; i < 256; i++) perm[i + 256] = perm[i];

      const grads = [
        [1, 1], [-1, 1], [1, -1], [-1, -1],
        [1, 0], [-1, 0], [0, 1], [0, -1]
      ];
      const dot2 = (g, x, y) => g[0] * x + g[1] * y;
      
      const noise2 = (x, y) => {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        const u = fade(x);
        const v = fade(y);
        const a = perm[X] + Y;
        const b = perm[X + 1] + Y;
        return lerp(
          lerp(dot2(grads[perm[a] & 7], x, y), dot2(grads[perm[b] & 7], x - 1, y), u),
          lerp(dot2(grads[perm[a + 1] & 7], x, y - 1), dot2(grads[perm[b + 1] & 7], x - 1, y - 1), u),
          v
        );
      };

      const ribbons = [
        { yBase: 0.35, speed: 0.000045, noiseScale: 0.0022, waveAmp: 0.18, thickness: 0.22, colorTop: [0, 204, 156], colorMid: [1, 49, 68], colorBot: [0, 204, 156], alpha: 0.5, noiseOff: 0 },
        { yBase: 0.45, speed: 0.000032, noiseScale: 0.0018, waveAmp: 0.14, thickness: 0.18, colorTop: [246, 162, 0], colorMid: [0, 204, 156], colorBot: [1, 49, 68], alpha: 0.4, noiseOff: 100 },
        { yBase: 0.25, speed: 0.000055, noiseScale: 0.0025, waveAmp: 0.12, thickness: 0.15, colorTop: [0, 255, 180], colorMid: [0, 204, 156], colorBot: [0, 49, 68], alpha: 0.35, noiseOff: 200 }
      ];

      const drawRibbon = (r, t, w, h) => {
        const STEPS = 140;
        const points = [];
        const refWidth = w < 768 ? 1000 : 1920;
        for (let s = 0; s <= STEPS; s++) {
          const xFrac = s / STEPS;
          const x = xFrac * w;
          const n1 = noise2(xFrac * refWidth * r.noiseScale + r.noiseOff, t * r.speed * 300);
          const n2 = noise2(xFrac * refWidth * r.noiseScale * 0.5 + r.noiseOff + 50, t * r.speed * 220 + 10);
          const sizeBasis = w < 768 ? Math.min(w, h) * 0.65 : Math.min(w, h);
          const baseOffset = (r.yBase - 0.35) * sizeBasis * 1.1;
          const yMid = 0.36 * h + baseOffset + (n1 * r.waveAmp + n2 * r.waveAmp * 0.4) * sizeBasis;
          const halfT = (r.thickness * sizeBasis) / 2;
          const thickMod = 0.7 + 0.3 * Math.abs(noise2(xFrac * 3 + r.noiseOff, t * 0.00005));
          points.push({ x, yTop: yMid - halfT * thickMod, yBot: yMid + halfT * thickMod * 0.6 });
        }

        const yMin = Math.min(...points.map((p) => p.yTop));
        const yMax = Math.max(...points.map((p) => p.yBot));
        const grad = ctx.createLinearGradient(0, yMin, 0, yMax);
        const [rt, gt, bt] = r.colorTop;
        const [rm, gm, bm] = r.colorMid;
        const [rb, gb, bb] = r.colorBot;

        grad.addColorStop(0, `rgba(${rt},${gt},${bt},0)`);
        grad.addColorStop(0.2, `rgba(${rt},${gt},${bt},${r.alpha})`);
        grad.addColorStop(0.5, `rgba(${rm},${gm},${bm},${r.alpha * 1.2})`);
        grad.addColorStop(1, `rgba(${rb},${gb},${bb},0)`);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].yTop);

        // Smooth top curve interpolation
        for (let s = 1; s < points.length - 1; s++) {
          const xc = (points[s].x + points[s + 1].x) / 2;
          const yc = (points[s].yTop + points[s + 1].yTop) / 2;
          ctx.quadraticCurveTo(points[s].x, points[s].yTop, xc, yc);
        }
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].yTop);
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].yBot);

        // Smooth bottom curve interpolation
        for (let s = points.length - 2; s > 0; s--) {
          const xc = (points[s].x + points[s - 1].x) / 2;
          const yc = (points[s].yBot + points[s - 1].yBot) / 2;
          ctx.quadraticCurveTo(points[s].x, points[s].yBot, xc, yc);
        }
        ctx.lineTo(points[0].x, points[0].yBot);

        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      };

      let t = 0;
      const animate = () => {
        if (!isVisible) {
          animId = null;
          return;
        }
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "#013144";
        ctx.fillRect(0, 0, W, H);
        t += 0.08;
        for (let i = ribbons.length - 1; i >= 0; i--) {
          drawRibbon(ribbons[i], t, W, H);
        }
        animId = requestAnimationFrame(animate);
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animId) {
            animate();
          }
        },
        { threshold: 0 }
      );
      observer.observe(canvas);

      animate();

      return () => {
        window.removeEventListener("resize", resize);
        if (animId) cancelAnimationFrame(animId);
        observer.disconnect();
      };
    }, []);

    return <canvas ref={canvasRef} className={className}></canvas>;
  }
