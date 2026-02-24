import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdmin, unauthorized } from "@/lib/auth";
import { CityUpdateSchema } from "@/lib/validation";

interface Ctx {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const city = await prisma.city.findUnique({
    where: { id },
    include: { redirects: true },
  });
  if (!city) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(city);
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  if (!(await isAdmin())) return unauthorized();

  const { id } = await ctx.params;
  const body = await req.json();
  const parsed = CityUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await prisma.city.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (parsed.data.slug && parsed.data.slug !== existing.slug) {
    const conflict = await prisma.city.findUnique({ where: { slug: parsed.data.slug } });
    if (conflict) {
      return NextResponse.json({ error: "Slug existiert bereits" }, { status: 409 });
    }

    await prisma.slugRedirect.upsert({
      where: { oldSlug: existing.slug },
      update: { cityId: id },
      create: { oldSlug: existing.slug, cityId: id },
    });
  }

  const city = await prisma.city.update({
    where: { id },
    data: parsed.data,
  });

  return NextResponse.json(city);
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  if (!(await isAdmin())) return unauthorized();

  const { id } = await ctx.params;
  const existing = await prisma.city.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.city.delete({ where: { id } });
  return NextResponse.json({ deleted: true });
}
