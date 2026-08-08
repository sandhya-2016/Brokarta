"use client";

import nextDynamic from "next/dynamic";
import HeroSection from "@/components/welcome/HeroSection";
import { Skeleton } from "@/components/ui/Skeleton";
import { useText } from "@/components/layout/PageTextProvider";

// Hardcoded testimonials with useText
const getTestimonials = (t) => [
  { name: t("home", "testimonials.james.name", "James Thompson"), testimonial: t("home", "testimonials.james.text", "Brokarta has completely transformed how our team manages B2B real estate leads and co-broking deals."), imageUrl: "https://i.pravatar.cc/150?u=james", isActive: true, sortOrder: 0 },
  { name: t("home", "testimonials.sarah.name", "Sarah Jenkins"), testimonial: t("home", "testimonials.sarah.text", "The interface is so intuitive, it changed how our team works daily!"), imageUrl: "https://i.pravatar.cc/150?u=sarah", isActive: true, sortOrder: 1 },
  { name: t("home", "testimonials.marcus.name", "Marcus Wright"), testimonial: t("home", "testimonials.marcus.text", "Finally an app that understands user experience. 5 stars!"), imageUrl: "https://i.pravatar.cc/150?u=marcus", isActive: true, sortOrder: 2 },
  { name: t("home", "testimonials.elena.name", "Elena Rodriguez"), testimonial: t("home", "testimonials.elena.text", "The transition from step 3 to 4 is seamless. Love the design."), imageUrl: "https://i.pravatar.cc/150?u=elena", isActive: true, sortOrder: 3 },
  { name: t("home", "testimonials.aria.name", "Aria V."), testimonial: t("home", "testimonials.aria.text", "The UI glow makes navigation feel incredibly futuristic and smooth."), imageUrl: "https://i.pravatar.cc/150?u=aria", isActive: true, sortOrder: 4 },
  { name: t("home", "testimonials.david.name", "David Kim"), testimonial: t("home", "testimonials.david.text", "Connecting with other verified brokers has never been this simple."), imageUrl: "https://i.pravatar.cc/150?u=david", isActive: true, sortOrder: 5 },
  { name: t("home", "testimonials.emma.name", "Emma Watson"), testimonial: t("home", "testimonials.emma.text", "Highly recommended real estate tool. Makes co-broking stress-free."), imageUrl: "https://i.pravatar.cc/150?u=emma", isActive: true, sortOrder: 6 },
  { name: t("home", "testimonials.carlos.name", "Carlos Mendez"), testimonial: t("home", "testimonials.carlos.text", "The inventory sharing dashboard is brilliant and updates instantly."), imageUrl: "https://i.pravatar.cc/150?u=carlos", isActive: true, sortOrder: 7 },
  { name: t("home", "testimonials.priya.name", "Priya Patel"), testimonial: t("home", "testimonials.priya.text", "Excellent support team and beautiful aesthetic. Truly a premium experience."), imageUrl: "https://i.pravatar.cc/150?u=priya", isActive: true, sortOrder: 8 },
  { name: t("home", "testimonials.liam.name", "Liam O'Connor"), testimonial: t("home", "testimonials.liam.text", "Helped our agency scale deals by 35% within the first month."), imageUrl: "https://i.pravatar.cc/150?u=liam", isActive: true, sortOrder: 9 },
  { name: t("home", "testimonials.chloe.name", "Chloe Dubois"), testimonial: t("home", "testimonials.chloe.text", "Security and listing verification standards are second to none."), imageUrl: "https://i.pravatar.cc/150?u=chloe", isActive: true, sortOrder: 10 },
  { name: t("home", "testimonials.yuki.name", "Yuki Tanaka"), testimonial: t("home", "testimonials.yuki.text", "User experience is very polished. Our agents love using it."), imageUrl: "https://i.pravatar.cc/150?u=yuki", isActive: true, sortOrder: 11 },
  { name: t("home", "testimonials.yuri.name", "Yuri Boyka"), testimonial: t("home", "testimonials.yuri.text", "Solid platform. Clean API integration and fast load times."), imageUrl: "https://i.pravatar.cc/150?u=yuri", isActive: true, sortOrder: 14 }
];

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
  const t = useText();
  const fallbackTestimonials = getTestimonials(t);
  const testimonials =
    initialTestimonials && initialTestimonials.length > 0
      ? initialTestimonials
      : fallbackTestimonials;

  return (
    <>
      <HeroSection />
      <ProjectDetailSection />
      <BrokartaHeroStorySection />
      <div className="bg-white text-slate-900 w-full relative">
        <TestimonialBurstSection initialTestimonials={testimonials} />
      </div>
    </>
  );
}