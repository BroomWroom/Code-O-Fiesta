'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import EventLayout from '@/components/layout/EventLayout';
import EventStatus from '@/components/event/EventStatus';

export default function LoginPage() {
  const router = useRouter();
  const [teamName, setTeamName] = useState('CODEWARRIORS');
  const [passcode, setPasscode] = useState('1234');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to team dashboard
    router.push('/dashboard');
  };

  return (
    <EventLayout maxWidth="narrow">
      <div className="flex-1 flex flex-col items-center justify-center py-12">
        <div className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-xl p-8 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-[10px] font-mono text-[var(--accent)] font-bold uppercase">
                AUTHENTICATION
              </span>
              <h1 className="text-xl font-bold text-[var(--text-primary)]">Team Login</h1>
            </div>
            <EventStatus status="READY" size="sm" />
          </div>

          <div className="p-4 mb-6 rounded bg-[var(--surface-secondary)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
            <p className="font-mono font-semibold text-[var(--accent)] mb-1">Quick Access Credentials</p>
            <p>You can enter any Team Name and Passcode (e.g. <strong className="text-white">CODEWARRIORS</strong> / <strong className="text-white">1234</strong>) to enter the event dashboard.</p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">Team Name / ID</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. CODEWARRIORS"
                required
                className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded text-xs text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">Passcode</label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded text-xs text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 text-xs font-mono font-bold uppercase rounded bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-on-accent)] transition-colors cursor-pointer"
            >
              LOGIN TO EVENT →
            </button>
          </form>
        </div>
      </div>
    </EventLayout>
  );
}
