import ClientAboutUs from "@/components/about-us/ClientAboutUs";
import { getCachedStoryPanels } from "@/lib/db-services";

export const metadata = {
  title: "About Us | The Brokarta Story",
  description: "We saw the gap and built a broker-first digital platform to bring clarity where there was confusion.",
  keywords: "about brokarta, broker history, networking founders, brokarta mission",
  alternates: {
    canonical: "https://brokarta.com/about-us",
  },
  openGraph: {
    title: "About Us | The Brokarta Story",
    description: "We saw the gap and built a broker-first digital platform to bring clarity where there was confusion.",
  },
};

export default async function AboutUsPage() {
  const storyPanels = await getCachedStoryPanels();

  return (
    <div className="bg-[#001a1a] text-white overflow-x-clip min-h-screen">
      <ClientAboutUs initialPanels={storyPanels} />
    </div>
  );
}
