'use client';

import React from 'react';

export type ShapeType = 'triangle' | 'circle' | 'square' | 'star';

interface ShapeCardProps {
  pathNumber: number;
  shape: ShapeType;
  selected?: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

const shapeConfig = {
  triangle: {
    label: 'PATH 01',
    color: 'purple',
    glow: 'shadow-[0_0_30px_rgba(168,85,247,0.4)]',
    border: 'border-purple-500/60',
    text: 'text-purple-400',
    bg: 'bg-purple-500/10',
    ring: 'ring-purple-500',
  },
  circle: {
    label: 'PATH 02',
    color: 'cyan',
    glow: 'shadow-[0_0_30px_rgba(6,182,212,0.4)]',
    border: 'border-cyan-500/60',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    ring: 'ring-cyan-500',
  },
  square: {
    label: 'PATH 03',
    color: 'yellow',
    glow: 'shadow-[0_0_30px_rgba(234,179,8,0.4)]',
    border: 'border-yellow-500/60',
    text: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    ring: 'ring-yellow-500',
  },
  star: {
    label: 'PATH 04',
    color: 'pink',
    glow: 'shadow-[0_0_30px_rgba(236,72,153,0.4)]',
    border: 'border-pink-500/60',
    text: 'text-pink-400',
    bg: 'bg-pink-500/10',
    ring: 'ring-pink-500',
  },
};

function ShapeIcon({ shape, className }: { shape: ShapeType; className?: string }) {
  const common = `w-16 h-16 ${className}`;
  switch (shape) {
    case 'triangle':
      return (
        <svg viewBox="0 0 100 100" className={common} fill="none" stroke="currentColor" strokeWidth="6">
          <polygon points="50,12 90,88 10,88" />
        </svg>
      );
    case 'circle':
      return (
        <svg viewBox="0 0 100 100" className={common} fill="none" stroke="currentColor" strokeWidth="6">
          <circle cx="50" cy="50" r="38" />
        </svg>
      );
    case 'square':
      return (
        <svg viewBox="0 0 100 100" className={common} fill="none" stroke="currentColor" strokeWidth="6">
          <rect x="18" y="18" width="64" height="64" rx="4" />
        </svg>
      );
    case 'star':
      return (
        <svg viewBox="0 0 100 100" className={common} fill="none" stroke="currentColor" strokeWidth="5">
          <polygon points="50,8 61,38 94,38 68,58 79,90 50,70 21,90 32,58 6,38 39,38" />
        </svg>
      );
  }
}

export default function ShapeCard({
  pathNumber,
  shape,
  selected = false,
  onSelect,
  disabled = false,
}: ShapeCardProps) {
  const config = shapeConfig[shape];

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={`
        relative flex flex-col items-center justify-between
        w-full min-h-[220px] p-5 rounded-2xl
        border-2 transition-all duration-300
        ${config.bg} ${config.border}
        ${selected ? `${config.glow} ring-2 ${config.ring} scale-[1.03]` : 'hover:scale-[1.02] hover:brightness-110'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        group
      `}
    >
      {/* Shape */}
      <div className={`${config.text} mt-2 transition-transform duration-300 group-hover:scale-110`}>
        <ShapeIcon shape={shape} />
      </div>

      {/* Labels */}
      <div className="flex flex-col items-center gap-1 mt-4">
        <span className={`text-sm font-bold tracking-widest ${config.text}`}>
          {config.label}
        </span>
        <span className="text-xs text-slate-400 font-medium">Unknown Domain</span>
      </div>

      {/* Lock badge */}
      <div className="mt-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/10">
        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
          Topic hidden
        </span>
      </div>
    </button>
  );
}