"use client";

import nextDynamic from "next/dynamic";
import HeroSection from "@/components/about-us/HeroSection";
import { Skeleton } from "@/components/ui/Skeleton";

const VisionMissionSection = nextDynamic(
  () => import("@/components/about-us/VisionMissionSection"),
  {
    loading: () => <Skeleton className="w-full h-[220px] sm:h-[350px] bg-[#FFF8F6] my-4 sm:my-6 rounded-2xl sm:rounded-3xl" />,
    ssr: true,
  }
);

const OrbitSection = nextDynamic(
  () => import("@/components/about-us/OrbitSection"),
  {
    loading: () => <Skeleton className="w-full h-[240px] sm:h-[400px] bg-white/5 my-4 sm:my-6 rounded-2xl sm:rounded-3xl" />,
    ssr: true,
  }
);

const StorySection = nextDynamic(
  () => import("@/components/about-us/StorySection"),
  {
    loading: () => <Skeleton className="w-full h-[280px] sm:h-[500px] bg-slate-100 my-4 sm:my-6 rounded-2xl sm:rounded-3xl" />,
    ssr: true,
  }
);

export default function ClientAboutUs({ initialPanels = [] }) {
  return (
    <>
      <HeroSection />
      <StorySection initialPanels={initialPanels} />
      <VisionMissionSection />
      <OrbitSection />
    </>
  );
}