"use client";

import { createContext, useContext } from "react";
import { SITE_URLS } from "@/config/siteUrls";

const PageUrlContext = createContext({});

export const useUrl = () => {
  const context = useContext(PageUrlContext);
  return (urlKey, defaultValue = "") => {
    if (context && context[urlKey] !== undefined && context[urlKey] !== "") {
      return context[urlKey];
    }
    if (SITE_URLS[urlKey] !== undefined) {
      return SITE_URLS[urlKey];
    }
    return defaultValue || "";
  };
};

export default function PageUrlProvider({ initialUrls = {}, children }) {
  return (
    <PageUrlContext.Provider value={initialUrls}>
      {children}
    </PageUrlContext.Provider>
  );
}
