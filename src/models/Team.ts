import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

import { TeamStatus } from '@/constants/event';

const TeamSchema = new Schema(
  {
    teamCode: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    members: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      required: true,
      default: [],
    },
    captainId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(TeamStatus),
      default: TeamStatus.ACTIVE,
    },
  },
  {
    collection: 'teams',
    strict: true,
    timestamps: true,
  },
);

TeamSchema.index({ teamCode: 1 }, { unique: true });
TeamSchema.index({ members: 1 });

export type TeamDocument = InferSchemaType<typeof TeamSchema>;

const Team =
  (mongoose.models.Team as Model<TeamDocument> | undefined) ||
  mongoose.model<TeamDocument>('Team', TeamSchema);

export default Team;
