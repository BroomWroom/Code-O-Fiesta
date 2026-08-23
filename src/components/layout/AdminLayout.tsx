'use client';

import React from 'react';

export interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  nav?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export default function AdminLayout({
  children,
  title = "Organizer Control Panel",
  subtitle = "VITC Code-O-Fiesta Event Management",
  nav,
  actions,
  className = '',
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--text-primary)]">
      {/* Distinct Top Accent Bar for Admin */}
      <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-500" />
      
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-[var(--content-max-width)] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              ADMIN
            </span>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-2">
                {title}
              </h1>
              {subtitle && <p className="text-xs text-[var(--text-muted)]">{subtitle}</p>}
            </div>
          </div>

          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>

        {nav && <div className="max-w-[var(--content-max-width)] mx-auto mt-3 border-t border-[var(--border-subtle)] pt-2">{nav}</div>}
      </header>

      <main className={`flex-1 max-w-[var(--content-max-width)] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 ${className}`}>
        {children}
      </main>
    </div>
  );
}
