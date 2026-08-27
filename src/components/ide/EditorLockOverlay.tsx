'use client';

import React from 'react';
import { IDEMode } from '@/types/problem';

interface EditorLockOverlayProps {
  locked: boolean;
  mode: IDEMode;
  activeTeamMemberName?: string;
  readOnly?: boolean;
}

export default function EditorLockOverlay({
  locked,
  mode,
  activeTeamMemberName = 'your partner',
  readOnly = false,
}: EditorLockOverlayProps) {
  if (!locked) return null;

  const displayMessage = readOnly
    ? 'Problem solved — editor is locked'
    : mode === 'relay'
    ? `Waiting for ${activeTeamMemberName} to finish their turn`
    : 'Editor is read-only';

  return (
    <div className="absolute inset-0 z-30 bg-[#060612]/85 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-4 select-none">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes lockPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 10px rgba(139, 92, 246, 0.2);
          }
          50% {
            transform: scale(1.08);
            box-shadow: 0 0 22px rgba(139, 92, 246, 0.5);
          }
        }
        .lock-pulsing {
          animation: lockPulse 2s infinite ease-in-out;
        }
      `}} />

      <div className="flex flex-col items-center max-w-xs">
        <div className="lock-pulsing p-3 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-2">
          Editor Locked
        </h4>
        <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
          {displayMessage}
        </p>
      </div>
    </div>
  );
}
