"use client";

import Link from "next/link";
import { FileText, Scale, UserCheck, AlertTriangle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useText } from "@/components/layout/PageTextProvider";

export default function TermsOfServiceContent() {
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
          {t("terms-of-service", "backHome", "Back to Home")}
        </Link>

        {/* Page Header */}
        <div className="bg-[#013144] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden mb-8 sm:mb-12 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00cc9c]/10 blur-[90px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#f6a200]/10 blur-[90px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#f6a200] text-xs font-semibold uppercase tracking-wider mb-4">
              <Scale className="w-4 h-4" />
              {t("terms-of-service", "badge", "Legal Agreement")}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3">
              {t("terms-of-service", "title", "Terms of Service")}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
              {t("terms-of-service", "subtitle", "Please review these Terms of Service carefully before accessing or using the Brokarta broker platform and mobile application.")}
            </p>

            <div className="mt-6 pt-6 border-t border-white/15 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400">
              <span>
                {t("terms-of-service", "lastUpdated", "Last Updated")}: <strong className="text-white font-medium">{t("terms-of-service", "lastUpdatedDate", "July 2026")}</strong>
              </span>
              <span>•</span>
              <span>
                {t("terms-of-service", "version", "Version")}: <strong className="text-white font-medium">{t("terms-of-service", "versionValue", "v2.4")}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-8 sm:space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#013144] mb-3 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#38d39f]" />
              {t("terms-of-service", "section1.title", "1. Acceptance of Terms & Eligibility")}
            </h2>
            <p className="mb-4">
              {t("terms-of-service", "section1.intro", "By registering an account or accessing the Brokarta application, you represent and warrant that you are a licensed real estate broker or authorized industry professional in good standing with relevant regulatory authorities.")}
            </p>
            <ul className="space-y-2 list-none pl-0">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#38d39f] shrink-0 mt-1" />
                <span>{t("terms-of-service", "section1.point1", "Access is restricted exclusively to verified real estate brokers, agents, and brokerage firms.")}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#38d39f] shrink-0 mt-1" />
                <span>{t("terms-of-service", "section1.point2", "You agree to provide accurate, complete registration details and maintain active licensing credentials.")}</span>
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="pt-6 border-t border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#013144] mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#02647e]" />
              {t("terms-of-service", "section2.title", "2. User Conduct & Professional Ethics")}
            </h2>
            <p className="mb-4">
              {t("terms-of-service", "section2.intro", "Brokarta is a high-trust professional network. Members agree to uphold strict real estate code of ethics when engaging with fellow brokers:")}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#f4f7f9] border border-slate-200/60">
                <h3 className="font-bold text-[#013144] mb-1">
                  {t("terms-of-service", "section2.card1.title", "Authentic Listings")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  {t("terms-of-service", "section2.card1.desc", "All posted property listings and lead criteria must represent legitimate, verified opportunities.")}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#f4f7f9] border border-slate-200/60">
                <h3 className="font-bold text-[#013144] mb-1">
                  {t("terms-of-service", "section2.card2.title", "Co-Broking Honor")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  {t("terms-of-service", "section2.card2.desc", "Respecting co-broker agreements, commission splits, and client confidentiality protocols.")}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#f4f7f9] border border-slate-200/60">
                <h3 className="font-bold text-[#013144] mb-1">
                  {t("terms-of-service", "section2.card3.title", "No Poaching or Spam")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  {t("terms-of-service", "section2.card3.desc", "Unsolicited spam, client poaching, or misleading communications result in immediate suspension.")}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#f4f7f9] border border-slate-200/60">
                <h3 className="font-bold text-[#013144] mb-1">
                  {t("terms-of-service", "section2.card4.title", "Platform Security")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  {t("terms-of-service", "section2.card4.desc", "Prohibiting automated scraping, reverse engineering, or unauthorized API access.")}
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="pt-6 border-t border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#013144] mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#f6a200]" />
              {t("terms-of-service", "section3.title", "3. Listings & Commission Disclaimers")}
            </h2>
            <p className="mb-4">
              {t("terms-of-service", "section3.intro", "Brokarta serves as a technology enablement platform connecting brokers. Brokarta does not act as a real estate brokerage, property owner, or escrow agent in any transaction.")}
            </p>
            <div className="p-4 rounded-2xl bg-[#f6a200]/10 border border-[#f6a200]/20 text-xs sm:text-sm text-slate-700">
              <strong>{t("terms-of-service", "section3.transactionResponsibility", "Transaction Responsibility")}:</strong>{" "}
              {t("terms-of-service", "section3.transactionDesc", "Brokarta is not a party to any contract, co-broker agreement, or financial transaction negotiated between users. All deal terms, due diligence, and commission split agreements remain the sole responsibility of the participating brokers.")}
            </div>
          </section>

          {/* Section 4 */}
          <section className="pt-6 border-t border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#013144] mb-3">
              {t("terms-of-service", "section4.title", "4. Termination & Account Cancellation")}
            </h2>
            <p className="mb-3">
              {t("terms-of-service", "section4.intro", "We reserve the right to suspend or terminate any account that violates platform rules, provides fraudulent verification documents, or breaches professional standards.")}
            </p>
            <p>
              {t("terms-of-service", "section4.cancelIntro", "Users may voluntarily terminate their account at any time by contacting support at")}{" "}
              <a href="mailto:support@brokarta.com" className="text-[#02647e] font-semibold underline hover:text-[#00cc9c]">
                {t("terms-of-service", "section4.email", "support@brokarta.com")}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}