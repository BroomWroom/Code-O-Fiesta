import { UserRole } from '@/constants/event';

export const authService = {
  login: async (credentials: { teamName?: string; passcode?: string; email?: string; password?: string }) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Admin Login Verification
    if (credentials.email && credentials.password) {
      if (
        credentials.email.trim().toLowerCase() === 'admin@codechefvit.com' &&
        credentials.password === 'admin123'
      ) {
        const adminSession = {
          role: UserRole.ADMIN,
          user: {
            id: 'admin_user',
            name: 'Event Organizer',
            email: 'admin@codechefvit.com',
          },
        };
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem('cof_session', JSON.stringify(adminSession));
        }
        return { success: true, role: UserRole.ADMIN };
      }
      return { error: 'Invalid admin email or password.' };
    }

    // Team Login Verification
    if (credentials.teamName && credentials.passcode) {
      const name = credentials.teamName.trim().toUpperCase();
      const code = credentials.passcode.trim();

      // Mock list of valid teams and codes
      const validTeams = [
        { name: 'TEAM_014', code: '1111', score: 120 },
        { name: 'CODEWARRIORS', code: '1234', score: 520 },
        { name: 'BYTEFORCE', code: '5678', score: 490 },
        { name: 'DEBUGGERS', code: '9012', score: 470 },
        { name: 'ALGORITHMIC_ALCHEMISTS', code: '9999', score: 80 },
      ];

      const matchedTeam = validTeams.find((t) => t.name === name);

      if (!matchedTeam || matchedTeam.code !== code) {
        return { error: 'Invalid team name or passcode.' };
      }

      const teamSession = {
        role: UserRole.PARTICIPANT,
        team: {
          id: `team_${name.toLowerCase()}`,
          name: matchedTeam.name,
          score: matchedTeam.score,
        },
      };

      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('cof_session', JSON.stringify(teamSession));
      }
      return { success: true, role: UserRole.PARTICIPANT };
    }

    return { error: 'Missing credentials.' };
  },

  logout: async () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('cof_session');
    }
    return { success: true };
  },

  getMe: async () => {
    if (typeof window === 'undefined') {
      return { authenticated: false };
    }

    const sessionStr = window.sessionStorage.getItem('cof_session');
    if (!sessionStr) {
      return { authenticated: false };
    }

    try {
      const session = JSON.parse(sessionStr);

      if (session.role === UserRole.ADMIN) {
        return {
          authenticated: true,
          role: UserRole.ADMIN,
          user: session.user,
        };
      }

      // Populate mock team details based on name
      const name = session.team.name;
      return {
        authenticated: true,
        role: UserRole.PARTICIPANT,
        team: {
          id: session.team.id,
          name: name,
          status: name === 'ALGORITHMIC_ALCHEMISTS' ? 'DISQUALIFIED' : 'ACTIVE',
          teamCode: name === 'TEAM_014' ? '1111' : '1234',
          members: [
            { id: `${name}_m1`, name: `${name} Captain`, email: `${name.toLowerCase()}1@gmail.com`, role: 'PARTICIPANT', teamMember: 'MEMBER_1' },
            { id: `${name}_m2`, name: `${name} Member`, email: `${name.toLowerCase()}2@gmail.com`, role: 'PARTICIPANT', teamMember: 'MEMBER_2' },
          ],
          captainId: `${name}_m1`,
        },
      };
    } catch {
      return { authenticated: false };
    }
  },
};
