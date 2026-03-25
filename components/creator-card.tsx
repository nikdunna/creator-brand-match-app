"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CreatorCardProps {
  name: string;
  niche: string;
  audienceSize: string;
  oneLiner: string;
  matchReason: string;
  avatarUrl: string;
  platform: string;
  handle: string;
}

export function CreatorCard({
  name,
  niche,
  audienceSize,
  oneLiner,
  matchReason,
  avatarUrl,
  platform,
  handle
}: CreatorCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="flex flex-col border border-border bg-surface hover:bg-surface-hover transition-all hover:shadow-sm"
      onClick={() => {
        // if the user is selecting text, don't expand the card
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) return;
        setExpanded((prev) => !prev);
      }}
    >
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex items-center gap-3">
            <Image
              src={avatarUrl}
              alt={name}
              width={90}
              height={90}
              unoptimized
              className="shrink-0 rounded-full"
            />
            <div className="min-w-0">
              <h2 className="truncate text-lg font-medium text-text-primary">
                {name}
              </h2>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="text-sm text-accent">@{handle.replace(/^@/, "")}</span>
                <span className="text-text-muted text-xs">•</span>
                <span className="text-sm text-text-secondary">{platform}</span>
              </div>
              <p className="mt-0.5 text-sm text-text-secondary">{niche}</p>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-primary-muted px-2.5 py-0.5 text-xs font-medium text-primary">
            {audienceSize}
          </span>
        </div>
        <p className="text-base leading-relaxed text-text-secondary">{oneLiner}</p>
      </div>

      <div className="border-t border-border-muted">
        <button
          onClick={(e) => {
            // prevent double expansion
            e.stopPropagation();
            setExpanded((prev) => !prev);
          }}
          className="flex w-full items-center justify-between px-5 py-3 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
        >
          <span>Why this creator?</span>
          {expanded ? (
            <ChevronUp className="h-3.5 w-3.5 text-text-secondary" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-text-secondary" />
          )}
        </button>
        {expanded && (
          <div className="px-5 pb-4">
            <p className="text-base leading-relaxed text-text-secondary">
              {matchReason}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
