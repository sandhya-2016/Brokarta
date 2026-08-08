"use client";

import Image from "next/image";
import Link from "next/link";
import { useUrl } from "@/components/layout/PageUrlProvider";

export default function Header({ menuOpen, setMenuOpen, showHeader, scrolled }) {
  const u = useUrl();
  const handleLogoClick = (e) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-1001 px-5 py-2 md:px-10 transition-transform duration-300 ease-in-out transform-gpu will-change-transform ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={handleLogoClick}
          aria-label="Brokarta Homepage"
          className="relative p-2 transition-transform duration-300 hover:scale-105 inline-flex cursor-pointer"
        >
          <div className="absolute -inset-3.75 bg-[radial-gradient(circle,rgba(246,162,0,0.2)_0%,transparent_70%)] blur-[20px] pointer-events-none"></div>
          <Image
            src={u("headerLogo", "/images/global/logo.png")}
            alt="Brokarta"
            width={120}
            height={120}
            priority
            className="[--header-logo-height:5rem] md:[--header-logo-height:7.5rem] filter drop-shadow-[0_0_10px_rgba(0,0,0,0.3)]"
            style={{ width: "auto", height: "var(--header-logo-height)" }}
          />
        </Link>

        {/* Hamburger Trigger */}
        <div className="relative p-[2px] rounded-full overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex-shrink-0 transition-transform active:scale-90">
          <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent,#00cc9c,#f6a200,transparent)] animate-border-spin z-0"></div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-10 w-11 h-11 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors"
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
          >
            <div className="relative w-5 md:w-6 h-4">
              <span
                className={`absolute left-0 w-full h-[2px] bg-[#013144] rounded-[2px] transition-all duration-300 ${
                  menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              ></span>
              <span
                className={`absolute left-0 w-full h-[2px] bg-[#013144] rounded-[2px] transition-all duration-300 top-1/2 -translate-y-1/2 ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              ></span>
              <span
                className={`absolute left-0 w-full h-[2px] bg-[#013144] rounded-[2px] transition-all duration-300 ${
                  menuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
