import React, { useEffect, useState } from 'react';

interface ForcedSwitchOverlayProps {
  onDismiss: () => void;
  targetMember?: string;
}

export default function ForcedSwitchOverlay({ onDismiss, targetMember = 'Member 2' }: ForcedSwitchOverlayProps) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown === 0) {
      onDismiss();
    }
  }, [countdown, onDismiss]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#060612]/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-4">
      <div className="bg-[#0d0d1f] border border-[#1e1e3a] p-8 rounded-2xl max-w-md w-full shadow-[0_0_30px_rgba(139,92,246,0.3)]">
        <div className="relative mb-6 flex justify-center">
          <div className="p-4 rounded-full bg-purple-500/10 border border-purple-500/30 animate-pulse text-purple-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-bold font-mono text-white mb-2 tracking-wider">
          TIME'S UP!
        </h2>
        <p className="text-sm text-slate-300 mb-6 font-mono">
          Passing editor control to <span className="text-cyan-400 font-bold">{targetMember}</span>.
        </p>
        <div className="text-5xl font-extrabold font-mono text-purple-400 animate-pulse">
          {countdown}
        </div>
        <div className="text-[10px] text-slate-500 font-mono mt-4 uppercase">
          Switching driver in progress...
        </div>
      </div>
    </div>
  );
}
