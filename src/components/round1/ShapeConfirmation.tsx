'use client';

import React from 'react';
import { ShapeType } from './ShapeCard';

interface ShapeConfirmationProps {
  pathId: number;
  shape: ShapeType;
  onCancel: () => void;
  onConfirm: () => void;
}

const shapeLabels: Record<ShapeType, string> = {
  triangle: 'Triangle',
  circle: 'Circle',
  square: 'Square',
  star: 'Star',
};

export default function ShapeConfirmation({
  pathId,
  shape,
  onCancel,
  onConfirm,
}: ShapeConfirmationProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-[#1e224d] bg-[#0d0e24] p-6 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/15 border border-purple-500/30">
            <svg className="h-7 w-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            Lock in Path {pathId.toString().padStart(2, '0')}?
          </h3>
          <p className="text-sm text-slate-400 mb-1">
            You selected the <span className="text-purple-300 font-medium">{shapeLabels[shape]}</span> path.
          </p>
          <p className="text-xs text-slate-500 mb-6">
            The domain will be revealed and this choice cannot be undone.
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-xl border border-[#1e224d] bg-[#131535] py-3 text-sm font-medium text-slate-300 hover:bg-[#1a1d42] transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.55)] transition-all"
            >
              Confirm & Lock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}