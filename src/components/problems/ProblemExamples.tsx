'use client';

import React, { useState } from 'react';
import { Example } from '@/types/problem';

interface ProblemExamplesProps {
  examples: Example[];
  onUseAsInput?: (input: string) => void;
}

export default function ProblemExamples({ examples, onUseAsInput }: ProblemExamplesProps) {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-8 select-text">
      {examples.length === 0 ? (
        <div className="text-center font-mono text-xs text-[var(--text-muted)] py-6 select-none">
          No example test cases provided.
        </div>
      ) : (
        examples.map((ex, idx) => {
          const inputKey = `input_${idx}`;
          const outputKey = `output_${idx}`;
          const hasInput = !!ex.input;
          
          return (
            <div
              key={idx}
              className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[#080814]/30 flex flex-col gap-4"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-2 select-none">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Example {idx + 1}
                </span>
                {hasInput && onUseAsInput && (
                  <button
                    onClick={() => onUseAsInput(ex.input)}
                    type="button"
                    className="px-2.5 py-1 text-[10px] font-mono text-cyan-400 hover:text-cyan-300 border border-cyan-500/20 hover:border-cyan-500/40 rounded bg-cyan-950/15 cursor-pointer transition-colors"
                  >
                    Use as Input
                  </button>
                )}
              </div>

              {/* Code blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Input */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-1 select-none">
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase font-bold">Input</span>
                    <button
                      onClick={() => handleCopy(ex.input, inputKey)}
                      type="button"
                      className="text-[9px] font-mono text-purple-400 hover:text-purple-300 cursor-pointer"
                    >
                      {copiedStates[inputKey] ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="p-3 bg-[#0d0d1f] border border-[var(--border-subtle)] rounded-lg font-mono text-xs text-slate-200 overflow-x-auto max-h-[120px] whitespace-pre">
                    {ex.input}
                  </pre>
                </div>

                {/* Output */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-1 select-none">
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase font-bold">Output</span>
                    <button
                      onClick={() => handleCopy(ex.output, outputKey)}
                      type="button"
                      className="text-[9px] font-mono text-purple-400 hover:text-purple-300 cursor-pointer"
                    >
                      {copiedStates[outputKey] ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="p-3 bg-[#0d0d1f] border border-[var(--border-subtle)] rounded-lg font-mono text-xs text-slate-200 overflow-x-auto max-h-[120px] whitespace-pre">
                    {ex.output}
                  </pre>
                </div>
              </div>

              {/* Explanation */}
              {ex.explanation && (
                <div className="mt-1">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase font-bold block mb-1 select-none">
                    Explanation
                  </span>
                  <p className="text-xs font-mono text-slate-300 bg-[#060612]/30 p-3 rounded-lg border border-[var(--border-subtle)] leading-relaxed">
                    {ex.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
