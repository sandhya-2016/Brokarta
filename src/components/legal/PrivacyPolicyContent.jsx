"use client";

import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useText } from "@/components/layout/PageTextProvider";

export default function PrivacyPolicyContent() {
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
          {t("privacy-policy", "backHome", "Back to Home")}
        </Link>

        {/* Page Header */}
        <div className="bg-[#013144] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden mb-8 sm:mb-12 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#38d39f]/10 blur-[90px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#f6a200]/10 blur-[90px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#38d39f] text-xs font-semibold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4" />
              {t("privacy-policy", "badge", "Official Document")}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3">
              {t("privacy-policy", "title", "Privacy Policy")}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
              {t("privacy-policy", "subtitle", "At Brokarta, we are committed to safeguarding your privacy and protecting the data of verified real estate brokers across our ecosystem.")}
            </p>

            <div className="mt-6 pt-6 border-t border-white/15 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400">
              <span>
                {t("privacy-policy", "lastUpdated", "Last Updated")}: <strong className="text-white font-medium">{t("privacy-policy", "lastUpdatedDate", "July 2026")}</strong>
              </span>
              <span>•</span>
              <span>
                {t("privacy-policy", "effectiveDate", "Effective Date")}: <strong className="text-white font-medium">{t("privacy-policy", "effectiveDateValue", "Immediate")}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-8 sm:space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#013144] mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#38d39f]" />
              {t("privacy-policy", "section1.title", "1. Information We Collect")}
            </h2>
            <p className="mb-4">
              {t("privacy-policy", "section1.intro", "To maintain an exclusive, verified B2B network for real estate brokers, Brokarta collects personal and professional information necessary to verify identities and enable seamless deal collaboration.")}
            </p>
            <ul className="space-y-2 list-none pl-0">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#38d39f] shrink-0 mt-1" />
                <span>
                  <strong>{t("privacy-policy", "section1.point1.label", "Personal Identification")}:</strong>{" "}
                  {t("privacy-policy", "section1.point1.value", "Full name, professional email address, contact phone number, and profile image.")}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#38d39f] shrink-0 mt-1" />
                <span>
                  <strong>{t("privacy-policy", "section1.point2.label", "Professional & Licensing Data")}:</strong>{" "}
                  {t("privacy-policy", "section1.point2.value", "Real estate license numbers, brokerage affiliation, registration certificates, and geographic operating focus.")}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#38d39f] shrink-0 mt-1" />
                <span>
                  <strong>{t("privacy-policy", "section1.point3.label", "Property & Listing Information")}:</strong>{" "}
                  {t("privacy-policy", "section1.point3.value", "Property specifications, pricing, locations, and lead criteria submitted directly by you on the platform.")}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#38d39f] shrink-0 mt-1" />
                <span>
                  <strong>{t("privacy-policy", "section1.point4.label", "Technical & Usage Logs")}:</strong>{" "}
                  {t("privacy-policy", "section1.point4.value", "IP address, device identifiers, app usage telemetry, and interaction logs.")}
                </span>
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="pt-6 border-t border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#013144] mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#02647e]" />
              {t("privacy-policy", "section2.title", "2. How We Use Your Information")}
            </h2>
            <p className="mb-4">
              {t("privacy-policy", "section2.intro", "We utilize your data strictly to facilitate trusted broker-to-broker connections, ensure community security, and continuously improve platform services:")}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#f4f7f9] border border-slate-200/60">
                <h3 className="font-bold text-[#013144] mb-1">
                  {t("privacy-policy", "section2.card1.title", "Identity Verification")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  {t("privacy-policy", "section2.card1.desc", "Verifying credentials to enforce our strict broker-only membership criteria.")}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#f4f7f9] border border-slate-200/60">
                <h3 className="font-bold text-[#013144] mb-1">
                  {t("privacy-policy", "section2.card2.title", "Smart Matchmaking")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  {t("privacy-policy", "section2.card2.desc", "Connecting relevant buyers, sellers, and co-broking requirements accurately.")}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#f4f7f9] border border-slate-200/60">
                <h3 className="font-bold text-[#013144] mb-1">
                  {t("privacy-policy", "section2.card3.title", "Communication")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  {t("privacy-policy", "section2.card3.desc", "Delivering essential platform updates, match alerts, and direct broker inquiries.")}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#f4f7f9] border border-slate-200/60">
                <h3 className="font-bold text-[#013144] mb-1">
                  {t("privacy-policy", "section2.card4.title", "Security & Compliance")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  {t("privacy-policy", "section2.card4.desc", "Detecting fraudulent activity, preventing spam, and enforcing network rules.")}
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="pt-6 border-t border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#013144] mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#f6a200]" />
              {t("privacy-policy", "section3.title", "3. Information Sharing & Protection")}
            </h2>
            <p className="mb-4">
              {t("privacy-policy", "section3.intro", "Brokarta never sells your personal information to third-party advertisers. Your contact details are shared only with verified brokers on the platform when you explicitly initiate or accept a deal connection or inquiry.")}
            </p>
            <div className="p-4 rounded-2xl bg-[#013144]/5 border border-[#013144]/10 text-xs sm:text-sm text-[#013144]">
              <strong>{t("privacy-policy", "section3.securityProtocol", "Security Protocol")}:</strong>{" "}
              {t("privacy-policy", "section3.securityDesc", "We implement bank-grade encryption protocols (TLS/SSL), strict role-based access controls, and automated threat monitoring to prevent unauthorized access to your account and listings data.")}
            </div>
          </section>

          {/* Section 4 */}
          <section className="pt-6 border-t border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#013144] mb-3">
              {t("privacy-policy", "section4.title", "4. Your Rights & Choices")}
            </h2>
            <p className="mb-4">
              {t("privacy-policy", "section4.intro", "You retain complete ownership over your account data. You may at any time:")}
            </p>
            <ul className="space-y-2 list-disc pl-5">
              <li>{t("privacy-policy", "section4.point1", "Review, update, or edit your profile and brokerage information.")}</li>
              <li>{t("privacy-policy", "section4.point2", "Request full deletion of your account and associated listing records.")}</li>
              <li>{t("privacy-policy", "section4.point3", "Configure notification preferences for email, push, and SMS alerts.")}</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="pt-6 border-t border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#013144] mb-3">
              {t("privacy-policy", "section5.title", "5. Contact Us")}
            </h2>
            <p>
              {t("privacy-policy", "section5.intro", "If you have any questions regarding this Privacy Policy or wish to exercise your data rights, please contact our Privacy Team at")}{" "}
              <a href="mailto:privacy@brokarta.com" className="text-[#02647e] font-semibold underline hover:text-[#00cc9c]">
                {t("privacy-policy", "section5.email", "privacy@brokarta.com")}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}