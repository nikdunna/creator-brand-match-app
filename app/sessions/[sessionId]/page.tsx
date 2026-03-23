import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma/prisma";
import { CreatorCard } from "@/components/creator-card";
import { DeleteSessionButton } from "./delete-button";
import { ArrowLeft, Building2, Target, Search } from "lucide-react";

interface PageProps {
  params: Promise<{ sessionId: string }>;
}

export default async function SessionDetailPage({ params }: PageProps) {
  const { sessionId } = await params;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { matches: { orderBy: { createdAt: "asc" } } },
  });

  if (!session) notFound();

  const formattedDate = session.createdAt.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sessions
        </Link>
        <DeleteSessionButton sessionId={session.id} />
      </div>

      <div className="mt-8 space-y-1">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
          {formattedDate}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-200">
          {session.companyName}
        </h1>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <InfoChip icon={Building2} label="Industry" value={session.industry} />
        <InfoChip
          icon={Target}
          label="Target Audience"
          value={session.targetAudience}
        />
        <InfoChip
          icon={Search}
          label="Looking For"
          value={session.creatorCriteria}
        />
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-200">
          Andy&apos;s Picks
          <span className="ml-2 text-sm font-normal text-gray-400">
            {session.matches.length} creator
            {session.matches.length !== 1 && "s"}
          </span>
        </h2>
        <div className="mt-4 grid gap-4 grid-cols-1 ">
          {session.matches.map((m) => (
            <CreatorCard
              key={m.id}
              name={m.name}
              niche={m.niche}
              audienceSize={m.audienceSize}
              oneLiner={m.oneLiner}
              matchReason={m.matchReason}
              avatarUrl={m.avatarUrl}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function InfoChip({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3">
      <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="mt-1 text-sm text-gray-700">{value}</p>
    </div>
  );
}
