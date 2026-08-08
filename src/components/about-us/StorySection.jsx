"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useText } from "@/components/layout/PageTextProvider";

export default function StorySection({ initialPanels = [] }) {
  const t = useText();
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileActive, setMobileActive] = useState(0);

  // Hardcoded story panels with useText
  const defaultStoryPanels = [
    {
      id: "panel-0",
      title: t("about-us", "story.panel0.title", "Every Broker Has a Story"),
      description: t("about-us", "story.panel0.description", "Real estate brokerage runs on effort, relationships, and persistence- yet brokers keep losing time to problems the tools around them were never built to solve:"),
      imageUrl: "/images/about-us/story-1.png",
      accentColor: "#f6a200",
      gradientFrom: "from-[#FFF9F2]",
      gradientTo: "to-[#FFF1E0]",
      quote: t("about-us", "story.panel0.quote", "Seamless collaboration, not stress."),
      quoteBadge: t("about-us", "story.panel0.quoteBadge", "Verified Networks"),
      isActive: true,
      sortOrder: 0,
      bullets: [
        t("about-us", "story.panel0.bullet0", "No real-time visibility into inventory"),
        t("about-us", "story.panel0.bullet1", "Leads that turn out to be dead ends"),
        t("about-us", "story.panel0.bullet2", "Deals that stall right before the finish line")
      ]
    },
    {
      id: "panel-1",
      title: t("about-us", "story.panel1.title", "We Saw the Gap"),
      description: t("about-us", "story.panel1.description", "Across the industry, the pattern repeats: brokers spend more time managing disorganization than closing deals."),
      imageUrl: "/images/about-us/story-2.jpeg",
      accentColor: "#00cc9c",
      gradientFrom: "from-[#F0F9F7]",
      gradientTo: "to-[#D8ECE9]",
      quote: t("about-us", "story.panel1.quote", "Smarter data, real empowerment."),
      quoteBadge: t("about-us", "story.panel1.quoteBadge", "Tech-First Network"),
      isActive: true,
      sortOrder: 1,
      bullets: [
        t("about-us", "story.panel1.bullet0", "Trust is hard to establish with unverified contacts"),
        t("about-us", "story.panel1.bullet1", "Collaboration has no shared structure"),
        t("about-us", "story.panel1.bullet2", "Growth takes more effort than it should")
      ]
    },
    {
      id: "panel-2",
      title: t("about-us", "story.panel2.title", "Why Brokarta Was Built"),
      description: t("about-us", "story.panel2.description", "Brokarta exists to replace confusion with clarity and fragmentation with structure. When brokers can collaborate with confidence, there's no ceiling on what they can close."),
      imageUrl: "/images/about-us/story-3.png",
      accentColor: "#f6a200",
      gradientFrom: "from-[#FFF9F2]",
      gradientTo: "to-[#FFF1E0]",
      quote: t("about-us", "story.panel2.quote", "Handshakes that become closed deals."),
      quoteBadge: t("about-us", "story.panel2.quoteBadge", "Deal Growth"),
      isActive: true,
      sortOrder: 2,
      bullets: [
        t("about-us", "story.panel2.bullet0", "Listings and leads stay organized in one place"),
        t("about-us", "story.panel2.bullet1", "Every connection is with a verified professional"),
        t("about-us", "story.panel2.bullet2", "Reputation compounds with every closed deal")
      ]
    },
    {
      id: "panel-3",
      title: t("about-us", "story.panel3.title", "The Future of Brokerage"),
      description: t("about-us", "story.panel3.description", "We are building a smart, secure network where verified brokers co-broke instantly, secure their commissions, and scale their businesses without borders."),
      imageUrl: "/images/about-us/story-4.png",
      accentColor: "#00cc9c",
      gradientFrom: "from-[#F0F9F7]",
      gradientTo: "to-[#D8ECE9]",
      quote: t("about-us", "story.panel3.quote", "Fast co-broking for the digital age."),
      quoteBadge: t("about-us", "story.panel3.quoteBadge", "Brokarta Future"),
      isActive: true,
      sortOrder: 3,
      bullets: [
        t("about-us", "story.panel3.bullet0", "Real-time collaborative workspace"),
        t("about-us", "story.panel3.bullet1", "Verified co-broke matches"),
        t("about-us", "story.panel3.bullet2", "Instant, secure communication")
      ]
    },
    {
      id: "panel-4",
      title: t("about-us", "story.panel4.title", "Building Global Networks"),
      description: t("about-us", "story.panel4.description", "Our community spreads across regional borders, aligning brokers from diverse brokerages into a single collaborative cloud workspace."),
      imageUrl: "/images/about-us/aboutus.jpg",
      accentColor: "#f6a200",
      gradientFrom: "from-[#FFF9F2]",
      gradientTo: "to-[#FFF1E0]",
      quote: t("about-us", "story.panel4.quote", "No boundaries to networking."),
      quoteBadge: t("about-us", "story.panel4.quoteBadge", "Global Cloud"),
      isActive: true,
      sortOrder: 4,
      bullets: [
        t("about-us", "story.panel4.bullet0", "Cross-border connections"),
        t("about-us", "story.panel4.bullet1", "Multi-currency valuations"),
        t("about-us", "story.panel4.bullet2", "Standardized legal contracts")
      ]
    }
  ];

  const storyPanels = initialPanels.length > 0 ? initialPanels : defaultStoryPanels;

  const getBulletText = (bullet) => {
    if (typeof bullet === "string") return bullet;
    return bullet?.bulletText || "";
  };

  const getPanelImage = (panel) => {
    let img = panel.imageUrl || panel.image;
    if (!img) return "/images/about-us/story-1.png";
    if (img === "/images/1aa.png") return "/images/about-us/story-1.png";
    if (img === "/images/2bbb.jpeg") return "/images/about-us/story-2.jpeg";
    if (img === "/images/2bb.png") return "/images/about-us/story-3.png";
    if (img === "/images/logo1.jpeg") return "/images/about-us/story-4.png";
    return img;
  };

  // Mobile auto-swap timer (cycles every 3.5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setMobileActive((prev) => (prev + 1) % storyPanels.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [storyPanels.length]);

  // Direct DOM query selector observer for absolute reliability across hydration lifecycles
  useEffect(() => {
    const panels = document.querySelectorAll(".story-panel-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-panel"), 10);
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-15% 0px -15% 0px"
      }
    );

    panels.forEach((panel) => {
      observer.observe(panel);
    });

    return () => {
      panels.forEach((panel) => {
        observer.unobserve(panel);
      });
      observer.disconnect();
    };
  }, [storyPanels]);

  const scrollToStoryPanel = (idx) => {
    const panels = document.querySelectorAll(".story-panel-item");
    const targetPanel = panels[idx];
    if (targetPanel) {
      targetPanel.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  };

  return (
    <section className="bg-white py-8 sm:py-16 lg:py-20 pb-8 sm:pb-20 lg:pb-32 overflow-visible">

      {/* 1. Static Header */}
      <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-5">
        <h2 className="text-[#013144] text-4xl md:text-6xl font-black font-oswald tracking-tight leading-none uppercase">
          {t("about-us", "story.headingPrefix", "how it")} <span className="text-[#00cc9c]">{t("about-us", "story.headingHighlight", "Started")}</span><br />
        </h2>
        <div className="w-24 h-1.5 bg-[#f6a200] rounded-full mx-auto mt-8"></div>
      </div>

      {/* 2. Grid Inner Container */}
      <div className="max-w-[80rem] mx-auto px-10 max-sm:px-4">

        {/* MOBILE VIEW ONLY: Auto-swapping Image, Quote Badge Overlay & Panel Text with Ultra-Smooth Transition */}
        <div className="block lg:hidden w-full mb-4 sm:mb-8 lg:mb-12">

          {/* Mobile Image Container with Floating Quote Card Overlay */}
          <div className="relative w-full h-[280px] sm:h-[340px] rounded-[30px] overflow-visible mb-10 shadow-lg">
            {/* Image Stack with Smooth Crossfade & Scale */}
            <div className="absolute inset-0 rounded-[30px] overflow-hidden">
              {storyPanels.map((panel, idx) => (
                <div
                  key={`m-img-${panel.id}`}
                  className={`absolute inset-0 w-full h-full transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileActive === idx
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105 pointer-events-none"
                    }`}
                >
                  <Image
                    src={getPanelImage(panel)}
                    alt={panel.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Floating Quote Badge Overlay on top of image with Smooth Glide */}
            {storyPanels.map((panel, idx) => (
              <div
                key={`m-quote-${panel.id}`}
                className={`absolute z-20 bottom-[-1rem] left-4 right-4 sm:left-8 sm:right-8 px-3.5 py-2 rounded-[18px] shadow-[0_10px_25px_rgba(0,0,0,0.12)] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileActive === idx
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-3 scale-95 pointer-events-none"
                  }`}
                style={{
                  backgroundColor: panel.accentColor,
                  color: panel.accentColor === "#f6a200" ? "#013144" : "#ffffff",
                }}
              >
                <div className="flex items-start gap-1">
                  <span className="font-serif text-xl sm:text-2xl leading-none opacity-30 shrink-0 -mt-0.5">&quot;</span>
                  <span className="text-[11px] sm:text-xs font-extrabold leading-snug">
                    {panel.quote}
                  </span>
                </div>
                <span className="text-[0.55rem] sm:text-[0.6rem] font-extrabold uppercase tracking-wider opacity-80 mt-0.5 block">
                  {panel.quoteBadge}
                </span>
              </div>
            ))}
          </div>

          {/* Active Mobile Content Card with Smooth Crossfade Glide */}
          <div className="relative min-h-[260px] sm:min-h-[220px]">
            {storyPanels.map((panel, idx) => {
              const isActive = mobileActive === idx;
              return (
                <div
                  key={`m-card-${panel.id}`}
                  className={`p-6 sm:p-8 rounded-[28px] bg-gradient-to-br ${panel.gradientFrom} ${panel.gradientTo} border border-slate-100 shadow-[0_15px_35px_rgba(0,0,0,0.04)] transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive
                      ? "relative opacity-100 translate-y-0 scale-100 z-10"
                      : "absolute inset-0 opacity-0 translate-y-4 scale-[0.98] pointer-events-none z-0"
                    }`}
                >
                  <h2 className="text-[#013144] font-extrabold text-2xl sm:text-3xl leading-none tracking-tight mb-4">
                    {panel.title}
                  </h2>
                  <p className="text-slate-600 text-base leading-relaxed mb-6">
                    {panel.description}
                  </p>

                  <ul className="grid grid-cols-1 gap-3">
                    {panel.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-3 text-[#013144] font-bold text-sm leading-snug"
                      >
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white"
                          style={{ backgroundColor: panel.accentColor }}
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            viewBox="0 0 24 24"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {getBulletText(bullet)}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Mobile Dot Navigator AT THE BOTTOM */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {storyPanels.map((panel, idx) => (
              <button
                key={`m-dot-bottom-${panel.id}`}
                onClick={() => setMobileActive(idx)}
                className={`h-3 rounded-full transition-all duration-500 ${mobileActive === idx
                    ? "w-10 bg-[#013144] shadow-md scale-105"
                    : "w-3 bg-slate-300 hover:bg-slate-400"
                  }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP VIEW ONLY (Unchanged Layout) */}
        <div className="hidden lg:grid lg:grid-cols-[1.1fr_0.9fr] gap-24 items-start">

          {/* LEFT COLUMN: Story Panels (Flowing vertically) */}
          <div className="flex flex-col">
            {storyPanels.map((panel, idx) => (
              <div
                key={panel.id}
                data-panel={idx}
                className={`story-panel-item flex flex-col min-h-screen justify-center py-24 transition-all duration-[800ms] ease-out ${activeIndex === idx
                    ? "opacity-100 translate-y-0"
                    : "opacity-20 translate-y-10"
                  }`}
              >
                {/* Content Card */}
                <div className={`p-12 rounded-[50px] bg-gradient-to-br ${panel.gradientFrom} ${panel.gradientTo} border border-slate-100 shadow-[0_15px_30px_rgba(0,0,0,0.02)]`}>
                  <h2 className="text-[#013144] font-extrabold text-[clamp(1.8rem,3vw,2.5rem)] leading-none tracking-tight mb-8 animate-[abFloat_5s_ease-in-out_infinite]">
                    {panel.title}
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed mb-6">
                    {panel.description}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                    {panel.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className={`flex items-start gap-3 text-[#013144] font-bold text-[0.95rem] leading-snug ${bIdx === 2 ? "sm:col-span-2 justify-start sm:justify-center" : ""
                          }`}
                      >
                        <span
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white"
                          style={{ backgroundColor: panel.accentColor }}
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            viewBox="0 0 24 24"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {getBulletText(bullet)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: Sticky Image and Quote (Desktop Only) */}
          <div className="hidden lg:block lg:sticky lg:top-[12vh] lg:h-[75vh] lg:self-start">
            <div className="relative w-full h-full rounded-[50px] overflow-visible">

              {/* Sticky images with opacity crossfade transitions */}
              <div className="absolute inset-0 rounded-[50px] overflow-hidden shadow-[0_30px_60px_rgba(1,49,68,0.15)] z-0">
                {storyPanels.map((panel, idx) => (
                  <div
                    key={`img-${panel.id}`}
                    className={`absolute inset-0 w-full h-full transition-all duration-[800ms] ease-out ${activeIndex === idx
                        ? "opacity-100 scale-100 duration-[1200ms]"
                        : "opacity-0 scale-105 pointer-events-none"
                      }`}
                  >
                    <Image
                      src={getPanelImage(panel)}
                      alt={panel.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Floating Quote overlay cards with staggered translate transitions */}
              {storyPanels.map((panel, idx) => (
                <div
                  key={`quote-${panel.id}`}
                  className={`absolute z-10 w-[330px] p-5 rounded-[24px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] transition-all duration-[600ms] ease-out delay-[300ms] ${activeIndex === idx
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5 pointer-events-none"
                    }`}
                  style={{
                    backgroundColor: panel.accentColor,
                    color: panel.accentColor === "#f6a200" ? "#013144" : "#ffffff",
                    bottom: "-1.5rem",
                    left: idx % 2 === 0 ? "-1.5rem" : "auto",
                    right: idx % 2 !== 0 ? "-1.5rem" : "auto"
                  }}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <span className="ab-quote-mark font-serif text-3xl leading-none opacity-30 shrink-0 -mt-1">&quot;</span>
                    <span className="text-base font-extrabold leading-[1.35]">
                      {panel.quote}
                    </span>
                  </div>
                  <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.15em] opacity-70 mt-2 block">
                    {panel.quoteBadge}
                  </span>
                </div>
              ))}

              {/* Dot Navigator */}
              <div className="absolute left-[-3rem] top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
                {storyPanels.map((panel, idx) => (
                  <div
                    key={`dot-${panel.id}`}
                    onClick={() => scrollToStoryPanel(idx)}
                    className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-400 ease-out ${activeIndex === idx ? "bg-[#013144] scale-[1.6]" : "bg-[#e2e8f0] scale-100"
                      }`}
                  ></div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}