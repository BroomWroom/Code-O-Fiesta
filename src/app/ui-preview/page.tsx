'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ParticipantLayout from '@/components/layout/ParticipantLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import EventLayout from '@/components/layout/EventLayout';
import EventStatus from '@/components/event/EventStatus';
import EventProgress from '@/components/event/EventProgress';
import TeamMembersCard from '@/components/dashboard/TeamMembersCard';
import TeamStatus from '@/components/team/TeamStatus';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import LockOverlay from '@/components/common/LockOverlay';
import Modal from '@/components/common/Modal';

export default function UIPreviewPage() {
  const [activeLayoutTab, setActiveLayoutTab] = useState<'participant' | 'admin' | 'event'>('participant');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLockOverlayVisible, setIsLockOverlayVisible] = useState(false);

  return (
    <div>
      {/* Dev View Switcher Bar */}
      <div className="bg-[#090a1a] border-b border-[#191c40] px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-slate-400 hover:text-white mr-2">← Back to Hook</Link>
          <span className="text-purple-400 font-bold">UI SHOWCASE:</span>
          <button
            onClick={() => setActiveLayoutTab('participant')}
            className={`px-3 py-1 rounded transition-colors ${
              activeLayoutTab === 'participant'
                ? 'bg-purple-600 text-white font-bold'
                : 'bg-[#131535] text-slate-300 hover:text-white'
            }`}
          >
            Participant Shell
          </button>
          <button
            onClick={() => setActiveLayoutTab('admin')}
            className={`px-3 py-1 rounded transition-colors ${
              activeLayoutTab === 'admin'
                ? 'bg-indigo-600 text-white font-bold'
                : 'bg-[#131535] text-slate-300 hover:text-white'
            }`}
          >
            Admin Shell
          </button>
          <button
            onClick={() => setActiveLayoutTab('event')}
            className={`px-3 py-1 rounded transition-colors ${
              activeLayoutTab === 'event'
                ? 'bg-cyan-600 text-white font-bold'
                : 'bg-[#131535] text-slate-300 hover:text-white'
            }`}
          >
            Event Shell
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1 rounded bg-[#131535] border border-[#1e224d] text-white hover:border-purple-400 transition-colors"
          >
            Test Modal
          </button>
          <button
            onClick={() => setIsLockOverlayVisible(!isLockOverlayVisible)}
            className="px-3 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
          >
            Toggle Lock Overlay
          </button>
        </div>
      </div>

      {activeLayoutTab === 'participant' && (
        <ParticipantLayout rightSidebar={<TeamMembersCard />}>
          <div className="flex flex-col gap-6 relative min-h-[500px]">
            {isLockOverlayVisible && (
              <LockOverlay
                type="NOT_YOUR_TURN"
                actions={
                  <button
                    onClick={() => setIsLockOverlayVisible(false)}
                    className="px-4 py-2 text-xs font-mono font-bold rounded bg-[#131535] text-white border border-[#1e224d]"
                  >
                    DISMISS LOCK PREVIEW
                  </button>
                }
              />
            )}

            <EventProgress />

            <div className="bg-[#0d0e24] border border-[#1e224d] rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold tracking-tight text-white mb-2">
                Foundation Component Showcase
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                This route displays the shared components and visual language used by all competition routes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0d0e24] border border-[#1e224d] rounded-xl p-5">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-4">
                  Event Status Badges
                </h3>
                <div className="flex flex-wrap gap-2">
                  <EventStatus status="ACTIVE" />
                  <EventStatus status="READY" />
                  <EventStatus status="UPCOMING" />
                  <EventStatus status="PAUSED" />
                  <EventStatus status="COMPLETED" />
                  <EventStatus status="LOCKED" />
                  <EventStatus status="EXPIRED" />
                  <EventStatus status="ERROR" />
                </div>
              </div>

              <div className="bg-[#0d0e24] border border-[#1e224d] rounded-xl p-5">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-4">
                  Team Status Badges
                </h3>
                <div className="flex flex-wrap gap-2">
                  <TeamStatus status="READY" />
                  <TeamStatus status="ACTIVE" />
                  <TeamStatus status="WAITING" />
                  <TeamStatus status="COMPLETED" />
                  <TeamStatus status="LOCKED" />
                  <TeamStatus status="DISCONNECTED" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LoadingState message="Evaluating test cases..." subtext="Running input set 4 / 12" />
              <ErrorState title="Connection Interrupted" message="Lost real-time sync with server." variant="connection" />
            </div>
          </div>
        </ParticipantLayout>
      )}

      {activeLayoutTab === 'admin' && (
        <AdminLayout title="Organizer Control Panel" subtitle="Admin Shell Verification">
          <div className="bg-[#0d0e24] border border-[#1e224d] rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-2">Admin Shell Verification</h2>
          </div>
        </AdminLayout>
      )}

      {activeLayoutTab === 'event' && (
        <EventLayout>
          <div className="bg-[#0d0e24] border border-[#1e224d] rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-2">Generic Event Shell Verification</h2>
          </div>
        </EventLayout>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Action"
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={() => setIsModalOpen(false)}
      >
        <p className="text-xs text-slate-300">Modal component demonstration.</p>
      </Modal>
    </div>
  );
}
