import React from 'react';

interface AdminDashboardProps {
  totalTeams: number;
  activeTeams: number;
  totalSubmissions: number;
  activeRoundNumber: number;
  activeRoundName: string;
}

export default function AdminDashboard({
  totalTeams,
  activeTeams,
  totalSubmissions,
  activeRoundNumber,
  activeRoundName,
}: AdminDashboardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* 1. Active Stage Card */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 relative overflow-hidden flex items-center justify-between shadow-sm">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">
            ACTIVE STAGE
          </span>
          <span className="text-xl font-mono font-black text-white">
            ROUND 0{activeRoundNumber}
          </span>
          <span className="text-[10px] font-mono text-[var(--text-muted)] truncate max-w-[150px]">
            {activeRoundName || 'No Round Active'}
          </span>
        </div>
        <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center text-purple-400">
          <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {/* 2. Total Teams Card */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 relative overflow-hidden flex items-center justify-between shadow-sm">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider">
            TOTAL TEAMS
          </span>
          <span className="text-xl font-mono font-black text-cyan-400">
            {totalTeams} TEAMS
          </span>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">
            Registered in database
          </span>
        </div>
        <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400">
          <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      </div>

      {/* 3. Active Competitors Card */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 relative overflow-hidden flex items-center justify-between shadow-sm">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono font-bold text-[var(--success)] uppercase tracking-wider">
            ACTIVE TEAMS
          </span>
          <span className="text-xl font-mono font-black text-[var(--success)]">
            {activeTeams} TEAMS
          </span>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">
            Excluding disqualified
          </span>
        </div>
        <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400">
          <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {/* 4. Submissions Queue Card */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 relative overflow-hidden flex items-center justify-between shadow-sm">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
            SUBMISSIONS
          </span>
          <span className="text-xl font-mono font-black text-amber-400">
            {totalSubmissions} TOTAL
          </span>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">
            Recent judge executions
          </span>
        </div>
        <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center text-amber-400">
          <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
      </div>
    </div>
  );
}
