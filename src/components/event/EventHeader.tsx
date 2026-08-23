'use client';

import React from 'react';

export interface EventHeaderProps {
  eventName?: string;
  teamName?: string;
  members?: string[];
  currentRound?: string;
  currentPhase?: string;
  roundTimeRemaining?: string;
  teamScore?: number;
  statusBadge?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export default function EventHeader({
  eventName = "VITC CODE-O-FIESTA",
  teamName,
  members = [],
  currentRound,
  currentPhase,
  roundTimeRemaining,
  teamScore,
  statusBadge,
  actions,
  className = '',
}: EventHeaderProps) {
  return (
    <div className={`w-full py-3 px-4 sm:px-6 bg-[var(--surface)] text-[var(--text-primary)] border-b border-[var(--border)] ${className}`}>
      <div className="max-w-[var(--content-max-width)] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left Section: Event Identity & Current Round */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-sm tracking-wider uppercase bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {eventName}
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[var(--surface-secondary)] text-[var(--text-muted)] border border-[var(--border)]">
              Freshers&apos; Edition
            </span>
            {statusBadge}
          </div>

          {(currentRound || currentPhase) && (
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)]">
              {currentRound && <span className="text-[var(--text-primary)]">{currentRound}</span>}
              {currentRound && currentPhase && <span className="text-[var(--text-muted)]">•</span>}
              {currentPhase && <span className="text-[var(--accent)] font-mono uppercase">{currentPhase}</span>}
            </div>
          )}
        </div>

        {/* Right Section: Team Info, Timer & Score */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Team identity */}
          {teamName && (
            <div className="flex flex-col text-right md:text-left">
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wide flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Team
              </span>
              <span className="text-sm font-bold text-[var(--text-primary)]">{teamName}</span>
              {members.length > 0 && (
                <span className="text-[11px] text-[var(--text-muted)] truncate max-w-[200px]">
                  {members.join(' • ')}
                </span>
              )}
            </div>
          )}

          {/* Time remaining readout */}
          {roundTimeRemaining !== undefined && (
            <div className="flex flex-col items-center bg-[var(--surface-secondary)] px-3 py-1.5 rounded border border-[var(--border)] min-w-[90px]">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1">
                <svg className="w-3 h-3 text-[var(--warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Time Left
              </span>
              <span className="text-sm font-mono font-bold text-[var(--warning)] tracking-wider">
                {roundTimeRemaining}
              </span>
            </div>
          )}

          {/* Score Badge */}
          {teamScore !== undefined && (
            <div className="flex flex-col items-center bg-[var(--surface-secondary)] px-3 py-1.5 rounded border border-[var(--border-subtle)] min-w-[80px]">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                Score
              </span>
              <span className="text-sm font-mono font-bold text-[var(--accent)]">
                {teamScore} pts
              </span>
            </div>
          )}

          {actions}
        </div>
      </div>
    </div>
  );
}
