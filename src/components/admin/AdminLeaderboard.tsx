import React from 'react';

interface RoundProgress {
  roundNumber: number;
  score: number;
}

interface TeamStanding {
  rank: number;
  teamId: string;
  name: string;
  status: string;
  totalScore: number;
  completedRoundsCount: number;
  roundDetails: RoundProgress[];
}

interface AdminLeaderboardProps {
  standings: TeamStanding[];
}

export default function AdminLeaderboard({ standings }: AdminLeaderboardProps) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm mb-6">
      <div className="p-5 border-b border-[var(--border)] bg-[var(--surface-secondary)]/50">
        <h3 className="text-xs font-mono font-extrabold text-[var(--text-secondary)] uppercase tracking-wider">
          LIVE STANDINGS ANALYTICS
        </h3>
      </div>

      <div className="divide-y divide-[var(--border-subtle)] max-h-[350px] overflow-y-auto">
        {standings.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-[var(--text-muted)]">
            No standings calculated yet.
          </div>
        ) : (
          standings.map((team) => (
            <div
              key={team.teamId}
              className="flex justify-between items-center px-5 py-3 hover:bg-[var(--surface-secondary)]/20 transition-colors text-xs font-mono"
            >
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded bg-[var(--surface-interactive)] border border-[var(--border-subtle)] text-[10px] font-bold flex items-center justify-center text-[var(--text-secondary)]">
                  {team.rank}
                </span>
                <span className="font-bold text-white uppercase tracking-wide">
                  {team.name}
                </span>
                {team.status === 'DISQUALIFIED' && (
                  <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    DSQ
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <span className="text-[9px] text-[var(--text-muted)]">
                  {team.completedRoundsCount} STAGES COMPLETE
                </span>
                <strong className="text-cyan-400 font-black text-sm">
                  {team.totalScore} PTS
                </strong>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
