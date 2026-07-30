import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { userSchema, changePasswordSchema } from "@/lib/validations";

export async function GET() {
  const user = await getSession();
  if (!user || user.role !== "Admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(users);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "Admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = userSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid data" }, { status: 400 });

    const existing = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });
    if (existing) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12);
    const user = await prisma.user.create({
      data: {
        email: parsed.data.email,
        name: parsed.data.name || parsed.data.email,
        passwordHash,
        role: parsed.data.role,
      },
      select: { id: true, email: true, name: true, role: true },
    });

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();

    if (body.changePassword) {
      const parsed = changePasswordSchema.safeParse(body);
      if (!parsed.success) return NextResponse.json({ error: "Invalid password data" }, { status: 400 });

      const user = await prisma.user.findUnique({ where: { id: session.id } });
      if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

      const valid = await bcrypt.compare(parsed.data.currentPassword, user.passwordHash);
      if (!valid) return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });

      const passwordHash = await bcrypt.hash(parsed.data.newPassword, 12);
      await prisma.user.update({
        where: { id: session.id },
        data: { passwordHash },
      });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "Admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    const userCount = await prisma.user.count();
    if (userCount <= 1) {
      return NextResponse.json({ error: "Cannot remove the last admin" }, { status: 400 });
    }
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
