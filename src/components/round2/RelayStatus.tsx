import React from 'react';

interface RelayStatusProps {
  activeTeamMember: 'member1' | 'member2';
  timeLeftSeconds: number;
}

export default function RelayStatus({ activeTeamMember, timeLeftSeconds }: RelayStatusProps) {
  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentLabel = activeTeamMember === 'member1' ? 'Member 1 (15m)' : 'Member 2 (25m)';
  
  return (
    <div className="flex flex-col gap-2.5 p-4 rounded-xl bg-[#080814] border border-[#1e1e3a] shadow-[0_0_15px_rgba(6,182,212,0.15)]">
      <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
        Relay Configuration
      </div>
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-slate-400 font-mono">Current Driver:</span>
        <span className="text-xs font-bold text-white font-mono">{currentLabel}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-400 font-mono">Turn Time Left:</span>
        <span className={`text-base font-bold font-mono ${timeLeftSeconds < 60 ? 'text-red-400 animate-pulse' : 'text-purple-400'}`}>
          {formatTime(timeLeftSeconds)}
        </span>
      </div>
    </div>
  );
}
