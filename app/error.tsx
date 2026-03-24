"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex max-w-md flex-col items-center justify-center px-6 py-24 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-error/10">
        <AlertTriangle className="h-6 w-6 text-error" />
      </div>
      <h1 className="mt-4 text-xl font-semibold text-text-primary">
        Something went wrong
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        An unexpected error occurred. You can try again or head back to the
        dashboard.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
        >
          <RotateCcw className="h-4 w-4" />
          Try again
        </button>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          <Home className="h-4 w-4" />
          Dashboard
        </Link>
      </div>
    </main>
  );
}
