'use client';

import React from 'react';

export interface ActivityItem {
  id: string;
  type: 'solve' | 'submit' | 'join';
  title: string;
  subtitle: string;
  timestamp: string;
}

export interface RecentActivityFeedProps {
  activities?: ActivityItem[];
  className?: string;
}

const DEFAULT_ACTIVITIES: ActivityItem[] = [
  { id: '1', type: 'solve', title: 'Problem solved', subtitle: 'Pattern Forge', timestamp: '10:21 PM' },
  { id: '2', type: 'submit', title: 'Code submitted', subtitle: 'Pattern Forge', timestamp: '10:18 PM' },
  { id: '3', type: 'join', title: 'Joined the event', subtitle: 'Welcome to Code-O-Fiesta!', timestamp: '10:05 PM' },
];

export default function RecentActivityFeed({
  activities = DEFAULT_ACTIVITIES,
  className = '',
}: RecentActivityFeedProps) {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'solve':
        return (
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-xs">
            ✓
          </div>
        );
      case 'submit':
        return (
          <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center text-xs font-mono font-bold">
            &lt;/&gt;
          </div>
        );
      case 'join':
      default:
        return (
          <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center text-xs">
            ★
          </div>
        );
    }
  };

  return (
    <div className={`bg-[#0d0e24] border border-[#1e224d] rounded-xl p-5 shadow-sm flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-between border-b border-[#141738] pb-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
          Recent Activity
        </h3>
        <button className="text-[10px] font-mono font-bold text-purple-300 hover:text-white transition-colors uppercase">
          VIEW ALL
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {activities.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2.5 rounded-lg bg-[#121433] border border-[#1e224d]"
          >
            <div className="flex items-center gap-3">
              {getActivityIcon(item.type)}
              <div className="flex flex-col">
                <span className="text-xs font-mono font-bold text-white">
                  {item.title}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {item.subtitle}
                </span>
              </div>
            </div>

            <span className="text-[10px] font-mono text-slate-500 shrink-0">
              {item.timestamp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
