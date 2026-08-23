'use client';

import React, { useState, useEffect } from 'react';

export interface TopBarProps {
  className?: string;
  onMenuClick?: () => void;
}

export default function TopBar({ className = '', onMenuClick }: TopBarProps) {
  const [timeString, setTimeString] = useState<string>('10:24:36 PM');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className={`h-16 w-full bg-[#090a1a] border-b border-[#191c40] px-4 sm:px-6 flex items-center justify-between gap-4 select-none ${className}`}>
      
      {/* Left: Mobile Menu Button & Event ID Badge */}
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button onClick={onMenuClick} className="lg:hidden text-slate-300 hover:text-white p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        <div className="hidden sm:flex items-center gap-2 bg-[#121433] px-3 py-1 rounded-md border border-[#212659]">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">EVENT ID:</span>
          <span className="text-xs font-mono font-bold text-purple-300">COF26</span>
        </div>
      </div>

      {/* Center: Live Status Waveform & Server Time */}
      <div className="flex items-center gap-6">
        {/* Live Status & Waveform */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider hidden md:inline">
            LIVE STATUS
          </span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
              LIVE
            </span>
            {/* Waveform graphic */}
            <div className="flex items-center gap-0.5 h-3 ml-1">
              <span className="w-0.5 h-full bg-emerald-400 rounded-full animate-wave-1" />
              <span className="w-0.5 h-full bg-emerald-400 rounded-full animate-wave-2" />
              <span className="w-0.5 h-full bg-emerald-400 rounded-full animate-wave-3" />
            </div>
          </div>
        </div>

        {/* Server Time */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            SERVER TIME
          </span>
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
            {timeString}
          </span>
        </div>
      </div>

      {/* Right: Team ID, Score & Quick Icons */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Team ID */}
        <div className="flex flex-col text-right">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            TEAM ID
          </span>
          <span className="text-xs font-mono font-extrabold text-cyan-300">
            TEAM_014
          </span>
        </div>

        {/* Score Badge */}
        <div className="flex flex-col items-center bg-gradient-to-r from-purple-900/40 to-indigo-900/40 px-3 py-1 rounded-md border border-purple-500/40 shadow-sm">
          <span className="text-[9px] font-mono text-purple-300 uppercase tracking-wider">
            SCORE
          </span>
          <span className="text-sm font-mono font-black text-purple-200">
            120 PTS
          </span>
        </div>

        {/* Notification & Settings Action Icons */}
        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-lg bg-[#121433] hover:bg-[#1b1e4a] text-slate-300 hover:text-white border border-[#212659] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 text-white font-mono text-[9px] font-bold rounded-full flex items-center justify-center border border-purple-400">
              2
            </span>
          </button>
          <button className="p-2 rounded-lg bg-[#121433] hover:bg-[#1b1e4a] text-slate-300 hover:text-white border border-[#212659] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
