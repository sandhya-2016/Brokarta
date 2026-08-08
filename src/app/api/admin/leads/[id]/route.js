import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { recordAuditLog } from "@/lib/audit";
import { triggerSyncRevalidation } from "@/lib/revalidate";

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead });
  } catch (err) {
    console.error("Lead GET single error:", err);
    return NextResponse.json({ success: false, message: "Failed to load lead details" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
    }

    await prisma.lead.delete({
      where: { id },
    });

    await recordAuditLog({
      session,
      action: "DELETE",
      entity: "Lead",
      entityId: id,
      details: `Deleted lead: ${lead.fullName} (${lead.email})`,
      req,
    });

    await triggerSyncRevalidation();

    return NextResponse.json({ success: true, message: "Lead deleted successfully" });
  } catch (err) {
    console.error("Lead DELETE error:", err);
    return NextResponse.json({ success: false, message: "Failed to delete lead" }, { status: 500 });
  }
}
