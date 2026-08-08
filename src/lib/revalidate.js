import { revalidateTag, revalidatePath } from "next/cache";

/**
 * Enterprise-grade real-time content sync helper.
 * Triggers revalidation for all content cache tags and marketing pages,
 * wrapping the execution in a safe error boundary to prevent route crashes.
 */
export async function triggerSyncRevalidation() {
  try {
    console.log("Triggering dynamic cache revalidation...");

    // Revalidate Tags with 'max' profile to eliminate Next.js 16 deprecation warnings
    const tags = [
      "testimonials",
      "story-panels",
      "workflow-items",
      "seo",
      "page-texts",
      "page-urls"
    ];

    tags.forEach((tag) => {
      try {
        revalidateTag(tag, "max");
      } catch {
        // Fallback for single-arg revalidateTag compatibility
        try {
          revalidateTag(tag);
        } catch (e) {
          // Safe bypass
        }
      }
    });

    // Revalidate Public Marketing Routes
    revalidatePath("/", "layout");
    revalidatePath("/about-us", "layout");
    revalidatePath("/what-we-offer", "layout");
    revalidatePath("/become-a-user", "layout");
    revalidatePath("/connect-now", "layout");

    // Revalidate Admin CMS Dashboards
    revalidatePath("/admin/dashboard", "layout");
    revalidatePath("/admin/community", "layout");
    revalidatePath("/admin/pages-management", "layout");
    revalidatePath("/admin/url-management", "layout");
    revalidatePath("/admin/about-us", "layout");
    revalidatePath("/admin/leads", "layout");
    revalidatePath("/admin/seo", "layout");
    revalidatePath("/admin/settings", "layout");
    revalidatePath("/admin/audit-logs", "layout");

    console.log("Real-time sync cache invalidations completed successfully.");
  } catch (err) {
    console.error("Warning: Sync revalidation warning (bypassed safely):", err.message);
  }
}
