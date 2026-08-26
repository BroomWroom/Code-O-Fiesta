import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import EventStatus from '@/components/event/EventStatus';

export default function AdminPage() {
  return (
    <AdminLayout
      title="Organizer Control Panel"
      subtitle="VITC Code-O-Fiesta Live Event Operations"
      actions={<EventStatus status="ACTIVE" label="Live Event" />}
    >
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
        <div className="text-[10px] font-mono text-purple-400 font-bold uppercase mb-1">
          [ SANTHOSH / ADMIN OWNER PLACEHOLDER ]
        </div>
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Organizer Dashboard</h2>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          This route consumes <code className="font-mono text-purple-400">AdminLayout</code>. Santhosh will implement competition controls, round state overrides, submission management, and team status tables here.
        </p>
      </div>
    </AdminLayout>
  );
}
