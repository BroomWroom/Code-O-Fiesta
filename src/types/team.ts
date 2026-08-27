import type { TeamMember, TeamStatus } from '@/constants/event';

export interface TeamMemberInfo {
  id: TeamMember;
  name: string;
  isActive: boolean;
  isConnected: boolean;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMemberInfo[];
  status: TeamStatus;
  score: number;
  rank?: number;
}
