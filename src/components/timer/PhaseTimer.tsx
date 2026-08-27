'use client';

import React from 'react';
import CountdownTimer from './CountdownTimer';

export interface PhaseTimerProps {
  startedAt?: string | number | null;
  endsAt: string | number | null;
  activeMemberLabel?: string;
  onExpire?: () => void;
  paused?: boolean;
  locked?: boolean;
  className?: string;
}

export default function PhaseTimer({
  startedAt = null,
  endsAt,
  activeMemberLabel,
  onExpire,
  paused = false,
  locked = false,
  className = '',
}: PhaseTimerProps) {
  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`}>
      {activeMemberLabel && (
        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
          {activeMemberLabel} ACTIVE
        </span>
      )}
      <CountdownTimer
        endAt={endsAt}
        startAt={startedAt}
        label="PHASE TIME"
        size="md"
        onExpire={onExpire}
        paused={paused}
        locked={locked}
      />
    </div>
  );
}
