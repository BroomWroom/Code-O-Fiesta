'use client';

import React from 'react';

export type InlineStatusType = 'idle' | 'running' | 'submitting' | 'accepted' | 'wrong' | 'error';

interface SubmissionStatusProps {
  status: InlineStatusType;
}

export default function SubmissionStatus({ status }: SubmissionStatusProps) {
  const getStatusDetails = () => {
    switch (status) {
      case 'running':
        return {
          dotClass: 'bg-cyan-400 animate-ping',
          containerClass: 'text-cyan-400',
          label: 'Running...',
          icon: null,
        };
      case 'submitting':
        return {
          dotClass: 'bg-purple-400 animate-ping',
          containerClass: 'text-purple-400',
          label: 'Evaluating...',
          icon: null,
        };
      case 'accepted':
        return {
          dotClass: 'bg-green-500',
          containerClass: 'text-green-400 font-bold',
          label: 'Accepted',
          icon: (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          ),
        };
      case 'wrong':
        return {
          dotClass: 'bg-red-500',
          containerClass: 'text-red-400 font-bold',
          label: 'Wrong Answer',
          icon: (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ),
        };
      case 'error':
        return {
          dotClass: 'bg-amber-500',
          containerClass: 'text-amber-400 font-bold',
          label: 'Error',
          icon: (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
        };
      case 'idle':
      default:
        return {
          dotClass: 'bg-slate-500',
          containerClass: 'text-slate-500',
          label: 'Ready',
          icon: null,
        };
    }
  };

  const details = getStatusDetails();

  return (
    <div className={`flex items-center gap-2 text-xs font-mono select-none ${details.containerClass}`}>
      <span className="relative flex h-2 w-2">
        {status === 'running' || status === 'submitting' ? (
          <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${details.dotClass}`}></span>
        ) : null}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${status === 'running' || status === 'submitting' ? details.dotClass.replace('animate-ping', '') : details.dotClass}`}></span>
      </span>
      {details.icon}
      <span>{details.label}</span>
    </div>
  );
}
