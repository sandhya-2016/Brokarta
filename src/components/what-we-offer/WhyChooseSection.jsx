"use client";

import { ShieldCheck } from "lucide-react";
import { useText } from "@/components/layout/PageTextProvider";

export default function WhyChooseSection() {
  const t = useText();

  return (
    <section
      id="why-choose"
      className="relative bg-[#FFF8F6] py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 md:w-96 h-72 md:h-96 bg-[#f6a200]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 -right-20 w-72 md:w-96 h-72 md:h-96 bg-[#013144]/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#f6a200] font-black uppercase tracking-[0.18em] text-sm sm:text-base md:text-lg block mb-3">
            {t("what-we-offer", "whyChoose.subtitle", "Our Excellence")}
          </span>

          <h2 className="text-[#013144] text-4xl md:text-6xl font-black font-oswald uppercase tracking-tight leading-none">
            {t("what-we-offer", "whyChoose.titlePrefix", "Why")} <span className="text-[#f6a200]">{t("what-we-offer", "whyChoose.titleHighlight", "Choose Us")}</span>
          </h2>

          <div className="w-20 md:w-24 h-1.5 md:h-2 bg-[#f6a200] mx-auto mt-5 rounded-full"></div>
        </div>

        {/* Main Card */}
        <div className="relative max-w-5xl mx-auto group">
          {/* Top Left Corner */}
          <div className="absolute top-0 left-0 z-0 border-[#f6a200] md:border-[#013144] md:group-hover:border-[#f6a200] border-[4px] md:border-[6px] border-r-0 border-b-0 rounded-tl-[30px] md:rounded-tl-[40px] w-[100px] h-[100px] md:w-[120px] md:h-[120px] transition-all duration-500 md:group-hover:w-[150px] md:group-hover:h-[150px] -translate-x-2 -translate-y-2 md:translate-x-0 md:translate-y-0 md:group-hover:-translate-x-2 md:group-hover:-translate-y-2" />

          {/* Bottom Right Corner */}
          <div className="absolute bottom-0 right-0 z-0 border-[#f6a200] md:border-[#013144] md:group-hover:border-[#f6a200] border-[4px] md:border-[6px] border-l-0 border-t-0 rounded-br-[30px] md:rounded-br-[40px] w-[100px] h-[100px] md:w-[120px] md:h-[120px] transition-all duration-500 md:group-hover:w-[150px] md:group-hover:h-[150px] translate-x-2 translate-y-2 md:translate-x-0 md:translate-y-0 md:group-hover:translate-x-2 md:group-hover:translate-y-2" />

          {/* Content Box */}
          <div className="relative z-10 bg-white rounded-[24px] md:rounded-[32px] border border-white p-6 sm:p-8 md:p-12 lg:p-14 shadow-[0_30px_70px_rgba(1,49,68,0.12)] md:shadow-[0_40px_100px_rgba(1,49,68,0.08)] md:group-hover:shadow-[0_50px_120px_rgba(1,49,68,0.12)] transition-all duration-500">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 lg:gap-14">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] md:w-[100px] md:h-[100px] rounded-[20px] md:rounded-[28px] flex items-center justify-center bg-[#f6a200] scale-110 -rotate-6 shadow-[0_25px_50px_rgba(246,162,0,0.3)] md:bg-[#013144] md:scale-100 md:rotate-0 md:shadow-[0_15px_30px_rgba(1,49,68,0.2)] md:group-hover:bg-[#f6a200] md:group-hover:scale-110 md:group-hover:-rotate-6 md:group-hover:shadow-[0_25px_50px_rgba(246,162,0,0.3)] transition-all duration-700">
                  <ShieldCheck
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white"
                    strokeWidth={2.5}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#013144] mb-4 tracking-tight font-oswald uppercase leading-tight">
                  {t("what-we-offer", "whyChoose.cardTitle", "Grow Faster With Brokarta")}
                </h3>

                <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-7 md:leading-8 max-w-3xl mx-auto md:mx-0">
                  {t("what-we-offer", "whyChoose.cardDesc", "Brokarta is more than a lead platform- it's a unified ecosystem built for B2B collaboration. We bring your partnerships, deals, and interactions into one flow, so nothing gets lost to scattered tools or disconnected chats. Better tracking. More visibility. More control.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}