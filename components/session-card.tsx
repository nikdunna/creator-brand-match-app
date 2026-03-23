"use client";

import Link from "next/link";
import { Trash2, Users, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SessionCardProps {
  id: string;
  companyName: string;
  industry: string;
  createdAt: string;
  matchCount: number;
}

export function SessionCard({
  id,
  companyName,
  industry,
  createdAt,
  matchCount,
}: SessionCardProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (deleting) return;

    setDeleting(true);
    const res = await fetch(`/api/sessions/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      setDeleting(false);
    }
  }

  return (
    <Link
      href={`/sessions/${id}`}
      className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 transition-all hover:border-gray-300 hover:shadow-sm"
    >
      <div className="min-w-0 space-y-1">
        <p className="truncate text-base font-medium text-gray-900">
          {companyName}
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>{industry}</span>
          <span className="text-gray-300">·</span>
          <span>{formattedDate}</span>
          <span className="text-gray-300">·</span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3 w-3" />
            {matchCount} match{matchCount !== 1 && "es"}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 pl-4">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
          aria-label="Delete session"
        >
          <Trash2 className="h-4 w-4" />
        </button>
        <ArrowRight className="h-4 w-4 text-gray-300 transition-colors group-hover:text-gray-500" />
      </div>
    </Link>
  );
}
