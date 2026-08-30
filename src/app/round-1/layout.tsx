'use client';

import React from 'react';
import AuthGuard from '@/app/guards/AuthGuard';
import RoundGate from '@/components/round/RoundGate';

// Protects every route under /round-1 (dashboard, path selection, problem
// pages) in one place instead of duplicating AuthGuard/RoundGate on each page.
export default function Round1Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requiredRole="PARTICIPANT">
      <RoundGate roundNumber={1} roundName="The Path of Fate">
        {children}
      </RoundGate>
    </AuthGuard>
  );
}
