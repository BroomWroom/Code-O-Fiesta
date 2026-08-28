import React from 'react';
import { SubmissionResult } from '@/types/submission';

interface ConstraintResultProps {
  submitResult: SubmissionResult;
  submissionCount: number;
}

export default function ConstraintResult({ submitResult, submissionCount }: ConstraintResultProps) {
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
    <div className="p-3 bg-[#080814] border border-purple-500/20 rounded-lg max-w-sm font-mono text-[11px] mt-2">
      <div className="font-bold text-purple-400 mb-1 flex justify-between items-center">
        <span>Crucible Score Summary</span>
        <span className="text-green-400 font-extrabold">+{totalPoints} PTS</span>
      </div>
      <div className="flex flex-col gap-1 text-slate-400 text-[10px]">
        <div className="flex justify-between">
          <span>Ouroboros:</span>
          <span className={ouroborosPoints > 0 ? 'text-green-400' : 'text-red-400/50 line-through'}>
            {ouroborosPoints > 0 ? 'Earned' : 'Missed'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Short & Sweet:</span>
          <span className={shortPoints > 0 ? 'text-green-400' : 'text-red-400/50 line-through'}>
            {shortPoints > 0 ? 'Earned' : 'Missed'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>One-Shot Wonder:</span>
          <span className={oneShotPoints > 0 ? 'text-green-400' : 'text-red-400/50 line-through'}>
            {oneShotPoints > 0 ? 'Earned' : 'Missed'}
          </span>
        </div>
      </div>
    </div>
  );
}
