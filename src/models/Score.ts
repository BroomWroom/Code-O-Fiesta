import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const ScoreSchema = new Schema(
  {
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    roundId: {
      type: Schema.Types.ObjectId,
      ref: 'Round',
      required: true,
    },
    baseScore: {
      type: Number,
      default: 0,
    },
    bonusScore: {
      type: Number,
      default: 0,
    },
    totalScore: {
      type: Number,
      default: 0,
    },
    breakdown: {
      baseSolve: {
        type: Number,
        default: 0,
      },
      ouroboros: {
        type: Number,
        default: 0,
      },
      shortAndSweet: {
        type: Number,
        default: 0,
      },
      oneShotWonder: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    collection: 'scores',
    strict: true,
    timestamps: true,
  },
);

ScoreSchema.index({ teamId: 1, roundId: 1 }, { unique: true });
ScoreSchema.index({ roundId: 1, totalScore: -1 });

export type ScoreDocument = InferSchemaType<typeof ScoreSchema>;

const Score =
  (mongoose.models.Score as Model<ScoreDocument> | undefined) ||
  mongoose.model<ScoreDocument>('Score', ScoreSchema);

export default Score;
