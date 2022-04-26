import { Schema, model } from 'mongoose';
import { IEmployee } from './employee';

interface IStepOne {
  employeeName: string;
  description: string;
  votes: number;
}

interface IStepTwo extends IStepOne {}

interface IStepThree {
  employee: IEmployee;
  votedFor?: Schema.Types.ObjectId;
  votes: Number;
}

export interface IHindsight {
  _id?: string;

  name: string;
  stepOne: IStepOne[];
  stepTwo: IStepTwo[];
  stepThree: IStepThree[];
  winningEmployee?: Schema.Types.ObjectId;
  user_id: Schema.Types.ObjectId | string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

const HindsightSchema = new Schema<IHindsight>(
  {
    name: String,
    stepOne: [{ employeeName: String, description: String, votes: Number }],
    stepTwo: [{ employeeName: String, description: String, votes: Number }],
    stepThree: [
      {
        employee: {
          type: Schema.Types.ObjectId,
          ref: 'employees',
        },
        votedFor: {
          type: Schema.Types.ObjectId,
          ref: 'employees',
        },
        votes: Number,
      },
    ],
    winningEmployee: {
      type: Schema.Types.ObjectId,
      ref: 'employees',
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      require: true,
    },
    createdAt: String,
    updatedAt: String,
  },
  {
    timestamps: true,
  }
);

export default model<IHindsight>('hindsight', HindsightSchema);
