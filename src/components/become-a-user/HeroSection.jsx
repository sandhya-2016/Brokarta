"use client";

import { useEffect, useRef, useState } from "react";
import WavesCanvas from "./WavesCanvas";
import ParticlesCanvas from "./ParticlesCanvas";
import { useText } from "@/components/layout/PageTextProvider";

export default function HeroSection() {
  const t = useText();
  const containerRef = useRef(null);
  const [heroRevealed, setHeroRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHeroRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="become-user-section"
      className="relative h-[60vh] min-h-[350px] px-5 overflow-hidden bg-[#011627] flex items-center justify-center pt-12 sm:pt-0"
    >
      <WavesCanvas className="absolute inset-0 w-full h-full z-0" />
      <ParticlesCanvas className="absolute inset-0 w-full h-full z-[1] pointer-events-none" />

      <div
        ref={containerRef}
        className="relative z-10 text-center w-full flex flex-col items-center"
      >
        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-black font-oswald uppercase tracking-tight leading-tight mb-4 text-white max-w-full">
          <span className="inline-block overflow-hidden mr-2">
            <span
              className={`block transition-transform duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${heroRevealed ? "translate-y-0" : "translate-y-full"
                }`}
            >
              {t("become-a-user", "hero.titlePrefix", "Network of")}
            </span>
          </span>
          <span className="inline-block overflow-hidden">
            <span
              className={`block bg-[#f6a200] bg-clip-text text-transparent transition-transform duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 ${heroRevealed ? "translate-y-0" : "translate-y-full"
                }`}
            >
              {t("become-a-user", "hero.titleHighlight", "Tomorrow")}
            </span>
          </span>
        </h2>

        {/* Tagline */}
        <p
          className={`text-white/70 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto transition-all duration-900 delay-[420ms] ${heroRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          {t("become-a-user", "hero.description", "Join thousands of verified brokers already closing faster, collaborating smarter, and building a better real estate ecosystem—together.")}
        </p>
      </div>
    </section>
  );
}