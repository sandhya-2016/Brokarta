"use client";

import Link from "next/link";
import { Cookie, Info, CheckCircle2, Settings, ArrowLeft } from "lucide-react";
import { useText } from "@/components/layout/PageTextProvider";

export default function CookiePolicyContent() {
  const t = useText();

  return (
    <div className="bg-[#f4f7f9] text-[#013144] min-h-screen pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#02647e] hover:text-[#00cc9c] transition-colors mb-6 sm:mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("cookie-policy", "backHome", "Back to Home")}
        </Link>

        {/* Page Header */}
        <div className="bg-[#013144] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden mb-8 sm:mb-12 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#38d39f]/10 blur-[90px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#02647e]/20 blur-[90px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#38d39f] text-xs font-semibold uppercase tracking-wider mb-4">
              <Cookie className="w-4 h-4" />
              {t("cookie-policy", "badge", "Cookies & Tracking")}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3">
              {t("cookie-policy", "title", "Cookie Policy")}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
              {t("cookie-policy", "subtitle", "Learn how Brokarta uses cookies and similar technologies to ensure smooth authentication, platform security, and personalized broker features.")}
            </p>

            <div className="mt-6 pt-6 border-t border-white/15 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400">
              <span>
                {t("cookie-policy", "lastUpdated", "Last Updated")}: <strong className="text-white font-medium">{t("cookie-policy", "lastUpdatedDate", "July 2026")}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-8 sm:space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#013144] mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#38d39f]" />
              {t("cookie-policy", "section1.title", "1. What Are Cookies?")}
            </h2>
            <p>
              {t("cookie-policy", "section1.content", "Cookies are small text files stored on your browser or mobile device when you visit websites or mobile applications. They allow the platform to recognize your session, remember your preferences, and maintain secure authentication while navigating Brokarta.")}
            </p>
          </section>

          {/* Section 2 */}
          <section className="pt-6 border-t border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#013144] mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#02647e]" />
              {t("cookie-policy", "section2.title", "2. Types of Cookies We Use")}
            </h2>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#f4f7f9] border border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-[#013144] text-base">
                    {t("cookie-policy", "section2.essential.title", "Essential & Security Cookies")}
                  </h3>
                  <span className="px-2.5 py-1 rounded-full bg-[#38d39f]/20 text-[#013144] text-xs font-bold">
                    {t("cookie-policy", "section2.essential.badge", "Always Active")}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  {t("cookie-policy", "section2.essential.content", "Required for core platform functionality, user login session persistence, CSRF protection, and identity verification.")}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#f4f7f9] border border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-[#013144] text-base">
                    {t("cookie-policy", "section2.analytics.title", "Analytics & Performance Cookies")}
                  </h3>
                  <span className="px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">
                    {t("cookie-policy", "section2.analytics.badge", "Performance")}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  {t("cookie-policy", "section2.analytics.content", "Help us understand how brokers interact with listing search, filters, and feature usage so we can optimize application speed and responsiveness.")}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#f4f7f9] border border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-[#013144] text-base">
                    {t("cookie-policy", "section2.preference.title", "Preference & Feature Cookies")}
                  </h3>
                  <span className="px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">
                    {t("cookie-policy", "section2.preference.badge", "Preferences")}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  {t("cookie-policy", "section2.preference.content", "Remember your regional market filters, dark/light theme settings, and saved search queries across visits.")}
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="pt-6 border-t border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#013144] mb-3">
              {t("cookie-policy", "section3.title", "3. Managing Your Cookie Preferences")}
            </h2>
            <p className="mb-4">
              {t("cookie-policy", "section3.content", "You can adjust or disable non-essential cookies at any time through your web browser settings. Please note that disabling essential cookies may impact your ability to log in or access secure broker-only listing portals.")}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}