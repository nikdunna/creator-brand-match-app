"use client";

import Link from "next/link";
import { Trash2, Users, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
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
    if (deleting) return;
    setDeleting(true);
    const res = await fetch(`/api/sessions/${id}`, { method: "DELETE" });
    if (res.ok) {
      setConfirmOpen(false);
      router.refresh();
    } else {
      setDeleting(false);
    }
  }, [deleting, id, router]);

  return (
    <>
      <Link
        href={`/sessions/${id}`}
        className="group flex items-center justify-between border border-border bg-surface hover:bg-surface-hover px-5 py-4 transition-all hover:shadow-sm"
      >
        <div className="min-w-0 space-y-1">
          <p className="truncate text-lg font-medium text-text-primary">
            {companyName}
          </p>
          <div className="flex items-center gap-3 text-sm text-text-secondary">
            <span>{industry}</span>
            <span className="text-text-muted">·</span>
            <span>{formattedDate}</span>
            <span className="text-text-muted">·</span>
            <span className="inline-flex items-center gap-1">
              <Users className="h-3 w-3 text-text-secondary" />
              {matchCount} match{matchCount !== 1 && "es"}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 pl-4">
          <button
            onClick={openConfirm}
            disabled={deleting}
            className="rounded-md p-1.5 text-text-secondary transition-colors hover:bg-error/10 hover:text-error disabled:opacity-50 hover:cursor-pointer"
            aria-label="Delete session"
          >
            <Trash2 className="h-4 w-4 text-text-secondary" />
          </button>
          <ArrowRight className="h-4 w-4 text-text-secondary transition-colors group-hover:text-text-primary" />
        </div>
      </Link>

      <ConfirmModal
        open={confirmOpen}
        title="Delete session?"
        description="This will permanently delete this session and all its matched creators. This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={closeConfirm}
        loading={deleting}
      />
    </>
  );
}
