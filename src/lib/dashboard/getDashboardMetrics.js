import prisma from "@/lib/prisma";

/**
 * Server-side helper to aggregate real-time metrics and analytics for the Admin Dashboard.
 */
export async function getDashboardMetrics() {
  try {
    const [
      totalLeads,
      pendingLeads,
      contactedLeads,
      qualifiedLeads,
      closedLeads,
      rejectedLeads,
      brokerLeads,
      agencyLeads,
      othersLeads,
      totalTestimonials,
      activeTestimonials,
      totalPanels,
      activePanels,
      totalWorkflowItems,
      activeWorkflowItems,
      totalAdminUsers,
      totalAuditLogs,
      recentLeads,
      recentAuditLogs,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "PENDING" } }),
      prisma.lead.count({ where: { status: "CONTACTED" } }),
      prisma.lead.count({ where: { status: "QUALIFIED" } }),
      prisma.lead.count({ where: { status: "CLOSED" } }),
      prisma.lead.count({ where: { status: "REJECTED" } }),

      prisma.lead.count({ where: { userType: "BROKER" } }),
      prisma.lead.count({ where: { userType: "AGENCY" } }),
      prisma.lead.count({ where: { userType: "OTHERS" } }),

      prisma.communityTestimonial.count(),
      prisma.communityTestimonial.count({ where: { isActive: true } }),

      prisma.storyPanel.count(),
      prisma.storyPanel.count({ where: { isActive: true } }),

      prisma.workflowItem.count(),
      prisma.workflowItem.count({ where: { isActive: true } }),

      prisma.adminUser.count(),
      prisma.auditLog.count(),

      prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          fullName: true,
          email: true,
          userType: true,
          lookingFor: true,
          companyName: true,
          status: true,
          createdAt: true,
        },
      }),

      prisma.auditLog.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return {
      totalLeads,
      pendingLeads,
      contactedLeads,
      qualifiedLeads,
      closedLeads,
      rejectedLeads,
      leadsByUserType: {
        BROKER: brokerLeads,
        AGENCY: agencyLeads,
        OTHERS: othersLeads,
      },
      totalTestimonials,
      activeTestimonials,
      totalPanels,
      activePanels,
      totalWorkflowItems,
      activeWorkflowItems,
      totalAdminUsers,
      totalAuditLogs,
      recentLeads,
      recentAuditLogs,
    };
  } catch (err) {
    console.error("Error fetching dashboard metrics:", err);
    return {
      totalLeads: 0,
      pendingLeads: 0,
      contactedLeads: 0,
      qualifiedLeads: 0,
      closedLeads: 0,
      rejectedLeads: 0,
      leadsByUserType: { BROKER: 0, AGENCY: 0, OTHERS: 0 },
      totalTestimonials: 0,
      activeTestimonials: 0,
      totalPanels: 0,
      activePanels: 0,
      totalWorkflowItems: 0,
      activeWorkflowItems: 0,
      totalAdminUsers: 0,
      totalAuditLogs: 0,
      recentLeads: [],
      recentAuditLogs: [],
    };
  }
}