import React from 'react';

export default function ErrorState({ message }: { message?: string }) {
  return (
    <div className="p-4 border border-red-500 bg-red-950/20 text-red-400 rounded-md">
      <span>{message || 'An error occurred'}</span>
    </div>
  );
}
