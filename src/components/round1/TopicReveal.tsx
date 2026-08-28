'use client';

import React, { useEffect, useState } from 'react';
import { ShapeType } from './ShapeCard';

export interface TopicRevealProps {
  pathId: number;
  shape: ShapeType;
  topic: string;          // e.g. "Basic Math & Numbers"
  description?: string;
  onContinue: () => void;
}

const shapeMeta: Record<ShapeType, { label: string; color: string; glow: string }> = {
  triangle: { label: 'Triangle', color: 'text-purple-400', glow: 'shadow-[0_0_40px_rgba(168,85,247,0.5)]' },
  circle:   { label: 'Circle',   color: 'text-cyan-400',   glow: 'shadow-[0_0_40px_rgba(6,182,212,0.5)]' },
  square:   { label: 'Square',   color: 'text-yellow-400', glow: 'shadow-[0_0_40px_rgba(234,179,8,0.5)]' },
  star:     { label: 'Star',     color: 'text-pink-400',   glow: 'shadow-[0_0_40px_rgba(236,72,153,0.5)]' },
};

export default function TopicReveal({
  pathId,
  shape,
  topic,
  description = 'Three problems await you in this domain. Solve them in any order.',
  onContinue,
}: TopicRevealProps) {
  const [phase, setPhase] = useState<'locked' | 'revealing' | 'revealed'>('locked');
  const meta = shapeMeta[shape];

  useEffect(() => {
    // Animation sequence
    const t1 = setTimeout(() => setPhase('revealing'), 600);
    const t2 = setTimeout(() => setPhase('revealed'), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05060e]/95 backdrop-blur-md">
      <div className="relative w-full max-w-lg">
        {/* Glow orb */}
        <div className={`absolute -inset-8 rounded-full blur-3xl opacity-40 transition-opacity duration-1000 ${phase !== 'locked' ? 'opacity-60' : 'opacity-20'} bg-purple-600`} />

        <div className="relative rounded-2xl border border-[#1e224d] bg-[#0d0e24] p-8 text-center overflow-hidden">
          {/* Header */}
          <div className="text-[11px] font-mono tracking-[0.25em] text-purple-400 uppercase mb-6">
            Path {pathId.toString().padStart(2, '0')} · {meta.label}
          </div>

          {/* Locked / Revealing state */}
          {phase !== 'revealed' && (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className={`
                w-24 h-24 rounded-2xl border-2 border-dashed border-slate-600
                flex items-center justify-center
                transition-all duration-700
                ${phase === 'revealing' ? 'scale-110 border-purple-500/60 rotate-12' : ''}
              `}>
                <svg className="w-10 h-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-sm text-slate-400 animate-pulse">
                {phase === 'locked' ? 'Decrypting domain…' : 'Revealing topic…'}
              </p>
            </div>
          )}

          {/* Revealed state */}
          {phase === 'revealed' && (
            <div className="animate-in fade-in zoom-in duration-500">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-5 ${meta.glow} bg-white/5 border border-white/10`}>
                <span className={`text-3xl font-bold ${meta.color}`}>
                  {shape === 'triangle' ? '△' : shape === 'circle' ? '○' : shape === 'square' ? '□' : '☆'}
                </span>
              </div>

              <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">
                Domain Unlocked
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                {topic}
              </h2>
              <p className="text-sm text-slate-400 max-w-sm mx-auto mb-8">
                {description}
              </p>

              <button
                type="button"
                onClick={onContinue}
                className="
                  px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide
                  bg-gradient-to-r from-purple-600 to-violet-500 text-white
                  shadow-[0_0_25px_rgba(139,92,246,0.45)]
                  hover:shadow-[0_0_35px_rgba(139,92,246,0.65)]
                  hover:scale-[1.02] transition-all duration-300
                "
              >
                ENTER THE ARENA →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}