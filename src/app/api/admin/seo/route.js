import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const seoPages = await prisma.sEOPage.findMany();
    return NextResponse.json({ success: true, seoPages });
  } catch (err) {
    console.error("SEO GET error:", err);
    return NextResponse.json({ success: false, message: "Failed to load SEO pages list" }, { status: 500 });
  }
}
