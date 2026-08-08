"use client";

import AuroraCanvas from "./AuroraCanvas";
import { useText } from "@/components/layout/PageTextProvider";

export default function OfferHeroSection() {
  const t = useText();

  return (
    <section id="offer-hero" className="relative h-[60vh] min-h-[350px] px-5 overflow-hidden bg-[#011e2e] flex items-center justify-center pt-12 sm:pt-0">
      {/* Background Star Layer */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 34% 42%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 55% 10%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 71% 28%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 88% 55%, rgba(255,255,255,0.5) 0%, transparent 100%)
          `
        }}
      />

      <AuroraCanvas className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

      {/* Vignette Layer */}
      <div className="absolute inset-0 z-[3] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(1,14,22,0.6)_100%)]" />

      {/* Horizon Layer */}
      <div className="absolute bottom-0 left-0 right-0 h-[120px] z-[4] pointer-events-none bg-[linear-gradient(to_top,#FFF8F6_0%,rgba(0,204,156,0.02)_60%,transparent_100%)]" />

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00cc9c]/10 blur-[120px] rounded-full z-[1]"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#f6a200]/10 blur-[100px] rounded-full z-[1]"></div>

      <div className="container mx-auto px-6 sm:px-10 relative z-10 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-oswald uppercase tracking-tighter leading-tight mb-4 text-white">
          {t("what-we-offer", "hero.titlePrefix", "Fueling the Future of")} <span className="text-[#f6a200] drop-shadow-[0_0_30px_rgba(246,162,0,0.3)]">{t("what-we-offer", "hero.titleHighlight", "Real Estate")}</span>
        </h1>
        <p className="text-white/70 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          {t("what-we-offer", "hero.description", "Discover the edge modern brokers are building on-not with just a tool but an ecosystem.")}
        </p>

      </div>
    </section>
  );
}