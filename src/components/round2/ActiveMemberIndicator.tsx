import React from 'react';

interface ActiveMemberIndicatorProps {
  activeTeamMember?: 'member1' | 'member2';
}

export default function ActiveMemberIndicator({ activeTeamMember = 'member1' }: ActiveMemberIndicatorProps) {
  const memberLabel = activeTeamMember === 'member1' ? 'Member 1' : 'Member 2';
  
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d0e24] border border-purple-500/20 text-xs font-semibold tracking-wider font-mono text-purple-300">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
      </span>
      <span>{memberLabel} Active</span>
    </div>
  );
}
