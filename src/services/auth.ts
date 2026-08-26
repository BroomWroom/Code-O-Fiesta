import { apiCall } from '@/lib/api';
import type { Team } from '@/types/team';

export interface LoginCredentials {
  teamName: string;
  passcode: string;
}

export interface LoginResult {
  success: boolean;
  team?: Team;
  error?: string;
}

function buildMockTeam(teamName: string): Team {
  const name = teamName.trim() ? teamName.trim().toUpperCase() : 'CODEWARRIORS';
  return {
    id: name,
    name,
    status: 'ACTIVE',
    score: 0,
    members: [
      { id: 'MEMBER_1', name: 'Member 1', isActive: true, isConnected: true },
      { id: 'MEMBER_2', name: 'Member 2', isActive: false, isConnected: true },
    ],
  };
}

// Backend auth isn't wired up yet — used only when /api/auth/login is unreachable,
// so the wrong-credentials flow has something real to test against.
const DEMO_TEAM_NAME = 'CODEWARRIORS';
const DEMO_PASSCODE = '1234';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResult> {
    try {
      const data = await apiCall('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (data?.team) return { success: true, team: data.team as Team };
      throw new Error('Empty login response');
    } catch {
      const nameMatches = credentials.teamName.trim().toUpperCase() === DEMO_TEAM_NAME;
      const passcodeMatches = credentials.passcode.trim() === DEMO_PASSCODE;

      if (nameMatches && passcodeMatches) {
        return { success: true, team: buildMockTeam(credentials.teamName) };
      }

      return {
        success: false,
        error: 'Invalid Team Name or Passcode. Please check your credentials and try again.',
      };
    }
  },

  async logout(): Promise<void> {
    try {
      await apiCall('/api/auth/logout', { method: 'POST' });
    } catch {
      // No-op — nothing to clean up against a stub backend.
    }
  },

  async me(): Promise<Team | null> {
    try {
      const data = await apiCall('/api/auth/me');
      return (data?.team as Team) ?? null;
    } catch {
      return null;
    }
  },
};
