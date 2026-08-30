import { authService } from './auth';
import { apiCall } from '@/lib/api';

export const leaderboardService = {
  getLeaderboard: async (): Promise<any> => {
    try {
      // Admin dashboard and /leaderboard page use this
      const data = await apiCall('/api/admin/leaderboard', { method: 'GET' });
      return data.map((team: any) => {
        const completedRoundsCount = Object.values(team.completionInfo || {}).filter(
          (status) => status === 'COMPLETED'
        ).length;

        const roundDetails = Object.keys(team.roundScores || {}).map((roundStr) => ({
          roundNumber: parseInt(roundStr, 10),
          score: team.roundScores[roundStr],
        }));

        return {
          rank: team.rank,
          teamId: team.teamId,
          name: team.teamName,
          status: team.status || 'ACTIVE',
          totalScore: team.totalScore,
          completedRoundsCount,
          roundDetails,
        };
      });
    } catch (e) {
      console.error('Failed to fetch leaderboard from API:', e);
      return [];
    }
  },

  getResults: async (): Promise<any> => {
    try {
      const me = await authService.getMe();
      if (!me || !me.authenticated || !me.team) {
        throw new Error('Not authenticated');
      }

      // Public API
      const data = await apiCall('/api/leaderboard', { method: 'GET' });
      
      const teamData = data.find((t: any) => t.teamId === me.team.id);
      const rank = teamData ? teamData.rank : 0;
      const scoreVal = teamData ? teamData.totalScore : 0;

      const roundBreakdowns = Object.keys(teamData?.roundScores || {}).map((roundStr) => {
        const rNum = parseInt(roundStr, 10);
        const score = teamData.roundScores[roundStr];
        const status = teamData.completionInfo[roundStr] || 'NOT_STARTED';
        
        return {
          roundNumber: rNum,
          roundName: `Round ${rNum}`,
          status,
          baseScore: score,
          bonusScore: 0,
          totalScore: score,
          completedAt: status === 'COMPLETED' ? new Date().toISOString() : null,
          achievements: [],
        };
      });

      return {
        authenticated: true,
        team: me.team,
        results: {
          rank,
          grandTotalScore: scoreVal,
          roundBreakdowns,
        },
      };
    } catch (e) {
      console.error('Failed to fetch team results', e);
      return {
        authenticated: false,
        team: { name: 'Unknown' },
        results: { rank: 0, grandTotalScore: 0, roundBreakdowns: [] },
      };
    }
  }
};
