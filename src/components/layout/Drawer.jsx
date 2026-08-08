"use client";

import Link from "next/link";
import { useEffect } from "react";
import { X } from "lucide-react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useText } from "@/components/layout/PageTextProvider";

export default function Drawer({ menuOpen, setMenuOpen }) {
  const t = useText();

  // Hardcoded drawer content with useText
  const drawerContent = {
    menuItems: [
      { name: t("layout", "drawer.menu.about", "About Us"), href: "/about-us" },
      { name: t("layout", "drawer.menu.whatWeOffer", "What We Offer"), href: "/what-we-offer" },
      { name: t("layout", "drawer.menu.becomeUser", "Become A User"), href: "/become-a-user" },
      { name: t("layout", "drawer.menu.connectNow", "Connect Now"), href: "/connect-now" },
    ],
    inquiriesLabel: t("layout", "drawer.inquiriesLabel", "Direct Inquiries"),
    email: t("layout", "drawer.email", "hello@brokarta.com"),
  };

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const menuItems = drawerContent.menuItems;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!menuOpen}
      aria-label="Navigation Menu"
      className={`fixed inset-0 z-[2000] transition-opacity duration-500 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
    >
      {/* Dark blur backdrop button */}
      <button
        className="absolute inset-0 w-full h-full bg-black/40 backdrop-blur-sm cursor-pointer border-none"
        onClick={() => setMenuOpen(false)}
        aria-label="Close menu"
      ></button>

      {/* Glass drawer panel */}
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-[340px] p-[1.5px] overflow-hidden shadow-2xl transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Conic rotating border */}
        <div className="absolute inset-[-150%_-250%] bg-[conic-gradient(from_0deg,transparent,#00cc9c,#f6a200,transparent)] animate-border-spin-slow opacity-40 z-0 pointer-events-none"></div>

        {/* Glass nav inner */}
        <nav className="glass-drawer relative z-10 h-full w-full flex flex-col p-6 sm:p-8 bg-[#011423]/90 backdrop-blur-[40px] border-l border-white/10" aria-label="Main Navigation">
          {/* Close Button */}
          <div className="flex items-center justify-end pb-4 border-b border-white/10 mb-4">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#f6a200] text-white flex items-center justify-center transition-all duration-300 active:scale-90 shadow-md hover:scale-105 cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Menu items */}
          <div className="flex-grow flex flex-col justify-center space-y-4">
            {menuItems.map((item, index) => (
              <div key={index} className="relative p-[1.5px] rounded-full overflow-hidden w-full group active:scale-97 transition-transform">
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-center py-4 px-8 rounded-full text-lg font-bold text-white bg-transparent hover:bg-[#255f78] hover:scale-98 transition-all relative z-10"
                >
                  {item.name}
                </Link>
                {/* Conic border shown on hover */}
                <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent,#00cc9c,#f6a200,transparent)] animate-border-spin z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Footer contact */}
          <div className="mt-auto pt-8 border-t border-white/10 pb-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">
              {drawerContent.inquiriesLabel}
            </p>
            <a
              href={`mailto:${drawerContent.email}`}
              className="text-white font-extrabold text-lg hover:text-brand-orange transition-colors"
            >
              {drawerContent.email}
            </a>
            <div className="flex gap-3 mt-6">
              <a
                href={t("layout", "social.linkedin", "https://linkedin.com/company/brokarta")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#f6a200] hover:scale-105 border border-white/10 transition-all cursor-pointer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>

              <a
                href={t("layout", "social.twitter", "https://x.com/brokarta")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#f6a200] hover:scale-105 border border-white/10 transition-all cursor-pointer"
                aria-label="X"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>

              <a
                href={t("layout", "social.instagram", "https://instagram.com/brokarta")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#f6a200] hover:scale-105 border border-white/10 transition-all cursor-pointer"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}