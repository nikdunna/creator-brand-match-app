import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma/prisma";
import { SessionCard } from "@/components/session-card";
import { EmptyState } from "@/components/empty-state";
import { SortToggle } from "@/components/sort-toggle";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Your Sessions | Lil' Andy",
  description: "View and manage your creator match sessions.",
};

export const dynamic = "force-dynamic"; // don't cache

interface DashboardPageProps {
  searchParams: Promise<{ sort?: string }>;
}

function SortToggleSkeleton() {
  return (
    <div className="inline-flex rounded-lg border border-border-muted bg-surface p-0.5">
      <div className="rounded-md px-4 py-2 text-sm font-medium text-transparent">Latest</div>
      <div className="rounded-md px-4 py-2 text-sm font-medium text-transparent">Oldest</div>
    </div>
  );
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { sort } = await searchParams;
  const order = sort === "asc" ? "asc" : "desc";

  const sessions = await prisma.session.findMany({
    orderBy: { createdAt: order },
    include: { _count: { select: { matches: true } } },
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
            Your Sessions
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            {sessions.length === 0
              ? "No matches yet, let Lil' Andy search for your first creator partners."
              : `${sessions.length} session${sessions.length !== 1 ? "s" : ""} so far`}
          </p>
        </div>
        {sessions.length > 0 && (
          <Link
            href="/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            <Plus className="h-4 w-4" />
            New Match
          </Link>
        )}
      </div>

      {sessions.length > 0 && (
        <div className="mt-6">
          <Suspense fallback={<SortToggleSkeleton />}>
            <SortToggle />
          </Suspense>
        </div>
      )}

      <div className="mt-4">
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
