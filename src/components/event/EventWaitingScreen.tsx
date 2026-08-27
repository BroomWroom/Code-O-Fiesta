'use client';

import React from 'react';
import CountdownTimer from '@/components/timer/CountdownTimer';

export interface EventWaitingScreenProps {
  title?: string;
  subtitle?: string;
  workshopName?: string;
  endsAt: string | number | null;
  onExpire?: () => void;
  note?: string;
  className?: string;
}

export default function EventWaitingScreen({
  title = 'KICKOFF WORKSHOP',
  subtitle = 'Event Starting Soon',
  workshopName = 'Competitive Programming Fundamentals',
  endsAt,
  onExpire,
  note = 'Please remain on this page. Round 1 unlocks automatically when the workshop ends.',
  className = '',
}: EventWaitingScreenProps) {
  return (
    <div
      className={`relative bg-gradient-to-br from-[#0d0e26] via-[#101230] to-[#08091a] border border-purple-900/40 rounded-xl p-8 sm:p-12 overflow-hidden shadow-2xl flex flex-col items-center text-center gap-6 ${className}`}
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-400">
          {subtitle}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">{title}</h1>
      </div>

      <div className="relative z-10">
        <CountdownTimer endAt={endsAt} size="lg" onExpire={onExpire} />
      </div>

      <div className="relative z-10 w-full max-w-sm bg-[#0d0e24]/80 border border-[#1e224d] rounded-lg p-4">
        <p className="text-[10px] font-mono text-cyan-400 font-bold uppercase mb-1">Workshop</p>
        <p className="text-sm font-semibold text-white">{workshopName}</p>
      </div>

      <p className="relative z-10 text-[11px] font-mono text-slate-400 max-w-sm">{note}</p>
    </div>
  );
}
