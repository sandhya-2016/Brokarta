"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useText } from "@/components/layout/PageTextProvider";

export default function WelcomeNewEraSection() {
  const t = useText();
  const containerRef = useRef(null);

  const [activeTab, setActiveTab] = useState("broker");
  const [step1Phone, setStep1Phone] = useState(false);

  // Hardcoded orchestrator tabs data with useText
  const orchestratorData = {
    broker: {
      phone: {
        question: t("become-a-user", "orchestrator.broker.question", "What if your network was actually verified?"),
        desc: t("become-a-user", "orchestrator.broker.desc", "Access a verified community of real estate professionals who are actively looking to partner, co-broker, and grow their businesses together.")
      }
    },
    agency: {
      phone: {
        question: t("become-a-user", "orchestrator.agency.question", "What if your whole agency ran on one system?"),
        desc: t("become-a-user", "orchestrator.agency.desc", "Give every agent in your agency the same powerful tools, clear visibility, and structured deal workflows—all in one place.")
      }
    }
  };

  // Hardcoded welcome new era content with useText
  const welcomeNewEraContent = {
    headingPrefix: t("become-a-user", "welcome.headingPrefix", "Welcome to the "),
    headingHighlight: t("become-a-user", "welcome.headingHighlight", "New Era"),
    headingSuffix: t("become-a-user", "welcome.headingSuffix", " of Brokerage"),
    tabs: {
      broker: {
        badge: t("become-a-user", "welcome.tabs.broker.badge", "Broker Workspace"),
      },
      agency: {
        badge: t("become-a-user", "welcome.tabs.agency.badge", "Agency Workspace"),
      }
    }
  };

  const setTab = (t) => {
    if (activeTab === t) return;
    setActiveTab(t);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setStep1Phone(true), 200);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const currentContent = orchestratorData[activeTab];

  return (
    <section
      ref={containerRef}
      id="orchTrigger"
      className="relative min-h-0 py-12 sm:py-16 lg:py-20 bg-[#fdfcfb] overflow-hidden text-[#013144]"
    >
      {/* Centered Heading at Top */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-6 sm:mb-8">
        <h2 className="text-[#013144] text-3xl sm:text-4xl lg:text-5xl  font-black tracking-tight leading-tight">
          {welcomeNewEraContent.headingPrefix}<span className="text-[#f6a200]">{welcomeNewEraContent.headingHighlight}</span>{welcomeNewEraContent.headingSuffix}
        </h2>
      </div>

      {/* Top 2-Column Content Layout (Left Image | Right Text) */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center mb-6">
        {/* Left Column: Dynamic Hero Image with Switch Animation */}
        <div className="relative w-full aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden shadow-md lg:shadow-2xl border border-slate-200/80 bg-slate-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.96, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.96, x: 10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={activeTab === "broker" ? "/images/become-a-user/broker.png" : "/images/become-a-user/agency.png"}
                alt={`${activeTab} dashboard view`}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Title and Descriptions from Phone Content with smooth Fade/Slide transition */}
        <div className="lg:min-h-[380px] min-h-0 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-2">
                <span className={`text-xs uppercase font-black tracking-wider px-3 py-1 rounded-full ${activeTab === 'broker' ? 'bg-[#00cc9c]/10 text-[#00cc9c]' : 'bg-[#f6a200]/10 text-[#f6a200]'}`}>
                  {welcomeNewEraContent.tabs[activeTab].badge}
                </span>
              </div>

              <h3 className="text-[#013144] text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {currentContent.phone.question}
              </h3>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-700 leading-relaxed font-roboto font-normal">
                {currentContent.phone.desc}
              </p>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Toggle Switch Container with bottom margin to space it from the grid below */}
      <div className="flex flex-col items-center mb-10 sm:mb-14">
        {/* Interactive Pill Toggle Switch */}
        <div
          className={`flex justify-center transition-all duration-700 ${
            step1Phone ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="relative flex bg-slate-200/80 p-2 rounded-[20px] w-full min-w-[320px] max-w-[380px] shadow-inner border border-slate-300/60">
            <div
              className={`absolute top-2 bottom-2 left-2 w-[calc(50%-8px)] rounded-[14px] shadow-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeTab === "broker"
                  ? "bg-[#013144] translate-x-0"
                  : "bg-[#f6a200] translate-x-[calc(100%+8px)]"
              }`}
            />
            <button
              type="button"
              onClick={() => setTab("broker")}
              className={`relative z-10 flex-1 py-3 text-sm sm:text-base font-black rounded-[14px] cursor-pointer transition-colors duration-300 ${
                activeTab === "broker" ? "text-white" : "text-slate-600 font-bold"
              }`}
            >
              {t("become-a-user", "welcome.toggle.broker", "Broker")}
            </button>
            <button
              type="button"
              onClick={() => setTab("agency")}
              className={`relative z-10 flex-1 py-3 text-sm sm:text-base font-black rounded-[14px] cursor-pointer transition-colors duration-300 ${
                activeTab === "agency" ? "text-white" : "text-slate-600 font-bold"
              }`}
            >
              {t("become-a-user", "welcome.toggle.agency", "Agency")}
            </button>
          </div>
        </div>
      </div> 
    </section>
  );
}