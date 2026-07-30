import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { siteSettingsSchema } from "@/lib/validations";

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: "singleton" },
    });
    if (!settings) {
      settings = await prisma.siteSettings.create({ data: {} });
    }
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = siteSettingsSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const settings = await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: parsed.data,
      create: { id: "singleton", ...parsed.data },
    });

    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
