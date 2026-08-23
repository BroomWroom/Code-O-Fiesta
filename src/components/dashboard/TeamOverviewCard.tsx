'use client';

import React from 'react';

export interface TeamOverviewCardProps {
  teamId?: string;
  joinedAt?: string;
  rank?: string;
  activityStatus?: string;
  className?: string;
}

export default function TeamOverviewCard({
  teamId = 'TEAM_014',
  joinedAt = '10:05:21 PM',
  rank = '—',
  activityStatus = 'ACTIVE NOW',
  className = '',
}: TeamOverviewCardProps) {
  return (
    <div className={`bg-[#0d0e24] border border-[#1e224d] rounded-xl p-5 shadow-sm flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-between border-b border-[#141738] pb-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Team Overview
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">TEAM ID</span>
          <span className="text-xs font-mono font-extrabold text-white">{teamId}</span>
        </div>

        <div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">JOINED AT</span>
          <span className="text-xs font-mono font-semibold text-slate-300">{joinedAt}</span>
        </div>

        <div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">TEAM RANK</span>
          <span className="text-xs font-mono font-bold text-purple-300">{rank}</span>
        </div>

        <div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">LAST ACTIVITY</span>
          <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {activityStatus}
          </span>
        </div>
      </div>
    </div>
  );
}
