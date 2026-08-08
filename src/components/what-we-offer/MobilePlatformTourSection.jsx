"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FiUserPlus,
  FiUsers,
  FiSearch,
  FiMessageSquare,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { TbChartFunnel } from "react-icons/tb";
import { FaHandshake } from "react-icons/fa6";
import { useText } from "@/components/layout/PageTextProvider";

// Mapping feature stages (1 to 6) to corresponding SVGs in public/images/app-screens/
const svgMap = {
  1: "/images/app-screens/verified-screen.svg",
  2: "/images/app-screens/profile-screen.svg",
  3: "/images/app-screens/search-screen.svg",
  4: "/images/app-screens/smartchat-screen.svg",
  5: "/images/app-screens/data-pipline.svg",
  6: "/images/app-screens/dealclose-screen.svg",
};

export default function MobilePlatformTourSection() {
  const t = useText();
  const [activeFeature, setActiveFeature] = useState(1);
  const [isDescOpen, setIsDescOpen] = useState(false);

  // Hardcoded tour stages data with useText
  const tourStages = [
    {
      n: 1,
      title: t("what-we-offer", "mobileTour.stage1.title", "Get Verified"),
      desc: t("what-we-offer", "mobileTour.stage1.desc", "Get verified instantly and start listing in seconds. Every profile is checked and certified by the regional board- zero spam, 100% trust."),
      url: "/features/verified",
      color: "#f6a200",
      icon: FiUserPlus,
    },
    {
      n: 2,
      title: t("what-we-offer", "mobileTour.stage2.title", "Build Your Profile"),
      desc: t("what-we-offer", "mobileTour.stage2.desc", "Turn your track record into a credible, verifiable real estate profile- not just a name and a phone number."),
      url: "/features/profile",
      color: "#00cc9c",
      icon: FiUsers,
    },
    {
      n: 3,
      title: t("what-we-offer", "mobileTour.stage3.title", "Search Inventory"),
      desc: t("what-we-offer", "mobileTour.stage3.desc", "Explore thousands of listings with seamless precision, and find the right opportunities without the noise."),
      url: "/features/search",
      color: "#ffffff",
      icon: FiSearch,
    },
    {
      n: 4,
      title: t("what-we-offer", "mobileTour.stage4.title", "Smart Chat & Deals"),
      desc: t("what-we-offer", "mobileTour.stage4.desc", "Connect directly with verified brokers, negotiate terms in private, and keep deal history organized in one place."),
      url: "/features/smartchat",
      color: "#f6a200",
      icon: FiMessageSquare,
    },
    {
      n: 5,
      title: t("what-we-offer", "mobileTour.stage5.title", "Deal Pipeline"),
      desc: t("what-we-offer", "mobileTour.stage5.desc", "Track leads, site visits, negotiations, and closed deals in an interactive real-time broker pipeline."),
      url: "/features/pipeline",
      color: "#00cc9c",
      icon: TbChartFunnel,
    },
    {
      n: 6,
      title: t("what-we-offer", "mobileTour.stage6.title", "Close Deals Faster"),
      desc: t("what-we-offer", "mobileTour.stage6.desc", "Finalize transactions with complete confidence, track co-broking commissions, and build your long-term reputation."),
      url: "/features/dealclose",
      color: "#f6a200",
      icon: FaHandshake,
    },
  ];

  // Hardcoded platform tour content with useText
  const platformTourContent = {
    headingLine1: t("what-we-offer", "mobileTour.headingLine1", "Your Journey"),
    headingLine2: t("what-we-offer", "mobileTour.headingLine2", "Starts Here"),
  };

  // Auto-play animation cycling through features every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev % tourStages.length) + 1);
    }, 4000);

    return () => clearInterval(timer);
  }, [tourStages.length]);

  const handlePrev = () => {
    setActiveFeature((prev) => (prev === 1 ? tourStages.length : prev - 1));
  };

  const handleNext = () => {
    setActiveFeature((prev) => (prev % tourStages.length) + 1);
  };

  return (
    <section className="bg-[#011627] py-8 px-3 text-center flex flex-col items-center overflow-hidden min-h-screen justify-center">
      {/* Mobile Heading */}
      <h2
        className="text-white font-black font-oswald uppercase tracking-tighter leading-tight mb-3"
        style={{ fontSize: "clamp(1.75rem, 6vw, 2.5rem)" }}
      >
        {platformTourContent.headingLine1} <br />
        <span className="text-[#00cc9c]">{platformTourContent.headingLine2}</span>
      </h2>

      {/* Mobile App Screen SVG Container with Left/Right Navigation Switch */}
      <div className="relative w-full max-w-[420px] flex items-center justify-between gap-1 sm:gap-3 my-2">
        {/* Previous (Left Arrow) Switch Button */}
        <button
          onClick={handlePrev}
          className="z-30 w-10 h-10 min-w-[40px] rounded-full bg-white/10 hover:bg-[#00cc9c]/30 border border-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 active:scale-90 shadow-xl group"
          aria-label="Previous Stage"
          title="Previous Stage"
        >
          <FiChevronLeft className="w-6 h-6 text-[#00cc9c] group-hover:scale-110 transition-transform" />
        </button>

        {/* Screen Container */}
        <div className="relative flex-1 max-w-[310px] min-[380px]:max-w-[340px] sm:max-w-[380px] h-[62vh] min-h-[420px] max-h-[600px] aspect-[430/700] flex items-center justify-center">
          {tourStages.map((stage) => {
            const isActive = activeFeature === stage.n;
            const svgPath = svgMap[stage.n];

            return (
              <div
                key={`m-screen-${stage.n}`}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${isActive
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-95 pointer-events-none z-0"
                  }`}
              >
                <Image
                  src={svgPath}
                  alt={stage.title}
                  fill
                  sizes="(max-width: 768px) 400px, 100vw"
                  className="object-contain"
                  priority={stage.n === 1}
                />
              </div>
            );
          })}
        </div>

        {/* Next (Right Arrow) Switch Button */}
        <button
          onClick={handleNext}
          className="z-30 w-10 h-10 min-w-[40px] rounded-full bg-white/10 hover:bg-[#00cc9c]/30 border border-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 active:scale-90 shadow-xl group"
          aria-label="Next Stage"
          title="Next Stage"
        >
          <FiChevronRight className="w-6 h-6 text-[#00cc9c] group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Stage Step Indicator Dots */}
      <div className="flex items-center justify-center gap-2 my-2 z-20">
        {tourStages.map((s) => (
          <button
            key={`dot-${s.n}`}
            onClick={() => setActiveFeature(s.n)}
            className={`h-2.5 rounded-full transition-all duration-300 ${activeFeature === s.n ? "w-7 bg-[#00cc9c]" : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
            aria-label={`Go to stage ${s.n}`}
          />
        ))}
      </div>

      {/* Accordion Feature Box Container with Left-Right Swap Animation */}
      <div className="relative w-full max-w-[320px] min-[380px]:max-w-[360px] sm:max-w-[400px] mt-2 min-h-[64px]">
        {tourStages.map((stage) => {
          const isActive = activeFeature === stage.n;
          const IconComponent = stage.icon;

          return (
            <div
              key={`m-acc-${stage.n}`}
              className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive
                  ? "relative opacity-100 translate-x-0 scale-100 z-10 pointer-events-auto"
                  : "absolute inset-0 opacity-0 translate-x-12 scale-95 z-0 pointer-events-none"
                }`}
            >
              <div className="w-full rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden shadow-lg">
                <button
                  onClick={() => setIsDescOpen(!isDescOpen)}
                  className="w-full p-3 flex items-center justify-between gap-3 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
                      style={{
                        backgroundColor: stage.color === "#ffffff" ? "#ffffff" : stage.color,
                        color: stage.color === "#ffffff" ? "#013144" : "#ffffff",
                      }}
                    >
                      <IconComponent className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-white text-base sm:text-lg font-bold font-oswald tracking-wide">
                      {stage.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="text-[11px] font-semibold tracking-wide uppercase opacity-75">
                      {isDescOpen ? t("what-we-offer", "mobileTour.close", "Close") : t("what-we-offer", "mobileTour.info", "Info")}
                    </span>
                    <FiChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${isDescOpen ? "rotate-180 text-white" : "rotate-0"
                        }`}
                    />
                  </div>
                </button>

                {/* Expandable Dropdown Description */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${isDescOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-3.5 pt-1 text-slate-300 text-xs sm:text-sm font-medium leading-relaxed text-left border-t border-white/5">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}