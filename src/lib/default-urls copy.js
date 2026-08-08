export const DEFAULT_URLS = {
  "links": {
    name: "Platform & Social Links",
    fields: [
      { key: "appStore", label: "App Store Download Link", default: "https://apps.apple.com/app/brokarta", type: "url" },
      { key: "googlePlay", label: "Google Play Download Link", default: "https://play.google.com/store/apps/details?id=com.brokarta", type: "url" },
      { key: "linkedin", label: "LinkedIn Company Profile", default: "https://linkedin.com/company/brokarta", type: "url" },
      { key: "twitter", label: "Twitter/X Profile", default: "https://x.com/brokarta", type: "url" },
      { key: "instagram", label: "Instagram Profile", default: "https://instagram.com/brokarta", type: "url" },
      { key: "qrCodeData", label: "QR Code Scan Destination", default: "https://brokarta.com", type: "url" },
    ]
  },
  "contacts": {
    name: "Support & Contacts",
    fields: [
      { key: "supportEmail", label: "Support Contact Email", default: "hello@brokarta.com", type: "email" },
      { key: "investorEmail", label: "Investor Inquiry Email", default: "invest@brokarta.com", type: "email" },
    ]
  },
  "assets": {
    name: "Media & Assets",
    fields: [
      { key: "headerLogo", label: "Header Logo Image Source", default: "/images/logo.png", type: "url" },
      { key: "unifyLogo", label: "Unify Section Logo Image Source", default: "/images/logo1.jpeg", type: "url" },
      { key: "heroVideo", label: "Hero Showcase Video Source", default: "/images/brokarta.mp4", type: "url" },
      { key: "overviewVideo", label: "Overview Modal Video Source", default: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", type: "url" },
    ]
  }
};
