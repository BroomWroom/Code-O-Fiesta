import React from 'react';
import { SubmissionResult } from '@/types/submission';

interface ScoreBreakdownProps {
  submitResult: SubmissionResult;
  submissionCount: number;
}

export default function ScoreBreakdown({ submitResult, submissionCount }: ScoreBreakdownProps) {
  const violations = submitResult.constraintViolations || [];
  const isAccepted = submitResult.status === 'accepted';

  if (!isAccepted) return null;

  const baseSolvePoints = 50;
  
  const ouroborosViolated = violations.some(v => 
    v.constraintId === 'ouroboros' || 
    v.constraintId === 'no-loops' || 
    v.constraintId === 'recursion-required'
  );
  const ouroborosPoints = ouroborosViolated ? 0 : 30;

  const shortViolated = violations.some(v => 
    v.constraintId === 'shortAndSweet' || 
    v.constraintId === 'max-lines' || 
    v.constraintId === 'line-count'
  );
  const shortPoints = shortViolated ? 0 : 20;

  const oneShotPoints = (submissionCount <= 1) ? 40 : 0;

  const totalPoints = baseSolvePoints + ouroborosPoints + shortPoints + oneShotPoints;

  return (
    <div className="flex flex-col gap-2 p-3 bg-[#080814] border border-cyan-500/20 rounded-lg max-w-sm mt-3 font-mono text-[11px]">
      <div className="text-cyan-400 font-bold uppercase tracking-wider text-[10px] mb-1">
        Scoring Math (Crucible Round)
      </div>
      <div className="flex items-center gap-1.5 text-slate-300">
        <span>50 (Base)</span>
        <span>+</span>
        <span className={ouroborosViolated ? 'line-through text-red-500/60' : 'text-green-400'}>30 (Ouroboros)</span>
        <span>+</span>
        <span className={shortViolated ? 'line-through text-red-500/60' : 'text-green-400'}>20 (Short)</span>
        <span>+</span>
        <span className={submissionCount > 1 ? 'line-through text-red-500/60' : 'text-green-400'}>40 (One-Shot)</span>
        <span>=</span>
        <span className="text-white font-bold">{totalPoints} PTS</span>
      </div>
    </div>
  );
}
