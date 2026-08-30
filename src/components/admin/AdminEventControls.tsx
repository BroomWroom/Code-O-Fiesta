import React from 'react';

interface RoundInfo {
  roundNumber: number;
  name: string;
  status: string;
  durationSeconds: number;
}

interface AdminEventControlsProps {
  rounds: RoundInfo[];
  onStartRound: (roundNumber: number) => void;
  onPauseRound: (roundNumber: number) => void;
  onResumeRound: (roundNumber: number) => void;
  onCompleteRound: (roundNumber: number) => void;
}

export default function AdminEventControls({
  rounds,
  onStartRound,
  onPauseRound,
  onResumeRound,
  onCompleteRound,
}: AdminEventControlsProps) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 shadow-sm mb-6">
      <h3 className="text-xs font-mono font-extrabold text-[var(--text-secondary)] uppercase tracking-wider mb-4">
        STAGE CONTROL PANEL
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rounds.map((round) => {
          const isUpcoming = round.status === 'UPCOMING';
          const isActive = round.status === 'ACTIVE';
          const isPaused = round.status === 'PAUSED';
          const isCompleted = round.status === 'COMPLETED';

          let statusColor = 'text-[var(--text-muted)]';
          let borderStyle = 'border-[var(--border-subtle)]';
          let statusLabel = 'LOCKED';

          if (isActive) {
            statusColor = 'text-cyan-400 font-extrabold animate-pulse';
            borderStyle = 'border-cyan-500/40 ring-1 ring-cyan-500/10';
            statusLabel = 'ACTIVE NOW';
          } else if (isPaused) {
            statusColor = 'text-amber-400 font-extrabold';
            borderStyle = 'border-amber-500/40 ring-1 ring-amber-500/10';
            statusLabel = 'PAUSED';
          } else if (isCompleted) {
            statusColor = 'text-[var(--success)] font-bold';
            borderStyle = 'border-[var(--success)]/30';
            statusLabel = 'COMPLETED';
          }

          return (
            <div
              key={round.roundNumber}
              className={`bg-[var(--surface-secondary)] border ${borderStyle} rounded-xl p-4 flex flex-col justify-between`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[9px] font-mono text-[var(--text-muted)] block uppercase">
                    STAGE 0{round.roundNumber}
                  </span>
                  <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                    {round.name}
                  </h4>
                </div>
                <span className={`text-[9px] font-mono uppercase ${statusColor}`}>
                  {statusLabel}
                </span>
              </div>

              {/* Action Button */}
              <div className="mt-4">
                {isUpcoming && (
                  <button
                    onClick={() => onStartRound(round.roundNumber)}
                    className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded text-[10px] font-mono font-extrabold uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    START ROUND →
                  </button>
                )}

                {isActive && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => onPauseRound(round.roundNumber)}
                      className="flex-1 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded text-[10px] font-mono font-extrabold uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      PAUSE ⏸
                    </button>
                    <button
                      onClick={() => onCompleteRound(round.roundNumber)}
                      className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-[10px] font-mono font-extrabold uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      COMPLETE ✓
                    </button>
                  </div>
                )}

                {isPaused && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => onResumeRound(round.roundNumber)}
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-mono font-extrabold uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      RESUME ▶
                    </button>
                    <button
                      onClick={() => onCompleteRound(round.roundNumber)}
                      className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-[10px] font-mono font-extrabold uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      COMPLETE ✓
                    </button>
                  </div>
                )}

                {isCompleted && (
                  <div className="w-full py-2 bg-[var(--surface-interactive)] border border-[var(--border-subtle)] rounded text-center text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase">
                    STAGE FINISHED
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
