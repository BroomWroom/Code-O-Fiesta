import React, { useState, useEffect } from 'react';

interface ActiveRoundInfo {
  roundNumber: number;
  name: string;
  durationSeconds: number;
  status?: string;
  startedAt?: string;
  endsAt?: string;
  pausedAt?: string;
}

interface AdminRoundStatusProps {
  activeRound: ActiveRoundInfo | null;
  activeTeamsCount: number;
  onAdjustTime: (roundNumber: number, newDurationSeconds: number) => void;
}

export default function AdminRoundStatus({
  activeRound,
  activeTeamsCount,
  onAdjustTime,
}: AdminRoundStatusProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [inputMinutes, setInputMinutes] = useState<string>('');

  const isPaused = activeRound?.status === 'PAUSED';

  useEffect(() => {
    if (!activeRound) return;

    const updateTimer = () => {
      // While paused, the round's endsAt is frozen server-side until resume,
      // so ticking against it here would show a misleading falling countdown.
      const referenceTime = isPaused && activeRound.pausedAt
        ? new Date(activeRound.pausedAt).getTime()
        : Date.now();

      if (activeRound.endsAt) {
        const remaining = Math.max(0, Math.floor((new Date(activeRound.endsAt).getTime() - referenceTime) / 1000));
        setTimeLeft(remaining);
      } else {
        setTimeLeft(activeRound.durationSeconds);
      }
    };

    updateTimer();
    if (isPaused) return;

    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [activeRound, isPaused]);

  if (!activeRound) {
    return (
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 shadow-sm mb-6 flex items-center justify-center min-h-[120px]">
        <div className="text-center font-mono">
          <span className="text-xs text-[var(--text-muted)] block uppercase mb-1">STAGE TIMERS</span>
          <span className="text-sm font-bold text-slate-400">NO ROUND ACTIVE CURRENTLY</span>
        </div>
      </div>
    );
  }

  // Formatting seconds to HH:MM:SS
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [
      h > 0 ? String(h).padStart(2, '0') : null,
      String(m).padStart(2, '0'),
      String(s).padStart(2, '0'),
    ]
      .filter(Boolean)
      .join(':');
  };

  const handleAdjustSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mins = parseInt(inputMinutes, 10);
    if (!isNaN(mins) && mins > 0) {
      onAdjustTime(activeRound.roundNumber, mins * 60);
      setInputMinutes('');
    }
  };

  // Progress percentage
  const total = activeRound.durationSeconds;
  const progressPercent = total > 0 ? Math.min(100, ((total - timeLeft) / total) * 100) : 0;

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 shadow-sm mb-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        
        {/* Left: Active stage countdown */}
        <div className="flex-1 w-full">
          <span className="text-[10px] font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider block mb-1">
            ROUND 0{activeRound.roundNumber} RUNTIME STATUS
          </span>
          <div className="flex items-baseline gap-3">
            <h2 className={`text-3xl sm:text-4xl font-mono font-black tracking-wider ${isPaused ? 'text-amber-400' : 'text-cyan-400'}`}>
              {formatTime(timeLeft)}
            </h2>
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
              remaining of {Math.floor(activeRound.durationSeconds / 60)} min
            </span>
            {isPaused && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold rounded-full border bg-amber-500/10 border-amber-500/30 text-amber-400 px-2.5 py-1">
                <span className="rounded-full w-1.5 h-1.5 bg-amber-400" />
                PAUSED
              </span>
            )}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[var(--surface-secondary)] h-2 rounded-full mt-3 overflow-hidden border border-[var(--border-subtle)]">
            <div
              className="bg-gradient-to-r from-purple-500 to-cyan-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Right: Quick actions & stats */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 w-full lg:w-auto">
          {/* Active Teams Count */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-subtle)] p-4 rounded-xl text-center flex-1 sm:flex-initial">
            <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase block">
              Active Teams
            </span>
            <span className="text-lg font-mono font-bold text-white">
              {activeTeamsCount} Teams
            </span>
          </div>

          {/* Extend Timer Form */}
          <form onSubmit={handleAdjustSubmit} className="flex gap-2 items-center flex-1 sm:flex-initial">
            <div className="flex flex-col">
              <label className="text-[9px] font-mono text-[var(--text-muted)] uppercase mb-1">
                Extend round (mins)
              </label>
              <input
                type="number"
                value={inputMinutes}
                onChange={(e) => setInputMinutes(e.target.value)}
                placeholder="e.g. 10"
                required
                className="w-32 px-3 py-1.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
              />
            </div>
            <button
              type="submit"
              className="self-end px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-500/20 text-white rounded text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer transition-colors"
            >
              APPLY
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
