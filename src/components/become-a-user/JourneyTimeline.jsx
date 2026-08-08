"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ShieldSphere, DealPipeline, ListingsSheets, SignalScanner, CoBrokingLinks, ToolsDashboard } from "./TimelineIcons";
import { useText } from "@/components/layout/PageTextProvider";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
}

function TimelineStepItem({ step, idx, totalSteps, smoothProgress }) {
  const stepStart = idx / (totalSteps - 1);
  const stepWindow = 1 / (totalSteps - 1);

  const opacity = useTransform(
    smoothProgress,
    [
      stepStart - stepWindow * 0.4,
      stepStart,
      stepStart + stepWindow * 0.4,
    ],
    [0, 1, 0]
  );

  const y = useTransform(
    smoothProgress,
    [
      stepStart - stepWindow * 0.4,
      stepStart,
      stepStart + stepWindow * 0.4,
    ],
    [30, 0, -30]
  );

  return (
    <motion.div
      style={{
        opacity,
        y,
      }}
      className="absolute inset-0 flex flex-col justify-center max-w-3xl mx-auto lg:mx-0 text-center lg:text-left px-6 lg:px-0 pointer-events-none"
    >
      <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6 sm:mb-8">
        {step.title}
      </h2>

      {/* Side-by-side or stacked Broker & Agency details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left max-w-2xl mx-auto lg:mx-0">

        {/* Broker Feature Column */}
        <div className="relative rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.2)] p-[1px]">
          <div
            className="absolute top-1/2 left-1/2 w-[250%] h-[250%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent,#00cc9c,transparent)] animate-border-spin pointer-events-none z-0"
          />
          <div className="relative flex flex-col gap-3 p-5 rounded-[15px] bg-[#012535] w-full h-full z-10">
            <div className="flex items-center gap-2">
              <span className="text-[11px] sm:text-xs uppercase font-black tracking-wider px-2.5 py-0.5 rounded bg-[#00cc9c]/20 text-[#00cc9c]">
                Broker
              </span>
              <h4 className="text-base sm:text-lg xl:text-xl font-extrabold text-white">
                {step.broker.title}
              </h4>
            </div>
            <p className="text-sm sm:text-base text-white/70 font-roboto leading-relaxed">
              {step.broker.desc}
            </p>
          </div>
        </div>

        {/* Agency Feature Column */}
        <div className="relative rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.2)] p-[1px]">
          <div
            className="absolute top-1/2 left-1/2 w-[250%] h-[250%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent,#f6a200,transparent)] animate-border-spin pointer-events-none z-0"
          />
          <div className="relative flex flex-col gap-3 p-5 rounded-[15px] bg-[#012535] w-full h-full z-10">
            <div className="flex items-center gap-2">
              <span className="text-[11px] sm:text-xs uppercase font-black tracking-wider px-2.5 py-0.5 rounded bg-[#f6a200]/20 text-[#f6a200]">
                Agency
              </span>
              <h4 className="text-base sm:text-lg xl:text-xl font-extrabold text-white">
                {step.agency.title}
              </h4>
            </div>
            <p className="text-sm sm:text-base text-white/70 font-roboto leading-relaxed">
              {step.agency.desc}
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

function TimelineNumberItem({ step, idx, totalSteps, smoothProgress, circleRotation, isMobile }) {
  // Mobile: Step 0 is at 90 (center), Step 1 is at 114 (left).
  // This causes numbers to sweep left-to-right when scrolling down.
  const angleDeg = isMobile
    ? (90 + idx * 24)
    : (idx * 24 - 55);

  const angleRad = (angleDeg * Math.PI) / 180;

  // Red Dot position: exactly on the thin arc line (radius = 50)
  const dotRadius = 50;
  const dotLeft = 50 + dotRadius * Math.cos(angleRad);
  const dotTop = 50 + dotRadius * Math.sin(angleRad);

  // Number text position: slightly outside the arc line (radius = 56 on desktop, 57 on mobile)
  const numRadius = isMobile ? 57 : 56;
  const numLeft = 50 + numRadius * Math.cos(angleRad);
  const numTop = 50 + numRadius * Math.sin(angleRad);

  const stepProgressVal = idx / (totalSteps - 1);

  // Active step styling
  const stepOpacity = useTransform(
    smoothProgress,
    [stepProgressVal - 0.12, stepProgressVal, stepProgressVal + 0.12],
    [0.3, 1, 0.3]
  );

  const stepScale = useTransform(
    smoothProgress,
    [stepProgressVal - 0.12, stepProgressVal, stepProgressVal + 0.12],
    [0.85, 1.15, 0.85]
  );

  const activeDotOpacity = useTransform(
    smoothProgress,
    [stepProgressVal - 0.08, stepProgressVal, stepProgressVal + 0.08],
    [0, 1, 0]
  );

  const counterRotation = useTransform(circleRotation, (r) => -r);

  return (
    <>
      {/* Active Indicator Dot (Centered precisely on the arc line, only visible when active) */}
      <div
        style={{
          left: `${dotLeft}%`,
          top: `${dotTop}%`,
        }}
        className="absolute pointer-events-none"
      >
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
          <motion.div
            style={{ opacity: activeDotOpacity }}
            className="absolute w-5 h-5 rounded-full border border-[#f6a200]/40 animate-ping"
          />
          <motion.div
            style={{ opacity: activeDotOpacity }}
            className="w-3.5 h-3.5 rounded-full bg-[#f6a200] shadow-[0_0_12px_rgba(246,162,0,0.9)]"
          />
        </div>
      </div>

      {/* Step Number (Positioned outside the arc line, stays upright) */}
      <div
        style={{
          left: `${numLeft}%`,
          top: `${numTop}%`,
        }}
        className="absolute pointer-events-auto"
      >
        <motion.div
          style={{
            rotate: counterRotation,
          }}
          className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <motion.span
            style={{
              opacity: stepOpacity,
              scale: stepScale,
            }}
            className="inline-block font-montserrat text-3xl sm:text-4xl lg:text-5xl tracking-tight  font-bold whitespace-nowrap text-white"
          >
            {step.num}
          </motion.span>
        </motion.div>
      </div>
    </>
  );
}

function RightSculpture3D({ idx, smoothProgress, totalSteps }) {
  const stepStart = idx / (totalSteps - 1);
  const stepWindow = 1 / (totalSteps - 1);

  // Transition opacity and scale for the active sculpture
  const opacity = useTransform(
    smoothProgress,
    [
      stepStart - stepWindow * 0.45,
      stepStart,
      stepStart + stepWindow * 0.45,
    ],
    [0, 1, 0]
  );

  const scale = useTransform(
    smoothProgress,
    [
      stepStart - stepWindow * 0.45,
      stepStart,
      stepStart + stepWindow * 0.45,
    ],
    [0.7, 1, 0.7]
  );

  return (
    <motion.div
      style={{
        opacity,
        scale,
      }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, 4, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-full h-full flex items-center justify-center p-2 lg:p-0"
      >
        {idx === 0 && <ShieldSphere />}
        {idx === 1 && <DealPipeline />}
        {idx === 2 && <ListingsSheets />}
        {idx === 3 && <SignalScanner />}
        {idx === 4 && <CoBrokingLinks />}
        {idx === 5 && <ToolsDashboard />}
      </motion.div>
    </motion.div>
  );
}

export default function JourneyTimeline() {
  const t = useText();
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  // Hardcoded timeline steps with useText
  const TIMELINE_STEPS = [
    {
      num: "01",
      title: t("become-a-user", "timeline.step1.title", "Trusted Connections"),
      broker: {
        title: t("become-a-user", "timeline.step1.broker.title", "Verified Network"),
        desc: t("become-a-user", "timeline.step1.broker.desc", "Connect with trusted, vetted brokers.")
      },
      agency: {
        title: t("become-a-user", "timeline.step1.agency.title", "Team Visibility"),
        desc: t("become-a-user", "timeline.step1.agency.desc", "See every agent's activity and listings in one place.")
      },
    },
    {
      num: "02",
      title: t("become-a-user", "timeline.step2.title", "Deal Tracking, Simplified"),
      broker: {
        title: t("become-a-user", "timeline.step2.broker.title", "Structured Deals"),
        desc: t("become-a-user", "timeline.step2.broker.desc", "Track leads through clear, transparent workflows.")
      },
      agency: {
        title: t("become-a-user", "timeline.step2.agency.title", "Centralized Deals"),
        desc: t("become-a-user", "timeline.step2.agency.desc", "Track every mandate across your agency, not just one desk.")
      },
    },
    {
      num: "03",
      title: t("become-a-user", "timeline.step3.title", "Reputation That Speaks"),
      broker: {
        title: t("become-a-user", "timeline.step3.broker.title", "Visibility"),
        desc: t("become-a-user", "timeline.step3.broker.desc", "Showcase your expertise and track record.")
      },
      agency: {
        title: t("become-a-user", "timeline.step3.agency.title", "Agency Reputation"),
        desc: t("become-a-user", "timeline.step3.agency.desc", "Build a verified profile for your brokerage as a whole.")
      },
    },
    {
      num: "04",
      title: t("become-a-user", "timeline.step4.title", "Sharper Signal"),
      broker: {
        title: t("become-a-user", "timeline.step4.broker.title", "Smart Matching"),
        desc: t("become-a-user", "timeline.step4.broker.desc", "Get surfaced to the right leads, not just more leads.")
      },
      agency: {
        title: t("become-a-user", "timeline.step4.agency.title", "Team Insights"),
        desc: t("become-a-user", "timeline.step4.agency.desc", "Understand which agents and listings are driving results.")
      },
    },
    {
      num: "05",
      title: t("become-a-user", "timeline.step5.title", "Built to Work Together"),
      broker: {
        title: t("become-a-user", "timeline.step5.broker.title", "Direct Co-Broking"),
        desc: t("become-a-user", "timeline.step5.broker.desc", "Partner on mandates without middlemen or guesswork.")
      },
      agency: {
        title: t("become-a-user", "timeline.step5.agency.title", "Unified Setup"),
        desc: t("become-a-user", "timeline.step5.agency.desc", "Bring every agent onto one consistent system, fast.")
      },
    },
    {
      num: "06",
      title: t("become-a-user", "timeline.step6.title", "Everything, One Place"),
      broker: {
        title: t("become-a-user", "timeline.step6.broker.title", "Time Saved"),
        desc: t("become-a-user", "timeline.step6.broker.desc", "Spend less time chasing, more time closing.")
      },
      agency: {
        title: t("become-a-user", "timeline.step6.agency.title", "Consolidated Tools"),
        desc: t("become-a-user", "timeline.step6.agency.desc", "Replace scattered spreadsheets and apps with one platform.")
      },
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.0001,
  });

  const totalSteps = TIMELINE_STEPS.length;

  // Desktop: sweeps counter-clockwise (55 to -65)
  // Mobile: sweeps counter-clockwise (0 to -120) to make numbers move left-to-right
  const circleRotation = useTransform(
    smoothProgress,
    [0, 1],
    isMobile ? [0, -120] : [55, -65]
  );

  if (!mounted) {
    return (
      <section
        ref={containerRef}
        className="relative min-h-[400vh] bg-gradient-to-b from-[#013144] via-[#013144] to-[#013144] text-white"
      />
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-[400vh] bg-gradient-to-b from-[#013144] via-[#013144] to-[#013144] text-white"
    >
      {/* Sticky Screen Viewport remains completely stationary on scroll */}
      <div className="sticky top-0 h-screen w-full flex flex-col lg:flex-row items-center justify-center overflow-hidden">

        {/* Responsive Arc Container (Top on Mobile with 40% visible, Left on Desktop) */}
        <div className="absolute left-1/2 lg:left-[-37vw] -translate-x-1/2 lg:translate-x-0 top-[-48vw] sm:top-[-36vw] lg:top-1/2 lg:-translate-y-1/2 w-[80vw] sm:w-[60vw] lg:w-[52vw] h-[80vw] sm:h-[60vw] lg:h-[52vw] max-w-[850px] max-h-[850px] pointer-events-none z-10">

          {/* Animated Conic Gradient Circle Arc Line */}
          <div
            className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent,#00cc9c,#f6a200,transparent)] animate-border-spin"
            style={{
              padding: '2px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />

          {/* Rotating Numbers Ring around Arc */}
          <motion.div
            style={{ rotate: circleRotation }}
            className="absolute inset-0 w-full h-full rounded-full origin-center"
          >
            {TIMELINE_STEPS.map((step, idx) => (
              <TimelineNumberItem
                key={step.num}
                step={step}
                idx={idx}
                totalSteps={totalSteps}
                smoothProgress={smoothProgress}
                circleRotation={circleRotation}
                isMobile={isMobile}
              />
            ))}
          </motion.div>
        </div>

        {/* Content Text Display (Responsive padding/alignment) */}
        <div className="relative z-20 w-full max-w-7xl px-8 sm:px-16 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-[10vh] lg:pt-0">
          <div className="col-span-1 lg:col-span-7 lg:col-start-4 relative h-[360px] flex items-center">
            {TIMELINE_STEPS.map((step, idx) => (
              <TimelineStepItem
                key={step.num}
                step={step}
                idx={idx}
                totalSteps={totalSteps}
                smoothProgress={smoothProgress}
              />
            ))}
          </div>
        </div>

        {/* Dynamic 3D Sculpture Component (Responsive: Centered on mobile, Right-aligned on desktop) */}
        <div className="absolute left-1/2 lg:left-auto -translate-x-1/2 lg:translate-x-0 lg:right-[1vw] xl:right-[2vw] top-[74%] sm:top-[76%] lg:top-1/2 lg:-translate-y-1/2 w-[220px] sm:w-[280px] lg:w-[400px] h-[220px] sm:h-[280px] lg:h-[400px] pointer-events-none z-10">
          {TIMELINE_STEPS.map((step, idx) => (
            <RightSculpture3D
              key={idx}
              idx={idx}
              smoothProgress={smoothProgress}
              totalSteps={totalSteps}
            />
          ))}
        </div>

      </div>
    </section>
  );
}