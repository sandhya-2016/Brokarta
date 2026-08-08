import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { triggerSyncRevalidation } from "@/lib/revalidate";
import { DEFAULT_URLS } from "@/lib/default-urls";
import { recordAuditLog } from "@/lib/audit";

export const dynamic = "force-dynamic";

/**
 * GET: Retrieve all URLs grouped by section along with their active database overrides
 */
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Retrieve active overrides
    const overridesList = await prisma.appUrl.findMany();
    const overridesMap = {};
    if (Array.isArray(overridesList)) {
      overridesList.forEach((item) => {
        overridesMap[item.urlKey] = item.value;
      });
    }

    return NextResponse.json({
      sections: DEFAULT_URLS,
      overrides: overridesMap,
    });
  } catch (err) {
    console.error("Error in GET /api/admin/page-urls:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * PUT: Batch save or reset custom URL overrides
 */
export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { overrides = {} } = body;

    // Flatten default values for lookup validation
    const flatDefaults = {};
    Object.values(DEFAULT_URLS).forEach((section) => {
      section.fields.forEach((field) => {
        flatDefaults[field.key] = field.default;
      });
    });

    // Write updates inside a transaction
    await prisma.$transaction(
      Object.entries(overrides).map(([key, val]) => {
        const trimmedVal = typeof val === "string" ? val.trim() : "";
        const defaultVal = flatDefaults[key];

        // If the updated override is empty or matches the system default, remove custom database overrides
        if (!trimmedVal || trimmedVal === defaultVal) {
          return prisma.appUrl.deleteMany({
            where: { urlKey: key },
          });
        }

        // Otherwise upsert the custom override value
        return prisma.appUrl.upsert({
          where: { urlKey: key },
          update: { value: trimmedVal },
          create: { urlKey: key, value: trimmedVal },
        });
      })
    );

    await recordAuditLog({
      session,
      action: "UPDATE",
      entity: "AppUrl",
      details: `Updated URL overrides for ${Object.keys(overrides).length} key(s)`,
      req,
    });

    // Invalidate caches instantly
    await triggerSyncRevalidation();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error in PUT /api/admin/page-urls:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
