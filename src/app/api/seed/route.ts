import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  // Block in production unless SEED_SECRET is provided
  if (process.env.NODE_ENV === "production") {
    const secret = request.nextUrl.searchParams.get("secret");
    if (!secret || secret !== process.env.SEED_SECRET) {
      return NextResponse.json({ error: "Non autoris\u00e9" }, { status: 403 });
    }
  }

  try {
    const adminEmail = "benewende.dev@gmail.com";

    const existing = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existing) {
      return NextResponse.json({
        message: "Admin account already exists",
        email: adminEmail,
      });
    }

    const adminPassword = process.env.ADMIN_PASSWORD || "Benewende@2026!";
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const admin = await prisma.user.create({
      data: {
        name: "Benewende",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        plan: "business",
        cvCredits: 999,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Admin account created",
      email: admin.email,
      password_hint: "Utilisez le mot de passe défini dans ADMIN_PASSWORD ou le mot de passe par défaut",
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Erreur lors du seed" },
      { status: 500 }
    );
  }
}
