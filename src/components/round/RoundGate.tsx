'use client';

import React from 'react';
import { RoundStatus } from '@/constants/event';
import { useRoundStatus } from '@/hooks/useRoundStatus';
import { useTeamResults } from '@/hooks/useTeamResults';
import LoadingState from '@/components/common/LoadingState';
import ParticipantLayout from '@/components/layout/ParticipantLayout';

export interface RoundGateProps {
  roundNumber: number;
  roundName: string;
  children: React.ReactNode;
}

function LockIcon({ colorClass }: { colorClass: string }) {
  return (
    <div className={`p-4 rounded-full bg-[#121433] border border-[#212659] ${colorClass}`}>
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    </div>
  );
}

// Full "Round Not Active" screen — shown for any round that isn't the one
// currently opened by the organizers (upcoming, paused, or superseded by a
// different active round). Round.status is the single backend source of
// truth this reads from; maxScore comes from the same status payload rather
// than being hardcoded on the page.
function RoundNotActiveScreen({
  roundNumber,
  roundName,
  status,
  maxScore,
}: {
  roundNumber: number;
  roundName: string;
  status: RoundStatus;
  maxScore: number;
}) {
  const isPaused = status === RoundStatus.PAUSED;

  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center py-20 px-4 min-h-[60vh]">
      <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400">
        Round {roundNumber}
      </span>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{roundName}</h1>

      <LockIcon colorClass={isPaused ? 'text-amber-400' : 'text-slate-400'} />

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-mono font-bold uppercase tracking-wide text-white">
          {isPaused ? 'Round Paused' : 'Round Not Active'}
        </h2>
        <p className="text-sm text-slate-400 max-w-md">
          {isPaused
            ? 'The organizers have temporarily paused this round. Please wait for it to resume.'
            : 'This round is currently unavailable. Please wait for the organizers to activate this round.'}
        </p>
      </div>

      <div className="rounded-2xl border border-[#1e224d] bg-[#0d0e24] px-10 py-6 flex flex-col items-center gap-1">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
          Round Points
        </span>
        <span className="text-3xl font-mono font-extrabold text-white">
          {maxScore} <span className="text-base text-slate-400">PTS</span>
        </span>
      </div>
    </div>
  );
}

export default function RoundGate({ roundNumber, roundName, children }: RoundGateProps) {
  const { data, loading, error } = useRoundStatus(roundNumber);
  const { getRoundScore, loading: scoreLoading } = useTeamResults();

  if (loading) {
    return (
      <ParticipantLayout>
        <LoadingState message={`Checking Round ${roundNumber} status...`} mode="full-page" />
      </ParticipantLayout>
    );
  }

  // Fail open on a status-check error — a transient network hiccup shouldn't
  // lock participants out of a round that's actually live.
  if (error || !data) {
    return <>{children}</>;
  }

  if (data.status === RoundStatus.COMPLETED) {
    const score = getRoundScore(roundNumber);
    return (
      <ParticipantLayout>
        <div className="flex flex-col items-center justify-center gap-6 text-center py-16 px-4">
          <div className="text-[11px] font-mono text-purple-400 uppercase tracking-widest">
            Round {roundNumber} &middot; {roundName}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Round Completed</h1>
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 px-10 py-8">
            <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-2">
              Points Earned
            </div>
            <div className="text-5xl font-mono font-extrabold text-white">
              {scoreLoading ? '—' : score} <span className="text-lg text-slate-400">PTS</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            This round has ended and is no longer accepting submissions. Check the Results page for the full leaderboard.
          </p>
        </div>
      </ParticipantLayout>
    );
  }

  if (data.status !== RoundStatus.ACTIVE) {
    return (
      <ParticipantLayout>
        <RoundNotActiveScreen
          roundNumber={roundNumber}
          roundName={roundName}
          status={data.status}
          maxScore={data.maxScore}
        />
      </ParticipantLayout>
    );
  }

  return <>{children}</>;
}
