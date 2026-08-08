"use client";

export function Skeleton({ className = "", ...props }) {
  return (
    <div
      className={`animate-pulse [animation-duration:0.8s] rounded-xl sm:rounded-2xl bg-white/10 ${className}`}
      {...props}
    />
  );
}

export function SkeletonPage() {
  return (
    <div className="w-full min-h-screen bg-[#001a1a] px-4 py-6 sm:p-10 space-y-6 sm:space-y-10 animate-pulse overflow-hidden">
      {/* Hero Skeleton */}
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 pt-20 sm:pt-24 text-center">
        <div className="h-5 sm:h-6 w-28 sm:w-36 bg-white/10 rounded-full mx-auto" />
        <div className="h-9 sm:h-14 w-11/12 sm:w-3/4 bg-white/15 rounded-xl sm:rounded-2xl mx-auto" />
        <div className="h-4 sm:h-5 w-4/5 sm:w-1/2 bg-white/10 rounded-lg mx-auto" />
        
        {/* Buttons Skeleton */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-3 sm:pt-4">
          <div className="h-11 sm:h-14 w-36 sm:w-44 bg-white/15 rounded-xl sm:rounded-2xl" />
          <div className="h-11 sm:h-14 w-36 sm:w-44 bg-white/15 rounded-xl sm:rounded-2xl" />
        </div>
      </div>

      {/* Content Grid Skeleton */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-10">
        <div className="h-44 sm:h-60 bg-white/8 border border-white/10 rounded-2xl sm:rounded-3xl" />
        <div className="h-44 sm:h-60 bg-white/8 border border-white/10 rounded-2xl sm:rounded-3xl" />
        <div className="h-44 sm:h-60 bg-white/8 border border-white/10 rounded-2xl sm:rounded-3xl hidden sm:block md:block" />
      </div>
    </div>
  );
}
