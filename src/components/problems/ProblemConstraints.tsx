'use client';

import React from 'react';
import { IDEMode, CodeConstraint } from '@/types/problem';

interface ProblemConstraintsProps {
  timeLimit: number;   // ms
  memoryLimit: number; // KB
  constraints: string[];
  mode: IDEMode;
  activeConstraints?: CodeConstraint[];
}

export default function ProblemConstraints({
  timeLimit,
  memoryLimit,
  constraints,
  mode,
  activeConstraints,
}: ProblemConstraintsProps) {
  return (
    <div className="flex flex-col gap-6 pb-8 select-text font-mono text-xs text-slate-300">
      {/* Execution Limits */}
      <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[#080814]/30 flex flex-col gap-2.5">
        <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-1 border-b border-[var(--border-subtle)] pb-2 select-none">
          Resource Boundaries
        </h4>
        <div className="flex justify-between items-center">
          <span className="text-[var(--text-muted)]">Time Limit:</span>
          <span className="text-white font-bold">{timeLimit} ms</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[var(--text-muted)]">Memory Limit:</span>
          <span className="text-white font-bold">{memoryLimit} KB</span>
        </div>
      </div>

      {/* Logical Constraints */}
      <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[#080814]/30 flex flex-col gap-2">
        <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-2 border-b border-[var(--border-subtle)] pb-2 select-none">
          Problem Constraints
        </h4>
        {constraints.length === 0 ? (
          <div className="text-[var(--text-muted)] text-[11px] py-1 select-none">
            No standard value constraints defined.
          </div>
        ) : (
          <ul className="list-disc pl-4 flex flex-col gap-2.5 text-[11px] leading-relaxed">
            {constraints.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        )}
      </div>

      {/* AST Coding Constraints */}
      {mode === 'constraint' && activeConstraints && activeConstraints.length > 0 && (
        <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/5 flex flex-col gap-3">
          <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider border-b border-cyan-500/20 pb-2 select-none flex items-center gap-1.5 animate-pulse">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Active Code Constraints
          </h4>
          <div className="flex flex-col gap-2">
            {activeConstraints.map((c) => (
              <div key={c.id} className="flex gap-2 items-start py-0.5">
                <span className="text-cyan-400 font-bold">•</span>
                <div>
                  <span className="text-white font-bold text-[11px]">{c.label}: </span>
                  <span className="text-[11px] text-slate-400">{c.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
