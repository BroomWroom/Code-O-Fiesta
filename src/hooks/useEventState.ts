'use client';

import { useCallback, useEffect, useState } from 'react';
import { eventService } from '@/services/event';
import type { EventState } from '@/types/event';

const POLL_INTERVAL_MS = 5000;

const INITIAL_STATE: EventState = {
  eventStatus: 'UPCOMING',
  currentRound: 0,
  currentPhase: null,
  roundStartedAt: null,
  roundEndsAt: null,
  teamStatus: 'ACTIVE',
  teamScore: 0,
  activeMember: null,
  currentProblem: null,
};

export interface UseEventStateResult extends EventState {
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useEventState(): UseEventStateResult {
  const [state, setState] = useState<EventState>(INITIAL_STATE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const next = await eventService.getEventState();
      setState(next);
      setError(null);
    } catch {
      setError('Unable to reach the event server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialFetch = setTimeout(refresh, 0);
    const interval = setInterval(refresh, POLL_INTERVAL_MS);
    return () => {
      clearTimeout(initialFetch);
      clearInterval(interval);
    };
  }, [refresh]);

  return { ...state, loading, error, refresh };
}
