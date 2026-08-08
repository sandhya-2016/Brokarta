import prisma from "@/lib/prisma";
import { saveUploadedFile, deleteUploadedFile } from "@/lib/upload";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { triggerSyncRevalidation } from "@/lib/revalidate";
import { z } from "zod";

const storyPanelUpdateSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").optional(),
  description: z.string().min(5, "Description must be at least 5 characters").optional(),
  accentColor: z.string().optional(),
  gradientFrom: z.string().optional(),
  gradientTo: z.string().optional(),
  quote: z.string().optional(),
  quoteBadge: z.string().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params; // Next.js 15 unwrapping

    const panel = await prisma.storyPanel.findUnique({
      where: { id },
      include: { bullets: true },
    });

    if (!panel) {
      return NextResponse.json({ success: false, message: "Panel not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, panel });
  } catch (err) {
    console.error("StoryPanel GET single error:", err);
    return NextResponse.json({ success: false, message: "Failed to load story panel details" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params; // Next.js 15 unwrapping
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const accentColor = formData.get("accentColor");
    const gradientFrom = formData.get("gradientFrom");
    const gradientTo = formData.get("gradientTo");
    const quote = formData.get("quote");
    const quoteBadge = formData.get("quoteBadge");
    const isActiveStr = formData.get("isActive");
    const sortOrderStr = formData.get("sortOrder");
    const imageFile = formData.get("image");
    const bulletsJson = formData.get("bullets");

    const payload = {};
    if (title !== null) payload.title = title;
    if (description !== null) payload.description = description;
    if (accentColor !== null) payload.accentColor = accentColor;
    if (gradientFrom !== null) payload.gradientFrom = gradientFrom;
    if (gradientTo !== null) payload.gradientTo = gradientTo;
    if (quote !== null) payload.quote = quote;
    if (quoteBadge !== null) payload.quoteBadge = quoteBadge;
    if (isActiveStr !== null) payload.isActive = isActiveStr === "true";
    if (sortOrderStr !== null) payload.sortOrder = parseInt(sortOrderStr, 10);

    const parsed = storyPanelUpdateSchema.parse(payload);

    const currentRecord = await prisma.storyPanel.findUnique({
      where: { id },
    });

    if (!currentRecord) {
      return NextResponse.json({ success: false, message: "Story panel not found" }, { status: 404 });
    }

    const updateData = { ...parsed };

    if (imageFile && imageFile.size > 0) {
      updateData.imageUrl = await saveUploadedFile(imageFile, "story-panels");
      await deleteUploadedFile(currentRecord.imageUrl);
    }

    // Transaction for atomic update & nested bullet replacement
    const result = await prisma.$transaction(async (tx) => {
      if (bulletsJson !== null) {
        let bullets = [];
        try {
          const parsedBullets = JSON.parse(bulletsJson);
          if (Array.isArray(parsedBullets)) bullets = parsedBullets;
        } catch (e) {
          console.warn("Invalid bullets JSON payload in PUT:", e.message);
        }

        // Delete existing bullets
        await tx.storyBullet.deleteMany({
          where: { storyPanelId: id },
        });
        
        // Re-create new bullets
        if (bullets.length > 0) {
          updateData.bullets = {
            create: bullets.map((text) => ({ bulletText: text })),
          };
        }
      }

      return await tx.storyPanel.update({
        where: { id },
        data: updateData,
        include: { bullets: true },
      });
    });

    // Sync content in real-time
    await triggerSyncRevalidation();

    return NextResponse.json({ success: true, panel: result });
  } catch (err) {
    console.error("StoryPanel PUT error:", err);
    if (err instanceof z.ZodError) {
      const issues = err.issues || err.errors || [];
      const errMsg = issues.map((e) => e.message).join(", ");
      return NextResponse.json({ success: false, message: errMsg }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Failed to update story panel" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params; // Next.js 15 unwrapping

    const currentRecord = await prisma.storyPanel.findUnique({
      where: { id },
    });

    if (!currentRecord) {
      return NextResponse.json({ success: false, message: "Story panel not found" }, { status: 404 });
    }

    // Atomic transaction for deleting panel and cleaning bullets
    await prisma.$transaction(async (tx) => {
      await tx.storyBullet.deleteMany({
        where: { storyPanelId: id },
      });
      await tx.storyPanel.delete({
        where: { id },
      });
    });

    // Delete image from filesystem
    await deleteUploadedFile(currentRecord.imageUrl);

    // Sync content in real-time
    await triggerSyncRevalidation();

    return NextResponse.json({ success: true, message: "Panel deleted successfully" });
  } catch (err) {
    console.error("StoryPanel DELETE error:", err);
    return NextResponse.json({ success: false, message: "Failed to delete story panel" }, { status: 500 });
  }
}
