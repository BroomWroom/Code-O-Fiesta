import React from 'react';

interface RoundBreakdown {
  roundNumber: number;
  roundName: string;
  status: string;
  baseScore: number;
  bonusScore: number;
  totalScore: number;
  completedAt: string | null;
  achievements: string[];
}

interface FinalScoreProps {
  grandTotalScore: number;
  rank: number;
  roundBreakdowns: RoundBreakdown[];
}

export default function FinalScore({
  grandTotalScore,
  rank,
  roundBreakdowns,
}: FinalScoreProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Overview stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Final Rank Card */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 relative overflow-hidden flex items-center justify-between shadow-lg group hover:border-[var(--accent)] transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-600/10 to-transparent rounded-full blur-xl group-hover:scale-125 transition-transform" />
          <div className="flex flex-col gap-1 z-10">
            <span className="text-[10px] font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">
              OVERALL RANKING
            </span>
            <span className="text-3xl font-mono font-black text-white">
              #{rank}
            </span>
            <span className="text-[10px] font-mono text-[var(--text-muted)] mt-1">
              Top percentile finish
            </span>
          </div>
          <div className="w-12 h-12 bg-purple-500/15 border border-purple-500/35 rounded-lg flex items-center justify-center text-purple-300 shadow-inner">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>

        {/* Final Points Card */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 relative overflow-hidden flex items-center justify-between shadow-lg group hover:border-[var(--cyan)] transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-600/10 to-transparent rounded-full blur-xl group-hover:scale-125 transition-transform" />
          <div className="flex flex-col gap-1 z-10">
            <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider">
              TOTAL ACCUMULATED POINTS
            </span>
            <span className="text-3xl font-mono font-black text-cyan-400">
              {grandTotalScore} PTS
            </span>
            <span className="text-[10px] font-mono text-[var(--text-muted)] mt-1">
              Base + Bonus milestones
            </span>
          </div>
          <div className="w-12 h-12 bg-cyan-500/15 border border-cyan-500/35 rounded-lg flex items-center justify-center text-cyan-300 shadow-inner">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Round Breakdown Tables/Cards */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-mono font-extrabold text-[var(--text-secondary)] uppercase tracking-wider">
          ROUND-BY-ROUND ANALYTICS
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {roundBreakdowns.map((round) => {
            const isCompleted = round.status === 'COMPLETED';
            return (
              <div
                key={round.roundNumber}
                className="bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl p-5 hover:bg-[var(--surface-elevated)] transition-colors duration-200"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--border-subtle)] pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[var(--surface-interactive)] border border-[var(--border)] text-xs font-mono font-bold flex items-center justify-center text-[var(--text-secondary)]">
                      0{round.roundNumber}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide">
                        {round.roundName}
                      </h4>
                      <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                        STAGE: {round.status}
                      </p>
                    </div>
                  </div>

                  {/* Score badge for round */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-[10px] font-mono text-[var(--text-muted)]">
                        ROUND SCORE
                      </div>
                      <div className="text-sm font-mono font-bold text-white">
                        {round.totalScore} PTS
                      </div>
                    </div>
                    <span className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-[var(--success)] animate-pulse' : 'bg-yellow-400'}`} />
                  </div>
                </div>

                {/* Score breakdown metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="bg-[var(--surface)] border border-[var(--border-subtle)] p-3 rounded-lg text-center">
                    <span className="text-[9px] font-mono text-[var(--text-muted)] block uppercase">
                      Base Score
                    </span>
                    <span className="text-xs font-mono font-bold text-[var(--text-secondary)]">
                      {round.baseScore} pts
                    </span>
                  </div>

                  <div className="bg-[var(--surface)] border border-[var(--border-subtle)] p-3 rounded-lg text-center">
                    <span className="text-[9px] font-mono text-[var(--text-muted)] block uppercase">
                      Bonus Points
                    </span>
                    <span className="text-xs font-mono font-bold text-purple-300">
                      +{round.bonusScore} pts
                    </span>
                  </div>

                  <div className="bg-[var(--surface)] border border-[var(--border-subtle)] p-3 rounded-lg text-center col-span-2 sm:col-span-2 text-left sm:text-center flex flex-col justify-center">
                    <span className="text-[9px] font-mono text-[var(--text-muted)] block uppercase">
                      Status
                    </span>
                    <span className={`text-xs font-mono font-bold uppercase ${isCompleted ? 'text-[var(--success)]' : 'text-yellow-400'}`}>
                      {isCompleted ? 'COMPLETED ✓' : 'IN PROGRESS'}
                    </span>
                  </div>
                </div>

                {/* Achievements list */}
                {round.achievements && round.achievements.length > 0 && (
                  <div className="bg-[var(--surface)]/50 border border-[var(--border-subtle)]/70 rounded-lg p-3">
                    <span className="text-[9px] font-mono text-[var(--text-muted)] block uppercase mb-1">
                      STAGE ACHIEVEMENTS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {round.achievements.map((ach, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-[var(--surface-interactive)] border border-[var(--border-subtle)] text-[10px] font-mono text-cyan-300"
                        >
                          🏆 {ach}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
