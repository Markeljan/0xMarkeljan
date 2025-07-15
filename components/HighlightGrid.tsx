'use client';
import { useState } from 'react';
import { highlights, Highlight } from '@/data/highlights';

const COLORS = [
  'bg-gray-200 dark:bg-gray-700',
  'bg-green-200 dark:bg-green-700',
  'bg-green-300 dark:bg-green-600',
  'bg-green-400 dark:bg-green-500',
  'bg-green-500 dark:bg-green-400',
];

export default function HighlightGrid() {
  const [active, setActive] = useState<Highlight | null>(null);

  return (
    <div className="relative">
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="max-w-md rounded bg-white p-6 shadow dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-2 text-xl font-bold">{active.title}</h2>
            <p className="mb-4 whitespace-pre-line">{active.description}</p>
            {active.link && (
              <a
                href={active.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {active.link}
              </a>
            )}
          </div>
        </div>
      )}
      <div className="grid grid-cols-7 gap-1">
        {highlights.map((h, i) => (
          <button
            key={i}
            onClick={() => setActive(h)}
            aria-label={h.title}
            className={`h-4 w-4 sm:h-6 sm:w-6 rounded ${COLORS[h.level]}`}
          />
        ))}
      </div>
    </div>
  );
}
