'use client';

import React, { use } from 'react';
import CodingIDE from '@/components/ide/CodingIDE';

interface PageProps {
  params: Promise<{ problemId: string }>;
}

export default function Round1ProblemPage({ params }: PageProps) {
  const { problemId } = use(params);

  return (
    <CodingIDE
      problemId={problemId}
      roundNumber={1}
      mode="standard"
      roundConfig={{
        mode: 'standard',
        problemIds: [problemId],
      }}
    />
  );
}
