'use client';

import React from 'react';

export type TeamMemberState = 'active' | 'inactive' | 'locked' | 'waiting';

export interface TeamMember {
  id: string;
  name: string;
  role?: string;
  state?: TeamMemberState;
  isCurrentDriver?: boolean;
}

export interface TeamMembersProps {
  members: TeamMember[];
  title?: string;
  className?: string;
}

export default function TeamMembers({
  members,
  title = "Team Members",
  className = '',
}: TeamMembersProps) {
  const getMemberDot = (state?: TeamMemberState) => {
    switch (state) {
      case 'active':
        return 'bg-emerald-400 animate-pulse';
      case 'waiting':
        return 'bg-cyan-400';
      case 'locked':
        return 'bg-slate-500';
      case 'inactive':
      default:
        return 'bg-slate-600';
    }
  };

  return (
    <div className={`bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 shadow-sm flex flex-col gap-3 ${className}`}>
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]">
          {title} ({members.length})
        </h3>
      </div>

      <div className="flex flex-col gap-2">
        {members.map((member) => (
          <div
            key={member.id}
            className={`flex items-center justify-between p-2.5 rounded-md border transition-colors ${
              member.isCurrentDriver
                ? 'bg-cyan-500/10 border-cyan-500/40 text-[var(--text-primary)]'
                : 'bg-[var(--surface-secondary)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className={`w-2 h-2 rounded-full ${getMemberDot(member.state)}`} />
              <span className="text-sm font-semibold">{member.name}</span>
            </div>

            <div className="flex items-center gap-2">
              {member.role && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                  {member.role}
                </span>
              )}
              {member.isCurrentDriver && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                  ACTIVE DRIVER
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
