"use client";

import { createContext, useContext } from "react";

const PageTextContext = createContext({});

export default function PageTextProvider({ children, initialTexts = {} }) {
  return (
    <PageTextContext.Provider value={initialTexts}>
      {children}
    </PageTextContext.Provider>
  );
}

/**
 * Custom React hook to retrieve dynamic database page texts.
 * Fallback to standard/original text if not configured in custom texts database.
 */
export function useText() {
  const texts = useContext(PageTextContext);
  
  return (pageKey, textKey, defaultValue) => {
    const fullKey = `${pageKey}:${textKey}`;
    return texts[fullKey] ?? defaultValue;
  };
}
