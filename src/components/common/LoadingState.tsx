'use client';

import React from 'react';

export interface LoadingStateProps {
  message?: string;
  subtext?: string;
  mode?: 'compact' | 'full-page' | 'inline';
  className?: string;
}

export default function LoadingState({
  message = "Loading competition data...",
  subtext,
  mode = "compact",
  className = '',
}: LoadingStateProps) {
  if (mode === 'inline') {
    return (
      <div className={`inline-flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] ${className}`}>
        <svg className="animate-spin h-4 w-4 text-[var(--accent)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>{message}</span>
      </div>
    );
  }

  const containerClasses = mode === 'full-page'
    ? 'min-h-[60vh] flex flex-col items-center justify-center p-8 text-center'
    : 'p-6 bg-[var(--surface)] border border-[var(--border)] rounded-lg flex flex-col items-center justify-center text-center my-4';

  return (
    <div className={`${containerClasses} ${className}`} role="status" aria-live="polite">
      <div className="relative flex items-center justify-center mb-3">
        <div className="w-10 h-10 border-2 border-[var(--border-subtle)] border-t-[var(--accent)] rounded-full animate-spin" />
        <div className="absolute w-6 h-6 border-2 border-[var(--border-subtle)] border-b-cyan-300 rounded-full animate-spin [animation-direction:reverse]" />
      </div>
      <p className="text-sm font-semibold font-mono text-[var(--text-primary)]">{message}</p>
      {subtext && <p className="text-xs text-[var(--text-muted)] mt-1">{subtext}</p>}
    </div>
  );
}
