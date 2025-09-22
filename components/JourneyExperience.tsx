"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ContributionHeatmap from "./ContributionHeatmap";
import { highlights as highlightData, type Highlight } from "@/data/highlights";

export default function JourneyExperience() {
  const timeline = useMemo(() => {
    return [...highlightData].sort((a, b) => a.sequence - b.sequence);
  }, []);

  const [activeId, setActiveId] = useState<string | null>(timeline[0]?.id ?? null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const manualSelectionRef = useRef(false);
  const manualTimeoutRef = useRef<number | null>(null);

  const registerSection = useCallback(
    (id: string) => (node: HTMLElement | null) => {
      sectionRefs.current[id] = node;
      if (node && observerRef.current) {
        observerRef.current.observe(node);
      }
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (manualSelectionRef.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0]?.target.getAttribute("data-highlight-id");
        if (top) {
          setActiveId((prev) => (prev === top ? prev : top));
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-35% 0px -45% 0px",
      }
    );

    observerRef.current = observer;

    timeline.forEach((highlight) => {
      const node = sectionRefs.current[highlight.id];
      if (node) observer.observe(node);
    });

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [timeline]);

  useEffect(() => {
    return () => {
      if (manualTimeoutRef.current) {
        window.clearTimeout(manualTimeoutRef.current);
      }
    };
  }, []);

  const activeHighlight = useMemo(() => {
    return timeline.find((item) => item.id === activeId) ?? timeline[0];
  }, [timeline, activeId]);

  const previewHighlight = useCallback((id: string) => {
    setActiveId((prev) => (prev === id ? prev : id));
  }, []);

  const jumpToHighlight = useCallback((id: string) => {
    manualSelectionRef.current = true;
    setActiveId(id);

    if (manualTimeoutRef.current) {
      window.clearTimeout(manualTimeoutRef.current);
    }

    manualTimeoutRef.current = window.setTimeout(() => {
      manualSelectionRef.current = false;
    }, 800);

    const target = sectionRefs.current[id];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <section className="relative mt-16 flex flex-col gap-12 lg:mt-24 lg:grid lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.2fr)] lg:gap-16">
      <div className="relative space-y-16 lg:space-y-20">
        <div
          aria-hidden
          className="absolute -left-6 top-0 hidden h-full w-px bg-gradient-to-b from-emerald-500/0 via-emerald-500/60 to-emerald-500/0 lg:block"
        />
        {timeline.map((highlight) => {
          const isActive = activeHighlight?.id === highlight.id;

          return (
            <article
              key={highlight.id}
              ref={registerSection(highlight.id)}
              data-highlight-id={highlight.id}
              tabIndex={0}
              onFocus={() => previewHighlight(highlight.id)}
              onMouseEnter={() => previewHighlight(highlight.id)}
              className={`scroll-mt-28 rounded-3xl border px-6 py-8 transition-all duration-300 ease-out backdrop-blur-sm sm:px-8 sm:py-10 ${
                isActive
                  ? "border-emerald-400/70 bg-emerald-400/10 shadow-lg shadow-emerald-500/20"
                  : "border-white/10 bg-white/5 hover:border-emerald-400/40 hover:bg-emerald-400/5"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
                  {highlight.period}
                </span>
                <span className="text-xs font-medium text-emerald-200/60">
                  {highlight.tags[0]}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-emerald-50 sm:text-3xl">
                {highlight.title}
              </h3>
              <p className="mt-4 text-base text-emerald-100/80 sm:text-lg">
                {highlight.summary}
              </p>
              <p className="mt-3 text-sm text-emerald-100/70 sm:text-base">
                {highlight.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {highlight.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-wide text-emerald-100/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {highlight.upcoming && (
                <div className="mt-6 rounded-2xl border border-dashed border-emerald-400/30 bg-emerald-900/40 p-4 text-xs text-emerald-100/70">
                  <strong className="block text-emerald-200">Next up:</strong>
                  {highlight.upcoming}
                </div>
              )}
              {highlight.cta && (
                <a
                  href={highlight.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-400/90 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
                  onClick={(event) => event.stopPropagation()}
                >
                  {highlight.cta.label}
                  <span aria-hidden>↗</span>
                </a>
              )}
            </article>
          );
        })}
      </div>

      <aside className="relative flex flex-col gap-6 rounded-3xl border border-emerald-500/20 bg-emerald-950/40 p-6 shadow-[0_25px_60px_-25px_rgba(16,185,129,0.45)] backdrop-blur">
        <ContributionHeatmap
          highlights={timeline}
          activeId={activeId}
          onHover={previewHighlight}
          onSelect={jumpToHighlight}
        />
        <HighlightDetail highlight={activeHighlight} />
      </aside>
    </section>
  );
}

type HighlightDetailProps = {
  highlight: Highlight | undefined;
};

function HighlightDetail({ highlight }: HighlightDetailProps) {
  if (!highlight) return null;

  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-slate-950/60 p-6 text-sm text-emerald-100/80">
      <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
        {highlight.period}
      </p>
      <h4 className="mt-3 text-2xl font-semibold text-emerald-50">{highlight.title}</h4>
      <p className="mt-2 text-base text-emerald-100/90">{highlight.summary}</p>
      <p className="mt-4 leading-relaxed text-emerald-100/80">{highlight.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
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
        <p className="mt-6 rounded-xl border border-dashed border-emerald-500/30 bg-emerald-900/50 p-3 text-xs text-emerald-100/70">
          <strong className="mr-1 text-emerald-200">Upcoming:</strong>
          {highlight.upcoming}
        </p>
      )}
      {highlight.cta && (
        <a
          href={highlight.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-400/80 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
        >
          {highlight.cta.label}
          <span aria-hidden>↗</span>
        </a>
      )}
    </div>
  );
}
