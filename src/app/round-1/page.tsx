'use client';

import React from 'react';
import ParticipantLayout from '@/components/layout/ParticipantLayout';
import EventProgress from '@/components/event/EventProgress';

export default function Round1Page() {
  return (
    <ParticipantLayout>
      <div className="flex flex-col gap-6">
        <EventProgress />

        <div className="bg-[#0d0e24] border border-[#1e224d] rounded-xl p-6 shadow-sm">
          <div className="text-[10px] font-mono text-purple-400 font-bold uppercase mb-1">
            [ NETHRA / ROUND 1 OWNER PLACEHOLDER ]
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Round 1: The Maze of Fate</h2>
          <p className="text-xs text-slate-300">
            This page consumes <code className="font-mono text-cyan-400">ParticipantLayout</code>. Nethra will implement topic card selections, maze progression, problem panels, and IDE integration here.
          </p>
        </div>
      </div>
    </ParticipantLayout>
  );
}
