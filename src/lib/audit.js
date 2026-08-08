import prisma from "@/lib/prisma";

/**
 * Utility to record audit logs for admin actions.
 * @param {Object} options
 * @param {Object} options.session - NextAuth session object
 * @param {string} options.action - Operation performed ('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'BULK_DELETE', etc.)
 * @param {string} options.entity - Target entity ('CommunityTestimonial', 'StoryPanel', 'WorkflowItem', 'Lead', 'PageText', 'AppUrl', 'SEOPage', 'AdminUser')
 * @param {string} [options.entityId] - Optional ID of the modified entity
 * @param {string} [options.details] - Optional string or JSON summary of changes
 * @param {Request} [options.req] - Optional incoming request object to extract client IP
 */
export async function recordAuditLog({ session, action, entity, entityId = null, details = null, req = null }) {
  try {
    const adminEmail = session?.user?.email || "system@brokarta.com";
    const adminRole = session?.user?.role || "ADMIN";

    let ipAddress = null;
    if (req) {
      ipAddress =
        req.headers?.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        req.headers?.get("x-real-ip") ||
        "127.0.0.1";
    }

    const detailString = typeof details === "object" && details !== null ? JSON.stringify(details) : details;

    await prisma.auditLog.create({
      data: {
        adminEmail,
        adminRole,
        action,
        entity,
        entityId,
        details: detailString,
        ipAddress,
      },
    });
  } catch (err) {
    console.error("Failed to record audit log:", err.message);
  }
}
