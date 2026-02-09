import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const adminEmail = "admin@benewende.dev";

    const existing = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existing) {
      return NextResponse.json({
        message: "Admin account already exists",
        email: adminEmail,
      });
    }

    const hashedPassword = await bcrypt.hash("admin123", 12);

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
      password_hint: "admin123 - CHANGEZ EN PRODUCTION",
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Erreur lors du seed" },
      { status: 500 }
    );
  }
}
