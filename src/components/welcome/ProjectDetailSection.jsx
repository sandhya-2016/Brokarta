"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Home, UserCheck, Download } from "lucide-react";
import { useText } from "@/components/layout/PageTextProvider";

export default function ProjectDetailSection() {
  const t = useText();
  const sectionRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const [showContent, setShowContent] = useState(false);
  const [counts, setCounts] = useState({ count1: 0, count2: 0, count3: 0 });

  // Hardcoded data with useText
  const typingLine1 = t("home", "project.typingLine1", "The Smarter Digital Platform");
  const typingLine2 = t("home", "project.typingLine2", "For Broker Growth.");
  const stats = {
    listings: {
      target: 115,
      label: t("home", "project.stats.listingsLabel", "Active Listings"),
      suffix: t("home", "project.stats.listingsSuffix", "K+")
    },
    users: {
      target: 10,
      label: t("home", "project.stats.usersLabel", "Verified & Active Users"),
      suffix: t("home", "project.stats.usersSuffix", "K+")
    },
    downloads: {
      target: 200,
      label: t("home", "project.stats.downloadsLabel", "App Downloads"),
      suffix: t("home", "project.stats.downloadsSuffix", "k")
    }
  };

  useEffect(() => {
    if (!showContent) return;

    const targets = { c1: 0, c2: 0, c3: 0 };
    const tween = gsap.to(targets, {
      c1: stats.listings.target,
      c2: stats.users.target,
      c3: stats.downloads.target,
      duration: 2.2,
      ease: "power3.out",
      onUpdate: () => {
        setCounts({
          count1: Math.round(targets.c1),
          count2: Math.round(targets.c2),
          count3: Math.round(targets.c3),
        });
      },
    });

    return () => {
      tween.kill();
    };
  }, [showContent]);

  useEffect(() => {
    const text1 = typingLine1;
    const text2 = typingLine2;
    const totalLen = text1.length + text2.length;
    const ctx = gsap.context(() => { });

    const typeText = (element, text, speed = 0.04, onProgress = null) => {
      return new Promise((resolve) => {
        const obj = { count: 0 };
        if (!element) return resolve();

        let lastCount = -1;
        ctx.add(() => {
          gsap.to(obj, {
            count: text.length,
            duration: text.length * speed,
            ease: "none",

            onUpdate: () => {
              const currentCount = Math.floor(obj.count);
              if (onProgress) {
                onProgress(obj.count / text.length);
              }
              // Performance Optimization: Only update DOM when character index actually changes
              if (currentCount !== lastCount) {
                lastCount = currentCount;
                if (element) {
                  element.innerHTML =
                    text.slice(0, currentCount) +
                    '<span class="inline-block w-[3px] h-[0.9em] bg-current ml-1 align-middle animate-blink"></span>';
                }
              }
            },

            onComplete: () => {
              if (element) {
                element.textContent = text;
              }
              resolve();
            },
          });
        });
      });
    };

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        let triggered60 = false;
        const checkTrigger = (overallRatio) => {
          if (!triggered60 && overallRatio >= 0.6) {
            triggered60 = true;
            setShowContent(true);
          }
        };

        await typeText(line1Ref.current, text1, 0.04, (progress) => {
          checkTrigger((progress * text1.length) / totalLen);
        });

        await typeText(line2Ref.current, text2, 0.04, (progress) => {
          checkTrigger((text1.length + progress * text2.length) / totalLen);
        });

        // Fallback safety to guarantee content is shown when complete
        setShowContent(true);
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-0 lg:min-h-[90vh] flex flex-col justify-center py-4 sm:py-8 lg:py-14 bg-[#f4f7f9] overflow-hidden"
    >
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f6a200]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#38d39f]/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">

          {/* LEFT COLUMN: Typing Animation + Item Section */}
          <div className="flex flex-col gap-4 sm:gap-8">
            {/* 1st SECTION: Typing Animation */}
            <div>
              <h2 className="font-black tracking-tight leading-[1.05]">
                <div>
                  <span
                    ref={line1Ref}
                    className="block text-[#013144] text-2xl min-[380px]:text-3xl sm:text-5xl md:text-6xl xl:text-[72px]"
                  />
                </div>

                <div className="mt-0.5 sm:mt-1">
                  <span
                    ref={line2Ref}
                    className="block text-[#f6a200] text-2xl min-[380px]:text-3xl sm:text-5xl md:text-6xl xl:text-[72px]"
                  />
                </div>
              </h2>
            </div>

            {/* 2nd SECTION: Item Section (Stat Cards) */}
            <div className={`w-full transition-all duration-700 ease-out ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
              }`}>
              <div className="grid grid-cols-3 gap-2 min-[480px]:gap-4 items-start">
                {/* Item 1: Active Listings */}
                <div className="flex flex-col">
                  {/* Overlapping Icon Badges */}
                  <div className="flex items-center -space-x-3.5 min-[400px]:-space-x-5 mb-3 sm:mb-5 group/badge cursor-pointer">
                    <div className="w-8 h-8 min-[400px]:w-10 min-[400px]:h-10 sm:w-11 sm:h-11 rounded-full bg-[#38d39f]/15 border-2 border-white flex items-center justify-center animate-[badgePulse_3s_ease-in-out_infinite] group-hover/badge:-translate-x-2 transition-transform duration-500" />
                    <div className="w-8 h-8 min-[400px]:w-10 min-[400px]:h-10 sm:w-11 sm:h-11 rounded-full bg-[#38d39f]/35 border-2 border-white flex items-center justify-center z-10 animate-[badgePulse_3s_ease-in-out_1.5s_infinite] group-hover/badge:-translate-x-1 transition-transform duration-500" />
                    <div className="w-8 h-8 min-[400px]:w-10 min-[400px]:h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#38d39f] to-[#00cc9c] border-2 border-white flex items-center justify-center text-white shadow-md z-20 animate-[badgeFloat_3s_ease-in-out_infinite] group-hover/badge:scale-110 group-hover/badge:rotate-6 transition-all duration-300 shadow-[#38d39f]/40">
                      <Home className="w-4 h-4 min-[400px]:w-5 min-[400px]:h-5 group-hover/badge:scale-110 transition-transform duration-300" strokeWidth={2.2} />
                    </div>
                  </div>

                  {/* Metric with Vertical Animated Accent Line */}
                  <div className="flex items-start gap-1.5 min-[400px]:gap-3">
                    <div className="relative w-[2.5px] min-[400px]:w-[3.5px] h-6 min-[400px]:h-8 sm:h-10 rounded-full bg-gradient-to-b from-[#38d39f] via-[#00cc9c] to-[#38d39f] [background-size:100%_200%] animate-[barColorFlow_3s_ease-in-out_infinite] shrink-0 mt-0.5 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-transparent -translate-y-full animate-[barLightSlide_2s_ease-in-out_infinite]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base min-[380px]:text-xl sm:text-3xl xl:text-4xl font-extrabold text-[#013144] tracking-tight leading-none">
                        {counts.count1}{stats.listings.suffix}
                      </span>
                      <span className="text-[10px] min-[380px]:text-xs sm:text-sm font-medium text-slate-500 mt-1 sm:mt-2 leading-tight">
                        {stats.listings.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Item 2: Verified & Active Users */}
                <div className="flex flex-col">
                  {/* Overlapping User Icon Badges */}
                  <div className="flex items-center -space-x-3.5 min-[400px]:-space-x-5 mb-3 sm:mb-5 group/badge cursor-pointer">
                    <div className="w-8 h-8 min-[400px]:w-10 min-[400px]:h-10 sm:w-11 sm:h-11 rounded-full bg-[#02647e]/15 border-2 border-white flex items-center justify-center animate-[badgePulse_3s_ease-in-out_infinite] group-hover/badge:-translate-x-2 transition-transform duration-500" />
                    <div className="w-8 h-8 min-[400px]:w-10 min-[400px]:h-10 sm:w-11 sm:h-11 rounded-full bg-[#02647e]/35 border-2 border-white flex items-center justify-center z-10 animate-[badgePulse_3s_ease-in-out_1.5s_infinite] group-hover/badge:-translate-x-1 transition-transform duration-500" />
                    <div className="w-8 h-8 min-[400px]:w-10 min-[400px]:h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#02647e] to-[#013144] border-2 border-white flex items-center justify-center text-white shadow-md z-20 animate-[badgeFloat_3s_ease-in-out_infinite] group-hover/badge:scale-110 group-hover/badge:rotate-6 transition-all duration-300 shadow-[#02647e]/40">
                      <UserCheck className="w-4 h-4 min-[400px]:w-5 min-[400px]:h-5 group-hover/badge:scale-110 transition-transform duration-300" strokeWidth={2.2} />
                    </div>
                  </div>

                  {/* Metric with Vertical Animated Accent Line */}
                  <div className="flex items-start gap-1.5 min-[400px]:gap-3">
                    <div className="relative w-[2.5px] min-[400px]:w-[3.5px] h-6 min-[400px]:h-8 sm:h-10 rounded-full bg-gradient-to-b from-[#02647e] via-[#013144] to-[#013144] [background-size:100%_200%] animate-[barColorFlow_3s_ease-in-out_infinite] shrink-0 mt-0.5 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-transparent -translate-y-full animate-[barLightSlide_2s_ease-in-out_infinite]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base min-[380px]:text-xl sm:text-3xl xl:text-4xl font-extrabold text-[#013144] tracking-tight leading-none">
                        {counts.count2}{stats.users.suffix}
                      </span>
                      <span className="text-[10px] min-[380px]:text-xs sm:text-sm font-medium text-slate-500 mt-1 sm:mt-2 leading-tight">
                        {stats.users.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Item 3: App Downloads */}
                <div className="flex flex-col">
                  {/* Overlapping Icon Badges */}
                  <div className="flex items-center -space-x-3.5 min-[400px]:-space-x-5 mb-3 sm:mb-5 group/badge cursor-pointer">
                    <div className="w-8 h-8 min-[400px]:w-10 min-[400px]:h-10 sm:w-11 sm:h-11 rounded-full bg-[#f6a200]/15 border-2 border-white flex items-center justify-center animate-[badgePulse_3s_ease-in-out_infinite] group-hover/badge:-translate-x-2 transition-transform duration-500" />
                    <div className="w-8 h-8 min-[400px]:w-10 min-[400px]:h-10 sm:w-11 sm:h-11 rounded-full bg-[#f6a200]/35 border-2 border-white flex items-center justify-center z-10 animate-[badgePulse_3s_ease-in-out_1.5s_infinite] group-hover/badge:-translate-x-1 transition-transform duration-500" />
                    <div className="w-8 h-8 min-[400px]:w-10 min-[400px]:h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#f6a200] to-[#ffb82e] border-2 border-white flex items-center justify-center text-white shadow-md z-20 animate-[badgeFloat_3s_ease-in-out_infinite] group-hover/badge:scale-110 group-hover/badge:rotate-6 transition-all duration-300 shadow-[#f6a200]/40">
                      <Download className="w-4 h-4 min-[400px]:w-5 min-[400px]:h-5 group-hover/badge:scale-110 transition-transform duration-300" strokeWidth={2.2} />
                    </div>
                  </div>

                  {/* Metric with Vertical Animated Accent Line */}
                  <div className="flex items-start gap-1.5 min-[400px]:gap-3">
                    <div className="relative w-[2.5px] min-[400px]:w-[3.5px] h-6 min-[400px]:h-8 sm:h-10 rounded-full bg-gradient-to-b from-[#f6a200] via-[#ffb82e] to-[#f6a200] [background-size:100%_200%] animate-[barColorFlow_3s_ease-in-out_infinite] shrink-0 mt-0.5 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-transparent -translate-y-full animate-[barLightSlide_2s_ease-in-out_infinite]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base min-[380px]:text-xl sm:text-3xl xl:text-4xl font-extrabold text-[#013144] tracking-tight leading-none">
                        {counts.count3}{stats.downloads.suffix}
                      </span>
                      <span className="text-[10px] min-[380px]:text-xs sm:text-sm font-medium text-slate-500 mt-1 sm:mt-2 leading-tight">
                        {stats.downloads.label}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Text Section + 3 Text Features */}
          <div className={`flex flex-col gap-6 sm:gap-8 transition-all duration-700 delay-150 ease-out ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
            }`}>
            {/* 3 Text Features (Centered on mobile at the end, first on desktop) */}
            <div className="w-full pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8 order-last lg:order-first">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 w-full">

                <div tabIndex={0} className="group cursor-pointer transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#00cc9c] focus-visible:outline-none rounded-xl p-1 transition-all duration-300">
                  <div className="relative h-1 w-8 sm:w-12 bg-gradient-to-r from-[#38d39f] via-[#00cc9c] to-[#38d39f] [background-size:200%_100%] animate-[barColorFlowHorizontal_3s_ease-in-out_infinite] mb-2 sm:mb-4 transition-all duration-500 group-hover:w-full overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full animate-[barLightSlideHorizontal_2s_ease-in-out_infinite]" />
                  </div>
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-slate-400 font-bold mb-1.5 sm:mb-3">
                    {t("home", "project.features.verified.badge", "Verified")}
                  </p>
                  <h3 className="text-[#013144] font-bold text-sm sm:text-xl">
                    {t("home", "project.features.verified.title", "Broker Network")}
                  </h3>
                </div>

                <div tabIndex={0} className="group cursor-pointer transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#00cc9c] focus-visible:outline-none rounded-xl p-1 transition-all duration-300">
                  <div className="relative h-1 w-8 sm:w-12 bg-gradient-to-b from-[#02647e] via-[#013144] to-[#013144] [background-size:200%_100%] animate-[barColorFlowHorizontal_3s_ease-in-out_infinite] mb-2 sm:mb-4 transition-all duration-500 group-hover:w-full overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full animate-[barLightSlideHorizontal_2s_ease-in-out_infinite]" />
                  </div>
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-slate-400 font-bold mb-1.5 sm:mb-3">
                    {t("home", "project.features.smart.badge", "Smart")}
                  </p>
                  <h3 className="text-[#013144] font-bold text-sm sm:text-xl">
                    {t("home", "project.features.smart.title", "Lead Discovery")}
                  </h3>
                </div>

                <div tabIndex={0} className="group cursor-pointer transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#00cc9c] focus-visible:outline-none rounded-xl p-1 transition-all duration-300 col-span-2 sm:col-span-1">
                  <div className="relative h-1 w-8 sm:w-12 bg-gradient-to-r from-[#f6a200] via-[#ffb82e] to-[#f6a200] [background-size:200%_100%] animate-[barColorFlowHorizontal_3s_ease-in-out_infinite] mb-2 sm:mb-4 transition-all duration-500 group-hover:w-full overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full animate-[barLightSlideHorizontal_2s_ease-in-out_infinite]" />
                  </div>
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-slate-400 font-bold mb-1.5 sm:mb-3">
                    {t("home", "project.features.intelligent.badge", "Intelligent")}
                  </p>
                  <h3 className="text-[#013144] font-bold text-sm sm:text-xl">
                    {t("home", "project.features.intelligent.title", "Property Listings")}
                  </h3>
                </div>

              </div>
            </div>
            <p className="text-slate-600 text-base lg:text-lg xl:text-xl font-roboto leading-relaxed">
              {t("home", "project.description1", "Brokarta is a verified network built exclusively for real estate brokers- enabling structured lead discovery, intelligent listings, and seamless deal collaboration.")}
            </p>

            <p className="text-slate-600 text-base lg:text-xl xl:text-xl font-roboto leading-relaxed">
              {t("home", "project.description2", "It replaces fragmented chat groups, social pages, and unstructured networks with one clean, trusted, broker-only ecosystem- built for faster closes and stronger professional connections.")}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}