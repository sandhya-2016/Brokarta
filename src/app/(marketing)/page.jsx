import ClientWelcome from "@/components/welcome/ClientWelcome";
import { getCachedTestimonials } from "@/lib/db-services";

export const dynamic = "force-static";

export const metadata = {
  title: "Brokarta | Welcome to Community Broker Network",
  description: "The digital network for the modern real estate broker. Connect with peers, collaborate on deals, and grow your network.",
  keywords: "real estate, broker, co-broke, listing database, property matches, networking",
  alternates: {
    canonical: "https://brokarta.com/",
  },
  openGraph: {
    title: "Brokarta | Welcome to Community Broker Network",
    description: "The digital network for the modern real estate broker. Connect with peers, collaborate on deals, and grow your network.",
  },
};

export default async function WelcomePage() {
  const testimonials = await getCachedTestimonials();

  return (
    <div className="bg-[#001a1a] text-white overflow-x-clip min-h-screen">
      <ClientWelcome initialTestimonials={testimonials} />
    </div>
  );
}

