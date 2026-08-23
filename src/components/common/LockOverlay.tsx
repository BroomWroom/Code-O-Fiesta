'use client';

import React from 'react';

export type LockOverlayType =
  | 'TIME_EXPIRED'
  | 'NOT_YOUR_TURN'
  | 'ROUND_NOT_STARTED'
  | 'SUBMISSION_IN_PROGRESS'
  | 'ROUND_COMPLETED'
  | 'CUSTOM';

export interface LockOverlayProps {
  type?: LockOverlayType;
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  isFullPage?: boolean;
  className?: string;
}

export default function LockOverlay({
  type = 'NOT_YOUR_TURN',
  title,
  message,
  icon,
  actions,
  isFullPage = false,
  className = '',
}: LockOverlayProps) {
  const getDefaultConfig = () => {
    switch (type) {
      case 'TIME_EXPIRED':
        return {
          defaultTitle: 'TIME EXPIRED',
          defaultMessage: 'This coding session has ended. Submissions for this round are now locked.',
          iconColor: 'text-rose-400',
        };
      case 'ROUND_NOT_STARTED':
        return {
          defaultTitle: 'ROUND NOT STARTED',
          defaultMessage: 'Please wait for the organizers to open this competition round.',
          iconColor: 'text-amber-400',
        };
      case 'SUBMISSION_IN_PROGRESS':
        return {
          defaultTitle: 'SUBMISSION EVALUATING',
          defaultMessage: 'Your code is currently being judged against test cases...',
          iconColor: 'text-cyan-400',
        };
      case 'ROUND_COMPLETED':
        return {
          defaultTitle: 'ROUND COMPLETED',
          defaultMessage: 'Congratulations! You have completed all tasks in this round.',
          iconColor: 'text-emerald-400',
        };
      case 'NOT_YOUR_TURN':
      default:
        return {
          defaultTitle: 'WRITER LOCK ACTIVE',
          defaultMessage: 'Your teammate is currently driving the editor during this relay phase.',
          iconColor: 'text-slate-400',
        };
    }
  };

  const config = getDefaultConfig();
  const displayTitle = title || config.defaultTitle;
  const displayMessage = message || config.defaultMessage;

  const defaultLockIcon = (
    <div className={`p-3 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] mb-3 ${config.iconColor}`}>
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    </div>
  );

  return (
    <div
      className={`${
        isFullPage ? 'fixed inset-0' : 'absolute inset-0'
      } z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 ${className}`}
    >
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 max-w-md w-full shadow-2xl text-center flex flex-col items-center">
        {icon || defaultLockIcon}
        <h3 className="text-lg font-bold font-mono tracking-wider text-[var(--text-primary)] mb-2">
          {displayTitle}
        </h3>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
          {displayMessage}
        </p>
        {actions && <div className="mt-2 flex gap-3">{actions}</div>}
      </div>
    </div>
  );
}
