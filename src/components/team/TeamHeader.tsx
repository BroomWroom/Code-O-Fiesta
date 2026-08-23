'use client';

import React from 'react';

export interface TeamHeaderProps {
  teamName: string;
  teamId?: string;
  score?: number;
  memberCount?: number;
  statusBadge?: React.ReactNode;
  className?: string;
}

export default function TeamHeader({
  teamName,
  teamId,
  score,
  memberCount,
  statusBadge,
  className = '',
}: TeamHeaderProps) {
  return (
    <div className={`bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 shadow-sm flex items-center justify-between gap-4 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[var(--accent-subtle)] border border-[var(--accent-border)] flex items-center justify-center font-mono font-bold text-[var(--accent)] text-lg">
          {teamName.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[var(--text-primary)]">{teamName}</h2>
            {statusBadge}
          </div>
          {teamId && (
            <span className="text-xs font-mono text-[var(--text-muted)]">
              ID: {teamId} {memberCount !== undefined ? `• ${memberCount} Members` : ''}
            </span>
          )}
        </div>
      </div>

      {score !== undefined && (
        <div className="flex flex-col items-end bg-[var(--surface-secondary)] px-3.5 py-1.5 rounded-md border border-[var(--border-subtle)]">
          <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider">
            Total Points
          </span>
          <span className="text-lg font-mono font-extrabold text-[var(--accent)]">
            {score}
          </span>
        </div>
      )}
    </div>
  );
}
