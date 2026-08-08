"use client";

import nextDynamic from "next/dynamic";
import HeroSection from "@/components/welcome/HeroSection";
import { Skeleton } from "@/components/ui/Skeleton";

const ProjectDetailSection = nextDynamic(
  () => import("@/components/welcome/ProjectDetailSection"),
  {
    loading: () => <Skeleton className="w-full h-[240px] sm:h-[400px] my-4 sm:my-8 rounded-2xl sm:rounded-3xl" />,
  }
);

const BrokartaHeroStorySection = nextDynamic(
  () => import("@/components/welcome/BrokartaHeroStorySection"),
  {
    loading: () => <Skeleton className="w-full h-[280px] sm:h-[500px] bg-[#013144]/60 my-4 sm:my-8 rounded-2xl sm:rounded-3xl" />,
    ssr: true,
  }
);

const TestimonialBurstSection = nextDynamic(
  () => import("@/components/welcome/TestimonialBurstSection"),
  {
    loading: () => <Skeleton className="w-full h-[280px] sm:h-[500px] bg-slate-100/60 my-4 sm:my-8 rounded-2xl sm:rounded-3xl" />,
    ssr: true,
  }
);

export default function ClientWelcome({ initialTestimonials = [] }) {
  return (
    <>
      <HeroSection />
      <ProjectDetailSection />
      <BrokartaHeroStorySection />
      <div className="bg-white text-slate-900 w-full relative">
        <TestimonialBurstSection initialTestimonials={initialTestimonials} />
      </div>
    </>
  );
}