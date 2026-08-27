import React from 'react';

interface SubmissionData {
  id: string;
  teamName: string;
  userName: string;
  problemTitle: string;
  problemDifficulty: string;
  roundNumber: number;
  roundName: string;
  verdict: string;
  language: string;
  submittedAt: string;
  executionTime?: number;
  memory?: number;
  lineCount?: number;
}

interface AdminSubmissionTableProps {
  submissions: SubmissionData[];
}

export default function AdminSubmissionTable({
  submissions,
}: AdminSubmissionTableProps) {
  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case 'ACCEPTED':
        return (
          <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] font-bold uppercase">
            ACCEPTED
          </span>
        );
      case 'PENDING':
        return (
          <span className="px-2.5 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-mono text-[9px] font-bold uppercase animate-pulse">
            PENDING
          </span>
        );
      case 'WRONG_ANSWER':
        return (
          <span className="px-2.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-[9px] font-bold uppercase">
            WRONG ANSWER
          </span>
        );
      case 'COMPILATION_ERROR':
        return (
          <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[9px] font-bold uppercase">
            COMPILATION ERROR
          </span>
        );
      case 'AST_CONSTRAINT_FAILED':
        return (
          <span className="px-2.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-[9px] font-bold uppercase">
            AST CONSTRAINT FAILED
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-[9px] font-bold uppercase">
            {verdict.replace(/_/g, ' ')}
          </span>
        );
    }
  };

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm mb-6">
      <div className="p-5 border-b border-[var(--border)] bg-[var(--surface-secondary)]/50 flex justify-between items-center">
        <h3 className="text-xs font-mono font-extrabold text-[var(--text-secondary)] uppercase tracking-wider">
          LIVE SUBMISSIONS WATCHDOG
        </h3>
        <span className="text-[10px] font-mono text-[var(--text-muted)]">
          Sync active
        </span>
      </div>

      <div className="overflow-x-auto max-h-[350px] overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10 bg-[var(--surface-secondary)]">
            <tr className="border-b border-[var(--border)] text-[9px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider select-none">
              <th className="p-4 pl-5 bg-[var(--surface-secondary)]">TEAM</th>
              <th className="p-4 bg-[var(--surface-secondary)]">SUBMITTER</th>
              <th className="p-4 bg-[var(--surface-secondary)]">PROBLEM</th>
              <th className="p-4 bg-[var(--surface-secondary)] text-center">STAGE</th>
              <th className="p-4 bg-[var(--surface-secondary)]">VERDICT</th>
              <th className="p-4 bg-[var(--surface-secondary)]">LANG</th>
              <th className="p-4 pr-5 bg-[var(--surface-secondary)] text-right">TIME</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)] text-xs font-mono">
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-[var(--text-muted)]">
                  No submissions recorded yet.
                </td>
              </tr>
            ) : (
              submissions.map((sub) => {
                const formattedTime = new Date(sub.submittedAt).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                });

                return (
                  <tr key={sub.id} className="hover:bg-[var(--surface-secondary)]/35 transition-colors">
                    {/* Team Name */}
                    <td className="p-4 pl-5 font-bold text-white uppercase">
                      {sub.teamName}
                    </td>

                    {/* Submitter */}
                    <td className="p-4 text-[var(--text-secondary)]">
                      {sub.userName}
                    </td>

                    {/* Problem title */}
                    <td className="p-4">
                      <div className="flex flex-col gap-0.5">
                        <strong className="text-white font-bold">{sub.problemTitle}</strong>
                        <span className="text-[9px] text-[var(--text-muted)]">
                          Diff: {sub.problemDifficulty}
                        </span>
                      </div>
                    </td>

                    {/* Stage number */}
                    <td className="p-4 text-center text-[var(--text-secondary)]">
                      Round 0{sub.roundNumber}
                    </td>

                    {/* Verdict */}
                    <td className="p-4">
                      {getVerdictBadge(sub.verdict)}
                    </td>

                    {/* Lang */}
                    <td className="p-4 text-[var(--text-muted)] uppercase">
                      {sub.language}
                    </td>

                    {/* Submitted At */}
                    <td className="p-4 pr-5 text-right text-[var(--text-muted)]">
                      {formattedTime}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
