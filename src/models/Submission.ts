import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

import { SubmissionVerdict } from '@/constants/event';

const SubmissionSchema = new Schema(
  {
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    roundId: {
      type: Schema.Types.ObjectId,
      ref: 'Round',
      required: true,
    },
    problemId: {
      type: Schema.Types.ObjectId,
      ref: 'Problem',
      required: true,
    },
    sourceCode: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    submissionNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    judge0: {
      token: {
        type: String,
        default: null,
      },
      statusId: {
        type: Number,
        default: null,
      },
      status: {
        type: String,
        default: null,
      },
      stdout: {
        type: String,
        default: null,
      },
      stderr: {
        type: String,
        default: null,
      },
      compileOutput: {
        type: String,
        default: null,
      },
      executionTime: {
        type: Number,
        default: null,
      },
      memory: {
        type: Number,
        default: null,
      },
    },
    astAnalysis: {
      analyzed: {
        type: Boolean,
        default: false,
      },
      parser: {
        type: String,
        default: null,
      },
      recursionDetected: {
        type: Boolean,
        default: false,
      },
      loopsDetected: {
        type: Boolean,
        default: false,
      },
      lineCount: {
        type: Number,
        default: null,
      },
      errors: {
        type: [String],
        default: [],
      },
    },
    verdict: {
      type: String,
      enum: Object.values(SubmissionVerdict),
      default: SubmissionVerdict.PENDING,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'submissions',
    strict: true,
    timestamps: true,
  },
);

SubmissionSchema.index({ teamId: 1, problemId: 1, createdAt: -1 });
SubmissionSchema.index({ teamId: 1, roundId: 1, createdAt: -1 });
SubmissionSchema.index({ problemId: 1, createdAt: -1 });

export type SubmissionDocument = InferSchemaType<typeof SubmissionSchema>;

const Submission =
  (mongoose.models.Submission as Model<SubmissionDocument> | undefined) ||
  mongoose.model<SubmissionDocument>('Submission', SubmissionSchema);

export default Submission;
