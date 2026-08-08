"use client";

import { useEffect, useRef } from "react";

const config = {
  colors: [
    { color: '#013144', enabled: true },
    { color: '#0d4e4f', enabled: true },
    { color: '#243d5c', enabled: true },
    { color: '#33748a', enabled: true },
    { color: '#8c6212', enabled: false },
    { color: '#000000', enabled: false },
  ],
  speed: 2,
  horizontalPressure: 5,
  verticalPressure: 7,
  waveFrequencyX: 2,
  waveFrequencyY: 2,
  waveAmplitude: 8,
  shadows: 3,
  highlights: 8,
  colorBrightness: 1.0,
  colorSaturation: 1.5,
  wireframe: false,
  colorBlending: 10,
  backgroundColor: '#013144',
  backgroundAlpha: 1,
  grainScale: 3,
  grainSparsity: 0,
  grainIntensity: 0,
  grainSpeed: 1,
  resolution: 1,
  yOffset: -250.39999389648438,
  yOffsetWaveMultiplier: 2.240660596723997,
  yOffsetColorMultiplier: 4.3454436784107155,
  yOffsetFlowMultiplier: 3.368567061369522,
  flowDistortionA: 0.9578859175924803,
  flowDistortionB: 2.1294572408628865,
  flowScale: 2.5118461978297892,
  flowEase: 0.4832244279912943,
  flowEnabled: false,
  enableProceduralTexture: false,
  transparentTextureVoid: false,
  textureVoidLikelihood: 0.38914711719547546,
  textureVoidWidthMin: 104.29026608967894,
  textureVoidWidthMax: 415.15842836991794,
  textureBandDensity: 2.1011375292960173,
  textureColorBlending: 0.03080108075076337,
  textureSeed: 1747,
  textureEase: 0.3918185847781663,
  proceduralBackgroundColor: '#013144',
  textureShapeTriangles: 20,
  textureShapeCircles: 15,
  textureShapeBars: 15,
  textureShapeSquiggles: 10,
  domainWarpEnabled: false,
  domainWarpIntensity: 0,
  domainWarpScale: 3,
  vignetteIntensity: 0,
  vignetteRadius: 0.8,
  fresnelEnabled: false,
  fresnelPower: 2,
  fresnelIntensity: 0.5,
  fresnelColor: '#FFFFFF',
  iridescenceEnabled: false,
  iridescenceIntensity: 0.5,
  iridescenceSpeed: 1,
  bloomIntensity: 0,
  bloomThreshold: 0.7,
  chromaticAberration: 0,
  shapeType: 'plane',
  shapeRotationX: 0,
  shapeRotationY: 0,
  shapeRotationZ: 0,
  shapeAutoRotateSpeedX: 0,
  shapeAutoRotateSpeedY: 0,
  sphereRadius: 15,
  torusRadius: 15,
  torusTube: 5,
  cylinderRadius: 10,
  cylinderHeight: 40,
  planeBend: 0,
  planeTwist: 0,
  silhouetteFade: 0.25,
  cylinderFade: 0.08,
  ribbonFade: 0.05,
  flatShading: true,
  cameraLock: true,
  cameraX: 0,
  cameraY: 0,
  cameraZ: 0,
  cameraRotationX: 0,
  cameraRotationY: 0,
  cameraRotationZ: 0,
  cameraZoom: 1,
};

export default function PacketFlowCanvas({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gradientInstance = null;
    let handleScroll = null;
    let isVisible = false;
    let rafId = null;

    const destroyGradient = () => {
      if (handleScroll) {
        window.removeEventListener("scroll", handleScroll);
        handleScroll = null;
      }
      if (gradientInstance) {
        if (typeof gradientInstance.destroy === "function") {
          gradientInstance.destroy();
        } else if (typeof gradientInstance.clean === "function") {
          gradientInstance.clean();
        }
        gradientInstance = null;
      }
    };

    const initGradient = async () => {
      if (gradientInstance || !canvas) return;
      try {
        const { NeatGradient } = await import("@firecms/neat");
        if (!isVisible || !canvas) return;

        if (canvas.clientWidth === 0 || canvas.clientHeight === 0) {
          setTimeout(initGradient, 50);
          return;
        }

        gradientInstance = new NeatGradient({
          ref: canvas,
          ...config
        });

        handleScroll = () => {
          if (gradientInstance && !rafId) {
            rafId = requestAnimationFrame(() => {
              if (gradientInstance) {
                gradientInstance.yOffset = window.scrollY;
              }
              rafId = null;
            });
          }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        // Remove NEAT watermark logo elements from DOM
        const removeWatermark = () => {
          const elements = document.querySelectorAll("a, div, span, p");
          elements.forEach((el) => {
            if (
              el.innerText?.trim() === "NEAT" ||
              el.href?.includes("neat") ||
              el.href?.includes("firecms") ||
              el.className?.toString().includes("neat")
            ) {
              el.remove();
            }
          });
        };

        removeWatermark();
      } catch (err) {
        console.error("NeatGradient initialization failed:", err);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          initGradient();
        }
      },
      { threshold: 0, rootMargin: "100px" }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      destroyGradient();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={`overflow-hidden pointer-events-none ${className || ""}`}>
      <canvas
        ref={canvasRef}
        id="gradient"
        className="absolute -top-[12%] -left-[12%] w-[124%] h-[124%] sm:-top-[4%] sm:-left-[4%] sm:w-[108%] sm:h-[108%] block max-w-none max-h-none object-cover pointer-events-none opacity-100 sm:opacity-90"
      />
    </div>
  );
}