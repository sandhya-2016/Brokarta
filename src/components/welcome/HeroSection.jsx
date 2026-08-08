"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { X, Play } from "lucide-react";
import Image from "next/image";
import { useUrl } from "@/components/layout/PageUrlProvider";
import { useText } from "@/components/layout/PageTextProvider";

const PacketFlowCanvas = dynamic(() => import("./PacketFlowCanvas"), {
  ssr: false,
});

export default function HeroSection() {
  const u = useUrl();
  const t = useText();
  const [qrPopup, setQrPopup] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const meshRef = useRef(null);

  useEffect(() => {
    let tick = 0;
    let frameId;
    let isVisible = true;

    const updateMesh = () => {
      if (!isVisible) {
        frameId = null;
        return;
      }
      tick += 0.003;
      const mesh = meshRef.current;
      if (mesh) {
        mesh.style.setProperty("--x1", 50 + Math.cos(tick) * 20 + "%");
        mesh.style.setProperty("--y1", 50 + Math.sin(tick) * 20 + "%");
      }
      frameId = requestAnimationFrame(updateMesh);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !frameId) {
          updateMesh();
        }
      },
      { threshold: 0 }
    );

    if (meshRef.current) {
      observer.observe(meshRef.current);
    }

    updateMesh();

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <section className="relative w-full min-h-screen flex flex-col bg-[linear-gradient(135deg,_#0d1b3e_0%,_#0a2a4a_40%,_#0d3350_70%,_#102040_100%)] overflow-hidden z-1">
        {/* Background Canvas */}
        <PacketFlowCanvas className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

        {/* Ambient Overlay Layers */}
        <div ref={meshRef} id="mesh" className="hero-bg-blur" />
        <div className="hero-grain" />
        <div className="hero-smoke" />

        {/* Hero Content Area */}
        <div className="relative z-10 flex-1 w-full max-w-[1600px] mx-auto px-6 md:px-[8vw] py-[80px] lg:py-[40px] flex flex-col justify-center">
          <div className="h-24 md:h-[140px]" />

          <div className="flex justify-between gap-6 lg:gap-[60px] flex-1 pt-4 lg:pt-[30px] flex-col lg:flex-row items-center lg:items-end">
            {/* Left Column: Wording & Actions */}
            <div className="flex flex-col flex-1 min-w-0 pb-0 lg:pb-[20px] items-center lg:items-start text-center lg:text-left">
              <h1 className="flex items-center leading-none tracking-[-0.05em] font-medium mb-4 lg:mb-[36px]  justify-center lg:justify-start">
                <span className="font-oswald inline-block leading-none py-2 text-[clamp(5.5rem,18vw,12rem)] bg-gradient-to-b from-[#F6E8D2] via-[#E2B06A] to-[#F6A200] bg-clip-text text-transparent mr-1 sm:mr-2 lg:mr-[-0.025em] drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
                  {t("home", "hero.titleLetter", "C")}
                </span>
                <div className="flex flex-col items-start text-left">
                  <span className="text-[clamp(2rem,8vw,5.5rem)] text-white font-medium leading-[0.85]">
                    {t("home", "hero.titleLine1", "onnect &")}
                  </span>
                  <span className="text-[clamp(2rem,8vw,5.5rem)] text-[#f6a200] font-medium leading-[0.85]">
                    {t("home", "hero.titleLine2", "ollaborate")}
                  </span>
                </div>
              </h1>

              <div className="mb-6 lg:mb-[40px] max-w-[560px] text-center lg:text-left mx-auto lg:mx-0">
                <h3 className="font-roboto font-black text-[clamp(1.1rem,2vw,1.5rem)] text-white tracking-[-0.03em] leading-[1.2] mb-[14px]">
                  {t("home", "hero.subtitle", "The Network for the Modern Real Estate Broker.")}
                </h3>
                <p className="font-roboto font-normal text-white/70 text-base leading-[1.7]">
                  {t("home", "hero.description", "Grow your network on one powerful platform, built exclusively for real estate professionals")}
                </p>
              </div>

              {/* Action Buttons Group */}
              <div className="flex gap-2.5 sm:gap-4 flex-wrap items-center justify-center lg:justify-start w-full sm:w-auto sm:max-w-none">
                {/* App Store */}
                <a
                  href={u("appStore", "https://apps.apple.com/app/brokarta")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial min-w-0 sm:min-w-[210px] bg-white/8 backdrop-blur-md border border-white/20 h-14 sm:h-16 px-3.5 sm:px-6 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2.5 sm:gap-3.5 no-underline transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 cursor-pointer group shadow-lg"
                >
                  <svg className="w-5.5 h-5.5 sm:w-7 sm:h-7 fill-white shrink-0 group-hover:scale-110 transition-transform duration-300" viewBox="0 -30 384 572">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-14.7 0-51.4-22.2-84.6-21.8-44.1 .6-88.5 28.2-111.2 69-45.6 82.1-11.7 203.2 32.2 267.4 21.6 31.2 47.3 66.5 81.3 65.1 31.5-1.2 44-20.7 82-20.7 37.5 0 49.1 20.7 82 19.9 34.2-.6 56.6-31.5 78.1-62.7 24.6-35.9 34.6-70.6 35.1-72.3-.8-.3-67.4-25.9-67.6-101.1zM231.7 83.2c18.5-22.7 31-54.2 27.2-83.2-25.2 1-56 16.8-74.1 38.2-16.1 18.9-30.6 50.8-26.8 78.8 28.2 2.2 55.4-11.2 73.7-33.8z" />
                  </svg>
                  <div className="flex flex-col leading-tight whitespace-nowrap shrink-0">
                    <span className="text-[8.5px] sm:text-[9px] font-bold text-white/60 uppercase tracking-wider text-left">
                      {t("home", "hero.downloadOn", "DOWNLOAD ON")}
                    </span>
                    <span className="text-sm sm:text-[17px] font-black text-white tracking-tight text-left">
                      {t("home", "hero.appStore", "App Store")}
                    </span>
                  </div>
                </a>

                {/* Google Play */}
                <a
                  href={u("googlePlay", "https://play.google.com/store/apps/details?id=com.brokarta")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial min-w-0 sm:min-w-[210px] bg-white/8 backdrop-blur-md border border-white/20 h-14 sm:h-16 px-3.5 sm:px-6 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2.5 sm:gap-3.5 no-underline transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 cursor-pointer group shadow-lg"
                >
                  <svg className="w-5.5 h-5.5 sm:w-7 sm:h-7 shrink-0 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 512 512">
                    <path fill="#00d2ff" d="M38.5 28.5c-4.2 4.4-6.5 11.2-6.5 20.3v414.4c0 9.1 2.3 15.9 6.5 20.3l2.4 2.2 232.2-232.2v-5.4L40.9 26.3l-2.4 2.2z" />
                    <path fill="#00f076" d="M344.5 316.5l-71.4-71.4v-5.4l71.4-71.4 2.7 1.5 84.7 48.1c24.2 13.7 24.2 36.3 0 50.1l-84.7 48.1-2.7 1.5z" />
                    <path fill="#ff3838" d="M347.2 315l-74.1-74.1-234.6 234.6c7.9 8.4 21 9.4 35.7 1.1l273-161.6z" />
                    <path fill="#ffb300" d="M347.2 197L74.2 35.4C59.5 27.1 46.4 28.1 38.5 36.5l234.6 234.6 74.1-74.1z" />
                  </svg>
                  <div className="flex flex-col leading-tight whitespace-nowrap shrink-0">
                    <span className="text-[8.5px] sm:text-[9px] font-bold text-white/60 uppercase tracking-wider text-left">
                      {t("home", "hero.getItOn", "GET IT ON")}
                    </span>
                    <span className="text-sm sm:text-[17px] font-black text-white tracking-tight text-left">
                      {t("home", "hero.googlePlay", "Google Play")}
                    </span>
                  </div>
                </a>

                {/* QR Hover Scan to Download */}
                <div
                  className="relative hidden sm:block shrink-0"
                  onMouseEnter={() => setQrPopup(true)}
                  onMouseLeave={() => setQrPopup(false)}
                  onContextMenu={(e) => { e.preventDefault(); setQrPopup(!qrPopup); }}
                  onClick={() => setQrPopup(!qrPopup)}
                >
                  <div className="relative bg-white/8 backdrop-blur-md border border-white/20 h-16 px-6 min-w-[210px] rounded-2xl flex items-center gap-3 no-underline overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 cursor-pointer group">
                    <Image
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(u("qrCodeData", "https://brokarta.com"))}`}
                      alt="QR Code"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-sm bg-white p-0.5"
                    />
                    <div className="flex flex-col leading-[1.1] whitespace-nowrap">
                      <span className="text-[8px] font-bold text-white/50 uppercase text-left">
                        {t("home", "hero.scanTo", "SCAN TO")}
                      </span>
                      <span className="text-[17px] font-black text-white tracking-[-0.02em] text-left">
                        {t("home", "hero.download", "Download")}
                      </span>
                    </div>
                  </div>

                  {qrPopup && (
                    <div className="absolute bottom-[130%] left-0 z-[100] p-6 bg-white rounded-3xl shadow-2xl border border-teal-500/20 text-center w-64 animate-[fadeIn_0.2s_ease-out]">
                      <Image
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(u("qrCodeData", "https://brokarta.com"))}`}
                        alt="Big QR Code"
                        width={200}
                        height={200}
                        className="w-full h-auto mb-4 rounded-xl"
                      />
                      <p className="text-[#011627] font-black text-[10px] uppercase tracking-widest">
                        {t("home", "hero.qrTooltip", "Hover to scan & download")}
                      </p>
                      <div className="absolute top-full left-10 w-4 h-4 bg-white rotate-45 -translate-y-2 shadow-xl"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Video Demo Box */}
            <div className="shrink-0 flex pb-[20px] w-full justify-center lg:justify-end lg:w-auto">
              <div
                className="w-[clamp(290px,42vw,440px)] aspect-[16/10] rounded-[28px] bg-[#011423]/50 border border-white/20 relative cursor-pointer shadow-[0_40px_80px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-[1.03] hover:border-[#f6a200] backdrop-blur-[6px] flex items-center justify-center max-lg:w-full max-lg:max-w-[500px] max-lg:mt-4 group"
                id="heroVideoCard"
                onClick={() => setVideoOpen(true)}
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-110">
                  <Play className="w-6 h-6 text-[#011627] fill-current translate-x-[2px]" />
                </div>
                <div className="absolute bottom-5 left-6 flex items-center gap-2.5 text-white text-[11px] font-bold uppercase">
                  <div className="w-2.5 h-2.5 bg-[#f6a200] rounded-full animate-pulse"></div>
                  <span>{t("home", "hero.watchDemo", "WATCH THE DEMO")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Popup Modal */}
      {videoOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
          <button
            onClick={() => setVideoOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 border border-white/15 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer z-[110]"
            title="Close"
          >
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <div className="w-full max-w-6xl lg:max-w-7xl px-4 aspect-video relative flex items-center justify-center animate-[scaleIn_0.3s_ease-out]">
            <video
              src={u("heroVideo", "/images/global/brokarta.mp4")}
              controls
              autoPlay
              className="w-full h-full rounded-3xl border border-white/10 shadow-[0_0_100px_rgba(0,204,156,0.3)] bg-black"
              suppressHydrationWarning
            ></video>
          </div>
        </div>
      )}
    </>
  );
}