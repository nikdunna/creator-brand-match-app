import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";

export const dynamic = "force-dynamic";

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

interface RouteContext {
  params: Promise<{ sessionId: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { sessionId } = await context.params;

  if (!sessionId?.trim()) {
    return jsonError("Invalid session ID", 400);
  }

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
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { sessionId } = await context.params;

  if (!sessionId?.trim()) {
    return jsonError("Session not found", 404);
  }

  const result = await prisma.session.deleteMany({
    where: { id: sessionId },
  });

  if (result.count === 0) {
    return jsonError("Session not found", 404);
  }

  return new NextResponse(null, { status: 204 });
}
