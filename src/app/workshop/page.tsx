'use client';

import React from 'react';
import ParticipantLayout from '@/components/layout/ParticipantLayout';
import EventProgress from '@/components/event/EventProgress';

export default function WorkshopPage() {
  return (
    <ParticipantLayout>
      <div className="flex flex-col gap-6">
        <EventProgress />

        <div className="bg-[#0d0e24] border border-[#1e224d] rounded-xl p-6 shadow-sm">
          <div className="text-[10px] font-mono text-purple-400 font-bold uppercase mb-1">
            [ WORKSHOP OWNER PLACEHOLDER ]
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Workshop & Orientation</h2>
          <p className="text-xs text-slate-300">
            This page consumes <code className="font-mono text-cyan-400">ParticipantLayout</code>. Workshop stream, event briefing, and waiting state countdowns will be rendered here.
          </p>
        </div>
      </div>
    </ParticipantLayout>
  );
}
