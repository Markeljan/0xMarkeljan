"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { TouchEvent, WheelEvent } from "react";
import ContributionHeatmap from "./ContributionHeatmap";
import { highlights as highlightData, type Highlight } from "@/data/highlights";

export default function JourneyExperience() {
  const timeline = useMemo(() => {
    return [...highlightData].sort((a, b) => a.sequence - b.sequence);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollLockRef = useRef(false);
  const releaseTimeoutRef = useRef<number | null>(null);
  const touchStartRef = useRef<number | null>(null);

  const activeHighlight = timeline[activeIndex];

  const releaseScroll = useCallback(() => {
    if (releaseTimeoutRef.current) {
      window.clearTimeout(releaseTimeoutRef.current);
    }
    releaseTimeoutRef.current = window.setTimeout(() => {
      scrollLockRef.current = false;
      releaseTimeoutRef.current = null;
    }, 450);
  }, []);

  const stepThroughTimeline = useCallback(
    (direction: "next" | "prev") => {
      if (!timeline.length) return false;

      let didChange = false;
      setActiveIndex((prev) => {
        const delta = direction === "next" ? 1 : -1;
        const next = Math.min(Math.max(prev + delta, 0), timeline.length - 1);
        if (next !== prev) {
          didChange = true;
        }
        return next;
      });

      return didChange;
    },
    [timeline.length]
  );

  const focusHighlight = useCallback(
    (id: string) => {
      const index = timeline.findIndex((item) => item.id === id);
      if (index !== -1) {
        setActiveIndex(index);
      }
    },
    [timeline]
  );

  const handleWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      if (scrollLockRef.current) return;

      const magnitude = Math.abs(event.deltaY);
      if (magnitude < 16) return;

      const direction = event.deltaY > 0 ? "next" : "prev";
      const changed = stepThroughTimeline(direction);

      if (changed) {
        scrollLockRef.current = true;
        event.preventDefault();
        releaseScroll();
      }
    },
    [releaseScroll, stepThroughTimeline]
  );

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) return;
    touchStartRef.current = event.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (scrollLockRef.current) return;
      if (event.touches.length !== 1) return;
      if (touchStartRef.current === null) return;

      const currentY = event.touches[0].clientY;
      const diff = touchStartRef.current - currentY;

      if (Math.abs(diff) < 35) return;

      const direction = diff > 0 ? "next" : "prev";
      const changed = stepThroughTimeline(direction);

      if (changed) {
        scrollLockRef.current = true;
        event.preventDefault();
        touchStartRef.current = currentY;
        releaseScroll();
      }
    },
    [releaseScroll, stepThroughTimeline]
  );

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      if (releaseTimeoutRef.current) {
        window.clearTimeout(releaseTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        const changed = stepThroughTimeline("next");
        if (changed) {
          event.preventDefault();
        }
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        const changed = stepThroughTimeline("prev");
        if (changed) {
          event.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [stepThroughTimeline]);

  return (
    <section className="relative mt-16 rounded-3xl border border-emerald-500/20 bg-emerald-950/40 p-6 shadow-[0_25px_60px_-25px_rgba(16,185,129,0.45)] backdrop-blur lg:mt-24">
      <div
        className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="presentation"
      >
        <div className="flex flex-col gap-8">
          <header className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">Contribution navigator</p>
            <h2 className="text-3xl font-semibold text-emerald-50 sm:text-4xl">Zoom into each highlight</h2>
            <p className="text-sm text-emerald-100/80 sm:text-base">
              Scroll, swipe, or use your arrow keys to move through the journey. Tap any tile to jump straight to its story.
            </p>
          </header>
          <ContributionHeatmap
            highlights={timeline}
            activeId={activeHighlight?.id ?? null}
            onHover={focusHighlight}
            onSelect={focusHighlight}
          />
        </div>
        <HighlightDetail
          highlight={activeHighlight}
          index={activeIndex}
          total={timeline.length}
        />
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
    <aside className="flex h-full flex-col gap-6 rounded-2xl border border-emerald-500/25 bg-slate-950/60 p-6 text-sm text-emerald-100/80 shadow-[0_35px_60px_-30px_rgba(16,185,129,0.45)]">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">
          {order.toString().padStart(2, "0")} / {total.toString().padStart(2, "0")} · {highlight.period}
        </p>
        <h3 className="mt-4 text-3xl font-semibold text-emerald-50 sm:text-4xl">{highlight.title}</h3>
        <p className="mt-3 text-base text-emerald-100/85 sm:text-lg">{highlight.summary}</p>
        <p className="mt-4 leading-relaxed text-emerald-100/75">{highlight.description}</p>
      </div>
      <div className="mt-auto space-y-4">
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
    </aside>
  );
}
