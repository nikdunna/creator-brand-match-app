"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CreatorCardProps {
  name: string;
  niche: string;
  audienceSize: string;
  oneLiner: string;
  matchReason: string;
}

export function CreatorCard({
  name,
  niche,
  audienceSize,
  oneLiner,
  matchReason,
}: CreatorCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white transition-all hover:shadow-sm">
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-gray-900">
              {name}
            </p>
            <p className="mt-0.5 text-sm text-gray-500">{niche}</p>
          </div>
          <span className="shrink-0 rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
            {audienceSize}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-gray-700">{oneLiner}</p>
      </div>

      <div className="border-t border-gray-100">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-between px-5 py-3 text-xs font-medium text-gray-500 transition-colors hover:text-gray-700"
        >
          <span>Why this creator?</span>
          {expanded ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </button>
        {expanded && (
          <div className="px-5 pb-4">
            <p className="text-sm leading-relaxed text-gray-600">
              {matchReason}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
