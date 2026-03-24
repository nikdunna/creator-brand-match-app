"use client";

import Link from "next/link";
import { Trash2, Users, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useCallback, useRef } from "react";
import { ConfirmModal } from "@/components/confirm-modal";

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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inflight = useRef(false);

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  function openConfirm(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setConfirmOpen(true);
  }

  const closeConfirm = useCallback(() => setConfirmOpen(false), []);

  const handleDelete = useCallback(async () => {
    if (inflight.current) return;
    inflight.current = true;
    setDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/sessions/${id}`, { method: "DELETE" });
      if (res.ok) {
        setConfirmOpen(false);
        router.refresh();
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Failed to delete session. Please try again.");
        inflight.current = false;
        setDeleting(false);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      inflight.current = false;
      setDeleting(false);
    }
  }, [id, router]);

  return (
    <>
      <div className="group relative border border-border bg-surface hover:bg-surface-hover transition-all hover:shadow-sm">
        <Link
          href={`/sessions/${id}`}
          className="flex items-center justify-between px-5 py-4"
        >
          <div className="min-w-0 space-y-1">
            <h2 className="truncate text-lg font-medium text-text-primary">
              {companyName}
            </h2>
            <div className="flex items-center gap-3 text-sm text-text-secondary">
              <span>{industry}</span>
              <span className="text-text-muted">•</span>
              <span>{formattedDate}</span>
              <span className="text-text-muted">•</span>
              <span className="inline-flex items-center gap-1">
                <Users className="h-3 w-3 text-text-secondary" />
                {matchCount} match{matchCount !== 1 && "es"}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 pl-4">
            <div className="h-7 w-7" aria-hidden /> {/* placeholder for the delete button */}
            <ArrowRight className="h-4 w-4 text-text-secondary transition-colors group-hover:text-text-primary" />
          </div>
        </Link>

        <button
          onClick={openConfirm}
          disabled={deleting}
          className="absolute right-14 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-text-secondary transition-colors hover:bg-error/10 hover:text-error hover:border-error border border-transparent disabled:opacity-50 hover:cursor-pointer"
          aria-label="Delete session"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Delete session?"
        description="This will permanently delete this session and all its matched creators. This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={closeConfirm}
        loading={deleting}
        error={error}
      />
    </>
  );
}
