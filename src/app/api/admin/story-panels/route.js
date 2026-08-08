import prisma from "@/lib/prisma";
import { saveUploadedFile } from "@/lib/upload";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { triggerSyncRevalidation } from "@/lib/revalidate";
import { z } from "zod";

const storyPanelInputSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  accentColor: z.string().default("#f6a200"),
  gradientFrom: z.string().default("from-[#FFF9F2]"),
  gradientTo: z.string().default("to-[#FFF1E0]"),
  quote: z.string().default(""),
  quoteBadge: z.string().default(""),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const panels = await prisma.storyPanel.findMany({
      include: { bullets: true },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ success: true, panels });
  } catch (err) {
    console.error("StoryPanel GET error:", err);
    return NextResponse.json({ success: false, message: "Failed to load story panels" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const title = formData.get("title") || "";
    const description = formData.get("description") || "";
    const accentColor = formData.get("accentColor") || "#f6a200";
    const gradientFrom = formData.get("gradientFrom") || "from-[#FFF9F2]";
    const gradientTo = formData.get("gradientTo") || "to-[#FFF1E0]";
    const quote = formData.get("quote") || "";
    const quoteBadge = formData.get("quoteBadge") || "";
    const isActive = formData.get("isActive") === "true";
    const sortOrder = parseInt(formData.get("sortOrder") || "0", 10);
    const imageFile = formData.get("image");
    const bulletsJson = formData.get("bullets"); // JSON array of strings

    // Zod validation
    const parsed = storyPanelInputSchema.parse({
      title,
      description,
      accentColor,
      gradientFrom,
      gradientTo,
      quote,
      quoteBadge,
      isActive,
      sortOrder,
    });

    let imageUrl = "/images/1aa.png"; // Fallback image
    if (imageFile && imageFile.size > 0) {
      imageUrl = await saveUploadedFile(imageFile, "story-panels");
    }

    let bullets = [];
    if (bulletsJson) {
      try {
        const parsedBullets = JSON.parse(bulletsJson);
        if (Array.isArray(parsedBullets)) bullets = parsedBullets;
      } catch (e) {
        console.warn("Invalid bullets JSON payload:", e.message);
      }
    }

    // Atomic transaction for panel + nested bullets
    const newPanel = await prisma.$transaction(async (tx) => {
      return await tx.storyPanel.create({
        data: {
          ...parsed,
          imageUrl,
          bullets: {
            create: bullets.map((text) => ({ bulletText: text })),
          },
        },
        include: { bullets: true },
      });
    });

    // Sync content in real-time
    await triggerSyncRevalidation();

    return NextResponse.json({ success: true, panel: newPanel });
  } catch (err) {
    console.error("StoryPanel POST error:", err);
    if (err instanceof z.ZodError) {
      const issues = err.issues || err.errors || [];
      const errMsg = issues.map((e) => e.message).join(", ");
      return NextResponse.json({ success: false, message: errMsg }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Failed to create story panel" }, { status: 500 });
  }
}
