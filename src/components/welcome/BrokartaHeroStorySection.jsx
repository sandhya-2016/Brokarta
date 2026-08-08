"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Handshake,
  CircleUserRound,
  UserCheck,
  Building2,
  PhoneCall,
  Bell

} from "lucide-react";
import { useText } from "@/components/layout/PageTextProvider";

// 1. NeatGradient configurations
const neatConfig = {
  colors: [
    { color: "#013144", enabled: true },
    { color: "#00cc9c", enabled: true },
    { color: "#f6a200", enabled: true },
    { color: "#02647e", enabled: true },
    { color: "#001a1a", enabled: true },
    { color: "#000000", enabled: false },
  ],
  speed: 2.5,
  horizontalPressure: 5,
  verticalPressure: 5,
  waveFrequencyX: 2,
  waveFrequencyY: 3,
  waveAmplitude: 6,
  shadows: 2,
  highlights: 0,
  colorBrightness: 1.05,
  colorSaturation: 1.15,
  wireframe: false,
  colorBlending: 5,
  backgroundColor: "#013144",
  backgroundAlpha: 1,
  grainScale: 0,
  grainSparsity: 0,
  grainIntensity: 0,
  grainSpeed: 0,
  resolution: 0.5,
  yOffset: 0.0999755859375,
  yOffsetWaveMultiplier: 1,
  yOffsetColorMultiplier: 4.8,
  yOffsetFlowMultiplier: 5.3,
  flowDistortionA: 3.7,
  flowDistortionB: 0.8,
  flowScale: 1.6,
  flowEase: 0.32,
  flowEnabled: true,
  enableProceduralTexture: false,
  transparentTextureVoid: true,
  textureVoidLikelihood: 0.29,
  textureVoidWidthMin: 120,
  textureVoidWidthMax: 420,
  textureBandDensity: 2.9,
  textureColorBlending: 0.06,
  textureSeed: 536,
  textureEase: 0.93,
  proceduralBackgroundColor: "#013144",
  textureShapeTriangles: 48,
  textureShapeCircles: 15,
  textureShapeBars: 15,
  textureShapeSquiggles: 27,
  domainWarpEnabled: false,
  domainWarpIntensity: 0,
  domainWarpScale: 2.4,
  vignetteIntensity: 0.45,
  vignetteRadius: 0.55,
  fresnelEnabled: false,
  fresnelPower: 2.7,
  fresnelIntensity: 1.3,
  fresnelColor: "#F7E7CE",
  iridescenceEnabled: false,
  iridescenceIntensity: 0.5,
  iridescenceSpeed: 1,
  bloomIntensity: 0,
  bloomThreshold: 0.6,
  chromaticAberration: 0,
  shapeType: "ribbon",
  shapeRotationX: 0.348,
  shapeRotationY: -26.783,
  shapeRotationZ: -0.29,
  shapeAutoRotateSpeedX: 0.15,
  shapeAutoRotateSpeedY: 0.25,
  sphereRadius: 15,
  torusRadius: 15,
  torusTube: 5,
  cylinderRadius: 10,
  cylinderHeight: 40,
  planeBend: 2.3,
  planeTwist: -2.9,
  silhouetteFade: 0.83,
  cylinderFade: 0.08,
  ribbonFade: 0.31,
  flatShading: false,
  cameraLock: false,
  cameraX: 0,
  cameraY: 0,
  cameraZ: 0,
  cameraRotationX: -0.014,
  cameraRotationY: -0.238,
  cameraRotationZ: 0,
  cameraZoom: 1,
};

// 3. Inner ScrollStack Components
export function ScrollStackItem({ children, className = "", index = 0 }) {
  return (
    <div
      className={`scroll-stack-card sticky top-24 sm:top-28 lg:top-32 w-full p-[2.5px] rounded-[20px] sm:rounded-[28px] lg:rounded-[36px] shadow-[0_10px_25px_rgba(0,0,0,0.25)] box-border overflow-hidden bg-[#012535] flex flex-col ${className}`}
      style={{
        zIndex: (index + 1) * 10,
      }}
    >
      {/* Animated Conic Gradient Border */}
      <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent,#00cc9c,#f6a200,transparent)] animate-border-spin z-0 pointer-events-none opacity-85" />

      {/* Inner Card Container */}
      <div
        className="relative z-10 w-full flex-1 bg-[#012535] rounded-[18px] sm:rounded-[26px] lg:rounded-[34px] p-5 sm:p-7 md:p-8 text-white flex flex-col justify-center"
      >
        {children}
      </div>
    </div>
  );
}

export function ScrollStack({ children, className = "" }) {
  const t = useText();

  return (
    <div className={`relative w-full bg-[#013144] py-8 sm:py-12 lg:py-14 px-3 sm:px-6 md:px-8 ${className}`}>
      {/* Top Header Text */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-4 relative z-20">
        <h2 className="text-white font-black text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl xl:text-[52px] font-oswald tracking-tight leading-tight uppercase">
          {t("home", "story.headingPrefix", "Grow Faster.")} <span className="text-[#f6a200]"> {t("home", "story.headingHighlight", "Close Smarter.")}</span>
          <br className="hidden sm:block" /> {t("home", "story.headingSuffix", "Everything a Broker needs.")}
        </h2>
      </div>

      {/* Cards Stack Column */}
      <div className="relative w-full max-w-3xl lg:max-w-4xl mx-auto flex flex-col gap-24 sm:gap-40 lg:gap-52 pb-16 sm:pb-24">
        {children}
      </div>
    </div>
  );
}

// 4. Main Component Export
export default function BrokartaHeroStorySection() {
  const t = useText();
  const canvasRef = useRef(null);

  // 2. Feature Story Data with useText
  const heroStoryFeatures = [
    {
      title: t("home", "story.feature1.title", "Verified Network"),
      description: t("home", "story.feature1.desc", "Connect with brokers who are active—not names sitting in a dead database."),
      img: "/images/Home/UserCheck.png",
      bgGradient: "bg-gradient-to-br from-[#063b4e]/95 via-[#012535]/95 to-[#001724]",
      accentBorder: "border-amber-500/40",
      glow: "bg-amber-500/25",
      iconBg: "bg-amber-500/20 border-amber-400/30",
      iconColor: "text-amber-400",
      icon: UserCheck
    },
    {
      title: t("home", "story.feature2.title", "Property Alerts"),
      description: t("home", "story.feature2.desc", "Get notified when new properties match your search."),
      img: "/images/Home/Property-Alerts.png",
      bgGradient: "bg-gradient-to-br from-[#044247]/95 via-[#01272b]/95 to-[#00181b]",
      accentBorder: "border-teal-500/40",
      glow: "bg-teal-500/25",
      iconBg: "bg-teal-500/20 border-teal-400/30",
      iconColor: "text-teal-400",
      icon: Bell
    },
    {
      title: t("home", "story.feature3.title", "Intelligent Listings"),
      description: t("home", "story.feature3.desc", "Listings built by brokers, for brokers—every detail a deal actually needs."),
      img: "/images/Home/Building2.png",
      bgGradient: "bg-gradient-to-br from-[#2e1d4b]/95 via-[#1b1030]/95 to-[#10081f]",
      accentBorder: "border-purple-500/40",
      glow: "bg-purple-500/25",
      iconBg: "bg-purple-500/20 border-purple-400/30",
      iconColor: "text-purple-400",
      icon: Building2
    },
    {
      title: t("home", "story.feature4.title", "Structured Collaboration"),
      description: t("home", "story.feature4.desc", "One workspace for co-broking and referrals—built around how brokers really close deals."),
      img: "/images/Home/Handshake.png",
      bgGradient: "bg-gradient-to-br from-[#05445e]/95 via-[#022b3d]/95 to-[#011824]",
      accentBorder: "border-cyan-500/40",
      glow: "bg-cyan-500/25",
      iconBg: "bg-cyan-500/20 border-cyan-400/30",
      iconColor: "text-cyan-400",
      icon: Handshake
    },
    {
      title: t("home", "story.feature5.title", "Profile Score"),
      description: t("home", "story.feature5.desc", "A higher profile score makes your real estate profile more credible."),
      img: "/images/Home/CircleUserRound.png",
      bgGradient: "bg-gradient-to-br from-[#064e3b]/95 via-[#023326]/95 to-[#011c15]",
      accentBorder: "border-emerald-500/40",
      glow: "bg-emerald-500/25",
      iconBg: "bg-emerald-500/20 border-emerald-400/30",
      iconColor: "text-emerald-400",
      icon: CircleUserRound
    },
    {
      title: t("home", "story.feature6.title", "In-App Chat & Call"),
      description: t("home", "story.feature6.desc", "Connect with buyers and sellers securely without leaving the app."),
      img: "/images/Home/call.png",
      bgGradient: "bg-gradient-to-br from-[#4c1d3c]/95 via-[#2e0f23]/95 to-[#1c0714]",
      accentBorder: "border-pink-500/40",
      glow: "bg-pink-500/25",
      iconBg: "bg-pink-500/20 border-pink-400/30",
      iconColor: "text-pink-400",
      icon: PhoneCall
    }
  ];

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
          ...neatConfig,
        });

        handleScroll = () => {
          if (gradientInstance && !rafId) {
            rafId = requestAnimationFrame(() => {
              if (gradientInstance) {
                gradientInstance.yOffset = window.scrollY * 0.001;
              }
              rafId = null;
            });
          }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
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
    <section
      id="brokarta-hero-story"
      className="relative w-full bg-[#013144]"
    >
      {/* NeatGradient Background Canvas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="sticky top-0 h-[99vh] w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            id="hero-story-gradient"
            className="absolute -top-[12%] -left-[12%] w-[124%] h-[124%] sm:-top-[4%] sm:-left-[4%] sm:w-[108%] sm:h-[108%] block max-w-none max-h-none object-cover opacity-90 pointer-events-none transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#013144]/60 via-[#013144]/30 to-[#013144]/75 pointer-events-none" />
        </div>
      </div>

      {/* Pinned ScrollStack Container & Header */}
      <ScrollStack className="relative z-10">
        {heroStoryFeatures.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <ScrollStackItem
              key={idx}
              index={idx}
              className="bg-[#012535] text-white"
            >
              {/* DESKTOP LAYOUT (sm & above) */}
              <div className="hidden sm:grid sm:grid-cols-2 items-center gap-8 md:gap-12 h-full relative z-10">
                <motion.div
                  animate={{
                    opacity: [0.95, 1, 0.95],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="space-y-3 lg:space-y-4 py-1"
                >
                  <h3 className="text-white text-2xl lg:text-3xl xl:text-4xl font-black tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/85 text-sm lg:text-base xl:text-lg font-roboto leading-relaxed max-w-lg">
                    {item.description}
                  </p>
                </motion.div>

                <div className="flex items-center justify-center w-full h-full">
                  <motion.div
                    animate={{
                      scale: [1, 1.09, 1],
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative flex items-center justify-center w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 group"
                  >
                    <div
                      className={`absolute inset-0 ${item.glow} opacity-35 blur-3xl group-hover:opacity-70 transition-opacity duration-300 pointer-events-none`}
                    />
                    {item.img ? (
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={250}
                        height={250}
                        className={`w-full h-full object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.65)] group-hover:scale-105 transition-transform duration-300 relative z-10 ${idx === 0 ? "scale-[0.82]" : ""
                          }`}
                      />
                    ) : (
                      <IconComp
                        className={`w-20 h-20 md:w-24 md:h-24 ${item.iconColor}`}
                      />
                    )}
                  </motion.div>
                </div>
              </div>

              {/* MOBILE LAYOUT (< sm) */}
              <motion.div
                animate={{
                  opacity: [0.95, 1, 0.95],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex sm:hidden flex-col justify-center items-center text-center h-full py-3 relative z-10 space-y-4 px-2"
              >
                <h3 className="text-white text-2xl font-black tracking-tight leading-snug">
                  {item.title}
                </h3>

                <motion.div
                  animate={{
                    scale: [1, 1.04, 1],
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 group"
                >
                  <div
                    className={`absolute inset-0 ${item.glow} opacity-45 blur-2xl pointer-events-none`}
                  />
                  {item.img ? (
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={160}
                      height={160}
                      className={`w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)] relative z-10 ${idx === 0 ? "scale-[0.82]" : ""
                        }`}
                    />
                  ) : (
                    <IconComp className={`w-14 h-14 ${item.iconColor}`} />
                  )}
                </motion.div>

                <p className="text-white/90 text-base font-roboto leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </motion.div>
            </ScrollStackItem>
          );
        })}
      </ScrollStack>
    </section>
  );
}