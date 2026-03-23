import Link from "next/link";
import { prisma } from "@/lib/prisma/prisma";
import { SessionCard } from "@/components/session-card";
import { EmptyState } from "@/components/empty-state";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const sessions = await prisma.session.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { matches: true } } },
  });

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-200">
            Your Sessions
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {sessions.length === 0
              ? "No matches yet — let Andy find your first creators."
              : `${sessions.length} session${sessions.length !== 1 ? "s" : ""} so far`}
          </p>
        </div>
        {sessions.length > 0 && (
          <Link
            href="/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
          >
            <Plus className="h-4 w-4" />
            New Match
          </Link>
        )}
      </div>

      <div className="mt-8">
        {sessions.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {sessions.map((s) => (
              <SessionCard
                key={s.id}
                id={s.id}
                companyName={s.companyName}
                industry={s.industry}
                createdAt={s.createdAt.toISOString()}
                matchCount={s._count.matches}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
