'use client';

import React, { useState } from 'react';
import { SubmissionResult } from '@/types/submission';
import Modal from '@/components/common/Modal';

interface SubmissionHistoryProps {
  history: SubmissionResult[];
  onRestoreCode: (code: string, language: string) => void;
}

export default function SubmissionHistory({ history, onRestoreCode }: SubmissionHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSub, setSelectedSub] = useState<SubmissionResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(history.length / itemsPerPage);
  
  const paginatedHistory = history.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return <span className="px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold">AC</span>;
      case 'wrong_answer':
        return <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold">WA</span>;
      case 'time_limit_exceeded':
        return <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold">TLE</span>;
      case 'compilation_error':
        return <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold">CE</span>;
      case 'runtime_error':
        return <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold">RE</span>;
      case 'pending':
      case 'processing':
        return <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold animate-pulse">PENDING</span>;
      default:
        return <span className="px-2 py-0.5 rounded bg-slate-500/10 border border-slate-500/20 text-slate-400 text-[10px] font-bold">ERR</span>;
    }
  };

  const handleRowClick = (sub: SubmissionResult) => {
    if (!sub.sourceCode) return;
    setSelectedSub(sub);
    setIsOpen(true);
  };

  const handleConfirmRestore = () => {
    if (selectedSub && selectedSub.sourceCode && selectedSub.language) {
      onRestoreCode(selectedSub.sourceCode, selectedSub.language as any);
    }
    setIsOpen(false);
    setSelectedSub(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#080814] text-xs font-mono">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)] text-[10px] text-[var(--text-muted)] uppercase bg-[#060610]/40">
              <th className="py-2.5 px-3"># Attempt</th>
              <th className="py-2.5 px-3">Language</th>
              <th className="py-2.5 px-3">Verdict</th>
              <th className="py-2.5 px-3">Time</th>
              <th className="py-2.5 px-3">Memory</th>
            </tr>
          </thead>
          <tbody>
            {paginatedHistory.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[var(--text-muted)] select-none">
                  No submissions found.
                </td>
              </tr>
            ) : (
              paginatedHistory.map((sub, idx) => {
                const attemptNumber = history.length - ((currentPage - 1) * itemsPerPage + idx);
                const isRestoreable = !!sub.sourceCode;
                
                return (
                  <tr
                    key={sub.id}
                    onClick={() => isRestoreable && handleRowClick(sub)}
                    className={`border-b border-[var(--border-subtle)] transition-colors duration-200 ${
                      isRestoreable ? 'hover:bg-purple-950/10 cursor-pointer' : ''
                    }`}
                  >
                    <td className="py-2 px-3 font-bold text-white">#{attemptNumber}</td>
                    <td className="py-2 px-3 text-slate-300 uppercase">{sub.language || 'cpp'}</td>
                    <td className="py-2 px-3">{getStatusBadge(sub.status)}</td>
                    <td className="py-2 px-3 text-slate-400">{sub.timeMs !== undefined ? `${sub.timeMs} ms` : '-'}</td>
                    <td className="py-2 px-3 text-slate-400">{sub.memoryKb !== undefined ? `${sub.memoryKb} KB` : '-'}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-3 py-2 border-t border-[var(--border-subtle)] mt-auto bg-[#060610]/20 select-none">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-2.5 py-1 rounded bg-[#0a0a18] border border-[var(--border)] text-[var(--text-secondary)] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Prev
          </button>
          <span className="text-[10px] text-[var(--text-muted)] uppercase">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-2.5 py-1 rounded bg-[#0a0a18] border border-[var(--border)] text-[var(--text-secondary)] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Load Solution Code?"
        description="Are you sure you want to load this code back into the editor?"
        confirmText="Load Code"
        cancelText="Cancel"
        onConfirm={handleConfirmRestore}
        variant="default"
      >
        <p className="font-mono text-xs">
          Loading this past code will replace whatever is currently in your editor. This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
