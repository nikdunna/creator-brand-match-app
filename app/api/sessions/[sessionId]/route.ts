import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { jsonError } from "@/lib/api/utils";

export const dynamic = "force-dynamic"; // don't cache

interface RouteContext {
  params: Promise<{ sessionId: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { sessionId } = await context.params;

  if (!sessionId?.trim()) {
    return jsonError("Invalid session ID", 400);
  }

  try {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { matches: { orderBy: { createdAt: "asc" } } },
    });

    if (!session) {
      return jsonError("Session not found", 404);
    }

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
    return jsonError("Failed to load session", 500);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { sessionId } = await context.params;

  if (!sessionId?.trim()) {
    return jsonError("Invalid session ID", 400);
  }

  try {
    const result = await prisma.session.deleteMany({
      where: { id: sessionId },
    });

    if (result.count === 0) {
      return jsonError("Session not found", 404);
    }

    return new NextResponse(null, { status: 204 });
  } catch {
    return jsonError("Failed to delete session", 500);
  }
}
