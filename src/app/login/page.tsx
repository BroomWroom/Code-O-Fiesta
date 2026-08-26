'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import EventLayout from '@/components/layout/EventLayout';
import EventStatus from '@/components/event/EventStatus';
import { authService } from '@/services/auth';

export default function LoginPage() {
  const router = useRouter();
  
  // Login Mode: 'team' or 'admin'
  const [loginMode, setLoginMode] = useState<'team' | 'admin'>('team');

  // Form Fields
  const [teamName, setTeamName] = useState('TEAM_014');
  const [passcode, setPasscode] = useState('1111');
  const [email, setEmail] = useState('admin@codechefvit.com');
  const [password, setPassword] = useState('admin123');

  // Error Alert State
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      if (loginMode === 'team') {
        const res = await authService.login({ teamName, passcode });
        if (res.error) {
          setErrorMsg(res.error);
        } else {
          // Navigate to participant dashboard
          router.push('/dashboard');
        }
      } else {
        const res = await authService.login({ email, password });
        if (res.error) {
          setErrorMsg(res.error);
        } else {
          // Navigate to admin command center
          router.push('/admin');
        }
      }
    } catch (err) {
      console.error('Login submit error:', err);
      setErrorMsg('Could not establish connection to the authorization service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventLayout maxWidth="narrow">
      <div className="flex-1 flex flex-col items-center justify-center py-12">
        <div className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-xl p-8 shadow-xl">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-[10px] font-mono text-[var(--accent)] font-bold uppercase">
                AUTHENTICATION
              </span>
              <h1 className="text-xl font-bold text-[var(--text-primary)]">Portal Sign-in</h1>
            </div>
            <EventStatus status="READY" size="sm" />
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex bg-[var(--surface-secondary)] border border-[var(--border-subtle)] rounded-lg p-1 mb-6 font-mono text-xs select-none">
            <button
              onClick={() => {
                setLoginMode('team');
                setErrorMsg(null);
              }}
              className={`flex-1 py-2 text-center rounded-md font-bold uppercase transition-all cursor-pointer ${
                loginMode === 'team'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Team Login
            </button>
            <button
              onClick={() => {
                setLoginMode('admin');
                setErrorMsg(null);
              }}
              className={`flex-1 py-2 text-center rounded-md font-bold uppercase transition-all cursor-pointer ${
                loginMode === 'admin'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Organizer Login
            </button>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="p-3 mb-6 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Credentials Info Helper */}
          <div className="p-4 mb-6 rounded bg-[var(--surface-secondary)] border border-[#212659] text-xs text-[var(--text-secondary)]">
            <p className="font-mono font-semibold text-[var(--accent)] mb-1">Quick Access Credentials</p>
            {loginMode === 'team' ? (
              <p>
                Enter Team Name (e.g. <strong className="text-white">TEAM_014</strong> or <strong className="text-white">CODEWARRIORS</strong>) and Passcode (e.g. <strong className="text-white">1111</strong> or <strong className="text-white">1234</strong>).
              </p>
            ) : (
              <p>
                Enter Email: <strong className="text-white">admin@codechefvit.com</strong> and Password: <strong className="text-white">admin123</strong>.
              </p>
            )}
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {loginMode === 'team' ? (
              <>
                <div>
                  <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                    Team Name
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. TEAM_014"
                    required
                    className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded text-xs text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                    Passcode
                  </label>
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="••••"
                    required
                    className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded text-xs text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                    Organizer Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@codechefvit.com"
                    required
                    className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded text-xs text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-3 py-2 bg-[var(--surface-secondary)] border border-[var(--border)] rounded text-xs text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 text-xs font-mono font-bold uppercase rounded bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-on-accent)] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'AUTHENTICATING...' : `LOG IN AS ${loginMode.toUpperCase()} →`}
            </button>
          </form>
        </div>
      </div>
    </EventLayout>
  );
}
