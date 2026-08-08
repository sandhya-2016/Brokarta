"use client";

import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Drawer from "./Drawer";
import Footer from "./Footer";

export default function Shell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          const sy = window.scrollY;
          const isScrolled = sy > 80;
          const atTop = sy < 50;
          const shouldShow = sy < lastScrollYRef.current || atTop;

          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          setShowHeader((prev) => (prev !== shouldShow ? shouldShow : prev));

          lastScrollYRef.current = sy;
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        showHeader={showHeader}
        scrolled={scrolled}
      />
      <Drawer menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
