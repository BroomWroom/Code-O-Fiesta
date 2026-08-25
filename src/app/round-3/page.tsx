'use client';

import React from 'react';
import CodingIDE from '@/components/ide/CodingIDE';
import { CodeConstraint } from '@/types/problem';

const round3Constraints: CodeConstraint[] = [
  {
    id: 'ouroboros',
    label: 'Ouroboros Bonus (+30 PTS)',
    description: 'Solve using recursion without using any loops (for, while).',
    type: 'no-loops',
  },
  {
    id: 'shortAndSweet',
    label: 'Short & Sweet Bonus (+20 PTS)',
    description: 'Keep your code short and sweet under the character/line threshold.',
    type: 'custom',
  },
  {
    id: 'oneShotWonder',
    label: 'One Shot Wonder Bonus (+40 PTS)',
    description: 'Solve the problem correctly on your very first submission attempt.',
    type: 'custom',
  }
];

export default function Round3Page() {
  return (
    <CodingIDE
      problemId="prob-crucible"
      roundNumber={3}
      mode="constraint"
      roundConfig={{
        mode: 'constraint',
        activeConstraints: round3Constraints,
      }}
      onSolve={(subId) => console.log('Solved:', subId)}
    />
  );
}
