import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
import { sendQuoteEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (
      !rateLimit(
        "contact:" + (req.headers.get("x-forwarded-for") || "unknown"),
        5,
        60_000
      )
    ) {
      return NextResponse.json(
        { error: "Too many attempts, try again later" },
        { status: 429 }
      );
    }

    if (body._hp && body._hp !== "") {
      return NextResponse.json({ ok: true, id: "spam-filtered" });
    }
    delete body._hp;

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
