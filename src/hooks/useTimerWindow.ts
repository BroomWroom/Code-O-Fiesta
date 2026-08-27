'use client';

import { useEffect, useState } from 'react';

export interface TimerWindow {
  startedAt: string | number | null;
  endsAt: string | number | null;
}

// Timers must be server-authoritative — never invented locally once the real
// backend sets roundStartedAt/roundEndsAt. Until then, this gives each round
// page a live, correctly-configured countdown to test against, anchored to
// when the page mounted rather than a value that would reset on every render.
//
// demoStart starts as null (deterministic on both server and initial client
// render) and is only set to Date.now() inside an effect — reading the clock
// during render itself would differ between server rendering and client
// hydration and produce a hydration mismatch.
export function useTimerWindow(
  useLiveState: boolean,
  durationMinutes: number | null,
  liveStartedAt: string | null,
  liveEndsAt: string | null
): TimerWindow {
  const [demoStart, setDemoStart] = useState<number | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setDemoStart((prev) => prev ?? Date.now()), 0);
    return () => clearTimeout(timeout);
  }, []);

  if (useLiveState) {
    return { startedAt: liveStartedAt, endsAt: liveEndsAt };
  }

  if (durationMinutes === null || demoStart === null) {
    return { startedAt: null, endsAt: null };
  }

  return {
    startedAt: demoStart,
    endsAt: demoStart + durationMinutes * 60 * 1000,
  };
}
