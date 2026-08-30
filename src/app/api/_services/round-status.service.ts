import connectDB from '@/lib/db';
import Round from '@/models/Round';
import { RoundStatus } from '@/constants/event';

// Flat per-item point values already baked into the app's existing scoring
// paths (see rounds/[roundNumber]/questions/route.ts and
// submissions/[submissionId]/route.ts) — reused here, not reinvented, so the
// "max points" shown to participants matches what they can actually earn.
const ROUND_1_POINTS_PER_PROBLEM = 50;
const ROUND_2_POINTS_PER_QUESTION = 50;
const ROUND_3_DEFAULT_BASE_POINTS = 50;
const ROUND_3_DEFAULT_OUROBOROS_POINTS = 30;
const ROUND_3_DEFAULT_SHORT_AND_SWEET_POINTS = 20;
const ROUND_3_DEFAULT_ONE_SHOT_WONDER_POINTS = 40;

export interface RoundStatusInfo {
  roundNumber: number;
  name: string;
  status: RoundStatus;
  startedAt: Date | null;
  endsAt: Date | null;
  maxScore: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function computeMaxScore(roundNumber: number, round: any): number {
  const config = round?.configuration;
  const problemCount = config?.problemCount ?? 3;

  if (roundNumber === 1) {
    return problemCount * ROUND_1_POINTS_PER_PROBLEM;
  }

  if (roundNumber === 2) {
    const questionCount = config?.round2?.questionCount ?? problemCount;
    return questionCount * ROUND_2_POINTS_PER_QUESTION;
  }

  if (roundNumber === 3) {
    const r3 = config?.round3 ?? {};
    const perProblem =
      (r3.basePoints ?? ROUND_3_DEFAULT_BASE_POINTS) +
      (r3.ouroborosPoints ?? ROUND_3_DEFAULT_OUROBOROS_POINTS) +
      (r3.shortAndSweetPoints ?? ROUND_3_DEFAULT_SHORT_AND_SWEET_POINTS) +
      (r3.oneShotWonderPoints ?? ROUND_3_DEFAULT_ONE_SHOT_WONDER_POINTS);
    return problemCount * perProblem;
  }

  return 0;
}

const ROUND_NAMES: Record<number, string> = {
  1: 'The Path of Fate',
  2: 'Blind Relay',
  3: 'Constraint Crucible',
};

export async function getAllRoundsStatus(): Promise<RoundStatusInfo[]> {
  await connectDB();
  const rounds = await Round.find().lean();
  const roundMap = new Map(rounds.map((r) => [r.roundNumber, r]));

  return [1, 2, 3].map((roundNumber) => {
    const round = roundMap.get(roundNumber);
    return {
      roundNumber,
      name: round?.name ?? ROUND_NAMES[roundNumber] ?? `Round ${roundNumber}`,
      status: (round?.status as RoundStatus) ?? RoundStatus.UPCOMING,
      startedAt: round?.startedAt ?? null,
      endsAt: round?.endsAt ?? null,
      maxScore: computeMaxScore(roundNumber, round),
    };
  });
}

export async function getRoundStatus(roundNumber: number): Promise<RoundStatusInfo> {
  const all = await getAllRoundsStatus();
  return (
    all.find((r) => r.roundNumber === roundNumber) ?? {
      roundNumber,
      name: ROUND_NAMES[roundNumber] ?? `Round ${roundNumber}`,
      status: RoundStatus.UPCOMING,
      startedAt: null,
      endsAt: null,
      maxScore: 0,
    }
  );
}

/** True active-round exclusivity check for backend endpoints that must not
 * serve or accept round-scoped data unless that specific round is the one
 * currently open. */
export async function isRoundActive(roundNumber: number): Promise<boolean> {
  await connectDB();
  const round = await Round.findOne({ roundNumber }).select('status').lean();
  return round?.status === RoundStatus.ACTIVE;
}
