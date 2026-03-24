import { LoadingSpinner } from "@/components/loading-spinner";

export default function DashboardLoading() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <LoadingSpinner message="Loading your sessions…" />
    </main>
  );
}
