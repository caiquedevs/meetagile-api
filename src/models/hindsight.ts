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
  winningEmployee?: IEmployee;
  user_id: Schema.Types.ObjectId | string;
  timer: { hours: number; minutes: number; seconds: number };
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

const HindsightSchema = new Schema<IHindsight>(
  {
    name: String,
    timer: { hours: Number, minutes: Number, seconds: Number },
    stepOne: [{ employeeName: String, description: String, votes: Number }],
    stepTwo: [{ employeeName: String, description: String, votes: Number }],
    stepThree: [
      {
        _id: String,
        user_id: Schema.Types.ObjectId,
        name: String,
        office: String,
        url: String,

        votedFor: {
          _id: String,
          user_id: Schema.Types.ObjectId,
          name: String,
          office: String,
          url: String,
        },
        votes: Number,
      },
    ],
    winningEmployee: {
      _id: String,
      user_id: Schema.Types.ObjectId,
      name: String,
      office: String,
      url: String,
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
