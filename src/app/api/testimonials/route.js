import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const testimonials = await prisma.communityTestimonial.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ success: true, testimonials });
  } catch (err) {
    console.error("Public Testimonials GET error:", err);
    return NextResponse.json({ success: false, message: "Failed to load testimonials" }, { status: 500 });
  }
}
