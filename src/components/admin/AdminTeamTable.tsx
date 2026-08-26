import React, { useState } from 'react';

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  teamMember: string;
}

interface RoundProgress {
  roundNumber: number;
  roundName: string;
  status: string;
  score: number;
  completedAt: string | null;
}

interface TeamData {
  id: string;
  name: string;
  status: string;
  members: Member[];
  totalScore: number;
  roundProgress: RoundProgress[];
  captainId?: string;
}

interface AdminTeamTableProps {
  teams: TeamData[];
  onUpdateStatus: (teamId: string, status: string) => void;
  onOverrideScore: (teamId: string, roundNumber: number, score: number) => void;
}

export default function AdminTeamTable({
  teams,
  onUpdateStatus,
  onOverrideScore,
}: AdminTeamTableProps) {
  const [scoreOverrideModal, setScoreOverrideModal] = useState<{
    teamId: string;
    teamName: string;
    roundNumber: number;
    currentScore: number;
  } | null>(null);

  const [overrideValue, setOverrideValue] = useState<string>('');

  const handleOverrideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (scoreOverrideModal) {
      const score = parseInt(overrideValue, 10);
      if (!isNaN(score) && score >= 0) {
        onOverrideScore(scoreOverrideModal.teamId, scoreOverrideModal.roundNumber, score);
        setScoreOverrideModal(null);
        setOverrideValue('');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] font-bold uppercase">
            ACTIVE
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[9px] font-bold uppercase">
            COMPLETED
          </span>
        );
      case 'DISQUALIFIED':
        return (
          <span className="px-2.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-[9px] font-bold uppercase">
            DISQUALIFIED
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 font-mono text-[9px] uppercase">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm mb-6">
      {/* Header section */}
      <div className="p-5 border-b border-[var(--border)] bg-[var(--surface-secondary)]/50 flex justify-between items-center">
        <h3 className="text-xs font-mono font-extrabold text-[var(--text-secondary)] uppercase tracking-wider">
          TEAMS MANAGEMENT DIRECTORY
        </h3>
        <span className="text-[10px] font-mono text-[var(--text-muted)]">
          Total Registered: {teams.length}
        </span>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--surface-secondary)]/25 text-[9px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider select-none">
              <th className="p-4 pl-5">TEAM NAME</th>
              <th className="p-4">CAPTAIN</th>
              <th className="p-4">STATUS</th>
              <th className="p-4 text-center">R1 SCORE</th>
              <th className="p-4 text-center">R2 SCORE</th>
              <th className="p-4 text-center">R3 SCORE</th>
              <th className="p-4 text-right">TOTAL SCORE</th>
              <th className="p-4 pr-5 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)] text-xs font-mono">
            {teams.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-[var(--text-muted)]">
                  No teams found in database.
                </td>
              </tr>
            ) : (
              teams.map((team) => {
                const r1 = team.roundProgress.find((r) => r.roundNumber === 1);
                const r2 = team.roundProgress.find((r) => r.roundNumber === 2);
                const r3 = team.roundProgress.find((r) => r.roundNumber === 3);

                const captain = team.members.find((m) => m.role === 'PARTICIPANT' && m.teamMember === 'MEMBER_1');

                return (
                  <tr key={team.id} className="hover:bg-[var(--surface-secondary)]/35 transition-colors">
                    {/* Team Name & Members list */}
                    <td className="p-4 pl-5">
                      <div className="flex flex-col gap-0.5">
                        <strong className="text-white font-extrabold uppercase tracking-wide">
                          {team.name}
                        </strong>
                        <span className="text-[9px] text-[var(--text-muted)] lowercase">
                          {team.members.map((m) => m.name).join(', ')}
                        </span>
                      </div>
                    </td>

                    {/* Captain */}
                    <td className="p-4 text-[var(--text-secondary)]">
                      {captain ? captain.name : 'Not set'}
                    </td>

                    {/* Status badge */}
                    <td className="p-4">
                      {getStatusBadge(team.status)}
                    </td>

                    {/* Round 1 Score */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() =>
                          setScoreOverrideModal({
                            teamId: team.id,
                            teamName: team.name,
                            roundNumber: 1,
                            currentScore: r1?.score || 0,
                          })
                        }
                        className="px-2 py-1 rounded bg-[var(--surface-interactive)] hover:bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-cyan-300 font-bold hover:text-white transition-colors cursor-pointer"
                      >
                        {r1 ? r1.score : 0}
                      </button>
                    </td>

                    {/* Round 2 Score */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() =>
                          setScoreOverrideModal({
                            teamId: team.id,
                            teamName: team.name,
                            roundNumber: 2,
                            currentScore: r2?.score || 0,
                          })
                        }
                        className="px-2 py-1 rounded bg-[var(--surface-interactive)] hover:bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-cyan-300 font-bold hover:text-white transition-colors cursor-pointer"
                      >
                        {r2 ? r2.score : 0}
                      </button>
                    </td>

                    {/* Round 3 Score */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() =>
                          setScoreOverrideModal({
                            teamId: team.id,
                            teamName: team.name,
                            roundNumber: 3,
                            currentScore: r3?.score || 0,
                          })
                        }
                        className="px-2 py-1 rounded bg-[var(--surface-interactive)] hover:bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-cyan-300 font-bold hover:text-white transition-colors cursor-pointer"
                      >
                        {r3 ? r3.score : 0}
                      </button>
                    </td>

                    {/* Total Score */}
                    <td className="p-4 text-right font-black text-white text-sm">
                      {team.totalScore}
                    </td>

                    {/* Action buttons */}
                    <td className="p-4 pr-5 text-right">
                      {team.status === 'DISQUALIFIED' ? (
                        <button
                          onClick={() => onUpdateStatus(team.id, 'ACTIVE')}
                          className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-[10px] font-bold rounded cursor-pointer transition-colors"
                        >
                          REINSTATE
                        </button>
                      ) : (
                        <button
                          onClick={() => onUpdateStatus(team.id, 'DISQUALIFIED')}
                          className="px-3 py-1 bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-[10px] font-bold rounded cursor-pointer transition-colors"
                        >
                          DISQUALIFY
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 4. SCORE OVERRIDE MODAL */}
      {scoreOverrideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[var(--surface)] border border-[var(--border)] w-full max-w-sm rounded-xl p-6 shadow-2xl relative">
            <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-2 border-b border-[var(--border-subtle)] pb-2">
              OVERRIDE SCORE: {scoreOverrideModal.teamName}
            </h4>
            <p className="text-[10px] font-mono text-[var(--text-secondary)] mb-4 leading-normal">
              Stage: Round 0{scoreOverrideModal.roundNumber} score override. Current registered score: <strong>{scoreOverrideModal.currentScore} PTS</strong>.
            </p>

            <form onSubmit={handleOverrideSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-mono text-[var(--text-muted)] uppercase mb-1">
                  New Score Value (Points)
                </label>
                <input
                  type="number"
                  value={overrideValue}
                  onChange={(e) => setOverrideValue(e.target.value)}
                  placeholder={`e.g. ${scoreOverrideModal.currentScore + 20}`}
                  required
                  className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
                />
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setScoreOverrideModal(null);
                    setOverrideValue('');
                  }}
                  className="px-4 py-2 bg-[var(--surface-interactive)] hover:bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded text-[10px] font-mono font-bold text-slate-400 cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded text-[10px] font-mono font-bold cursor-pointer"
                >
                  APPLY OVERRIDE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
