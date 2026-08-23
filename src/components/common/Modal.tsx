'use client';

import React, { useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  isLoading?: boolean;
  isConfirmDisabled?: boolean;
  variant?: 'default' | 'danger' | 'warning';
  maxWidth?: 'sm' | 'md' | 'lg';
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  confirmText,
  cancelText = "Cancel",
  onConfirm,
  isLoading = false,
  isConfirmDisabled = false,
  variant = 'default',
  maxWidth = 'md',
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const getMaxWidth = () => {
    switch (maxWidth) {
      case 'sm':
        return 'max-w-sm';
      case 'lg':
        return 'max-w-xl';
      case 'md':
      default:
        return 'max-w-md';
    }
  };

  const getConfirmButtonClasses = () => {
    if (variant === 'danger') {
      return 'bg-rose-600 hover:bg-rose-500 text-white';
    }
    if (variant === 'warning') {
      return 'bg-amber-600 hover:bg-amber-500 text-white';
    }
    return 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-on-accent)]';
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-2xl w-full ${getMaxWidth()} overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)]">
          <div>
            <h3 id="modal-title" className="text-base font-bold font-mono text-[var(--text-primary)]">
              {title}
            </h3>
            {description && <p className="text-xs text-[var(--text-muted)] mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 rounded-md transition-colors disabled:opacity-50"
            aria-label="Close dialog"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        {children && <div className="p-6 text-xs text-[var(--text-secondary)]">{children}</div>}

        {/* Footer Actions */}
        {(onConfirm || cancelText) && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--border-subtle)] bg-[var(--surface-secondary)]/50">
            {cancelText && (
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 text-xs font-mono font-semibold rounded bg-[var(--surface-elevated)] hover:bg-[var(--surface-interactive)] text-[var(--text-secondary)] border border-[var(--border-subtle)] transition-colors disabled:opacity-50"
              >
                {cancelText}
              </button>
            )}

            {onConfirm && confirmText && (
              <button
                type="button"
                onClick={onConfirm}
                disabled={isLoading || isConfirmDisabled}
                className={`px-4 py-2 text-xs font-mono font-semibold rounded transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${getConfirmButtonClasses()}`}
              >
                {isLoading && (
                  <svg className="animate-spin h-3.5 w-3.5 text-current" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
