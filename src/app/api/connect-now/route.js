import prisma from "@/lib/prisma";
import { z } from "zod";
import { NextResponse } from "next/server";

// Define a Zod validation schema matching frontend and backend
const leadInputSchema = z.object({
  userType: z.enum(["BROKER", "AGENCY", "OTHERS"], {
    errorMap: () => ({ message: "Invalid user type selected" }),
  }),
  lookingFor: z.enum(["JOIN_AS_BROKER", "BOOK_A_DEMO", "ENTERPRISE_USE", "SUPPORT_QUERY"], {
    errorMap: () => ({ message: "Invalid request category selected" }),
  }),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address format").or(z.literal("")),
  phoneNumber: z.string().min(6, "Phone number must be at least 6 characters"),
  companyName: z.string().optional().nullable(),
  companyRole: z.string().optional().nullable(),
  feedback: z.string().optional().nullable(),
});

export async function POST(req) {
  try {
    const body = await req.json();

    // Map input fields if they are sent in lowercase or different names
    let lookingForVal = (body.lookingFor || "").trim().toUpperCase().replace(/[\s\/_]+/g, "_");
    if (lookingForVal.includes("JOIN")) lookingForVal = "JOIN_AS_BROKER";
    else if (lookingForVal.includes("DEMO")) lookingForVal = "BOOK_A_DEMO";
    else if (lookingForVal.includes("ENTERPRISE")) lookingForVal = "ENTERPRISE_USE";
    else if (lookingForVal.includes("SUPPORT") || lookingForVal.includes("QUERY")) lookingForVal = "SUPPORT_QUERY";

    let userTypeVal = (body.userType || "").trim().toUpperCase();
    if (!["BROKER", "AGENCY", "OTHERS"].includes(userTypeVal)) {
      userTypeVal = "OTHERS";
    }

    const mappedData = {
      userType: userTypeVal,
      lookingFor: lookingForVal,
      fullName: (body.fullName || body.name)?.trim(),
      email: body.email?.trim() || "",
      phoneNumber: (body.phoneNumber || body.phone)?.trim(),
      companyName: (body.companyName || body.firstName)?.trim() || null,
      companyRole: (body.companyRole || body.role)?.trim() || null,
      feedback: (body.feedback || body.query)?.trim() || null,
    };

    const parsed = leadInputSchema.parse(mappedData);

    const newLead = await prisma.lead.create({
      data: parsed,
    });

    const { triggerSyncRevalidation } = await import("@/lib/revalidate");
    await triggerSyncRevalidation();

    return NextResponse.json({ success: true, lead: newLead });
  } catch (err) {
    console.error("Public Lead POST error:", err);
    if (err instanceof z.ZodError) {
      const issues = err.issues || err.errors || [];
      const errMsg = issues.map((e) => e.message).join(", ");
      return NextResponse.json({ success: false, message: errMsg }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Failed to submit partner inquiry" }, { status: 500 });
  }
}
