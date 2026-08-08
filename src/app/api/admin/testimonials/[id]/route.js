import prisma from "@/lib/prisma";
import { saveUploadedFile, deleteUploadedFile } from "@/lib/upload";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { triggerSyncRevalidation } from "@/lib/revalidate";
import { recordAuditLog } from "@/lib/audit";
import { z } from "zod";

const testimonialUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  testimonial: z.string().min(5, "Testimonial must be at least 5 characters").optional(),
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

    const testimonial = await prisma.communityTestimonial.findUnique({
      where: { id },
    });

    if (!testimonial) {
      return NextResponse.json({ success: false, message: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, testimonial });
  } catch (err) {
    console.error("Testimonial GET single error:", err);
    return NextResponse.json({ success: false, message: "Failed to load testimonial details" }, { status: 500 });
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
    const name = formData.get("name");
    const testimonial = formData.get("testimonial");
    const isActiveStr = formData.get("isActive");
    const sortOrderStr = formData.get("sortOrder");
    const imageFile = formData.get("image");

    const payload = {};
    if (name !== null) payload.name = name;
    if (testimonial !== null) payload.testimonial = testimonial;
    if (isActiveStr !== null) payload.isActive = isActiveStr === "true";
    if (sortOrderStr !== null) payload.sortOrder = parseInt(sortOrderStr, 10);

    // Validate updates
    const parsed = testimonialUpdateSchema.parse(payload);

    const currentRecord = await prisma.communityTestimonial.findUnique({
      where: { id },
    });

    if (!currentRecord) {
      return NextResponse.json({ success: false, message: "Testimonial not found" }, { status: 404 });
    }

    const updateData = { ...parsed };

    if (imageFile && typeof imageFile === "object" && typeof imageFile.arrayBuffer === "function" && imageFile.size > 0) {
      const uploaded = await saveUploadedFile(imageFile, "testimonials");
      if (uploaded) {
        updateData.imageUrl = uploaded;
        await deleteUploadedFile(currentRecord.imageUrl);
      }
    }

    const updated = await prisma.communityTestimonial.update({
      where: { id },
      data: updateData,
    });

    await recordAuditLog({
      session,
      action: "UPDATE",
      entity: "CommunityTestimonial",
      entityId: id,
      details: `Updated testimonial for: ${updated.name}`,
      req,
    });

    // Sync content in real-time
    await triggerSyncRevalidation();

    return NextResponse.json({ success: true, testimonial: updated });
  } catch (err) {
    console.error("Testimonial PUT error:", err);
    if (err instanceof z.ZodError) {
      const issues = err.issues || err.errors || [];
      const errMsg = issues.map((e) => e.message).join(", ");
      return NextResponse.json({ success: false, message: errMsg }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params; // Next.js 15 unwrapping

    const currentRecord = await prisma.communityTestimonial.findUnique({
      where: { id },
    });

    if (!currentRecord) {
      return NextResponse.json({ success: false, message: "Testimonial not found" }, { status: 404 });
    }

    // Delete record from DB
    await prisma.communityTestimonial.delete({
      where: { id },
    });

    // Clean up uploaded image file
    await deleteUploadedFile(currentRecord.imageUrl);

    await recordAuditLog({
      session,
      action: "DELETE",
      entity: "CommunityTestimonial",
      entityId: id,
      details: `Deleted testimonial for: ${currentRecord.name}`,
      req,
    });

    // Sync content in real-time
    await triggerSyncRevalidation();

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error("Testimonial DELETE error:", err);
    return NextResponse.json({ success: false, message: "Failed to delete testimonial" }, { status: 500 });
  }
}
