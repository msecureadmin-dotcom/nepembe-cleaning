import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
import { sendQuoteEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: parsed.data,
    });

    try {
      await sendQuoteEmail(parsed.data);
    } catch {
      // Email failure is non-blocking
    }

    return NextResponse.json({ ok: true, id: submission.id });
  } catch {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
