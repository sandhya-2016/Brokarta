import TermsOfServiceContent from "@/components/legal/TermsOfServiceContent";

export const metadata = {
  title: "Terms of Service | Brokarta",
  description: "Review Brokarta's Terms of Service for verified broker membership, listing rules, and professional standards.",
  keywords: "brokarta terms of service, broker agreement, real estate platform terms",
  alternates: {
    canonical: "https://brokarta.com/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service | Brokarta",
    description: "Review Brokarta's Terms of Service for verified broker membership.",
  },
};

export default function TermsOfServicePage() {
  return <TermsOfServiceContent />;
}
