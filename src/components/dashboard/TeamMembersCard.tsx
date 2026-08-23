'use client';

import React from 'react';

export interface TeamMember {
  id: string;
  name: string;
  isOnline: boolean;
}

export interface TeamMembersCardProps {
  members?: TeamMember[];
  className?: string;
}

const DEFAULT_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Member 01', isOnline: true },
  { id: '2', name: 'Member 02', isOnline: true },
];

export default function TeamMembersCard({
  members = DEFAULT_MEMBERS,
  className = '',
}: TeamMembersCardProps) {
  const onlineCount = members.filter((m) => m.isOnline).length;

  return (
    <div className={`bg-[#0d0e24] border border-[#1e224d] rounded-xl p-5 shadow-sm flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-between border-b border-[#141738] pb-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
          Team Members
        </h3>
        <span className="text-[10px] font-mono font-bold text-emerald-400">
          {onlineCount} / {members.length} ONLINE
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-3 rounded-lg bg-[#121433] border border-[#1e224d]"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1b1e4a] border border-purple-500/30 flex items-center justify-center text-slate-300 text-xs font-mono">
                👤
              </div>
              <span className="text-xs font-mono font-semibold text-white">{member.name}</span>
            </div>

            <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </span>
          </div>
        ))}
      </div>

      <button className="w-full mt-1 py-2 text-[11px] font-mono font-bold text-purple-300 hover:text-white rounded-lg bg-[#121433] hover:bg-[#1a1d42] border border-[#1e224d] transition-colors text-center">
        VIEW TEAM DETAILS →
      </button>
    </div>
  );
}
