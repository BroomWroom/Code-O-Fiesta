'use client';

import React from 'react';
import AuthGuard from '@/app/guards/AuthGuard';
import RoundGate from '@/components/round/RoundGate';

// Protects every route under /round-3 (dashboard, problem pages) in one
// place instead of duplicating AuthGuard/RoundGate on each page.
export default function Round3Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requiredRole="PARTICIPANT">
      <RoundGate roundNumber={3} roundName="Constraint Crucible">
        {children}
      </RoundGate>
    </AuthGuard>
  );
}
