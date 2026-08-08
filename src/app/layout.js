import { Plus_Jakarta_Sans, Oswald, Roboto } from "next/font/google";
import "./globals.css";
import PageUrlProvider from "@/components/layout/PageUrlProvider";
import PageTextProvider from "@/components/layout/PageTextProvider";
import AuthProvider from "@/components/layout/AuthProvider";
import { DEFAULT_URLS } from "@/lib/default-urls";
import { getCachedPageTextsMap } from "@/lib/db-services";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "700"],
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://brokarta.com"),
  title: {
    default: "Brokarta | Community Network",
    template: "%s | Brokarta",
  },
  description: "The digital network for the modern real estate broker. Connect with peers, collaborate on deals, and grow your network.",
  icons: {
    icon: "/images/global/logo.png",
    shortcut: "/images/global/logo.png",
    apple: "/images/global/logo.png",
  },
  openGraph: {
    title: "Brokarta | Community Network",
    description: "The digital network for the modern real estate broker.",
    url: "https://brokarta.com",
    siteName: "Brokarta",
    images: [
      {
        url: "/images/global/logo.png",
        width: 800,
        height: 600,
        alt: "Brokarta Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({ children }) {
  const pageTextsMap = await getCachedPageTextsMap();

  const appUrls = {};
  Object.entries(DEFAULT_URLS).forEach(([sectionKey, sectionData]) => {
    if (sectionData && Array.isArray(sectionData.fields)) {
      sectionData.fields.forEach((field) => {
        appUrls[field.key] = field.default;
      });
    }
  });

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${oswald.variable} ${roboto.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#001a1a] text-white">
        <AuthProvider>
          <PageTextProvider initialTexts={pageTextsMap}>
            <PageUrlProvider initialUrls={appUrls}>
              {children}
            </PageUrlProvider>
          </PageTextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
