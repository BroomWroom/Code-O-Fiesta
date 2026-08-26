import { apiCall } from '@/lib/api';
import type { EventState } from '@/types/event';

const WORKSHOP_DURATION_MS = 45 * 60 * 1000;

function buildMockEventState(): EventState {
  const now = Date.now();
  return {
    eventStatus: 'WORKSHOP',
    currentRound: 0,
    currentPhase: null,
    roundStartedAt: new Date(now).toISOString(),
    roundEndsAt: new Date(now + WORKSHOP_DURATION_MS).toISOString(),
    teamStatus: 'ACTIVE',
    teamScore: 0,
    activeMember: null,
    currentProblem: null,
  };
}

export const eventService = {
  async getEventState(): Promise<EventState> {
    try {
      const data = await apiCall('/api/event/state');
      if (data?.eventStatus) return data as EventState;
      throw new Error('Empty event state response');
    } catch {
      // Backend event state isn't wired up yet — fall back to a demo workshop state.
      return buildMockEventState();
    }
  },
};
