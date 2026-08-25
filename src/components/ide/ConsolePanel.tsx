'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ConsolePanelProps {
  activeTab: 'input' | 'output' | 'verdict';
  onTabChange: (tab: 'input' | 'output' | 'verdict') => void;
  customInputChild: React.ReactNode;
  outputChild: React.ReactNode;
  verdictChild: React.ReactNode;
}

export default function ConsolePanel({
  activeTab,
  onTabChange,
  customInputChild,
  outputChild,
  verdictChild,
}: ConsolePanelProps) {
  const [height, setHeight] = useState(240);
  const isDraggingRef = useRef(false);

  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
  };

  const onDrag = (e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    
    // We want the height of the console panel to increase as we drag UP.
    // e.clientY decreases as we move UP.
    // So the height is calculated relative to the viewport height or container.
    const newHeight = window.innerHeight - e.clientY - 40; // Subtract padding/offset
    if (newHeight >= 120 && newHeight <= 500) {
      setHeight(newHeight);
    }
  };

  const stopDrag = () => {
    isDraggingRef.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
  };

  useEffect(() => {
    return () => {
      // Clean up in case of unmount mid-drag
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
    };
  }, []);

  return (
    <div
      style={{ height: `${height}px` }}
      className="flex flex-col border-t border-[var(--border)] bg-[#060612] relative transition-all duration-75"
    >
      {/* Resizing Handle on Top Edge */}
      <div
        onMouseDown={startDrag}
        className="absolute top-0 left-0 right-0 h-1.5 cursor-ns-resize hover:bg-purple-500/40 bg-transparent transition-colors z-20"
        title="Drag to resize console"
      />

      {/* Tabs Header */}
      <div className="flex items-center justify-between px-4 border-b border-[var(--border-subtle)] bg-[#080814] h-10 select-none">
        <div className="flex gap-2 h-full items-end">
          {(['input', 'output', 'verdict'] as const).map((tab) => {
            const isActive = activeTab === tab;
            const label = tab.charAt(0).toUpperCase() + tab.slice(1);
            
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                type="button"
                className={`px-4 py-2 border-b-2 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'border-purple-500 text-white shadow-[0_4px_12px_-4px_rgba(139,92,246,0.3)] bg-purple-500/5'
                    : 'border-transparent text-[var(--text-muted)] hover:text-slate-200'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow p-4 overflow-auto font-mono">
        {activeTab === 'input' && customInputChild}
        {activeTab === 'output' && outputChild}
        {activeTab === 'verdict' && verdictChild}
      </div>
    </div>
  );
}
