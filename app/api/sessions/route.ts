import { NextResponse } from "next/server";
import { generateCreatorMatches } from "@/lib/ai/generate-matches";
import { prisma } from "@/lib/prisma/prisma";
import { createSessionSchema } from "@/lib/validation/session";
import { getAvatarUrl } from "@/lib/avatar";

export const dynamic = "force-dynamic";

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET() {
  const rows = await prisma.session.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { matches: true } },
    },
  });

  const sessions = rows.map(
    ({ _count, ...session }: (typeof rows)[number]) => ({
      ...session,
      createdAt: session.createdAt.toISOString(),
      matchCount: _count.matches,
    }),
  );

  return NextResponse.json({ sessions });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const parsed = createSessionSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    const message = first?.message ?? "Validation failed";
    return jsonError(message, 400);
  }

  let aiResponse;
  try {
    aiResponse = await generateCreatorMatches(parsed.data);
  } catch {
    return jsonError(
      "We couldn't generate matches right now. Please try again.",
      500,
    );
  }

  try {
    const session = await prisma.session.create({
      data: {
        companyName: parsed.data.companyName,
        industry: parsed.data.industry,
        targetAudience: parsed.data.targetAudience,
        creatorCriteria: parsed.data.creatorCriteria,
        matches: {
          create: aiResponse.creators.map((c) => ({
            name: c.name,
            platform: c.platform,
            handle: c.handle,
            niche: c.niche,
            audienceSize: c.audienceSize,
            oneLiner: c.oneLiner,
            matchReason: c.matchReason,
            avatarUrl: getAvatarUrl(c.name),
          })),
        },
      },
      include: { matches: true },
    });

    return NextResponse.json({
      session: {
        ...session,
        createdAt: session.createdAt.toISOString(),
        matches: session.matches.map((m) => ({
          ...m,
          createdAt: m.createdAt.toISOString(),
        })),
      },
    });
  } catch {
    return jsonError("Failed to save session", 500);
  }
}
