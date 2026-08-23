'use client';

import React from 'react';

export interface TimelineStep {
  id: string;
  name: string;
  subname: string;
  status: 'ACTIVE' | 'Locked' | 'Upcoming' | 'Completed';
  detail?: string;
}

export interface EventTimelineCardProps {
  steps?: TimelineStep[];
  className?: string;
}

const DEFAULT_TIMELINE: TimelineStep[] = [
  { id: '1', name: 'ROUND 01', subname: 'Maze of Fate', status: 'ACTIVE', detail: 'In Progress' },
  { id: '2', name: 'ROUND 02', subname: 'Blind Relay', status: 'Locked', detail: 'Locked' },
  { id: '3', name: 'ROUND 03', subname: 'Constraint Crucible', status: 'Locked', detail: 'Locked' },
  { id: '4', name: 'RESULTS', subname: 'Leaderboard', status: 'Upcoming', detail: 'Upcoming' },
];

export default function EventTimelineCard({
  steps = DEFAULT_TIMELINE,
  className = '',
}: EventTimelineCardProps) {
  return (
    <div className={`bg-[#0d0e24] border border-[#1e224d] rounded-xl p-5 shadow-sm flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-between border-b border-[#141738] pb-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
          Event Timeline
        </h3>
      </div>

      <div className="flex flex-col gap-4 relative pl-2">
        {/* Continuous timeline vertical line */}
        <div className="absolute left-[11px] top-2 bottom-4 w-0.5 bg-[#1e224d]" />

        {steps.map((step) => {
          const isActive = step.status === 'ACTIVE';
          const isCompleted = step.status === 'Completed';

          return (
            <div key={step.id} className="flex items-start justify-between gap-3 relative z-10">
              <div className="flex items-start gap-3">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    isActive
                      ? 'bg-purple-600 text-white ring-4 ring-purple-600/30'
                      : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-[#181a3e] border border-[#2b3068]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white animate-ping' : 'bg-slate-500'}`} />
                </span>

                <div className="flex flex-col">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {step.name} - {step.subname}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {step.detail}
                  </span>
                </div>
              </div>

              <span
                className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                  isActive
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40'
                    : 'bg-slate-800/60 text-slate-500'
                }`}
              >
                {step.status}
              </span>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-1 py-2 text-[11px] font-mono font-bold text-purple-300 hover:text-white rounded-lg bg-[#121433] hover:bg-[#1a1d42] border border-[#1e224d] transition-colors text-center">
        VIEW FULL TIMELINE →
      </button>
    </div>
  );
}
