"use client";

import { useCallback, useMemo, useState } from "react";
import ContributionHeatmap from "./ContributionHeatmap";
import { highlights as highlightData, type Highlight } from "@/data/highlights";

export default function JourneyExperience() {
  const timeline = useMemo(() => {
    return [...highlightData].sort((a, b) => a.sequence - b.sequence);
  }, []);

  const [selectedId, setSelectedId] = useState<string | null>(() => {
    return timeline.length ? timeline[0].id : null;
  });
  const [activeId, setActiveId] = useState<string | null>(() => {
    return timeline.length ? timeline[0].id : null;
  });

  const fallbackId = timeline[0]?.id ?? null;
  const resolvedActiveId = activeId ?? selectedId ?? fallbackId;

  const activeHighlight = useMemo(() => {
    if (!timeline.length) return undefined;
    if (!resolvedActiveId) {
      return timeline[0];
    }
    return timeline.find((item) => item.id === resolvedActiveId) ?? timeline[0];
  }, [timeline, resolvedActiveId]);

  const activeIndex = useMemo(() => {
    if (!activeHighlight) return -1;
    return timeline.findIndex((item) => item.id === activeHighlight.id);
  }, [timeline, activeHighlight]);

  const totalHighlights = timeline.length;

  const handleHover = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const handleLeave = useCallback(() => {
    setActiveId(selectedId ?? fallbackId);
  }, [selectedId, fallbackId]);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    setActiveId(id);
  }, []);

  return (
    <section className="relative mt-16 lg:mt-24">
      <div className="relative rounded-3xl border border-emerald-500/15 bg-slate-950/70 p-6 shadow-[0_25px_60px_-25px_rgba(16,185,129,0.45)] backdrop-blur sm:p-10">
        <div
          aria-hidden
          className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"
        />
        <header className="max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">Contribution navigator</p>
          <h2 className="text-3xl font-semibold text-emerald-50 sm:text-4xl">Zoom into each highlight</h2>
          <p className="text-sm text-emerald-100/80 sm:text-base">
            Hover or tap across the grid to preview each milestone. Click a tile to keep its story in view while you explore the
            full context below.
          </p>
        </header>
        <div className="mt-8 flex flex-col gap-6 lg:gap-8">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/40 p-4 sm:p-6">
            <ContributionHeatmap
              highlights={timeline}
              activeId={activeHighlight?.id ?? null}
              onHover={handleHover}
              onSelect={handleSelect}
              onLeave={handleLeave}
            />
          </div>
          <HighlightDetail
            highlight={activeHighlight}
            index={activeIndex >= 0 ? activeIndex : 0}
            total={totalHighlights}
          />
        </div>
      </div>
    </section>
  );
}

type HighlightDetailProps = {
  highlight: Highlight | undefined;
  index: number;
  total: number;
};

function HighlightDetail({ highlight, index, total }: HighlightDetailProps) {
  if (!highlight) return null;

  const order = index + 1;

  return (
    <article className="flex flex-col gap-6 rounded-2xl border border-emerald-500/20 bg-slate-950/80 p-6 text-sm text-emerald-100/80 shadow-[0_35px_60px_-30px_rgba(16,185,129,0.45)] sm:p-8">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">
          {order.toString().padStart(2, "0")} / {total.toString().padStart(2, "0")} · {highlight.period}
        </p>
        <h3 className="mt-4 text-3xl font-semibold text-emerald-50 sm:text-4xl">{highlight.title}</h3>
        <p className="mt-3 text-base text-emerald-100/85 sm:text-lg">{highlight.summary}</p>
        <p className="mt-4 leading-relaxed text-emerald-100/75">{highlight.description}</p>
      </div>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {highlight.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-wide text-emerald-100/80"
            >
              #{tag}
            </span>
          ))}
        </div>
        {highlight.upcoming && (
          <p className="rounded-xl border border-dashed border-emerald-500/30 bg-emerald-900/50 p-3 text-xs text-emerald-100/70">
            <strong className="mr-1 text-emerald-200">Upcoming:</strong>
            {highlight.upcoming}
          </p>
        )}
        {highlight.cta && (
          <a
            href={highlight.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-400/85 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
          >
            {highlight.cta.label}
            <span aria-hidden>↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
