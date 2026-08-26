'use client';

import React, { useEffect, useRef, useState } from 'react';

export type TimerVisualState = 'NORMAL' | 'WARNING' | 'CRITICAL' | 'EXPIRED' | 'PAUSED' | 'LOCKED';

export interface CountdownTimerProps {
  endAt: string | number | null;
  startAt?: string | number | null;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  paused?: boolean;
  locked?: boolean;
  onExpire?: () => void;
  className?: string;
}

const WARNING_THRESHOLD_MS = 5 * 60 * 1000;
const CRITICAL_THRESHOLD_MS = 60 * 1000;

function toMs(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  return typeof value === 'number' ? value : new Date(value).getTime();
}

function splitDuration(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

const pad2 = (n: number) => n.toString().padStart(2, '0');

const STATE_RING_COLOR: Record<TimerVisualState, string> = {
  NORMAL: '#8b5cf6',
  WARNING: '#f59e0b',
  CRITICAL: '#f43f5e',
  EXPIRED: '#64748b',
  PAUSED: '#64748b',
  LOCKED: '#64748b',
};

const STATE_TEXT_CLASS: Record<TimerVisualState, string> = {
  NORMAL: 'text-white',
  WARNING: 'text-amber-400',
  CRITICAL: 'text-rose-400 animate-pulse',
  EXPIRED: 'text-[var(--text-muted)]',
  PAUSED: 'text-[var(--text-secondary)]',
  LOCKED: 'text-[var(--text-muted)]',
};

const SIZE_CONFIG: Record<'sm' | 'md' | 'lg', { wrapper: string; digit: string; seconds: string; label: string; ring: number }> = {
  sm: { wrapper: 'w-28 h-28', digit: 'text-lg', seconds: 'text-[10px]', label: 'text-[8px]', ring: 8 },
  md: { wrapper: 'w-40 h-40', digit: 'text-2xl', seconds: 'text-xs', label: 'text-[9px]', ring: 9 },
  lg: { wrapper: 'w-56 h-56', digit: 'text-4xl', seconds: 'text-base', label: 'text-[10px]', ring: 10 },
};

const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CountdownTimer({
  endAt,
  startAt = null,
  label,
  size = 'md',
  paused = false,
  locked = false,
  onExpire,
  className = '',
}: CountdownTimerProps) {
  const endMs = toMs(endAt);
  const startMs = toMs(startAt);
  // Starts at 0 rather than computing from Date.now() here — that read must
  // happen client-side only (in the effect below), otherwise it runs once
  // during server rendering and again during hydration with a different
  // timestamp, producing a hydration mismatch.
  const [remainingMs, setRemainingMs] = useState<number>(0);
  const hasFiredExpireRef = useRef(false);

  useEffect(() => {
    hasFiredExpireRef.current = false;
  }, [endMs]);

  useEffect(() => {
    if (endMs === null || paused || locked) return;

    const tick = () => setRemainingMs(endMs - Date.now());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [endMs, paused, locked]);

  useEffect(() => {
    if (endMs !== null && remainingMs <= 0 && !hasFiredExpireRef.current) {
      hasFiredExpireRef.current = true;
      onExpire?.();
    }
  }, [remainingMs, endMs, onExpire]);

  const visualState: TimerVisualState = locked
    ? 'LOCKED'
    : paused
    ? 'PAUSED'
    : endMs === null
    ? 'NORMAL'
    : remainingMs <= 0
    ? 'EXPIRED'
    : remainingMs <= CRITICAL_THRESHOLD_MS
    ? 'CRITICAL'
    : remainingMs <= WARNING_THRESHOLD_MS
    ? 'WARNING'
    : 'NORMAL';

  const totalMs = startMs !== null && endMs !== null ? endMs - startMs : null;
  const progress = totalMs && totalMs > 0 ? Math.min(1, Math.max(0, remainingMs / totalMs)) : 1;

  const ringColor = STATE_RING_COLOR[visualState];
  const textClass = STATE_TEXT_CLASS[visualState];
  const sizeConfig = SIZE_CONFIG[size];

  const isBlank = visualState === 'LOCKED' || endMs === null;
  const { hours, minutes, seconds } = splitDuration(remainingMs);
  const fullText = isBlank ? '--:--:--' : `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;

  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {label && (
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--text-muted)]">
          {label}
        </span>
      )}

      <div className={`relative ${sizeConfig.wrapper}`} role="timer" aria-live="polite" aria-label={fullText}>
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            stroke="var(--surface-secondary)"
            strokeWidth={sizeConfig.ring}
          />
          {!isBlank && (
            <circle
              cx="100"
              cy="100"
              r={RADIUS}
              fill="none"
              stroke={ringColor}
              strokeWidth={sizeConfig.ring}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              className="transition-[stroke-dashoffset] duration-1000 ease-linear"
              style={{ filter: `drop-shadow(0 0 6px ${ringColor}aa)` }}
            />
          )}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          <div className="flex items-baseline gap-2.5">
            <span className={`font-mono font-extrabold tabular-nums ${sizeConfig.digit} ${textClass}`}>
              {isBlank ? '--' : pad2(hours)}
            </span>
            <span className={`font-mono font-extrabold ${sizeConfig.digit} ${textClass}`}>:</span>
            <span className={`font-mono font-extrabold tabular-nums ${sizeConfig.digit} ${textClass}`}>
              {isBlank ? '--' : pad2(minutes)}
            </span>
          </div>
          <span className={`font-mono font-bold tabular-nums ${sizeConfig.seconds} ${textClass} opacity-80`}>
            {isBlank ? '--' : pad2(seconds)}
          </span>
        </div>
      </div>

      <div className={`flex gap-6 font-mono font-bold uppercase tracking-widest text-[var(--text-muted)] ${sizeConfig.label}`}>
        <span className="w-8 text-center">Hrs</span>
        <span className="w-8 text-center">Min</span>
      </div>

      {visualState === 'LOCKED' && (
        <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase">Locked</span>
      )}
    </div>
  );
}
