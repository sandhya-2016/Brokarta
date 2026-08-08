import CookiePolicyContent from "@/components/legal/CookiePolicyContent";

export const metadata = {
  title: "Cookie Policy | Brokarta",
  description: "Learn about how Brokarta uses cookies and tracking technologies to deliver a secure broker platform experience.",
  keywords: "brokarta cookie policy, cookies tracking, broker platform cookies",
  alternates: {
    canonical: "https://brokarta.com/cookie-policy",
  },
  openGraph: {
    title: "Cookie Policy | Brokarta",
    description: "Learn about how Brokarta uses cookies and tracking technologies.",
  },
};

export default function CookiePolicyPage() {
  return <CookiePolicyContent />;
}
