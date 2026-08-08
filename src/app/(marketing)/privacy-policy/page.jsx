import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";

export const metadata = {
  title: "Privacy Policy | Brokarta",
  description: "Read Brokarta's Privacy Policy to learn how we protect verified broker data and maintain a secure real estate ecosystem.",
  keywords: "brokarta privacy policy, broker data security, privacy terms",
  alternates: {
    canonical: "https://brokarta.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Brokarta",
    description: "Read Brokarta's Privacy Policy to learn how we protect verified broker data.",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
