import connectDB from '@/lib/db';
import Team from '@/models/Team';
import Round from '@/models/Round';
import TeamRound from '@/models/TeamRound';
import Submission from '@/models/Submission';
import { RoundStatus, TeamRoundStatus } from '@/constants/event';
import { BadRequestError, NotFoundError } from '../_lib/errors';

export async function getAdminState() {
  await connectDB();
  const activeRound = await Round.findOne({ status: RoundStatus.ACTIVE }).lean();
  const allRounds = await Round.find().lean();
  
  const totalTeams = await Team.countDocuments();
  const activeTeams = await Team.countDocuments({ status: 'ACTIVE' });
  
  const totalSubmissions = await Submission.countDocuments();
  const recentSubmissions = await Submission.find().sort({ createdAt: -1 }).limit(10).populate('teamId problemId').lean();

  return {
    eventState: activeRound ? 'IN_PROGRESS' : 'PENDING_OR_COMPLETED',
    currentRound: activeRound || null,
    allRounds,
    statistics: {
      totalTeams,
      activeTeams,
      totalSubmissions,
    },
    recentSubmissions
  };
}

export async function getAllTeams() {
  await connectDB();
  return Team.find().populate('members').lean();
}

export async function getTeamDetail(teamId: string) {
  await connectDB();
  const team = await Team.findById(teamId).populate('members').lean();
  if (!team) throw new Error('Team not found');
  
  const teamRounds = await TeamRound.find({ teamId }).populate('roundId').lean();
  const submissions = await Submission.find({ teamId }).sort({ createdAt: -1 }).limit(50).populate('problemId').lean();
  
  return {
    team,
    teamRounds,
    submissions
  };
}

/**
 * Enforces the "only one round can be active" invariant: any other round
 * still marked ACTIVE/PAUSED is closed out — earlier rounds are COMPLETED,
 * later ones revert to UPCOMING — and the change cascades to that round's
 * TeamRound documents so the per-team status (which the round-2 submission
 * pipeline gates on) can never drift out of sync with the global Round.status
 * source of truth.
 */
async function deactivateOtherRounds(activeRoundNumber: number) {
  const otherRounds = await Round.find({
    roundNumber: { $ne: activeRoundNumber },
    status: { $in: [RoundStatus.ACTIVE, RoundStatus.PAUSED] },
  });

  for (const other of otherRounds) {
    const newStatus =
      other.roundNumber < activeRoundNumber ? RoundStatus.COMPLETED : RoundStatus.UPCOMING;

    other.status = newStatus;
    other.pausedAt = null;
    await other.save();

    if (newStatus === RoundStatus.COMPLETED) {
      await TeamRound.updateMany(
        { roundId: other._id, status: TeamRoundStatus.IN_PROGRESS },
        { status: TeamRoundStatus.COMPLETED, completedAt: new Date() },
      );
    }
  }
}

export async function startRoundGlobally(roundNumber: number) {
  await connectDB();
  const round = await Round.findOne({ roundNumber });
  if (!round) throw new NotFoundError('Round not found');

  round.status = RoundStatus.ACTIVE;
  round.pausedAt = null;
  await round.save();

  await deactivateOtherRounds(roundNumber);

  await TeamRound.updateMany(
    { roundId: round._id, status: TeamRoundStatus.NOT_STARTED },
    { status: TeamRoundStatus.IN_PROGRESS, startedAt: new Date() }
  );

  return round;
}

export async function pauseRoundGlobally(roundNumber: number) {
  await connectDB();
  const round = await Round.findOne({ roundNumber });
  if (!round) throw new NotFoundError('Round not found');
  if (round.status !== RoundStatus.ACTIVE) {
    throw new BadRequestError('Only an active round can be paused');
  }

  round.status = RoundStatus.PAUSED;
  round.pausedAt = new Date();
  await round.save();

  return round;
}

export async function resumeRoundGlobally(roundNumber: number) {
  await connectDB();
  const round = await Round.findOne({ roundNumber });
  if (!round) throw new NotFoundError('Round not found');
  if (round.status !== RoundStatus.PAUSED) {
    throw new BadRequestError('Only a paused round can be resumed');
  }

  // Preserve remaining time: shift the deadline forward by however long the round was paused.
  if (round.pausedAt && round.endsAt) {
    const pausedDurationMs = Date.now() - round.pausedAt.getTime();
    round.endsAt = new Date(round.endsAt.getTime() + pausedDurationMs);
  }

  round.status = RoundStatus.ACTIVE;
  round.pausedAt = null;
  await round.save();

  return round;
}

export async function completeRoundGlobally(roundNumber: number) {
  await connectDB();
  const round = await Round.findOne({ roundNumber });
  if (!round) throw new NotFoundError('Round not found');

  round.status = RoundStatus.COMPLETED;
  round.pausedAt = null;
  await round.save();

  await TeamRound.updateMany(
    { roundId: round._id, status: TeamRoundStatus.IN_PROGRESS },
    { status: TeamRoundStatus.COMPLETED, completedAt: new Date() }
  );

  return round;
}

export async function overrideRoundState(roundNumber: number, payload: any) {
  await connectDB();
  const round = await Round.findOne({ roundNumber });
  if (!round) throw new NotFoundError('Round not found');

  if (payload.status) {
    round.status = payload.status;
    if (payload.status === RoundStatus.ACTIVE) {
      round.pausedAt = null;
    }
    let trStatus;
    if (payload.status === RoundStatus.ACTIVE) trStatus = TeamRoundStatus.IN_PROGRESS;
    if (payload.status === RoundStatus.COMPLETED) trStatus = TeamRoundStatus.COMPLETED;

    if (trStatus) {
      await TeamRound.updateMany(
        { roundId: round._id },
        { status: trStatus }
      );
    }
  }
  if (payload.durationSeconds) round.durationSeconds = payload.durationSeconds;

  await round.save();

  if (payload.status === RoundStatus.ACTIVE) {
    await deactivateOtherRounds(roundNumber);
  }

  return round;
}

export async function getOrganizerSubmissions() {
  await connectDB();
  return Submission.find().sort({ createdAt: -1 }).limit(100).populate('teamId problemId').lean();
}
