'use client';

import React, { createContext, useContext } from 'react';
import { RunResult, SubmissionResult } from '@/types/submission';

interface SubmissionContextType {
  runResult: RunResult | null;
  submitResult: SubmissionResult | null;
  isRunning: boolean;
  isSubmitting: boolean;
  submissionHistory: SubmissionResult[];
  isLocked: boolean;
  errorMsg: string | null;
  run: () => Promise<void>;
  submit: (onSolve?: (id: string) => void) => Promise<void>;
  resetCode: () => void;
  fetchHistory: () => Promise<void>;
}

const SubmissionContext = createContext<SubmissionContextType | undefined>(undefined);

export function useSubmission() {
  const context = useContext(SubmissionContext);
  if (!context) {
    throw new Error('useSubmission must be used within a SubmissionProvider');
  }
  return context;
}

interface SubmissionControllerProps {
  children: React.ReactNode;
  value: SubmissionContextType;
}

export default function SubmissionController({ children, value }: SubmissionControllerProps) {
  return (
    <SubmissionContext.Provider value={value}>
      {children}
    </SubmissionContext.Provider>
  );
}
