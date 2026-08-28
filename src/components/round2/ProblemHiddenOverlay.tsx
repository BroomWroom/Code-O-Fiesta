import React from 'react';

export default function ProblemHiddenOverlay() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center h-full min-h-[300px] bg-[#080814]/50 border border-dashed border-purple-500/20 rounded-lg">
      <div className="p-4 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 mb-4 animate-pulse">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      </div>
      <h3 className="text-sm font-bold font-mono tracking-wider text-white mb-2 uppercase">
        Problem Statement Hidden
      </h3>
      <p className="text-xs text-slate-400 max-w-xs leading-relaxed font-mono">
        Problem statement is hidden for your turn. Code from what your partner started.
      </p>
    </div>
  );
}
