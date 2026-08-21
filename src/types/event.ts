export interface EventState {
  status: 'waiting' | 'started' | 'ended';
  currentRound: 1 | 2 | 3;
}
