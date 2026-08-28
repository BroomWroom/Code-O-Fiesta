'use client';

import React, { useEffect, useState } from 'react';
import Modal from '@/components/common/Modal';

interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isSubmitting: boolean;
  isLocked: boolean; // not your turn in relay
}

export default function SubmitButton({
  onClick,
  disabled,
  isSubmitting,
  isLocked,
}: SubmitButtonProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        if (!disabled && !isSubmitting && !isLocked) {
          setIsConfirmOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClick, disabled, isSubmitting, isLocked]);

  const handleOpenConfirm = () => {
    if (isLocked || disabled || isSubmitting) return;
    setIsConfirmOpen(true);
  };

  const handleConfirmSubmit = () => {
    setIsConfirmOpen(false);
    onClick();
  };

  const tooltipMsg = isLocked ? 'Wait for your turn' : isSubmitting ? 'Submitting...' : 'Submit code for judging';

  return (
    <div className="relative inline-block group">
      <button
        onClick={handleOpenConfirm}
        disabled={disabled || isSubmitting || isLocked}
        type="button"
        className="px-5 py-2 font-mono font-bold text-xs uppercase tracking-wider rounded-lg border transition-all duration-300 flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-purple-400 bg-purple-950/20 border-purple-500/30 hover:border-purple-500/60 hover:shadow-[0_0_12px_rgba(139,92,246,0.25)] focus:outline-none focus:ring-1 focus:ring-purple-500"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-3.5 w-3.5 text-purple-400" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span>Submit</span>
          </>
        )}
      </button>

      {/* Tooltip on hover if locked or disabled */}
      {(isLocked || isSubmitting) && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-[#060612] text-[10px] font-mono text-purple-300 border border-purple-500/20 px-2 py-1 rounded whitespace-nowrap shadow-lg z-50">
          {tooltipMsg}
        </div>
      )}

      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Submit Solution?"
        description="Are you sure you want to submit your code?"
        confirmText="Submit"
        cancelText="Cancel"
        onConfirm={handleConfirmSubmit}
        variant="default"
      >
        <p className="font-mono text-xs">
          Your code will be evaluated against all hidden and visible test cases. This will increment your submission attempt count.
        </p>
      </Modal>
    </div>
  );
}
