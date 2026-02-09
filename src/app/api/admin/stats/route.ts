import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/types";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Non autoris\u00E9" }, { status: 403 });
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
