import nextDynamic from "next/dynamic";
import ConnectHeroSection from "@/components/connect-now/ConnectHeroSection";

// Dynamically load the wizard step form to optimize JavaScript bundles
const ConnectWizard = nextDynamic(
  () => import("@/components/connect-now/ConnectWizard"),
  {
    ssr: true, // SSR enabled to pre-render the structural layout and avoid layout shift
  }
);

export const dynamic = "force-static";

export const metadata = {
  title: "Connect Now | Partner Inquiries",
  description: "Let's build the future of brokerage together. Send our principal network team your inquiries.",
  keywords: "contact brokarta, deal book demo, support query",
  alternates: {
    canonical: "https://brokarta.com/connect-now",
  },
  openGraph: {
    title: "Connect Now | Partner Inquiries",
    description: "Let's build the future of brokerage together. Send our principal network team your inquiries.",
  },
};

export default function ConnectNowPage() {
  return (
    <div className="bg-[#fdfcfb]">
      <ConnectHeroSection />
      <ConnectWizard />
    </div>
  );
}
