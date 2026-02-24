import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdmin, unauthorized } from "@/lib/auth";
import { CityCreateSchema } from "@/lib/validation";

export async function GET() {
  const cities = await prisma.city.findMany({
    orderBy: { cityName: "asc" },
    include: { redirects: { select: { oldSlug: true } } },
  });
  return NextResponse.json(cities);
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return unauthorized();

  const body = await req.json();
  const parsed = CityCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await prisma.city.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return NextResponse.json({ error: "Slug existiert bereits" }, { status: 409 });
  }

  const city = await prisma.city.create({ data: parsed.data });
  return NextResponse.json(city, { status: 201 });
}
