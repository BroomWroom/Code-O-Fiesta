'use client';

import React from 'react';
import Link from 'next/link';

interface ProblemNavigationProps {
  roundNumber: 1 | 2 | 3;
  prevProblemId: string | null;
  nextProblemId: string | null;
  currentProblemIndex?: number;
  totalProblems?: number;
  onNavigate?: (id: string) => void;
}

export default function ProblemNavigation({
  roundNumber,
  prevProblemId,
  nextProblemId,
  currentProblemIndex = 1,
  totalProblems = 3,
  onNavigate,
}: ProblemNavigationProps) {
  // Only shown when roundNumber === 1
  if (roundNumber !== 1) return null;

  return (
    <div className="flex flex-col gap-3 px-4 py-3 border-t border-[var(--border)] bg-[#080814] select-none font-mono">
      <div className="flex items-center justify-between">
        {/* Previous Button */}
        {prevProblemId && onNavigate ? (
          <button
            onClick={() => onNavigate(prevProblemId)}
            type="button"
            className="px-3 py-1.5 text-xs text-purple-400 hover:text-purple-300 bg-[#0a0a18] border border-purple-500/20 hover:border-purple-500/40 rounded transition-colors cursor-pointer"
          >
            ← Previous Problem
          </button>
        ) : (
          <button
            disabled
            type="button"
            className="px-3 py-1.5 text-xs text-slate-600 bg-[#0a0a18]/40 border border-[var(--border-subtle)] rounded cursor-not-allowed"
          >
            ← Previous Problem
          </button>
        )}

        {/* Counter */}
        <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold">
          Problem {currentProblemIndex} of {totalProblems}
        </span>

        {/* Next Button */}
        {nextProblemId && onNavigate ? (
          <button
            onClick={() => onNavigate(nextProblemId)}
            type="button"
            className="px-3 py-1.5 text-xs text-purple-400 hover:text-purple-300 bg-[#0a0a18] border border-purple-500/20 hover:border-purple-500/40 rounded transition-colors cursor-pointer"
          >
            Next Problem →
          </button>
        ) : (
          <button
            disabled
            type="button"
            className="px-3 py-1.5 text-xs text-slate-600 bg-[#0a0a18]/40 border border-[var(--border-subtle)] rounded cursor-not-allowed"
          >
            Next Problem →
          </button>
        )}
      </div>

      {/* Back link */}
      <div className="flex justify-center mt-1">
        <Link
          href="/round-1/maze"
          className="text-[10px] font-bold text-[var(--text-secondary)] hover:text-purple-400 uppercase tracking-wider underline transition-colors"
        >
          All Problems (Maze Dashboard)
        </Link>
      </div>
    </div>
  );
}
