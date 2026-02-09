import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!(token as { role?: string } | null)?.role || (token as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }

  const [totalUsers, totalContacts, unreadContacts, totalCVs] =
    await Promise.all([
      prisma.user.count(),
      prisma.contactMessage.count({ where: { archived: false } }),
      prisma.contactMessage.count({ where: { read: false, archived: false } }),
      prisma.cVDocument.count(),
    ]);

  return NextResponse.json({
    totalUsers,
    totalContacts,
    unreadContacts,
    totalCVs,
  });
}
