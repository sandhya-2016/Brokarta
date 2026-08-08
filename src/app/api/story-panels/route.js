import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const panels = await prisma.storyPanel.findMany({
      where: { isActive: true },
      include: { bullets: true },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ success: true, panels });
  } catch (err) {
    console.error("Public StoryPanels GET error:", err);
    return NextResponse.json({ success: false, message: "Failed to load story panels" }, { status: 500 });
  }
}
