'use client';

import React from 'react';

export interface SummaryCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: React.ReactNode;
  statusBadge?: React.ReactNode;
  accentColor?: 'purple' | 'emerald' | 'cyan' | 'amber';
  className?: string;
}

export default function SummaryCard({
  title,
  value,
  subtitle,
  icon,
  statusBadge,
  accentColor = 'purple',
  className = '',
}: SummaryCardProps) {
  const getIconBorder = () => {
    switch (accentColor) {
      case 'emerald':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      case 'cyan':
        return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400';
      case 'amber':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'purple':
      default:
        return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
    }
  };

  return (
    <div className={`bg-[#0d0e24] border border-[#1e224d] rounded-xl p-4 flex items-center gap-3.5 shadow-sm transition-all hover:border-[#2d336b] ${className}`}>
      {icon && (
        <div className={`p-2.5 rounded-lg border flex items-center justify-center shrink-0 ${getIconBorder()}`}>
          {icon}
        </div>
      )}
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-base font-mono font-extrabold text-white truncate">
            {value}
          </span>
          {statusBadge}
        </div>
        {subtitle && (
          <span className="text-[11px] font-mono text-purple-300 truncate">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
