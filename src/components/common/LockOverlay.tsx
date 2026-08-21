import React from 'react';

export default function LockOverlay({ message }: { message?: string }) {
  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="text-center p-4">
        <span>{message || 'Locked'}</span>
      </div>
    </div>
  );
}
