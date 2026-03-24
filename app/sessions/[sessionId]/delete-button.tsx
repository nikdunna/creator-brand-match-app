"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { ConfirmModal } from "@/components/confirm-modal";

export function DeleteSessionButton({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const closeConfirm = useCallback(() => setConfirmOpen(false), []);

  const handleDelete = useCallback(async () => {
    if (deleting) return;
    setDeleting(true);

    const res = await fetch(`/api/sessions/${sessionId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setConfirmOpen(false);
      router.push("/dashboard");
    } else {
      setDeleting(false);
    }
  }, [deleting, sessionId, router]);

  return (
    <>
      <button
        onClick={() => setConfirmOpen(true)}
        disabled={deleting}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:border-error hover:bg-error/10 hover:text-error disabled:opacity-50 hover:cursor-pointer"
      >
        <Trash2 className="h-3.5 w-3.5" />
        {deleting ? "Deleting…" : "Delete"}
      </button>

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
