'use client';
import { useState } from 'react';
import { highlights } from '@/data/highlights';

const COLORS = [
  'bg-gray-200 dark:bg-gray-700',
  'bg-green-200 dark:bg-green-700',
  'bg-green-300 dark:bg-green-600',
  'bg-green-400 dark:bg-green-500',
  'bg-green-500 dark:bg-green-400',
];

type Cell = {
  level: number;
  title?: string;
  description?: string;
  link?: string;
};

export default function HighlightGrid() {
  const [active, setActive] = useState<Cell | null>(null);

  const TOTAL = 53 * 7;
  const cells: Cell[] = Array.from({ length: TOTAL }, (_, i) => {
    const h = highlights.find((hl) => hl.index === i);
    return h ? h : { level: 0 };
  });

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
      <div className="grid grid-flow-col grid-rows-7 gap-1">
        {cells.map((cell, i) => (
          <button
            key={i}
            onClick={() => cell.title && setActive(cell)}
            aria-label={cell.title ? cell.title : `Cell ${i}`}
            className={`h-3 w-3 sm:h-4 sm:w-4 rounded ${COLORS[cell.level]}`}
          />
        ))}
      </div>
    </div>
  );
}
