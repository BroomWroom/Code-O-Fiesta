'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiCall } from '@/lib/api';
import { RoundStatus } from '@/constants/event';

const POLL_INTERVAL_MS = 5000;

export interface RoundStatusData {
  roundNumber: number;
  name: string;
  status: RoundStatus;
  startedAt: string | null;
  endsAt: string | null;
  maxScore: number;
}

export interface UseRoundStatusResult {
  data: RoundStatusData | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useRoundStatus(roundNumber: number): UseRoundStatusResult {
  const [data, setData] = useState<RoundStatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const result = await apiCall(`/api/rounds/${roundNumber}/status`);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load round status.');
    } finally {
      setLoading(false);
    }
  }, [roundNumber]);

  useEffect(() => {
    const initialFetch = setTimeout(refresh, 0);
    const interval = setInterval(refresh, POLL_INTERVAL_MS);
    return () => {
      clearTimeout(initialFetch);
      clearInterval(interval);
    };
  }, [refresh]);

  return { data, loading, error, refresh };
}

export interface UseAllRoundsStatusResult {
  rounds: RoundStatusData[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

// Bulk variant for the navbar — one poll covers all three rounds instead of
// three separate useRoundStatus() pollers. Backed by the same
// /api/rounds/[n]/status data (GET /api/rounds/status calls the identical
// shared service function server-side).
export function useAllRoundsStatus(): UseAllRoundsStatusResult {
  const [rounds, setRounds] = useState<RoundStatusData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const result = await apiCall('/api/rounds/status');
      setRounds(result.rounds ?? []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load round status.');
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

  return { rounds, loading, error, refresh };
}
