'use client';

import React from 'react';
import AuthGuard from '@/app/guards/AuthGuard';
import RoundGate from '@/components/round/RoundGate';

// Protects every route under /round-2 (dashboard, problem pages) in one
// place instead of duplicating AuthGuard/RoundGate on each page.
export default function Round2Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requiredRole="PARTICIPANT">
      <RoundGate roundNumber={2} roundName="Blind Relay">
        {children}
      </RoundGate>
    </AuthGuard>
  );
}
