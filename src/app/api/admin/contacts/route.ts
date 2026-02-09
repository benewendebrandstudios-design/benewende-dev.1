import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/types";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }

  const contacts = await prisma.contactMessage.findMany({
    where: { archived: false },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(contacts);
}
