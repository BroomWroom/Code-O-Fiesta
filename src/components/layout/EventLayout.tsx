import React from 'react';

export default function EventLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="event-layout min-h-screen flex flex-col bg-slate-950 text-white">
      {children}
    </div>
  );
}
