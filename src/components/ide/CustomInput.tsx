'use client';

import React from 'react';

interface CustomInputProps {
  value: string;
  onChange: (value: string) => void;
  exampleInput?: string;
}

export default function CustomInput({ value, onChange, exampleInput }: CustomInputProps) {
  const handleUseExample = () => {
    if (exampleInput) {
      onChange(exampleInput);
    }
  };

  return (
    <div className="flex flex-col h-full gap-2 relative">
      <div className="flex justify-between items-center px-1">
        <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
          Custom Test Input
        </span>
        {exampleInput && (
          <button
            onClick={handleUseExample}
            type="button"
            className="text-[10px] font-mono text-purple-400 hover:text-purple-300 underline cursor-pointer"
          >
            Use example input
          </button>
        )}
      </div>

      <div className="relative flex-grow">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter custom input here..."
          className="w-full h-full min-h-[100px] resize-none font-mono text-xs p-3 rounded-lg bg-[#060612] text-white border border-[var(--border)] outline-none focus:border-purple-500/50 transition-colors"
        />
        <div className="absolute bottom-2 right-2.5 text-[9px] font-mono text-[var(--text-muted)] select-none">
          {value.length} chars
        </div>
      </div>
    </div>
  );
}
