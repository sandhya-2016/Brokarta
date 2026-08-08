"use client";

import NoiseWaveCanvas from "./NoiseWaveCanvas";
import { useText } from "@/components/layout/PageTextProvider";

export default function HeroSection() {
    const t = useText();

  return (
    <section
      id="about-hero"
      className="relative h-[60vh] min-h-[350px] px-5 bg-[#010f1a] flex items-center justify-center overflow-hidden pt-12 sm:pt-0"
    >
      {/* Background glow orbs */}
      <div className="absolute w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(0,204,156,0.15)_0%,transparent_70%)] top-[-200px] left-[-150px] animate-[pulseSoft_18s_ease-in-out_infinite_alternate] pointer-events-none mix-blend-screen"></div>
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(103,143,231,0.1)_0%,transparent_70%)] top-[-100px] right-[-100px] animate-[pulseSoft_22s_ease-in-out_infinite_alternate] pointer-events-none mix-blend-screen"></div>
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.1)_0%,transparent_70%)] bottom-[-100px] left-[30%] animate-[pulseSoft_16s_ease-in-out_infinite_alternate] pointer-events-none mix-blend-screen"></div>
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(246,162,0,0.1)_0%,transparent_70%)] top-[20px] left-[40%] animate-[pulseSoft_20s_ease-in-out_infinite_alternate] pointer-events-none mix-blend-screen"></div>
 
      <NoiseWaveCanvas className="absolute inset-0 w-full h-full z-[1] pointer-events-none opacity-80" />
      <div className="absolute inset-0 z-[3] pointer-events-none opacity-4 bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_512_512%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.75%22_numOctaves=%224%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22/%3E%3C/svg%3E')]"></div>
      <div className="absolute inset-0 z-[4] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(1,15,26,0.9)_100%)]"></div>

      <div className="relative z-10 text-center w-full max-w-[900px]">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-oswald uppercase tracking-tighter leading-tight mb-4 text-white">
          {t("about-us", "hero.titleLine1", "WE ARE")} <span className="text-[#f6a200] drop-shadow-[0_0_40px_rgba(246,162,0,0.4)]">{t("about-us", "hero.titleLine2", "BROKARTA")}</span>
        </h1>
        <p className="text-white/70 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          {t("about-us", "hero.description", "The digital infrastructure built exclusively for the modern real estate broker.")}
        </p>
      </div>
    </section>
  );
}