import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/types";

const modelMap: Record<string, string> = {
  projects: "project",
  services: "serviceItem",
  skills: "skillGroup",
  testimonials: "testimonialItem",
  experiences: "experienceItem",
  settings: "siteSetting",
};

function getModel(type: string) {
  const model = modelMap[type];
  if (!model) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (prisma as unknown as Record<string, unknown>)[model] as Record<string, (...args: any[]) => any>;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { type: string } }
) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Non autoris\u00E9" }, { status: 403 });
  }

  const model = getModel(params.type);
  if (!model) {
    return NextResponse.json({ error: "Type invalide" }, { status: 400 });
  }

  const orderBy = params.type === "settings" ? undefined : { sortOrder: "asc" as const };
  const items = await model.findMany(orderBy ? { orderBy } : undefined);
  return NextResponse.json(items);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Non autoris\u00E9" }, { status: 403 });
  }

  const model = getModel(params.type);
  if (!model) {
    return NextResponse.json({ error: "Type invalide" }, { status: 400 });
  }

  const body = await request.json();
  const item = await model.create({ data: body });
  return NextResponse.json(item);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Non autoris\u00E9" }, { status: 403 });
  }

  const model = getModel(params.type);
  if (!model) {
    return NextResponse.json({ error: "Type invalide" }, { status: 400 });
  }

  const body = await request.json();
  const { id, ...data } = body;
  const item = await model.update({ where: { id }, data });
  return NextResponse.json(item);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Non autoris\u00E9" }, { status: 403 });
  }

  const model = getModel(params.type);
  if (!model) {
    return NextResponse.json({ error: "Type invalide" }, { status: 400 });
  }

  const { id } = await request.json();
  await model.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
