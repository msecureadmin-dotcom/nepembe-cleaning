import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(slides);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const slide = await prisma.heroSlide.create({
      data: {
        title: body.title || "Cleaning service",
        imageUrl: body.imageUrl || "",
        sortOrder: body.sortOrder ?? 0,
        isActive: body.isActive ?? true,
      },
    });
    return NextResponse.json(slide);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { id, ...data } = body;
    const slide = await prisma.heroSlide.update({
      where: { id },
      data: {
        title: data.title || "Cleaning service",
        imageUrl: data.imageUrl || "",
        sortOrder: data.sortOrder ?? 0,
        isActive: data.isActive ?? true,
      },
    });
    return NextResponse.json(slide);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await req.json();
    await prisma.heroSlide.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
