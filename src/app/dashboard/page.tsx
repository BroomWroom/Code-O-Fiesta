'use client';

import React from 'react';
import ParticipantLayout from '@/components/layout/ParticipantLayout';
import SummaryCard from '@/components/dashboard/SummaryCard';
import ActiveRoundCard from '@/components/dashboard/ActiveRoundCard';
import TeamOverviewCard from '@/components/dashboard/TeamOverviewCard';
import TeamMembersCard from '@/components/dashboard/TeamMembersCard';
import EventTimelineCard from '@/components/dashboard/EventTimelineCard';
import RoundProgressPanel from '@/components/dashboard/RoundProgressPanel';
import RecentActivityFeed from '@/components/dashboard/RecentActivityFeed';

export default function DashboardPage() {
  const rightSidebarContent = (
    <div className="flex flex-col gap-6">
      <TeamOverviewCard
        teamId="TEAM_014"
        joinedAt="10:05:21 PM"
        rank="—"
        activityStatus="ACTIVE NOW"
      />
      <TeamMembersCard />
      <EventTimelineCard />
    </div>
  );

  return (
    <ParticipantLayout rightSidebar={rightSidebarContent}>
      <div className="flex flex-col gap-6">
        
        {/* 1. HERO WELCOME BANNER */}
        <div className="relative bg-gradient-to-r from-[#0d0e26] via-[#121438] to-[#0a0b1e] border border-[#1e224d] rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden shadow-xl">
          <div className="flex flex-col gap-2 max-w-xl relative z-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
              Welcome back!
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Team Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1">
              Track your progress, check event status and enter the arena when you&apos;re ready.
            </p>
          </div>

          {/* 3D Isometric Trophy / Arena Illustration Graphic */}
          <div className="relative z-10 w-28 sm:w-36 h-28 sm:h-36 flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-xl animate-pulse" />
            <svg className="w-24 h-24 text-purple-400 drop-shadow-[0_10px_20px_rgba(139,92,246,0.5)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 30 20 L 70 20 L 65 50 C 65 60, 55 70, 50 70 C 45 70, 35 60, 35 50 Z" fill="#8b5cf6" opacity="0.8" />
              <path d="M 20 25 C 15 35, 25 45, 33 45" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
              <path d="M 80 25 C 85 35, 75 45, 67 45" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
              <rect x="45" y="70" width="10" height="15" fill="#8b5cf6" />
              <polygon points="30,85 70,85 65,95 35,95" fill="#131535" stroke="#06b6d4" strokeWidth="2" />
              <text x="50" y="42" textAnchor="middle" fill="#00f5d4" fontSize="12" fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>
            </svg>
          </div>
        </div>

        {/* 2. SUMMARY METRICS CARDS GRID (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            title="CURRENT STAGE"
            value="ROUND 01"
            subtitle="Maze of Fate"
            accentColor="purple"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2 1m0 0l-2-1m2 1v2.5M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1m2 1l2-1m-2 1v-2.5M18 18l-2-1m2 1l2-1m-2 1v-2.5" />
              </svg>
            }
          />

          <SummaryCard
            title="TEAM STATUS"
            value="READY"
            statusBadge={<span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
            accentColor="emerald"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />

          <SummaryCard
            title="CURRENT SCORE"
            value="120 PTS"
            accentColor="purple"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            }
          />

          <SummaryCard
            title="TEAM MEMBERS"
            value="2 / 2"
            subtitle="CONNECTED"
            accentColor="emerald"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
        </div>

        {/* 3. MAIN HERO ACTIVE ROUND CARD */}
        <ActiveRoundCard />

        {/* 4. BOTTOM 2-COLUMN GRID: PROGRESS & ACTIVITY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RoundProgressPanel />
          <RecentActivityFeed />
        </div>

        {/* Footer info */}
        <footer className="mt-4 pt-4 border-t border-[#141738] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
          <div>
            © 2026 Code-O-Fiesta | VIT Chennai - CodeChef Student Chapter
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Use</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Help</span>
          </div>
        </footer>
      </div>
    </ParticipantLayout>
  );
}
