export interface Round1Config {
  durationMinutes: number;
  problemCount: number;
  ideMode: 'standard';
  problemsVisible: boolean;
  allowAnyOrder: boolean;
}

export interface Round2Config {
  durationMinutes: number;
  problemCount: number;
  member1DurationMinutes: number;
  member2DurationMinutes: number;
  member1Starts: boolean;
  problemVisibleToMember1: boolean;
  problemHiddenFromMember2: boolean;
  commentsProhibited: boolean;
  ideMode: 'relay';
}

export interface Round3Config {
  ideMode: 'constraint';
  scoring: {
    baseSolve: number;
    ouroboros: number;
    shortAndSweet: number;
    oneShotWonder: number;
  };
}

export const ROUND_1_CONFIG: Round1Config = {
  durationMinutes: 60,
  problemCount: 3,
  ideMode: 'standard',
  problemsVisible: true,
  allowAnyOrder: true,
};

export const ROUND_2_CONFIG: Round2Config = {
  durationMinutes: 120,
  problemCount: 3,
  member1DurationMinutes: 15,
  member2DurationMinutes: 25,
  member1Starts: true,
  problemVisibleToMember1: true,
  problemHiddenFromMember2: true,
  commentsProhibited: true,
  ideMode: 'relay',
};

export const ROUND_3_CONFIG: Round3Config = {
  ideMode: 'constraint',
  scoring: {
    baseSolve: 50,
    ouroboros: 30,
    shortAndSweet: 20,
    oneShotWonder: 40,
  },
};
