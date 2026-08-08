"use client";

import Image from "next/image";
import { useText } from "@/components/layout/PageTextProvider";

export default function OrbitSection() {
  const t = useText();
  
  const orbitPoints = [
    {
      id: 1,
      title: t("about-us", "orbit.point1.title", "Build lasting partnerships"),
      desc: t("about-us", "orbit.point1.desc", "Trust backed by verification, not guesswork"),
      img: "/images/about-us/orbit-partnerships.png",
    },
    {
      id: 2,
      title: t("about-us", "orbit.point2.title", "Scale with confidence"),
      desc: t("about-us", "orbit.point2.desc", "A foundation that grows as your network does"),
      img: "/images/about-us/orbit-scale.png",
    },
    {
      id: 3,
      title: t("about-us", "orbit.point3.title", "Save time"),
      desc: t("about-us", "orbit.point3.desc", "Less chasing, more closing"),
      img: "/images/about-us/orbit-save-time.png",
    },
    {
      id: 4,
      title: t("about-us", "orbit.point4.title", "Reduce costs"),
      desc: t("about-us", "orbit.point4.desc", "One platform, not a patchwork of scattered tools"),
      img: "/images/about-us/orbit-reduce-costs.png",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-[#FFF9F2] to-[#FFF1E0] pt-6 pb-12 sm:py-15 px-4 sm:px-6">

      {/* Responsive hidden SVG defining the rounded translation of the user's double-stepped polygon */}
      <svg className="absolute w-0 h-0" width="0" height="0">
        <defs>
          <clipPath id="orbit-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.04 0 L 0.96 0 A 0.04 0.04 0 0 1 1 0.04 L 1 0.66 A 0.04 0.04 0 0 1 0.96 0.70 L 0.83 0.70 A 0.04 0.04 0 0 0 0.79 0.74 L 0.79 0.83 A 0.04 0.04 0 0 1 0.75 0.87 L 0.60 0.87 A 0.04 0.04 0 0 0 0.56 0.91 L 0.56 0.96 A 0.04 0.04 0 0 1 0.52 1 L 0.04 1 A 0.04 0.04 0 0 1 0 0.96 L 0 0.04 A 0.04 0.04 0 0 1 0.04 0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}
        <div>
          <h2 className="text-[#102040] text-4xl md:text-6xl font-black uppercase leading-[1.05]">
            {t("about-us", "orbit.headingPrefix", "What Changes")}
            <br />
            <span className="text-[#f6a200]">
              {t("about-us", "orbit.headingHighlight", "When You're on Brokarta")}
            </span>
          </h2>

          <p className="mt-6 max-w-lg text-lg text-[#102040]/85 leading-relaxed">
            {t("about-us", "orbit.description", "Helping businesses save time, reduce operational costs, scale with confidence, and build trusted partnerships for long-term success.")}
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative w-full h-[460px] sm:h-[440px] lg:h-[520px]">
          {/* 1. Background Shape Layer */}
          <div
            className="absolute inset-0 z-0"
            style={{ filter: "drop-shadow(0 20px 30px rgba(13,27,62,0.22))" }}
          >
            <div
              className="w-full h-full relative overflow-hidden"
              style={{ clipPath: "url(#orbit-clip)" }}
            >
              {/* Dark Gradient Main Background */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,_#0d1b3e_0%,_#0a2a4a_40%,_#0d3350_70%,_#102040_100%)]" />

              {/* Glow effect */}
              <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-cyan-400/25 blur-3xl" />

              {/* Decorative Geometric Grid Pattern (Exact Basketweave Hatching) */}
              <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='rgba(255,255,255,0.5)' stroke-width='1.5' fill='none'%3E%3Cline x1='5' y1='0' x2='5' y2='50'/%3E%3Cline x1='13' y1='0' x2='13' y2='50'/%3E%3Cline x1='21' y1='0' x2='21' y2='50'/%3E%3Cline x1='29' y1='0' x2='29' y2='50'/%3E%3Cline x1='37' y1='0' x2='37' y2='50'/%3E%3Cline x1='45' y1='0' x2='45' y2='50'/%3E%3Cline x1='50' y1='5' x2='100' y2='5'/%3E%3Cline x1='50' y1='13' x2='100' y2='13'/%3E%3Cline x1='50' y1='21' x2='100' y2='21'/%3E%3Cline x1='50' y1='29' x2='100' y2='29'/%3E%3Cline x1='50' y1='37' x2='100' y2='37'/%3E%3Cline x1='50' y1='45' x2='100' y2='45'/%3E%3Cline x1='0' y1='55' x2='50' y2='55'/%3E%3Cline x1='0' y1='63' x2='50' y2='63'/%3E%3Cline x1='0' y1='71' x2='50' y2='71'/%3E%3Cline x1='0' y1='79' x2='50' y2='79'/%3E%3Cline x1='0' y1='87' x2='50' y2='87'/%3E%3Cline x1='0' y1='95' x2='50' y2='95'/%3E%3Cline x1='55' y1='50' x2='55' y2='100'/%3E%3Cline x1='63' y1='50' x2='63' y2='100'/%3E%3Cline x1='71' y1='50' x2='71' y2='100'/%3E%3Cline x1='79' y1='50' x2='79' y2='100'/%3E%3Cline x1='87' y1='50' x2='87' y2='100'/%3E%3Cline x1='95' y1='50' x2='95' y2='100'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: "100px 100px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* GLASS CARD */}
          <div className="absolute top-[50%] sm:top-[46%] left-1/2 sm:left-[38%] -translate-x-1/2 -translate-y-1/2 z-20 w-[92%] sm:w-[72%] lg:w-[65%] rounded-[20px] sm:rounded-[24px] border border-white/35 bg-white/20 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.25)] p-3.5 sm:p-6">
            <div className="space-y-3.5 sm:space-y-5">
              {orbitPoints.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 sm:gap-4"
                >
                  <div className="relative w-12 h-12 sm:w-20 sm:h-20 flex-shrink-0">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div>
                    <p className="text-white text-xs sm:text-base md:text-lg font-bold tracking-tight leading-snug">
                      {item.title}
                    </p>
                    <p className="text-white/85 text-[11px] sm:text-sm font-normal leading-snug mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}