import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const items = await prisma.workflowItem.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ success: true, items });
  } catch (err) {
    console.error("Public WorkflowItems GET error:", err);
    return NextResponse.json({ success: false, message: "Failed to load workflow items" }, { status: 500 });
  }
}
