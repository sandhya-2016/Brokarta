import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DEFAULT_TEXTS } from "@/lib/default-texts";
import { recordAuditLog } from "@/lib/audit";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const dbTexts = await prisma.pageText.findMany();
    // Build lookup map: `${pageKey}:${textKey}` -> value
    const dbMap = {};
    dbTexts.forEach((t) => {
      dbMap[`${t.pageKey}:${t.textKey}`] = t.value;
    });

    // Merge default text schemas with customized values
    const merged = {};
    Object.keys(DEFAULT_TEXTS).forEach((pageKey) => {
      merged[pageKey] = {
        name: DEFAULT_TEXTS[pageKey].name,
        path: DEFAULT_TEXTS[pageKey].path,
        fields: DEFAULT_TEXTS[pageKey].fields.map((f) => ({
          ...f,
          customValue: dbMap[`${pageKey}:${f.key}`] ?? null,
        })),
      };
    });

    return NextResponse.json({ success: true, pageTexts: merged });
  } catch (err) {
    console.error("PageTexts GET error:", err);
    return NextResponse.json({ success: false, message: "Failed to load page texts" }, { status: 500 });
  }
}

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { pageKey, fields } = body;

    if (!pageKey || !fields || typeof fields !== "object") {
      return NextResponse.json({ success: false, message: "Invalid payload parameters" }, { status: 400 });
    }

    if (!DEFAULT_TEXTS[pageKey]) {
      return NextResponse.json({ success: false, message: "Invalid page key" }, { status: 400 });
    }

    // Upsert overrides or delete if empty
    const promises = Object.keys(fields).map(async (textKey) => {
      const value = fields[textKey];

      const fieldDef = DEFAULT_TEXTS[pageKey].fields.find(f => f.key === textKey);
      if (!fieldDef) return;

      if (value === null || value === undefined || value.trim() === "") {
        try {
          await prisma.pageText.delete({
            where: {
              pageKey_textKey: { pageKey, textKey }
            }
          });
        } catch (e) {
          // Ignore if it was not in DB
        }
      } else {
        await prisma.pageText.upsert({
          where: {
            pageKey_textKey: { pageKey, textKey }
          },
          update: { value },
          create: { pageKey, textKey, value }
        });
      }
    });

    await Promise.all(promises);

    await recordAuditLog({
      session,
      action: "UPDATE",
      entity: "PageText",
      details: `Updated text overrides for page: ${pageKey} (${Object.keys(fields).length} field(s))`,
      req,
    });

    const { triggerSyncRevalidation } = await import("@/lib/revalidate");
    await triggerSyncRevalidation();

    return NextResponse.json({ success: true, message: "Page texts updated successfully" });
  } catch (err) {
    console.error("PageTexts PUT error:", err);
    return NextResponse.json({ success: false, message: "Failed to update page texts" }, { status: 500 });
  }
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const pageKey = searchParams.get("pageKey");

    if (!pageKey || !DEFAULT_TEXTS[pageKey]) {
      return NextResponse.json({ success: false, message: "Invalid page key" }, { status: 400 });
    }

    await prisma.pageText.deleteMany({
      where: { pageKey }
    });

    await recordAuditLog({
      session,
      action: "DELETE",
      entity: "PageText",
      details: `Restored original default texts for page: ${pageKey}`,
      req,
    });

    const { triggerSyncRevalidation } = await import("@/lib/revalidate");
    await triggerSyncRevalidation();

    return NextResponse.json({ success: true, message: "Reset page texts to defaults" });
  } catch (err) {
    console.error("PageTexts DELETE error:", err);
    return NextResponse.json({ success: false, message: "Failed to reset page texts" }, { status: 500 });
  }
}
