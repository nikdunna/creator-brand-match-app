import { LoadingSpinner } from "@/components/loading-spinner";

export default function SessionDetailLoading() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <LoadingSpinner message="Loading session details…" />
    </main>
  );
}
