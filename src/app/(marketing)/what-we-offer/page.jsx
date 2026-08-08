import ClientWhatWeOffer from "@/components/what-we-offer/ClientWhatWeOffer";

export const dynamic = "force-static";

export const metadata = {
  title: "What We Offer | Professional Co-Broking Workflow",
  description: "Streamlined broker workflow from discovery, matching, secure chat, all the way to closure.",
  keywords: "real estate workflows, broker app features, listing verify, deal closure",
  alternates: {
    canonical: "https://brokarta.com/what-we-offer",
  },
  openGraph: {
    title: "What We Offer | Professional Co-Broking Workflow",
    description: "Streamlined broker workflow from discovery, matching, secure chat, all the way to closure.",
  },
};

export default function WhatWeOfferPage() {
  return (
    <div className="bg-[#001a1a] min-h-screen flex flex-col">
      <ClientWhatWeOffer />
    </div>
  );
}