"use client";

import DiagonalWavesCanvas from "./DiagonalWavesCanvas";
import { useText } from "@/components/layout/PageTextProvider";

export default function ConnectHeroSection() {
  const t = useText();
  
  return (
    <section
      id="connect-hero"
      className="relative h-[60vh] min-h-[350px] px-5 overflow-hidden bg-[#013144] flex items-center justify-center pt-12 sm:pt-0"
    >
      <DiagonalWavesCanvas className="absolute inset-0 block w-full h-full z-[1] pointer-events-none" />
      <div className="absolute top-[-60px] right-[-60px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,204,156,0.15)_0%,transparent_70%)] rounded-full z-[2] pointer-events-none"></div>
      <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-br from-[#013144]/30 via-[#013144]/10 to-[#013144]/30 backdrop-blur-[2px]"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-oswald uppercase tracking-tighter leading-tight mb-4 text-white">
          {t("connect-now", "hero.titlePrefix", "Connect")} <span className="text-[#f6a200]">{t("connect-now", "hero.titleHighlight", "Now")}</span>
        </h1>
        <p className="text-white/70 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          {t("connect-now", "hero.description", "Let's build the future of brokerage together.")}
        </p>
      </div>
    </section>
  );
}