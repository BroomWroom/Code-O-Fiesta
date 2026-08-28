import React, { useState } from 'react';

interface RoundDetail {
  roundNumber: number;
  roundName: string;
  status: string;
  score: number;
  completedAt: string | null;
}

interface StandingTeam {
  rank: number;
  teamId: string;
  name: string;
  status: string;
  totalScore: number;
  completedRoundsCount: number;
  roundDetails: RoundDetail[];
}

interface LeaderboardProps {
  standings: StandingTeam[];
  currentUserTeamId?: string | null;
}

export default function Leaderboard({
  standings,
  currentUserTeamId,
}: LeaderboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);

  const toggleExpand = (teamId: string) => {
    setExpandedTeamId(expandedTeamId === teamId ? null : teamId);
  };

  // Filter standings based on search query
  const filteredStandings = standings.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Top 3 teams for the podium
  const topTeams = standings.slice(0, 3);
  const podiumOrder = [
    topTeams[1], // 2nd Place (Left)
    topTeams[0], // 1st Place (Center)
    topTeams[2], // 3rd Place (Right)
  ].filter(Boolean);

  return (
    <div className="flex flex-col gap-6">
      {/* 1. ESPORTS STANDINGS PODIUM */}
      {searchQuery === '' && standings.length >= 1 && (
        <div className="flex flex-col md:flex-row items-end justify-center gap-4 sm:gap-6 py-6 border-b border-[var(--border-subtle)]">
          {podiumOrder.map((team, idx) => {
            // Determine place from original rank
            const isFirst = team.rank === 1;
            const isSecond = team.rank === 2;
            const isThird = team.rank === 3;

            let cardHeight = 'h-48 sm:h-56';
            let bgStyle = 'bg-slate-950/40 border-slate-700/40';
            let textGlow = 'text-slate-300';
            let crownIcon = null;

            if (isFirst) {
              cardHeight = 'h-56 sm:h-64 order-2 md:order-2 z-10 scale-105';
              bgStyle = 'bg-gradient-to-t from-yellow-950/20 via-yellow-900/10 to-transparent border-yellow-500/40 shadow-[0_0_30px_rgba(234,179,8,0.15)]';
              textGlow = 'text-yellow-400 font-extrabold drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]';
              crownIcon = '👑';
            } else if (isSecond) {
              cardHeight = 'h-48 sm:h-56 order-1 md:order-1';
              bgStyle = 'bg-gradient-to-t from-slate-900/20 via-slate-800/10 to-transparent border-slate-400/30';
              textGlow = 'text-slate-300 font-bold';
            } else if (isThird) {
              cardHeight = 'h-44 sm:h-52 order-3 md:order-3';
              bgStyle = 'bg-gradient-to-t from-amber-900/20 via-amber-950/10 to-transparent border-amber-600/30';
              textGlow = 'text-amber-500 font-bold';
            }

            return (
              <div
                key={team.teamId}
                className={`w-full md:w-52 ${cardHeight} ${bgStyle} border rounded-2xl flex flex-col justify-between items-center p-5 text-center relative overflow-hidden transition-all duration-300 group hover:-translate-y-1`}
              >
                {/* Visual rank indicator */}
                <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-[10px] font-mono font-bold text-slate-400">
                  #{team.rank}
                </div>

                <div className="mt-4 flex flex-col items-center">
                  {crownIcon && <span className="text-xl mb-1">{crownIcon}</span>}
                  <h3 className="text-sm font-mono font-black text-white uppercase tracking-wide truncate max-w-[180px]">
                    {team.name}
                  </h3>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] mt-0.5">
                    {team.completedRoundsCount} stages complete
                  </span>
                </div>

                <div className="mb-2">
                  <span className={`text-2xl font-mono font-black ${textGlow}`}>
                    {team.totalScore}
                  </span>
                  <span className="text-[9px] font-mono text-[var(--text-secondary)] block">
                    POINTS
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. SEARCH & CONTROLS */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-base font-mono font-extrabold text-[var(--text-secondary)] uppercase tracking-wider self-start">
          EVENT STANDINGS
        </h2>
        
        {/* Search bar */}
        <div className="w-full sm:w-72 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search team name..."
            className="w-full pl-9 pr-3 py-1.5 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:border-transparent transition-all"
          />
          <svg className="w-4 h-4 text-slate-500 absolute left-3 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* 3. LEADERBOARD LIST */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-lg">
        {/* Table Header */}
        <div className="grid grid-cols-12 px-5 py-3 border-b border-[var(--border)] bg-[var(--surface-secondary)] text-[10px] font-mono font-extrabold text-[var(--text-muted)] uppercase tracking-wider select-none">
          <div className="col-span-2">RANK</div>
          <div className="col-span-5">TEAM</div>
          <div className="col-span-3 text-right">COMPLETED STAGES</div>
          <div className="col-span-2 text-right">TOTAL POINTS</div>
        </div>

        {/* Table Body */}
        {filteredStandings.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-[var(--text-muted)]">
            No teams match your search query.
          </div>
        ) : (
          <div className="divide-y divide-[var(--border-subtle)]">
            {filteredStandings.map((team) => {
              const isUserTeam = team.teamId === currentUserTeamId;
              const isExpanded = expandedTeamId === team.teamId;

              return (
                <div
                  key={team.teamId}
                  className={`transition-colors duration-150 ${isUserTeam ? 'bg-purple-900/10' : 'hover:bg-[var(--surface-secondary)]/50'}`}
                >
                  {/* Team Summary Row */}
                  <div
                    onClick={() => toggleExpand(team.teamId)}
                    className="grid grid-cols-12 px-5 py-4 items-center text-xs font-mono cursor-pointer select-none"
                  >
                    {/* Rank Badge */}
                    <div className="col-span-2 flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-md border flex items-center justify-center font-bold ${
                        team.rank === 1
                          ? 'bg-yellow-500/15 border-yellow-500/40 text-yellow-400'
                          : team.rank === 2
                          ? 'bg-slate-400/15 border-slate-400/40 text-slate-300'
                          : team.rank === 3
                          ? 'bg-amber-600/15 border-amber-600/40 text-amber-500'
                          : 'bg-[var(--surface-interactive)] border-[var(--border)] text-[var(--text-secondary)]'
                      }`}>
                        {team.rank}
                      </span>
                    </div>

                    {/* Team Name */}
                    <div className="col-span-5 flex items-center gap-2">
                      <span className={`font-bold tracking-wide uppercase ${isUserTeam ? 'text-purple-300' : 'text-white'}`}>
                        {team.name}
                      </span>
                      {isUserTeam && (
                        <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          YOU
                        </span>
                      )}
                      {team.status === 'DISQUALIFIED' && (
                        <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          DSQ
                        </span>
                      )}
                    </div>

                    {/* Completed stages count */}
                    <div className="col-span-3 text-right text-[var(--text-secondary)]">
                      {team.completedRoundsCount} / 3
                    </div>

                    {/* Score */}
                    <div className="col-span-2 text-right font-black text-cyan-400 text-sm">
                      {team.totalScore}
                    </div>
                  </div>

                  {/* Expanded Breakdown Panel */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-[var(--border-subtle)] bg-[var(--background)]/30">
                      <div className="bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl p-4 mt-2">
                        <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-3">
                          ROUND BREAKDOWN
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {team.roundDetails.map((round) => {
                            const isRoundCompleted = round.status === 'COMPLETED';
                            return (
                              <div
                                key={round.roundNumber}
                                className="bg-[var(--surface)] border border-[var(--border-subtle)] p-3 rounded-lg flex flex-col justify-between"
                              >
                                <div className="flex justify-between items-center">
                                  <span className="text-[10px] font-bold text-white truncate max-w-[130px]">
                                    R{round.roundNumber}: {round.roundName}
                                  </span>
                                  <span className={`w-1.5 h-1.5 rounded-full ${isRoundCompleted ? 'bg-[var(--success)]' : 'bg-yellow-400'}`} />
                                </div>
                                <div className="flex justify-between items-end mt-4">
                                  <span className="text-[9px] font-mono text-[var(--text-muted)]">
                                    STATUS: {round.status}
                                  </span>
                                  <span className="text-xs font-mono font-bold text-cyan-400">
                                    {round.score} PTS
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
