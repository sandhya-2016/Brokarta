import prisma from "@/lib/prisma";
import { saveUploadedFile, deleteUploadedFile } from "@/lib/upload";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { triggerSyncRevalidation } from "@/lib/revalidate";
import { z } from "zod";

const seoPageInputSchema = z.object({
  metaTitle: z.string().min(2, "Meta Title must be at least 2 characters"),
  metaDescription: z.string().min(5, "Meta Description must be at least 5 characters"),
  keywords: z.string().default(""),
  canonicalUrl: z.string().url("Canonical URL must be a valid URL").or(z.literal("")),
});

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { pageKey } = await params; // Next.js 15 unwrapping
    const formData = await req.formData();
    const metaTitle = formData.get("metaTitle") || "";
    const metaDescription = formData.get("metaDescription") || "";
    const keywords = formData.get("keywords") || "";
    const canonicalUrl = formData.get("canonicalUrl") || "";
    const imageFile = formData.get("ogImage");

    // Zod validation
    const parsed = seoPageInputSchema.parse({
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl,
    });

    const currentSeo = await prisma.sEOPage.findUnique({
      where: { pageKey },
    });

    let ogImageUrl = currentSeo?.ogImage || "";
    if (imageFile && typeof imageFile === "object" && typeof imageFile.arrayBuffer === "function" && imageFile.size > 0) {
      const uploaded = await saveUploadedFile(imageFile, "seo");
      if (uploaded) {
        ogImageUrl = uploaded;
        if (currentSeo?.ogImage) {
          await deleteUploadedFile(currentSeo.ogImage);
        }
      }
    }

    const updated = await prisma.sEOPage.upsert({
      where: { pageKey },
      update: {
        ...parsed,
        ogImage: ogImageUrl,
      },
      create: {
        pageKey,
        ...parsed,
        ogImage: ogImageUrl,
      },
    });

    // Sync content in real-time
    await triggerSyncRevalidation();

    return NextResponse.json({ success: true, seoPage: updated });
  } catch (err) {
    console.error("SEO PUT error:", err);
    if (err instanceof z.ZodError) {
      const issues = err.issues || err.errors || [];
      const errMsg = issues.map((e) => e.message).join(", ");
      return NextResponse.json({ success: false, message: errMsg }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Failed to update SEO settings" }, { status: 500 });
  }
}
