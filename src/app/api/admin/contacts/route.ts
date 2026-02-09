import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });
  if ((token as { role?: string } | null)?.role !== "admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }

  const contacts = await prisma.contactMessage.findMany({
    where: { archived: false },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(contacts);
}
