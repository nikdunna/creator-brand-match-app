"use client";

import { useRouter, useSearchParams } from "next/navigation";

const options = [
  { label: "Latest", value: "desc" },
  { label: "Oldest", value: "asc" },
] as const;

export function SortToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") === "asc" ? "asc" : "desc";

  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "desc") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.replace(`?${params.toString()}`);
  }

  return (
    <div className="inline-flex rounded-lg border border-border-muted bg-surface p-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => handleSort(opt.value)}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors hover:cursor-pointer ${
            current === opt.value
              ? "bg-primary-muted text-primary"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
