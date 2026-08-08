"use client";

import { Check } from "lucide-react";

// Hardcoded wizard steps
const steps = ["User Type", "Contact Info", "Company", "Message"];

export default function WizardSteps({ step }) {

  return (
    <div className="relative flex justify-between mb-6 sm:mb-10 px-1 ">
      {/* Background Track */}
      <div className="absolute top-[14px] sm:top-[18px] left-[14px] sm:left-[18px] right-[14px] sm:right-[18px] h-[3px] bg-slate-100 rounded-full z-0" />

      {/* Progress Fill */}
      <div className="absolute top-[14px] sm:top-[18px] left-[14px] sm:left-[18px] right-[14px] sm:right-[18px] h-[3px] bg-slate-100 rounded-full z-0 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#f6a200] via-[#00cc9c] to-[#02647e] rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_#00cc9c]"
          style={{
            width: `${((step - 1) / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>

      {steps.map((item, index) => {
        const isDone = step > index + 1;
        const isActive = step === index + 1;
        const isPending = step < index + 1;

        return (
          <div
            key={item}
            className="relative z-10 flex flex-col items-center gap-1.5 sm:gap-2 group cursor-default"
          >
            {/* Step Circle */}
            <div
              className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs transition-all duration-500 border-2
              ${isDone
                  ? "bg-[#00cc9c] border-[#00cc9c] text-white shadow-[0_0_12px_rgba(0,204,156,0.4)] scale-105"
                  : isActive
                    ? "bg-[#013144] border-[#00cc9c] text-white shadow-[0_0_12px_rgba(1,49,68,0.3)] scale-110"
                    : "bg-white border-slate-200 text-slate-400 group-hover:border-slate-300"
                }`}
            >
              {isDone ? (
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3px]" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>

            {/* Label wrapper */}
            <div className="flex flex-col items-center min-h-[22px] sm:min-h-[28px] justify-start">
              <span
                className={`text-[9px] min-[375px]:text-[10px] sm:text-xs font-black uppercase tracking-wider transition-colors duration-300 text-center ${isActive
                    ? "text-[#013144] font-black"
                    : isDone
                      ? "text-[#00cc9c]"
                      : "text-slate-400"
                  }`}
              >
                {item}
              </span>

              {isActive && index + 1 === steps.length && (
                <span className="text-[8px] sm:text-[9px] font-extrabold text-[#00cc9c] uppercase tracking-tighter animate-pulse mt-0.5 whitespace-nowrap">
                  Almost there!
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}