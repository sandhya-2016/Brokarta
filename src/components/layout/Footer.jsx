"use client";

import Link from "next/link";
import { useUrl } from "@/components/layout/PageUrlProvider";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useText } from "@/components/layout/PageTextProvider";

export default function Footer() {
  const u = useUrl();
  const t = useText();

  const companyLinks = [
    { name: t("layout", "footer.company.about", "About Us"), href: "/about-us" },
    { name: t("layout", "footer.company.whatWeOffer", "What We Offer"), href: "/what-we-offer" },
    { name: t("layout", "footer.company.becomeUser", "Become A User"), href: "/become-a-user" },
    { name: t("layout", "footer.company.connectNow", "Connect Now"), href: "/connect-now" },
  ];

  const legalLinks = [
    { name: t("layout", "footer.legal.privacy", "Privacy Policy"), href: "/privacy-policy" },
    { name: t("layout", "footer.legal.terms", "Terms of Service"), href: "/terms-of-service" },
    { name: t("layout", "footer.legal.cookie", "Cookie Policy"), href: "/cookie-policy" },
  ];

  // Hardcoded social links
  const socialLinks = {
    linkedin: t("layout", "social.linkedin", "https://linkedin.com/company/brokarta"),
    twitter: t("layout", "social.twitter", "https://x.com/brokarta"),
    instagram: t("layout", "social.instagram", "https://instagram.com/brokarta"),
    investorEmail: t("layout", "social.investorEmail", "invest@brokarta.com"),
  };

  return (
    <footer className="relative bg-[#013144] pt-6 sm:pt-10 pb-6 overflow-hidden text-white font-sans mt-auto">      {/* Atmospheric Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00cc9c]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#f6a200]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="mx-auto max-w-5xl px-6 sm:px-8 relative z-10">

        {/* Top Section: CTA & App Buttons */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center gap-5 lg:gap-8 pb-8 border-b border-white/10">
          <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0">
            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight font-oswald uppercase">
              {t("layout", "footer.cta.prefix", "READY TO")} <span className="text-[#f6a200]">{t("layout", "footer.cta.highlight1", "NETWORK")}</span> <br />
              {t("layout", "footer.cta.middle", "AND")} <span className="text-[#00cc9c]">{t("layout", "footer.cta.highlight2", "GROW?")}</span>
            </h2>
            <p className="text-white/60 mt-2 text-base">
              {t("layout", "footer.cta.subtitle", "Join the only verified digital ecosystem built exclusively for real estate brokers.")}
            </p>
          </div>
          <div className="flex flex-row justify-center items-center gap-2.5 sm:gap-3">
            {/* App Store */}
            <a
              href={u("appStore", "https://apps.apple.com/app/brokarta")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-2.5 bg-white px-3 py-2 rounded-xl sm:rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 w-[135px] sm:w-[145px] h-[52px] sm:h-[56px] shrink-0"
            >
              <div className="w-6 h-6 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -30 384 572"
                  fill="#013144"
                  className="w-full h-full"
                >
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-14.7 0-51.4-22.2-84.6-21.8-44.1.6-88.5 28.2-111.2 69-45.6 82.1-11.7 203.2 32.2 267.4 21.6 31.2 47.3 66.5 81.3 65.1 31.5-1.2 44-20.7 82-20.7 37.5 0 49.1 20.7 82 19.9 34.2-.6 56.6-31.5 78.1-62.7 24.6-35.9 34.6-70.6 35.1-72.3-.8-.3-67.4-25.9-67.6-101.1zM231.7 83.2c18.5-22.7 31-54.2 27.2-83.2-25.2 1-56 16.8-74.1 38.2-16.1 18.9-30.6 50.8-26.8 78.8 28.2 2.2 55.4-11.2 73.7-33.8z" />
                </svg>
              </div>

              <div className="text-left leading-tight min-w-0">
                <p className="text-[7px] sm:text-[7.5px] uppercase font-bold text-slate-400 leading-none">
                  {t("layout", "footer.appStore.downloadOn", "Download on")}
                </p>
                <p className="text-xs sm:text-sm font-black text-[#013144] leading-tight truncate">
                  {t("layout", "footer.appStore.text", "App Store")}
                </p>
              </div>
            </a>

            {/* Google Play */}
            <a
              href={u("googlePlay", "https://play.google.com/store/apps/details?id=com.brokarta")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-2.5 bg-white px-3 py-2 rounded-xl sm:rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 w-[135px] sm:w-[145px] h-[52px] sm:h-[56px] shrink-0"
            >
              <div className="w-6 h-6 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-full h-full"
                >
                  <path fill="#00d2ff" d="M38.5 28.5c-4.2 4.4-6.5 11.2-6.5 20.3v414.4c0 9.1 2.3 15.9 6.5 20.3l2.4 2.2 232.2-232.2v-5.4L40.9 26.3l-2.4 2.2z" />
                  <path fill="#00f076" d="M344.5 316.5l-71.4-71.4v-5.4l71.4-71.4 2.7 1.5 84.7 48.1c24.2 13.7 24.2 36.3 0 50.1l-84.7 48.1-2.7 1.5z" />
                  <path fill="#ff3838" d="M347.2 315l-74.1-74.1-234.6 234.6c7.9 8.4 21 9.4 35.7 1.1l273-161.6z" />
                  <path fill="#ffb300" d="M347.2 197L74.2 35.4C59.5 27.1 46.4 28.1 38.5 36.5l234.6 234.6 74.1-74.1z" />
                </svg>
              </div>

              <div className="text-left leading-tight min-w-0">
                <p className="text-[7px] sm:text-[7.5px] uppercase font-bold text-slate-400 leading-none">
                  {t("layout", "footer.googlePlay.getItOn", "Get it on")}
                </p>
                <p className="text-xs sm:text-sm font-black text-[#013144] leading-tight truncate">
                  {t("layout", "footer.googlePlay.text", "Google Play")}
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Middle Section: Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16 py-8 md:py-12">
          {/* Company */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#f6a200] mb-3">
              {t("layout", "footer.company.title", "Company")}
            </h4>
            <ul className="space-y-2">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="footer-flow-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">
              {t("layout", "footer.legal.title", "Legal")}
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="footer-flow-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Investor */}
          <div className="col-span-2 md:col-span-1 mt-5 md:mt-0">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#00cc9c] mb-3">
              {t("layout", "footer.connect.title", "Connect")}
            </h4>

            <div className="flex gap-3 mb-4">
              <a
                href={u("linkedin", socialLinks.linkedin)}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#f6a200] hover:scale-105 flex items-center justify-center text-white border border-white/10 transition-all cursor-pointer"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>

              <a
                href={u("twitter", socialLinks.twitter)}
                aria-label="X"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#f6a200] hover:scale-105 flex items-center justify-center text-white border border-white/10 transition-all cursor-pointer"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>

              <a
                href={u("instagram", socialLinks.instagram)}
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#f6a200] hover:scale-105 flex items-center justify-center text-white border border-white/10 transition-all cursor-pointer"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>

            <a
              href={`mailto:${u("supportEmail", t("layout", "footer.email", "hello@brokarta.com"))}`}
              className="block text-white/60 text-sm font-semibold hover:text-[#f6a200] transition-colors mb-3"
            >
              {u("supportEmail", t("layout", "footer.email", "hello@brokarta.com"))}
            </a>

            {/* Investor Box */}
            <div className="relative group p-[1px] rounded-xl overflow-hidden inline-block">
              <div className="absolute inset-[-300%] bg-[conic-gradient(from_0deg,transparent,#00cc9c,#f6a200,transparent)] animate-border-spin z-0 opacity-60 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10 bg-[#286076] px-4 py-1 rounded-[15px]">
                <p className="text-[11px] text-slate-300 mb-1 leading-tight font-black">
                  {t("layout", "footer.investor.label", "Interested in investing?")}
                </p>

                <a
                  href={`mailto:${u("investorEmail", socialLinks.investorEmail)}`}
                  className="block text-white hover:text-[#f6a200] transition-colors text-sm font-bold whitespace-nowrap"
                >
                  {u("investorEmail", socialLinks.investorEmail)}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col items-center justify-center gap-3 text-center text-white/40 text-xs font-bold uppercase tracking-widest">
          <p>{t("layout", "footer.copyright", "© 2026 Brokarta. All rights reserved.")}</p>
          <p>{t("layout", "footer.madeWithLove", "Made with love for the Broker Community")}</p>
        </div>
      </div>
    </footer>
  );
}