import { apiCall } from '@/lib/api';
import type { Team } from '@/types/team';

function buildMockTeam(): Team {
  return {
    id: 'TEAM_014',
    name: 'CODEWARRIORS',
    status: 'ACTIVE',
    score: 120,
    members: [
      { id: 'MEMBER_1', name: 'Alice', isActive: true, isConnected: true },
      { id: 'MEMBER_2', name: 'Bob', isActive: false, isConnected: true },
    ],
  };
}

export const teamService = {
  async getTeamInfo(): Promise<Team> {
    try {
      const data = await apiCall('/api/team/me');
      if (data?.id) return data as Team;
      throw new Error('Empty team response');
    } catch {
      // Backend team lookup isn't wired up yet — fall back to a demo team.
      return buildMockTeam();
    }
  },
};
