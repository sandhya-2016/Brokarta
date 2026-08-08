import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { recordAuditLog } from "@/lib/audit";
import { triggerSyncRevalidation } from "@/lib/revalidate";
import { z } from "zod";

const leadStatusInputSchema = z.object({
  status: z.enum(["PENDING", "CONTACTED", "QUALIFIED", "CLOSED", "REJECTED"], {
    message: "Invalid lead status value",
    invalid_type_error: "Invalid lead status value",
  }),
});

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();

    // Zod validation
    const parsed = leadStatusInputSchema.parse(body);

    // Check if lead exists
    const existingLead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!existingLead) {
      return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: { status: parsed.status },
    });

    await recordAuditLog({
      session,
      action: "UPDATE",
      entity: "Lead",
      entityId: id,
      details: `Updated status for lead '${existingLead.fullName}' (${existingLead.email}) from ${existingLead.status} to ${parsed.status}`,
      req,
    });

    await triggerSyncRevalidation();

    // Revalidate dashboard counts and leads lists
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/leads");

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (err) {
    console.error("Lead status PATCH error:", err);
    if (err instanceof z.ZodError) {
      const issues = err.issues || err.errors || [];
      const errMsg = issues.map((e) => e.message).join(", ");
      return NextResponse.json({ success: false, message: errMsg }, { status: 400 });
    }
    if (err?.code === "P2025") {
      return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
    }
    return NextResponse.json({ success: false, message: "Failed to update lead status" }, { status: 500 });
  }
}
