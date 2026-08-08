"use client";

import nextDynamic from "next/dynamic";
import OfferHeroSection from "@/components/what-we-offer/OfferHeroSection";
import { Skeleton } from "@/components/ui/Skeleton";

const WhyChooseSection = nextDynamic(
  () => import("@/components/what-we-offer/WhyChooseSection"),
  {
    loading: () => <Skeleton className="w-full h-[220px] sm:h-[350px] bg-white/5 my-4 sm:my-6 rounded-2xl sm:rounded-3xl" />,
    ssr: true,
  }
);

const PlatformTourSection = nextDynamic(
  () => import("@/components/what-we-offer/PlatformTourSection"),
  {
    loading: () => <Skeleton className="w-full h-[280px] sm:h-[500px] bg-[#011627]/60 my-4 sm:my-6 rounded-2xl sm:rounded-3xl" />,
    ssr: true,
  }
);



export default function ClientWhatWeOffer() {
  return (
    <>
      <OfferHeroSection />
      <WhyChooseSection />
      <PlatformTourSection />
    </>
  );
}
