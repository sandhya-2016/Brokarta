import prisma from "@/lib/prisma";
import { saveUploadedFile } from "@/lib/upload";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { triggerSyncRevalidation } from "@/lib/revalidate";
import { recordAuditLog } from "@/lib/audit";
import { z } from "zod";

// Zod validation schema for testimonials
const testimonialInputSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  testimonial: z.string().min(5, "Testimonial must be at least 5 characters"),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const search = searchParams.get("search");
    const where = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { testimonial: { contains: search, mode: "insensitive" } },
      ];
    }

    const [testimonials, total] = await Promise.all([
      prisma.communityTestimonial.findMany({
        where,
        orderBy: { sortOrder: "asc" },
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          testimonial: true,
          imageUrl: true,
          isActive: true,
          sortOrder: true,
          createdAt: true,
        },
      }),
      prisma.communityTestimonial.count({ where }),
    ]);

    return NextResponse.json({ success: true, testimonials, total, page, limit });
  } catch (err) {
    console.error("Testimonial GET error:", err);
    return NextResponse.json({ success: false, message: "Failed to load testimonials" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const name = formData.get("name") || "";
    const testimonial = formData.get("testimonial") || "";
    const isActive = formData.get("isActive") === "true";
    const sortOrder = parseInt(formData.get("sortOrder") || "0", 10);
    const imageFile = formData.get("image");

    // Zod validation
    const parsed = testimonialInputSchema.parse({
      name,
      testimonial,
      isActive,
      sortOrder,
    });

    let imageUrl = "/images/logo1.jpeg"; // Fallback image
    if (imageFile && typeof imageFile === "object" && typeof imageFile.arrayBuffer === "function" && imageFile.size > 0) {
      const uploaded = await saveUploadedFile(imageFile, "testimonials");
      if (uploaded) imageUrl = uploaded;
    }

    const newTestimonial = await prisma.communityTestimonial.create({
      data: {
        ...parsed,
        imageUrl,
      },
    });

    await recordAuditLog({
      session,
      action: "CREATE",
      entity: "CommunityTestimonial",
      entityId: newTestimonial.id,
      details: `Created testimonial for: ${newTestimonial.name}`,
      req,
    });

    // Sync content in real-time
    await triggerSyncRevalidation();

    return NextResponse.json({ success: true, testimonial: newTestimonial });
  } catch (err) {
    console.error("Testimonial POST error:", err);
    if (err instanceof z.ZodError) {
      const issues = err.issues || err.errors || [];
      const errMsg = issues.map((e) => e.message).join(", ");
      return NextResponse.json({ success: false, message: errMsg }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Failed to create testimonial" }, { status: 500 });
  }
}
