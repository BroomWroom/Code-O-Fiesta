'use client';

import React from 'react';

export interface RoundProgressPanelProps {
  overallPercentage?: number;
  completedCount?: number;
  totalCount?: number;
  timeElapsed?: string;
  className?: string;
}

export default function RoundProgressPanel({
  overallPercentage = 12,
  completedCount = 1,
  totalCount = 8,
  timeElapsed = '01:17:42',
  className = '',
}: RoundProgressPanelProps) {
  return (
    <div className={`bg-[#0d0e24] border border-[#1e224d] rounded-xl p-5 shadow-sm flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-between border-b border-[#141738] pb-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
          Round Progress
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
            OVERALL PROGRESS
          </span>
          <span className="text-xl font-mono font-black text-purple-400">
            {overallPercentage}%
          </span>
        </div>

        <div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
            COMPLETED
          </span>
          <span className="text-base font-mono font-extrabold text-white">
            {completedCount} / {totalCount}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
            TIME ELAPSED
          </span>
          <span className="text-base font-mono font-bold text-cyan-400">
            {timeElapsed}
          </span>
        </div>
      </div>

      {/* Main Overall Progress Bar */}
      <div className="w-full h-2 rounded-full bg-[#181a3e] overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
          style={{ width: `${overallPercentage}%` }}
        />
      </div>

      {/* Round Breakdown Progress Bars Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div>
          <div className="flex justify-between text-[10px] font-mono mb-1">
            <span className="text-slate-400">ROUND 01</span>
            <span className="text-purple-300">1 / 3</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#181a3e] overflow-hidden">
            <div className="h-full bg-purple-500 w-1/3" />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[10px] font-mono mb-1">
            <span className="text-slate-400">ROUND 02</span>
            <span className="text-slate-500">0 / 3</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#181a3e] overflow-hidden">
            <div className="h-full bg-cyan-500 w-0" />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[10px] font-mono mb-1">
            <span className="text-slate-400">ROUND 03</span>
            <span className="text-slate-500">0 / 3</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#181a3e] overflow-hidden">
            <div className="h-full bg-amber-500 w-0" />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[10px] font-mono mb-1">
            <span className="text-slate-400">BONUS</span>
            <span className="text-slate-500">0 / 2</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#181a3e] overflow-hidden">
            <div className="h-full bg-rose-500 w-0" />
          </div>
        </div>
      </div>

      <p className="text-[11px] font-mono text-purple-300">
        Keep it up! The arena awaits.
      </p>
    </div>
  );
}
