import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { recordAuditLog } from "@/lib/audit";
import { triggerSyncRevalidation } from "@/lib/revalidate";
import { deleteUploadedFile } from "@/lib/upload";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { action, ids, isActive } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ success: false, message: "No IDs provided" }, { status: 400 });
    }

    if (action === "DELETE") {
      const records = await prisma.storyPanel.findMany({
        where: { id: { in: ids } },
        select: { imageUrl: true },
      });

      await prisma.storyPanel.deleteMany({
        where: { id: { in: ids } },
      });

      for (const rec of records) {
        if (rec.imageUrl) await deleteUploadedFile(rec.imageUrl);
      }

      await recordAuditLog({
        session,
        action: "BULK_DELETE",
        entity: "StoryPanel",
        details: `Bulk deleted ${ids.length} story panel(s)`,
        req,
      });

      await triggerSyncRevalidation();
      return NextResponse.json({ success: true, message: `Successfully deleted ${ids.length} story panels` });
    }

    if (action === "TOGGLE_ACTIVE") {
      await prisma.storyPanel.updateMany({
        where: { id: { in: ids } },
        data: { isActive: Boolean(isActive) },
      });

      await recordAuditLog({
        session,
        action: "BULK_UPDATE",
        entity: "StoryPanel",
        details: `Bulk updated active status of ${ids.length} story panel(s) to ${Boolean(isActive)}`,
        req,
      });

      await triggerSyncRevalidation();
      return NextResponse.json({ success: true, message: `Successfully updated status for ${ids.length} story panels` });
    }

    return NextResponse.json({ success: false, message: "Invalid bulk action" }, { status: 400 });
  } catch (err) {
    console.error("Bulk StoryPanel action error:", err);
    return NextResponse.json({ success: false, message: "Failed to process bulk operation" }, { status: 500 });
  }
}
