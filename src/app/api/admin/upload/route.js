import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Get file extension and clean name
    const originalName = file.name || "upload";
    const ext = path.extname(originalName).toLowerCase();
    const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9]/g, "-");
    const uniqueName = `${baseName}-${Date.now()}${ext}`;

    // Target uploads folder inside public folder
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    // Ensure uploads directory exists
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, uniqueName);
    await writeFile(filePath, buffer);

    const relativePath = `/uploads/${uniqueName}`;
    return NextResponse.json({ success: true, filePath: relativePath });
  } catch (err) {
    console.error("Error in POST /api/admin/upload:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
