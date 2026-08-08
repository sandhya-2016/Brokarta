"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiUserPlus,
  FiUsers,
  FiSearch,
  FiMessageSquare,
  FiChevronDown,
} from "react-icons/fi";
import { TbChartFunnel } from "react-icons/tb";
import { FaHandshake } from "react-icons/fa6";
import MobilePlatformTourSection from "./MobilePlatformTourSection";
import { useText } from "@/components/layout/PageTextProvider";

export default function PlatformTourSection() {
  const t = useText();
  const [activeFeature, setActiveFeature] = useState(1);
  const containerRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  // Hardcoded tour stages data with useText
  const tourStages = [
    {
      n: 1,
      title: t("what-we-offer", "tour.stage1.title", "Get Verified"),
      desc: t("what-we-offer", "tour.stage1.desc", "Get verified instantly and start listing in seconds. Every profile is checked and certified by the regional board- zero spam, 100% trust."),
      url: "/features/verified",
      color: "#f6a200",
      icon: FiUserPlus,
    },
    {
      n: 2,
      title: t("what-we-offer", "tour.stage2.title", "Build Your Profile"),
      desc: t("what-we-offer", "tour.stage2.desc", "Turn your track record into a credible, verifiable real estate profile- not just a name and a phone number."),
      url: "/features/profile",
      color: "#00cc9c",
      icon: FiUsers,
    },
    {
      n: 3,
      title: t("what-we-offer", "tour.stage3.title", "Search Inventory"),
      desc: t("what-we-offer", "tour.stage3.desc", "Explore thousands of listings with seamless precision, and find the right opportunities without the noise."),
      url: "/features/search",
      color: "#ffffff",
      icon: FiSearch,
    },
    {
      n: 4,
      title: t("what-we-offer", "tour.stage4.title", "Smart Chat & Deals"),
      desc: t("what-we-offer", "tour.stage4.desc", "Connect directly with verified brokers, negotiate terms in private, and keep deal history organized in one place."),
      url: "/features/smartchat",
      color: "#f6a200",
      icon: FiMessageSquare,
    },
    {
      n: 5,
      title: t("what-we-offer", "tour.stage5.title", "Deal Pipeline"),
      desc: t("what-we-offer", "tour.stage5.desc", "Track leads, site visits, negotiations, and closed deals in an interactive real-time broker pipeline."),
      url: "/features/pipeline",
      color: "#00cc9c",
      icon: TbChartFunnel,
    },
    {
      n: 6,
      title: t("what-we-offer", "tour.stage6.title", "Close Deals Faster"),
      desc: t("what-we-offer", "tour.stage6.desc", "Finalize transactions with complete confidence, track co-broking commissions, and build your long-term reputation."),
      url: "/features/dealclose",
      color: "#f6a200",
      icon: FaHandshake,
    },
  ];

  // Hardcoded platform tour content with useText
  const platformTourContent = {
    headingLine1: t("what-we-offer", "tour.headingLine1", "Your Journey"),
    headingLine2: t("what-we-offer", "tour.headingLine2", "Starts Here"),
  };

  // Track if screen is mobile/tablet size (< 1024px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Autoplay timer for mobile/tablet view (changes active feature every 3.5s)
  useEffect(() => {
    if (!isMobile) return;

    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev % tourStages.length) + 1);
    }, 3500);

    return () => clearInterval(timer);
  }, [isMobile, activeFeature, tourStages.length]);

  // Bind active stage to scroll positions in desktop view
  useEffect(() => {
    const observers = [];
    const elements = containerRefs.current;

    elements.forEach((el, index) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveFeature(index + 1);
          }
        },
        {
          rootMargin: "-40% 0px -40% 0px", // Trigger when element is near middle of screen
          threshold: 0.1,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const activeStage = tourStages.find((s) => s.n === activeFeature) || tourStages[0];
  const IconComponent = activeStage.icon;

  const getGlowShadow = () => {
    if ([1, 4].includes(activeFeature)) {
      return "0 0 0 3px #3a3a3c, 0 0 0 4.5px #f6a200, 0 0 0 5.5px #2c2c2e, 18px 28px 70px rgba(0,0,0,0.85), 0 0 50px rgba(246,162,0,0.35)";
    }
    if ([2, 5].includes(activeFeature)) {
      return "0 0 0 3px #3a3a3c, 0 0 0 4.5px #00cc9c, 0 0 0 5.5px #2c2c2e, 18px 28px 70px rgba(0,0,0,0.85), 0 0 50px rgba(0,204,156,0.3)";
    }
    return "0 0 0 3px #3a3a3c, 0 0 0 4.5px #ffffff, 0 0 0 5.5px #2c2c2e, 18px 28px 70px rgba(0,0,0,0.85), 0 0 50px rgba(255,255,255,0.12)";
  };

  return (
    <>
      {/* Mobile view (< 1024px) rendered using clean SVG app screens without frame */}
      <div className="block lg:hidden">
        <MobilePlatformTourSection />
      </div>

      {/* Desktop view (>= 1024px) with interactive sticky 3D scroll animation */}
      <div className="hidden lg:block">
        <section
          className="relative bg-[#011627] py-10 px-5 sm:px-10 text-left"
          style={{ isolation: "isolate" }}
        >
          {/* Main Heading */}
          <div className="container mx-auto px-10 text-center pb-8 relative z-10">
            <h2
              className="text-white font-black font-oswald uppercase tracking-tighter leading-tight"
              style={{ fontSize: "clamp(2rem,7vw,4.5rem)" }}
            >
              {platformTourContent.headingLine1} <br /> <span className="text-[#00cc9c]">{platformTourContent.headingLine2}</span>
            </h2>
          </div>

          {/* Sticky Phone Stage */}
          <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none z-20">
            <div className="relative flex items-center justify-center w-full max-w-7xl h-full">

              {/* Light Trail SVG */}
              <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none flex items-center justify-center">
                <svg className="w-[800px] h-[800px] opacity-40" viewBox="0 0 400 600" key={activeFeature}>
                  <defs>
                    <linearGradient id="trailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop
                        offset="0%"
                        stopColor={[1, 4].includes(activeFeature) ? "#f6a200" : activeFeature === 3 ? "#ffffff" : "#00cc9c"}
                        stopOpacity="0"
                      />
                      <stop
                        offset="50%"
                        stopColor={[1, 4].includes(activeFeature) ? "#f6a200" : activeFeature === 3 ? "#ffffff" : "#00cc9c"}
                        stopOpacity="1"
                      />
                      <stop
                        offset="100%"
                        stopColor={[1, 4].includes(activeFeature) ? "#f6a200" : activeFeature === 3 ? "#ffffff" : "#00cc9c"}
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M-50,500 C150,550 300,450 350,300 S150,50 450,100"
                    fill="none"
                    stroke="url(#trailGrad)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    className="[stroke-dasharray:1000] [stroke-dashoffset:1000] filter blur-[4px] animate-wave-flow"
                  />
                </svg>
              </div>

              {/* App Screen Container aligned to exact SVG aspect ratio (430 x 700) */}
              <div className="relative w-[360px] md:w-[380px] lg:w-[410px] aspect-[430/700] z-10 pointer-events-auto overflow-hidden flex items-center justify-center">
                {tourStages.map((stage) => {
                  const svgPath =
                    stage.n === 1
                      ? "/images/app-screens/verified-screen.svg"
                      : stage.n === 2
                        ? "/images/app-screens/profile-screen.svg"
                        : stage.n === 3
                          ? "/images/app-screens/search-screen.svg"
                          : stage.n === 4
                            ? "/images/app-screens/smartchat-screen.svg"
                            : stage.n === 5
                              ? "/images/app-screens/data-pipline.svg"
                              : "/images/app-screens/dealclose-screen.svg";

                  return (
                    <img
                      key={`desktop-stage-${stage.n}`}
                      src={svgPath}
                      alt={stage.title}
                      className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ease-out ${activeFeature === stage.n
                          ? "opacity-100 scale-100 z-10"
                          : "opacity-0 scale-95 z-0 pointer-events-none"
                        }`}
                    />
                  );
                })}
              </div>

            </div>
          </div>

          {/* Desktop Scroll triggers */}
          <div className="scroll-trigger-blocks relative z-30 container mx-auto px-6 -mt-[50vh]">
            {tourStages.map((stage, idx) => {
              const StageIcon = stage.icon;
              return (
                <div
                  key={stage.n}
                  ref={(el) => (containerRefs.current[idx] = el)}
                  className="h-screen flex items-center"
                  style={{
                    justifyContent: stage.n % 2 === 0 ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    className={`w-full md:w-1/3 bg-white/3 backdrop-blur-md p-10 rounded-[40px] border border-white/10 transition-all duration-[600ms] ease opacity-15 translate-y-10 z-40 pointer-events-auto ${activeFeature === stage.n ? "opacity-100 translate-y-0 border-white/30" : ""
                      }`}
                    style={{
                      textAlign: stage.n % 2 === 0 ? "right" : "left",
                      alignItems: stage.n % 2 === 0 ? "flex-end" : "flex-start",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      className="flex items-center gap-4 mb-6"
                      style={{
                        flexDirection: stage.n % 2 === 0 ? "row-reverse" : "row",
                      }}
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: stage.color === "#ffffff" ? "#ffffff" : stage.color,
                          color: stage.color === "#ffffff" ? "#013144" : "#ffffff",
                        }}
                      >
                        <StageIcon className="w-7 h-7" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-white text-3xl font-black font-oswald">
                        {stage.title}
                      </h3>
                    </div>
                    <p className="text-slate-400 text-lg font-medium leading-relaxed">{stage.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="h-[120vh]"></div>
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none h-[35vh] bg-gradient-to-t from-[#011627] to-transparent z-[25]"></div>
        </section>
      </div>
    </>
  );
}