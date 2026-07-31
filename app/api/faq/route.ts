import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { faqSchema } from "@/lib/validations";

export async function GET() {
  try {
    const items = await prisma.fAQ.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = faqSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid data" }, { status: 400 });

    const item = await prisma.fAQ.create({ data: parsed.data });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { id, ...rest } = body;
    const parsed = faqSchema.safeParse(rest);
    if (!parsed.success) return NextResponse.json({ error: "Invalid data" }, { status: 400 });

    const item = await prisma.fAQ.update({ where: { id }, data: parsed.data });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await req.json();
    await prisma.fAQ.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
