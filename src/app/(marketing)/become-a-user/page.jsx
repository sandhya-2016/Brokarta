import nextDynamic from "next/dynamic";
import HeroSection from "@/components/become-a-user/HeroSection";

// Dynamically load the heavy below-the-fold component to reduce the initial load bundle
const WelcomeNewEraSection = nextDynamic(
  () => import("@/components/become-a-user/WelcomeNewEraSection"),
  {
    ssr: true, // Keep SSR active to pre-render the text content and prevent layout shift
  }
);

export const dynamic = "force-static";

export const metadata = {
  title: "Join Brokarta | Digital Networking for Realtors",
  description: "Become a verified user to co-broke instantly, find matches, and secure commissions.",
  keywords: "join network, realtor access, register broker account",
  alternates: {
    canonical: "https://brokarta.com/become-a-user",
  },
  openGraph: {
    title: "Join Brokarta | Digital Networking for Realtors",
    description: "Become a verified user to co-broke instantly, find matches, and secure commissions.",
  },
};

const JourneyTimeline = nextDynamic(
  () => import("@/components/become-a-user/JourneyTimeline"),
  {
    ssr: true,
  }
);

export default function BecomeAUserPage() {
  return (
    <div className="bg-[#fdfcfb] min-h-screen">
      <HeroSection />
      <WelcomeNewEraSection />
      <JourneyTimeline />
    </div>
  );
}
