"use client";

import { useMemo, useRef } from "react";
import type { Highlight } from "@/data/highlights";

const COLORS = [
  "bg-emerald-900/20 border border-emerald-500/10",
  "bg-emerald-900/40 border border-emerald-500/20",
  "bg-emerald-800/60 border border-emerald-400/30",
  "bg-emerald-700/70 border border-emerald-300/40",
  "bg-emerald-500 border border-emerald-200",
] as const;

type ContributionHeatmapProps = {
  highlights: Highlight[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onHover?: (id: string) => void;
  onLeave?: () => void;
};

export default function ContributionHeatmap({
  highlights,
  activeId,
  onSelect,
  onHover,
  onLeave,
}: ContributionHeatmapProps) {
  const map = useMemo(() => {
    return new Map(highlights.map((item) => [item.index, item]));
  }, [highlights]);

  const totalCells = 53 * 7;
  const gridRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={gridRef}
        className="grid grid-flow-col grid-rows-7 gap-1 sm:gap-1.5"
        onMouseLeave={() => onLeave?.()}
      >
        {Array.from({ length: totalCells }).map((_, index) => {
          const highlight = map.get(index);
          const intensity = highlight?.intensity ?? 0;
          const isActive = highlight?.id === activeId;

          return (
            <button
              key={index}
              type="button"
              onClick={() => highlight && onSelect(highlight.id)}
              onMouseEnter={() => highlight && onHover?.(highlight.id)}
              onFocus={() => highlight && onHover?.(highlight.id)}
              onBlur={(event) => {
                const next = event.relatedTarget as Node | null;
                if (!next || !gridRef.current?.contains(next)) {
                  onLeave?.();
                }
              }}
              aria-label={highlight ? highlight.title : `Placeholder ${index + 1}`}
              aria-pressed={isActive}
              className={`h-3 w-3 rounded-[4px] transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 sm:h-4 sm:w-4 ${
                highlight
                  ? `${COLORS[intensity]} ${isActive ? "scale-125 shadow-lg shadow-emerald-500/40" : "hover:scale-110"}`
                  : "bg-slate-800/40"
              } ${!highlight ? "cursor-default" : "cursor-pointer"}`}
              disabled={!highlight}
            />
          );
        })}
      </div>
      <p className="text-xs text-emerald-200/80 text-center">
        Hover or tap any highlighted tile to preview a milestone. Click to keep it in focus while you explore the details below.
      </p>
    </div>
  );
}
