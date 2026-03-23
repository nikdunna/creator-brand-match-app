import Link from "next/link";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  href?: string;
  cta?: string;
}

export function EmptyState({
  title = "No sessions yet",
  description = "Start your first match to find the perfect creator partners for your brand.",
  href = "/new",
  cta = "Create your first match",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 px-6 py-20 text-center">
      <Inbox className="h-10 w-10 text-gray-400" />
      <div className="space-y-1">
        <p className="text-base font-medium text-gray-900">{title}</p>
        <p className="max-w-sm text-sm text-gray-500">{description}</p>
      </div>
      <Link
        href={href}
        className="mt-2 inline-flex items-center rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
      >
        {cta}
      </Link>
    </div>
  );
}
