import Link from "next/link";
import { SearchX, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex max-w-md flex-col items-center justify-center px-6 py-24 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-muted">
        <SearchX className="h-6 w-6 text-primary" />
      </div>
      <h1 className="mt-4 text-xl font-semibold text-text-primary">
        Uh oh! That page doesn't exist.
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        removed.
      </p>
      <Link
        href="/dashboard"
        className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
      >
        <Home className="h-4 w-4" />
        Back to dashboard
      </Link>
    </main>
  );
}
