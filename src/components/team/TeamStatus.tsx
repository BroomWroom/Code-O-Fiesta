'use client';

import React from 'react';

export type TeamStatusType =
  | 'READY'
  | 'ACTIVE'
  | 'WAITING'
  | 'COMPLETED'
  | 'LOCKED'
  | 'DISCONNECTED';

export interface TeamStatusProps {
  status: TeamStatusType;
  label?: string;
  className?: string;
}

export default function TeamStatus({
  status,
  label,
  className = '',
}: TeamStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'ACTIVE':
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/30',
          text: 'text-emerald-400',
          defaultLabel: 'Active',
        };
      case 'READY':
        return {
          bg: 'bg-cyan-500/10',
          border: 'border-cyan-500/30',
          text: 'text-cyan-400',
          defaultLabel: 'Ready',
        };
      case 'WAITING':
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          text: 'text-amber-400',
          defaultLabel: 'Waiting',
        };
      case 'COMPLETED':
        return {
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/30',
          text: 'text-purple-400',
          defaultLabel: 'Finished',
        };
      case 'DISCONNECTED':
        return {
          bg: 'bg-rose-500/10',
          border: 'border-rose-500/30',
          text: 'text-rose-400',
          defaultLabel: 'Disconnected',
        };
      case 'LOCKED':
      default:
        return {
          bg: 'bg-slate-800',
          border: 'border-slate-700',
          text: 'text-slate-400',
          defaultLabel: 'Locked',
        };
    }
  };

  const config = getStatusConfig();
  const displayLabel = label || config.defaultLabel;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-mono font-semibold rounded-md border ${config.bg} ${config.border} ${config.text} ${className}`}
    >
      {displayLabel}
    </span>
  );
}
