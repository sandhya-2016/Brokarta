"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useText } from "@/components/layout/PageTextProvider";


export default function TestimonialBurstSection({ initialTestimonials = [] }) {
  const t = useText();
  const triggerRef = useRef(null);
  const headingRef = useRef(null);
  const hasTyped = useRef(false);
  const latestBubblesRef = useRef([]);

  const [isMobile, setIsMobile] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [angularFlowActive, setAngularFlowActive] = useState(false);
  const [screenActive, setScreenActive] = useState(false);

  const [bubbles, setBubbles] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [cardState, setCardState] = useState({
    active: false,
    left: "50%",
    bottom: "15%",
    text: "",
    name: ""
  });

  // Memoize testimonials to prevent reconstruction and infinite observer resets on state change
  const testimonials = useMemo(() => {
    return initialTestimonials && initialTestimonials.length > 0
      ? initialTestimonials.map((item) => ({
          name: item.name,
          text: item.testimonial || item.text || "",
          imageUrl: item.imageUrl || "",
        }))
      : [];
  }, [initialTestimonials]);

  const fullText = t("home", "testimonial.title", "Our Growing Community");

  // Handle mobile resize checking
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Typewriter intersection trigger
  useEffect(() => {
    let typeTimer = null;

    const startTyping = () => {
      clearInterval(typeTimer);
      setDisplayText("");
      setIsTyping(true);
      let i = 0;
      typeTimer = setInterval(() => {
        if (i < fullText.length) {
          setDisplayText(fullText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeTimer);
          setIsTyping(false);
        }
      }, 60);
    };

    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTyped.current) {
          hasTyped.current = true;
          startTyping();
        }
      },
      { threshold: 0.1 }
    );

    if (headingRef.current) {
      headingObserver.observe(headingRef.current);
    }

    return () => {
      clearInterval(typeTimer);
      headingObserver.disconnect();
    };
  }, [fullText]);

  // Bubble animation and message cycle trigger
  useEffect(() => {
    let cycleInterval = null;
    let sequenceTimer1 = null;
    let sequenceTimer2 = null;
    let innerTimeout = null;

    const runSequence = () => {
      // Step 1: Angular Flow
      setAngularFlowActive(true);

      // Step 2: Screen active + bubbles burst
      sequenceTimer1 = setTimeout(() => {
        setScreenActive(true);

        const list = [];
        const count = 35; // Exactly matching the count from reference implementation

        for (let i = 0; i < count; i++) {
          // Exactly matching the random bounds from reference implementation
          const tx = (Math.random() * 80 + 10).toFixed(1) + "%";
          const ty = (Math.random() * 45 + 35).toFixed(1) + "%";
          const isActive = i < testimonials.length;
          const finalOpacity = isActive ? 1 : 0.25; // Exactly matching opacity from reference implementation
          const floatDuration = 3 + Math.random() * 2;
          const avatarUrl = (isActive && testimonials[i]?.imageUrl)
            ? testimonials[i].imageUrl
            : `https://i.pravatar.cc/150?u=${i + 700}`;

          list.push({
            id: i,
            tx,
            ty,
            op: finalOpacity,
            isActive,
            floatDuration,
            isFloated: false,
            avatarUrl,
            burstAnimation: `tbsBurst 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${i * 0.03}s forwards`
          });
        }
        setBubbles(list);
        latestBubblesRef.current = list;

        // Step 3: Wait 1.5 seconds before starting message cycling sequence (exactly matching reference)
        sequenceTimer2 = setTimeout(() => {
          let index = 0;

          const showNext = () => {
            if (!testimonials || testimonials.length === 0) return;

            // Remove highlight and hide card instantly for transition
            setActiveIndex(-1);
            setCardState((prev) => ({ ...prev, active: false }));

            // Card snaps to the active bubble coordinates exactly like the reference
            innerTimeout = setTimeout(() => {
              const currentList = latestBubblesRef.current;
              if (currentList.length === 0 || !testimonials || testimonials.length === 0) return;

              const currentBubble = currentList[index];
              const data = testimonials[index];
              if (!currentBubble || !data) return;

              // Clamp left position on mobile so card never overflows screen edges
              let leftVal = currentBubble.tx;
              const numericLeft = parseFloat(currentBubble.tx);
              if (window.innerWidth < 640 && !isNaN(numericLeft)) {
                const clampedLeft = Math.max(34, Math.min(66, numericLeft));
                leftVal = `${clampedLeft}%`;
              }

              setActiveIndex(index);
              setCardState({
                active: true,
                left: leftVal,
                bottom: currentBubble.ty,
                text: `"${data.text}"`,
                name: data.name
              });

              index = (index + 1) % testimonials.length;
            }, 300);
          };

          showNext();
          cycleInterval = setInterval(showNext, 3000);
        }, 1500);

      }, 600);
    };

    const resetSequence = () => {
      setAngularFlowActive(false);
      setScreenActive(false);
      setBubbles([]);
      setActiveIndex(-1);
      setCardState({ active: false, left: "50%", bottom: "15%", text: "", name: "" });

      clearTimeout(sequenceTimer1);
      clearTimeout(sequenceTimer2);
      clearTimeout(innerTimeout);
      clearInterval(cycleInterval);
    };

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runSequence();
        } else {
          resetSequence();
        }
      },
      { threshold: 0.1 }
    );

    if (triggerRef.current) {
      sectionObserver.observe(triggerRef.current);
    }

    return () => {
      sectionObserver.disconnect();
      clearTimeout(sequenceTimer1);
      clearTimeout(sequenceTimer2);
      clearTimeout(innerTimeout);
      clearInterval(cycleInterval);
    };
  }, [testimonials]);

  const handleBubbleAnimationEnd = (id) => {
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isFloated: true } : b))
    );
  };

  return (
    <section 
      ref={triggerRef} 
      id="tbs-trigger-section" 
      className="relative w-full h-[850px] max-sm:h-[750px] bg-[radial-gradient(circle_at_center,#ffffff_0%,#f4f7ff_100%)] overflow-hidden flex flex-col items-center font-sans z-10 text-center"
    >
      <div ref={headingRef} className="mt-10 max-sm:mt-[25px] text-center relative z-[300] min-h-[80px] max-sm:min-h-[60px] px-[10px] w-full">
        <h2 className="text-4xl md:text-6xl font-black leading-[1.25] tracking-tight pointer-events-none whitespace-normal m-0">
          <span className="bg-[linear-gradient(90deg,#f68300_0%,#013144_100%)] bg-clip-text text-transparent box-decoration-clone">{displayText}</span>
          {isTyping && <span className="text-[#013144] animate-[blink_0.8s_infinite] ml-1">|</span>}
        </h2>
      </div>

      <div className="relative w-full flex-1">
        
        {/* 2. The Traveling Message Box */}
        <div
          id="tbs-message-box"
          className={`absolute w-[260px] max-sm:w-[230px] max-w-[88vw] bg-white p-[15px] max-sm:p-[12px] rounded-[18px] shadow-[0_15px_35px_rgba(1,49,68,0.12)] text-center z-[400] transition-all duration-[500ms] [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] border border-[rgba(246,162,0,0.1)] ${
            cardState.active ? "opacity-100 -translate-x-1/2 -translate-y-[75px]" : "opacity-0 pointer-events-none"
          }`}
          style={{ left: cardState.left, bottom: cardState.bottom }}
        >
          <div className="absolute bottom-[-8px] left-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-[rgba(246,162,0,0.1)] -translate-x-1/2"></div>
          <p id="tbs-text" className="text-slate-500 text-[13px] max-sm:text-[12px] leading-[1.4] font-semibold mb-2 text-center break-words">{cardState.text}</p>
          <h4 id="tbs-name" className="text-[#013144] font-extrabold text-[14px] max-sm:text-[12px] uppercase text-center m-0 truncate">{cardState.name}</h4>
        </div>

        {/* 4. The 3D Tablet Mockup */}
        <div className="absolute bottom-[80px] max-sm:bottom-[60px] left-1/2 -translate-x-1/2 [perspective:1800px] z-5">
          
          {/* Angular Flow Bloom (Aura effect) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-px z-[-1] pointer-events-none">
            <div 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] max-sm:w-[450px] max-sm:h-[450px] rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(246,131,0,0.2),transparent,rgba(1,49,68,0.15),transparent,rgba(246,131,0,0.2),transparent)] filter blur-[60px] max-sm:blur-[40px] transition-all duration-[2000ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] ${
                angularFlowActive ? "opacity-100 scale-150 animate-[flowRotate_8s_linear_infinite]" : "opacity-0 scale-0"
              }`}
            ></div>
          </div>

          <div 
            className="[transform-style:preserve-3d]"
            style={{ transform: "rotateX(50deg) rotateZ(-8deg)" }}
          >
            {/* Fully responsive tablet sizing matching the layout */}
            <div className="w-[500px] h-[350px] relative [transform-style:preserve-3d] transition-all duration-300 max-sm:w-[300px] max-sm:h-[210px] max-[480px]:w-[240px] max-[480px]:h-[168px]">
              <div 
                className="absolute inset-0 bg-[#080808] rounded-[32px] max-sm:rounded-[20px] max-[480px]:rounded-[16px] [transform:translateZ(-15px)] max-sm:[transform:translateZ(-10px)] max-[480px]:[transform:translateZ(-8px)] shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              ></div>
              <div className="absolute inset-0 rounded-[32px] max-sm:rounded-[20px] max-[480px]:rounded-[16px] bg-[#111] overflow-hidden">
                <div className="absolute inset-[14px] max-sm:inset-[8px] max-[480px]:inset-[6px] rounded-[20px] max-sm:rounded-[12px] max-[480px]:rounded-[10px] bg-black overflow-hidden">
                  <div 
                    className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-[1200ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]"
                    style={{ 
                      background: screenActive 
                        ? "radial-gradient(circle at center, #ffffff 0%, #f4f1ea 100%)" 
                        : "#000" 
                    }}
                  >
                    {/* Inner Screen Bloom */}
                    <div 
                      className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
                        screenActive ? "opacity-100 animate-[pulseGlow_4s_ease-in-out_infinite]" : "opacity-0"
                      }`}
                      style={{ 
                        background: "radial-gradient(circle, rgba(246,162,0,0.3) 0%, transparent 70%)" 
                      }}
                    ></div>
                    
                    <div 
                      className={`text-center transition-all duration-1000 w-full px-4 ${
                        screenActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[15px]"
                      }`}
                    >
                      <div className="flex justify-center mb-2">
                        <img 
                          src="/images/global/logo.png" 
                          alt="Brokarta" 
                          className="w-[60px] max-sm:w-[36px] max-[480px]:w-[28px] mb-2 max-[480px]:mb-1 object-contain filter drop-shadow-md"
                        />
                      </div>
                      <h3 className="font-oswald text-[42px] max-sm:text-[24px] max-[480px]:text-[18px] font-black text-[#013144] uppercase m-0 leading-none tracking-tight">
                        Brokarta
                      </h3>
                      <div className="w-[40px] max-sm:w-[25px] max-[480px]:w-[18px] h-[3px] max-sm:h-[2px] max-[480px]:h-[2px] bg-[#f6a200] my-[10px] max-sm:my-[6px] max-[480px]:my-[4px] mx-auto"></div>
                      <p className="text-[13px] max-sm:text-[9px] max-[480px]:text-[7px] font-extrabold text-slate-500 uppercase tracking-[3px] max-sm:tracking-[1.5px] max-[480px]:tracking-[1px] mb-[6px] max-sm:mb-[4px] max-[480px]:mb-[2px]">
                        Smart. Secure. Seamless.
                      </p>
                      <div className="mt-[10px] max-[480px]:mt-[4px]">
                        <span className="text-[14px] max-sm:text-[10px] max-[480px]:text-[8px] block mb-[2px]">⭐⭐⭐⭐⭐</span>
                        <p className="text-[10px] max-sm:text-[7px] max-[480px]:text-[6px] font-bold text-[#013144] opacity-80 m-0">
                          Rated 4.9 stars by over 10,000 users
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div 
                className="absolute -bottom-[40px] left-1/2 -translate-x-1/2 w-[80%] h-[24px] rounded-full bg-[radial-gradient(ellipse,rgba(0,0,0,0.2)_0%,transparent_70%)] pointer-events-none"
              ></div>
            </div>
          </div>
        </div>

        {/* 3. The Animation Stage (Bubbles) */}
        <div id="tbs-bubble-stage" className="absolute inset-0 z-30 w-full h-full pointer-events-none">
          {bubbles.map((b) => (
            <div
              key={b.id}
              className={`absolute rounded-full overflow-hidden border-[3px] border-white shadow-[0_8px_25px_rgba(0,0,0,0.1)] z-[200] opacity-0 -translate-x-1/2 -translate-y-1/2 w-[65px] h-[65px] max-sm:w-[44px] max-sm:h-[44px] max-sm:border-2 transition-all duration-300 ${
                b.isActive && activeIndex === b.id ? "border-[#f6a200] z-[500] scale-[1.15] max-sm:scale-[1.1]" : ""
              }`}
              onAnimationEnd={() => handleBubbleAnimationEnd(b.id)}
              style={{
                backgroundImage: `url(${b.avatarUrl})`,
                backgroundSize: "cover",
                left: b.isFloated ? b.tx : undefined,
                bottom: b.isFloated ? b.ty : undefined,
                opacity: b.isFloated ? b.op : undefined,
                animation: b.isFloated
                  ? `tbsFloat ${b.floatDuration}s ease-in-out infinite`
                  : b.burstAnimation,
                ...(!b.isFloated && {
                  "--tx": b.tx,
                  "--ty": b.ty,
                  "--op": b.op
                })
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}