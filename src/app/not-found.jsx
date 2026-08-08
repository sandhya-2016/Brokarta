"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Search,
  ArrowRight,
  Compass,
  MapPin,
  Building2,
  Users2,
  Layers3,
  MailOpen,
  Sparkles,
  ArrowLeft
} from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/what-we-offer?search=${encodeURIComponent(searchQuery)}`;
    } else {
      window.location.href = "/what-we-offer";
    }
  };

  const quickLinks = [
    { title: "Verified Brokers", desc: "Join our network of real estate professionals", href: "/become-a-user", icon: Users2, color: "text-[#00cc9c] bg-[#00cc9c]/10" },
    { title: "Property Discovery", desc: "Explore our B2B listings and tools", href: "/what-we-offer", icon: Building2, color: "text-[#f6a200] bg-[#f6a200]/10" },
    { title: "Our Mission", desc: "Discover how Brokarta was built", href: "/about-us", icon: Compass, color: "text-cyan-400 bg-cyan-500/10" },
    { title: "Contact Support", desc: "Get in touch with our team", href: "/connect-now", icon: MailOpen, color: "text-purple-400 bg-purple-500/10" },
  ];

  return (
    <div className="min-h-screen bg-[#001a1a] text-white flex flex-col justify-between relative overflow-hidden font-sans ">

      {/* ───── Background Architectural Grid & Radial Glows ───── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#00cc9c]/20 via-[#013144]/40 to-transparent blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-gradient-to-tl from-[#f6a200]/15 to-transparent blur-[120px] rounded-full pointer-events-none z-0" />

      {/* ───── TOP BAR BRANDING HEADER ───── */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 sm:py-8 flex items-center justify-between">
        <Link href="/" className="relative group inline-flex items-center">
          <div className="absolute -inset-3.75 bg-[radial-gradient(circle,rgba(246,162,0,0.2)_0%,transparent_70%)] blur-[20px] pointer-events-none"></div>
          <Image
            src="/images/global/logo.png"
            alt="Brokarta"
            width={120}
            height={60}
            priority
            className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-white/80 hover:text-white transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#00cc9c]" />
          <span>Home Page</span>
        </Link>
      </header>

      {/* ───── MAIN 404 CONTENT AREA ───── */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col items-center text-center">

        {/* Animated City Skyline & Parallax Illustration */}
        <div className="relative w-full max-w-2xl h-48 sm:h-64 my-2 flex items-center justify-center overflow-visible">

          {/* Gentle Sunlight Radial Aura */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-2 w-48 h-48 bg-gradient-to-b from-[#f6a200]/30 to-[#00cc9c]/20 rounded-full blur-2xl pointer-events-none"
          />

          {/* Moving Clouds */}
          <motion.div
            animate={{ x: [-120, 120, -120] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-2 left-10 opacity-30 pointer-events-none"
          >
            <svg className="w-24 h-12 fill-white" viewBox="0 0 24 24">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
          </motion.div>

          <motion.div
            animate={{ x: [100, -100, 100] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            className="absolute top-8 right-12 opacity-20 pointer-events-none"
          >
            <svg className="w-32 h-16 fill-[#00cc9c]" viewBox="0 0 24 24">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
          </motion.div>

          {/* Flying Birds */}
          <motion.div
            animate={{ x: [-180, 200], y: [0, -15, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 left-1/4 opacity-40 pointer-events-none"
          >
            <svg className="w-6 h-6 stroke-white fill-none stroke-2" viewBox="0 0 24 24">
              <path d="M2 12s4-6 10-2c6-4 10 2 10 2" />
            </svg>
          </motion.div>

          {/* Luxury Buildings Skyline SVG Illustration */}
          <div className="relative w-full h-full flex items-end justify-center">

            {/* Background Parallax Silhouette */}
            <svg className="w-full h-36 sm:h-48 opacity-25" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="50" y="80" width="60" height="120" fill="#02647e" />
              <rect x="130" y="40" width="80" height="160" fill="#013144" />
              <rect x="230" y="100" width="50" height="100" fill="#02647e" />
              <rect x="300" y="20" width="90" height="180" fill="#013144" />
              <rect x="410" y="60" width="70" height="140" fill="#02647e" />
              <rect x="500" y="30" width="85" height="170" fill="#013144" />
              <rect x="600" y="90" width="65" height="110" fill="#02647e" />
              <rect x="680" y="50" width="75" height="150" fill="#013144" />
            </svg>

            {/* Foreground Buildings with Glowing Animated Windows */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 inset-x-0 flex items-end justify-center gap-2 sm:gap-4 px-4"
            >
              {/* Building 1 */}
              <div className="w-16 sm:w-20 h-28 sm:h-36 bg-gradient-to-t from-[#013144] to-[#02647e] rounded-t-2xl border-t border-x border-white/20 relative shadow-2xl overflow-hidden p-2 flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-1.5">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.4 }}
                      className="w-full h-3 bg-[#f6a200] rounded-sm shadow-[0_0_8px_#f6a200]"
                    />
                  ))}
                </div>
              </div>

              {/* Central Tower (Tower 404) */}
              <div className="w-24 sm:w-32 h-36 sm:h-48 bg-gradient-to-t from-[#013144] via-[#012535] to-[#02647e] rounded-t-3xl border-t-2 border-x-2 border-[#00cc9c]/40 relative shadow-2xl p-3 flex flex-col justify-between">
                <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-1 h-4 bg-[#00cc9c] animate-pulse" />
                <div className="grid grid-cols-3 gap-1.5 mt-2">
                  {[...Array(9)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.8 + (i % 2), repeat: Infinity, delay: i * 0.3 }}
                      className="w-full h-3.5 bg-[#00cc9c] rounded-xs shadow-[0_0_10px_#00cc9c]"
                    />
                  ))}
                </div>
                <div className="w-full h-6 bg-[#00cc9c]/20 border border-[#00cc9c]/40 rounded-lg flex items-center justify-center">
                  <span className="text-[10px] font-black text-[#00cc9c] uppercase tracking-widest">BROKARTA</span>
                </div>
              </div>

              {/* Building 3 */}
              <div className="w-16 sm:w-20 h-24 sm:h-32 bg-gradient-to-t from-[#013144] to-[#02647e] rounded-t-2xl border-t border-x border-white/20 relative shadow-2xl p-2 flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-1.5">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.2, 0.9, 0.2] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                      className="w-full h-3 bg-[#f6a200] rounded-sm shadow-[0_0_6px_#f6a200]"
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating Location Pin / 404 Icon Over Tower */}
            <motion.div
              animate={{ y: [-8, 8, -8], rotate: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 z-30 bg-gradient-to-tr from-[#013144] to-[#02647e] border-2 border-[#00cc9c] px-4 py-2 rounded-2xl shadow-[0_15px_30px_rgba(0,204,156,0.3)] flex items-center gap-2 backdrop-blur-md"
            >
              <MapPin className="w-5 h-5 text-[#f6a200] animate-bounce" />
              <span className="font-oswald font-black text-2xl text-white tracking-wider">404</span>
            </motion.div>

          </div>
        </div>

        {/* ───── GLASSMORPHISM CARD & HEADINGS ───── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00cc9c]/10 border border-[#00cc9c]/30 text-[#00cc9c] text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>404 • Property Not Found</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-oswald text-white tracking-tight uppercase leading-none">
              Oops! This Property <span className="text-[#f6a200]">Doesn&apos;t Exist</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed pt-1">
              The page you&apos;re looking for may have been moved, deleted, or never existed. Let&apos;s help you find your way back to your dream property.
            </p>
          </div>


          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#00cc9c] to-[#00b388] text-[#013144] font-black text-sm uppercase tracking-wider shadow-lg shadow-[#00cc9c]/20 hover:shadow-[#00cc9c]/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </motion.div>

        {/* ───── POPULAR CATEGORIES & QUICK LINKS ───── */}
        <div className="mt-8 w-full max-w-4xl grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {quickLinks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group flex flex-col justify-between space-y-3 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs group-hover:text-[#00cc9c] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </main>

      {/* ───── FOOTER BRANDING ───── */}
      <footer className="relative z-10 py-6 text-center text-xs text-slate-400 font-medium">
        <span>© {new Date().getFullYear()} Brokarta Community Network. All rights reserved.</span>
      </footer>

    </div>
  );
}
