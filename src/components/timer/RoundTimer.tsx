'use client';

import React from 'react';
import CountdownTimer from './CountdownTimer';

export interface RoundTimerProps {
  startedAt?: string | number | null;
  endsAt: string | number | null;
  label?: string;
  onExpire?: () => void;
  locked?: boolean;
  className?: string;
}

export default function RoundTimer({
  startedAt = null,
  endsAt,
  label = 'ROUND TIME REMAINING',
  onExpire,
  locked = false,
  className = '',
}: RoundTimerProps) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <CountdownTimer
        endAt={endsAt}
        startAt={startedAt}
        label={label}
        size="lg"
        onExpire={onExpire}
        locked={locked}
      />
    </div>
  );
}
