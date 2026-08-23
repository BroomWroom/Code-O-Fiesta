'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface ActiveRoundCardProps {
  className?: string;
}

export default function ActiveRoundCard({ className = '' }: ActiveRoundCardProps) {
  const [selectedPath, setSelectedPath] = useState<number | null>(null);

  const paths = [
    { id: 1, name: 'PATH 01', shape: '▲', code: '???' },
    { id: 2, name: 'PATH 02', shape: '●', code: '???' },
    { id: 3, name: 'PATH 03', shape: '■', code: '???' },
    { id: 4, name: 'PATH 04', shape: '★', code: '???' },
  ];

  return (
    <div className={`relative bg-gradient-to-br from-[#0d0e26] via-[#101230] to-[#08091a] border border-purple-900/40 rounded-xl p-6 sm:p-8 overflow-hidden shadow-2xl ${className}`}>
      
      {/* Background Neon Maze Graphic Illustration */}
      <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-20 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 50 50 L 350 50 L 350 250 L 50 250 Z" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 90 90 L 310 90 L 310 210 L 90 210 Z" stroke="#06b6d4" strokeWidth="2" />
          <path d="M 130 130 L 270 130 L 270 170 L 130 170 Z" stroke="#8b5cf6" strokeWidth="2" />
          <circle cx="200" cy="150" r="12" fill="#8b5cf6" className="animate-ping opacity-75" />
          <circle cx="200" cy="150" r="6" fill="#00f5d4" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full gap-6">
        
        {/* Top Header */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-400">
            ACTIVE ROUND
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            The Maze of Fate
          </h2>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed mt-1">
            Four mysterious paths lie ahead. Choose one shape to reveal a hidden domain and begin your challenge.
          </p>
        </div>

        {/* 4 Path Selection Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg">
          {paths.map((path) => {
            const isSelected = selectedPath === path.id;
            return (
              <button
                key={path.id}
                onClick={() => setSelectedPath(path.id)}
                className={`p-3 rounded-lg border text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-600/20 border-purple-400 text-white ring-2 ring-purple-500/40 scale-105'
                    : 'bg-[#131535] border-[#1e224d] text-slate-400 hover:border-purple-500/40 hover:text-white'
                }`}
              >
                <span className="text-xl font-bold text-purple-300">{path.shape}</span>
                <span className="text-[10px] font-mono font-bold tracking-wider">{path.name}</span>
                <span className="text-[9px] font-mono text-slate-500">{path.code}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom Warning & CTA Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-purple-900/30">
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="text-purple-400">ℹ</span>
            <span>Once confirmed, your choice cannot be changed.</span>
          </div>

          <Link
            href="/round-1"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-mono font-extrabold uppercase tracking-wider rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 transition-all border border-purple-400/40"
          >
            <span>ENTER ROUND 01</span>
            <svg className="w-4 h-4 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
