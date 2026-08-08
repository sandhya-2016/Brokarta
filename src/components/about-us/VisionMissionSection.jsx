"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useText } from "@/components/layout/PageTextProvider";

export default function VisionMissionSection() {
  const t = useText();
  const [activeVMSection, setActiveVMSection] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("vmSection");
      if (section) {
        const rect = section.getBoundingClientRect();
        const triggerPoint = window.innerHeight * 0.5;
        // When the middle/bottom part of section scrolls past trigger point, switch active card
        if (rect.top + rect.height / 2 < triggerPoint) {
          setActiveVMSection(2);
        } else {
          setActiveVMSection(1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="vmSection" className="bg-[#fdfcfb] pt-8 pb-4 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[76rem] mx-auto">
        {/* Mobile Section Heading */}
        <h2 className="text-[#013144] text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl lg:hidden font-black leading-[0.9] uppercase font-oswald mb-6">
          {t("about-us", "vision.standardPrefix", "Defining the")}<br />
          <span className="text-[#f6a200] drop-shadow-[0_0_40px_rgba(246,162,0,0.4)]">
            {t("about-us", "vision.standardHighlight", "BROKARTA")}
          </span> {t("about-us", "vision.standardSuffix", "Standard")}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-stretch">
          {/* Left sticky panel */}
          <div className="relative flex flex-col h-full">
            <div className="relative rounded-2xl sm:rounded-[40px] lg:rounded-[50px] overflow-hidden flex-1 min-h-[380px] lg:min-h-[500px] shadow-[0_20px_50px_rgba(1,49,68,0.15)] group flex flex-col justify-end">
              <Image
                src="/images/about-us/aboutus.jpg"
                alt="Office meeting"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#053a3e] via-[rgba(44,179,147,0.4)] to-transparent"></div>
              <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col justify-end text-white">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight tracking-tight mb-2 sm:mb-3">
                  {t("about-us", "vision.leftBadgePrefix", "Built for Brokers.")}<br />
                  <span className="text-[#eb9010]">{t("about-us", "vision.leftBadgeHighlight", "Designed for Growth.")}</span>
                </h3>
                <p className="text-white/90 text-sm sm:text-base lg:text-lg font-semibold">
                  {t("about-us", "vision.leftDescription", "Brokarta is a next-generation digital platform created exclusively for real estate brokers who want to work smarter, close faster, and grow sustainably.")}
                </p>
              </div>
            </div>
          </div>

          {/* Right panels */}
          <div className="w-full flex flex-col justify-between h-full">
            <div className="flex flex-col justify-between h-full gap-4 sm:gap-6">
              {/* Desktop Section Heading */}
              <h2 className="hidden lg:block text-[#013144] text-4xl lg:text-5xl xl:text-6xl font-black leading-[0.9] uppercase font-oswald mb-2">
                {t("about-us", "vision.standardPrefix", "Defining the")}<br />
                <span className="text-[#f6a200] drop-shadow-[0_0_40px_rgba(246,162,0,0.4)]">
                  {t("about-us", "vision.standardHighlight", "BROKARTA")}
                </span> {t("about-us", "vision.standardSuffix", "Standard")}
              </h2>

              {/* Vision Card */}
              <div
                onClick={() => setActiveVMSection(1)}
                className={`p-6 sm:p-6 lg:p-7 border-2 rounded-2xl sm:rounded-[24px] lg:rounded-[32px] transition-all duration-500 cursor-pointer ${activeVMSection === 1
                    ? "bg-[#f6a200] border-[#f6a200] shadow-[0_15px_30px_rgba(246,162,0,0.2)] scale-[1.01] opacity-100"
                    : "bg-white border-slate-100 opacity-60 hover:opacity-80"
                  }`}
              >
                <span
                  className={`inline-block py-1 px-3.5 sm:px-4 rounded-full font-extrabold text-[12px] sm:text-[14px] uppercase tracking-wider mb-2 sm:mb-3 ${activeVMSection === 1
                      ? "text-[#f6a200] bg-white"
                      : "text-[#94a3b8] bg-slate-100"
                    }`}
                >
                  {t("about-us", "vision.visionBadge", "Our Vision")}
                </span>
                <p
                  className={`text-sm sm:text-base lg:text-lg font-semibold leading-relaxed transition-colors duration-500 ${activeVMSection === 1 ? "text-white" : "text-slate-600"
                    }`}
                >
                  {t("about-us", "vision.visionText", "To become the operating layer of the broker ecosystem formalizing how deals move, strengthening trust through verification, and letting collaboration scale across markets")}
                </p>
              </div>

              {/* Mission Card */}
              <div
                onClick={() => setActiveVMSection(2)}
                className={`p-6 sm:p-6 lg:p-7 border-2 rounded-2xl sm:rounded-[24px] lg:rounded-[32px] transition-all duration-500 cursor-pointer ${activeVMSection === 2
                    ? "bg-[#00cc9c] border-[#00cc9c] shadow-[0_15px_30px_rgba(0,204,156,0.2)] scale-[1.01] opacity-100"
                    : "bg-white border-slate-100 opacity-60 hover:opacity-80"
                  }`}
              >
                <span
                  className={`inline-block py-1 px-3.5 sm:px-4 rounded-full font-extrabold text-[12px] sm:text-[14px] uppercase tracking-wider mb-2 sm:mb-3 ${activeVMSection === 2
                      ? "text-[#00cc9c] bg-white"
                      : "text-[#94a3b8] bg-slate-100"
                    }`}
                >
                  {t("about-us", "vision.missionBadge", "Our Mission")}
                </span>
                <p
                  className={`text-sm sm:text-base lg:text-lg font-semibold leading-relaxed transition-colors duration-500 ${activeVMSection === 2 ? "text-white" : "text-slate-600"
                    }`}
                >
                  {t("about-us", "vision.missionText", "To build the essential digital infrastructure for real estate brokers uniting search, listings, B2B deals, profiles, and communication in one trusted platform")}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}