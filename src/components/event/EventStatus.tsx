'use client';

import React from 'react';

export type EventStatusType =
  | 'UPCOMING'
  | 'READY'
  | 'ACTIVE'
  | 'PAUSED'
  | 'COMPLETED'
  | 'LOCKED'
  | 'EXPIRED'
  | 'ERROR';

export interface EventStatusProps {
  status: EventStatusType;
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function EventStatus({
  status,
  label,
  className = '',
  size = 'md',
}: EventStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'ACTIVE':
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/30',
          text: 'text-emerald-400',
          dot: 'bg-emerald-400 animate-pulse',
          defaultLabel: 'Active',
        };
      case 'READY':
        return {
          bg: 'bg-cyan-500/10',
          border: 'border-cyan-500/30',
          text: 'text-cyan-400',
          dot: 'bg-cyan-400',
          defaultLabel: 'Ready',
        };
      case 'UPCOMING':
        return {
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          dot: 'bg-blue-400',
          defaultLabel: 'Upcoming',
        };
      case 'PAUSED':
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          text: 'text-amber-400',
          dot: 'bg-amber-400',
          defaultLabel: 'Paused',
        };
      case 'COMPLETED':
        return {
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/30',
          text: 'text-purple-400',
          dot: 'bg-purple-400',
          defaultLabel: 'Completed',
        };
      case 'LOCKED':
        return {
          bg: 'bg-slate-800',
          border: 'border-slate-700',
          text: 'text-slate-400',
          dot: 'bg-slate-500',
          defaultLabel: 'Locked',
        };
      case 'EXPIRED':
        return {
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/30',
          text: 'text-orange-400',
          dot: 'bg-orange-400',
          defaultLabel: 'Expired',
        };
      case 'ERROR':
      default:
        return {
          bg: 'bg-rose-500/10',
          border: 'border-rose-500/30',
          text: 'text-rose-400',
          dot: 'bg-rose-400',
          defaultLabel: 'Error',
        };
    }
  };

  const config = getStatusConfig();
  const displayLabel = label || config.defaultLabel;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2',
    lg: 'text-sm px-3.5 py-1.5 gap-2.5',
  }[size];

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded-full border ${config.bg} ${config.border} ${config.text} ${sizeClasses} ${className}`}
    >
      <span className={`rounded-full w-1.5 h-1.5 ${config.dot}`} />
      {displayLabel}
    </span>
  );
}
