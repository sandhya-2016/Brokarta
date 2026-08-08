import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";

/**
 * Fetches active community testimonials from the database (cached).
 */
export const getCachedTestimonials = unstable_cache(
  async () => {
    try {
      return await prisma.communityTestimonial.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        select: {
          id: true,
          name: true,
          testimonial: true,
          imageUrl: true,
        },
      });
    } catch (err) {
      console.error("Error in getCachedTestimonials query:", err.message);
      return [];
    }
  },
  ["testimonials"],
  {
    tags: ["testimonials"],
    revalidate: false, // We revalidate manually via revalidateTag
  }
);

/**
 * Fetches active story panels with their bullets (cached).
 */
export const getCachedStoryPanels = unstable_cache(
  async () => {
    try {
      return await prisma.storyPanel.findMany({
        where: { isActive: true },
        include: { bullets: true },
        orderBy: { sortOrder: "asc" },
      });
    } catch (err) {
      console.error("Error in getCachedStoryPanels query:", err.message);
      return [];
    }
  },
  ["story-panels"],
  {
    tags: ["story-panels"],
    revalidate: false, // We revalidate manually via revalidateTag
  }
);

/**
 * Fetches active workflow items (cached).
 */
export const getCachedWorkflowItems = unstable_cache(
  async () => {
    try {
      return await prisma.workflowItem.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        select: {
          id: true,
          title: true,
          heading1: true,
          heading2: true,
          description: true,
          imageUrl: true,
        },
      });
    } catch (err) {
      console.error("Error in getCachedWorkflowItems query:", err.message);
      return [];
    }
  },
  ["workflow-items"],
  {
    tags: ["workflow-items"],
    revalidate: false, // We revalidate manually via revalidateTag
  }
);

/**
 * Fetches SEO settings for a specific pageKey (cached).
 * @param {string} pageKey - The unique key of the page (e.g. 'home', 'about-us', 'what-we-offer').
 */
export const getCachedSeo = (pageKey) => {
  const cachedFn = unstable_cache(
    async (key) => {
      try {
        return await prisma.sEOPage.findUnique({
          where: { pageKey: key },
        });
      } catch (err) {
        console.error(`Error in getCachedSeo(${key}) query:`, err.message);
        return null;
      }
    },
    [`seo-${pageKey}`],
    {
      tags: ["seo", `seo-${pageKey}`],
      revalidate: false, // We revalidate manually via revalidateTag
    }
  );
  return cachedFn(pageKey);
};

/**
 * Fetches all custom page text overrides from the database (cached).
 */
export const getCachedPageTexts = unstable_cache(
  async () => {
    try {
      return await prisma.pageText.findMany();
    } catch (err) {
      console.error("Error in getCachedPageTexts query:", err.message);
      return [];
    }
  },
  ["page-texts"],
  {
    tags: ["page-texts"],
    revalidate: false, // We revalidate manually via revalidateTag
  }
);

/**
 * Returns all page text overrides mapped by `${pageKey}:${textKey}` (cached).
 */
export const getCachedPageTextsMap = async () => {
  const texts = await getCachedPageTexts();
  const map = {};
  if (Array.isArray(texts)) {
    texts.forEach((item) => {
      map[`${item.pageKey}:${item.textKey}`] = item.value;
    });
  }
  return map;
};

/**
 * Fetches all custom URL overrides from the database (cached).
 */
export const getCachedAppUrls = unstable_cache(
  async () => {
    try {
      return await prisma.appUrl.findMany();
    } catch (err) {
      console.error("Error in getCachedAppUrls query:", err.message);
      return [];
    }
  },
  ["page-urls"],
  {
    tags: ["page-urls"],
    revalidate: false, // We revalidate manually via revalidateTag
  }
);

/**
 * Returns all URL overrides mapped by `urlKey` (cached).
 */
export const getCachedAppUrlsMap = async () => {
  const urls = await getCachedAppUrls();
  const map = {};
  if (Array.isArray(urls)) {
    urls.forEach((item) => {
      map[item.urlKey] = item.value;
    });
  }
  return map;
};

