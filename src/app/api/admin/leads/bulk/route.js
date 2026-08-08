import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { recordAuditLog } from "@/lib/audit";
import { triggerSyncRevalidation } from "@/lib/revalidate";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { action, ids, status } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ success: false, message: "No IDs provided" }, { status: 400 });
    }

    if (action === "DELETE") {
      await prisma.lead.deleteMany({
        where: { id: { in: ids } },
      });

      await recordAuditLog({
        session,
        action: "BULK_DELETE",
        entity: "Lead",
        details: `Bulk deleted ${ids.length} lead(s)`,
        req,
      });

      await triggerSyncRevalidation();
      return NextResponse.json({ success: true, message: `Successfully deleted ${ids.length} leads` });
    }

    if (action === "UPDATE_STATUS") {
      if (!status) {
        return NextResponse.json({ success: false, message: "Status value required" }, { status: 400 });
      }

      await prisma.lead.updateMany({
        where: { id: { in: ids } },
        data: { status },
      });

      await recordAuditLog({
        session,
        action: "BULK_UPDATE",
        entity: "Lead",
        details: `Bulk updated status of ${ids.length} lead(s) to ${status}`,
        req,
      });

      await triggerSyncRevalidation();
      return NextResponse.json({ success: true, message: `Successfully updated status for ${ids.length} leads` });
    }

    return NextResponse.json({ success: false, message: "Invalid bulk action" }, { status: 400 });
  } catch (err) {
    console.error("Bulk Lead action error:", err);
    return NextResponse.json({ success: false, message: "Failed to process bulk operation" }, { status: 500 });
  }
}
