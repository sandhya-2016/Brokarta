import { SITE_URLS } from "@/config/siteUrls";

export const DEFAULT_URLS = {
  "links": {
    name: "Platform & Social Links",
    fields: [
      { key: "appStore", label: "App Store Download Link", default: SITE_URLS.appStore, type: "url" },
      { key: "googlePlay", label: "Google Play Download Link", default: SITE_URLS.googlePlay, type: "url" },
      { key: "linkedin", label: "LinkedIn Company Profile", default: SITE_URLS.linkedin, type: "url" },
      { key: "twitter", label: "Twitter / X Profile", default: SITE_URLS.twitter, type: "url" },
      { key: "instagram", label: "Instagram Profile", default: SITE_URLS.instagram, type: "url" },
      { key: "facebook", label: "Facebook Profile", default: SITE_URLS.facebook, type: "url" },
      { key: "qrCodeData", label: "QR Code Scan Destination", default: SITE_URLS.qrCodeData, type: "url" },
    ]
  },
  "contacts": {
    name: "Support & Contacts",
    fields: [
      { key: "supportEmail", label: "Support Contact Email", default: SITE_URLS.supportEmail, type: "email" },
      { key: "investorEmail", label: "Investor Inquiry Email", default: SITE_URLS.investorEmail, type: "email" },
      { key: "partnerEmail", label: "Partner Relations Email", default: SITE_URLS.partnerEmail, type: "email" },
      { key: "phone", label: "Primary Phone Number", default: SITE_URLS.phone, type: "text" },
    ]
  },
  "assets": {
    name: "Media & Assets",
    fields: [
      { key: "headerLogo", label: "Header Logo Image Source", default: SITE_URLS.headerLogo, type: "url" },
      { key: "unifyLogo", label: "Unify Section Logo Image Source", default: SITE_URLS.unifyLogo, type: "url" },
      { key: "heroVideo", label: "Hero Showcase Video Source", default: SITE_URLS.heroVideo, type: "url" },
      { key: "overviewVideo", label: "Overview Modal Video Source", default: SITE_URLS.overviewVideo, type: "url" },
    ]
  }
};
