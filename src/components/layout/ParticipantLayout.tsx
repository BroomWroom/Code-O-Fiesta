import React from 'react';

export default function ParticipantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="participant-layout min-h-screen bg-slate-900 text-white">
      {children}
    </div>
  );
}
