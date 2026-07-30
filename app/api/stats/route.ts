import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { statSchema } from "@/lib/validations";

export async function GET() {
  try {
    const stats = await prisma.stat.findMany({ orderBy: { sortOrder: "asc" } });
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = statSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid data" }, { status: 400 });

    const max = await prisma.stat.findFirst({ orderBy: { sortOrder: "desc" } });
    const stat = await prisma.stat.create({
      data: { ...parsed.data, sortOrder: (max?.sortOrder ?? -1) + 1 },
    });
    return NextResponse.json(stat);
  } catch {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { id, ...data } = body;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    const parsed = statSchema.safeParse(data);
    if (!parsed.success) return NextResponse.json({ error: "Invalid data" }, { status: 400 });

    const stat = await prisma.stat.update({ where: { id }, data: parsed.data });
    return NextResponse.json(stat);
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    await prisma.stat.delete({ where: { id: body.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
