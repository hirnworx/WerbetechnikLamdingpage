import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { LeadSchema } from "@/lib/validation";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
      { status: 429 }
    );
  }

  const body = await req.json();
  const parsed = LeadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const cityExists = await prisma.city.findUnique({ where: { slug: parsed.data.citySlug } });
  if (!cityExists) {
    return NextResponse.json({ error: "Stadt nicht gefunden" }, { status: 400 });
  }

  const { honeypot: _, ...leadData } = parsed.data;

  await prisma.lead.create({ data: leadData });
  return NextResponse.json({ ok: true }, { status: 201 });
}
