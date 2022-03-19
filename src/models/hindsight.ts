import { Schema, model } from 'mongoose';

interface IStepOne {
  employeeName: string;
  description: string;
  votes: number;
}

interface IStepTwo extends IStepOne {}

interface IHindsight {
  _id: string;

  name: string;
  stepOne: IStepOne[];
  stepTwo: IStepTwo[];
  employee_id?: Schema.Types.ObjectId;
  user_id: Schema.Types.ObjectId;

  createdAt: string;
  updatedAt: string;
  __v: number;
}

const HindsightSchema = new Schema<IHindsight>(
  {
    name: String,
    stepOne: [{ employeeName: String, description: String, votes: Number }],
    stepTwo: [{ employeeName: String, description: String, votes: Number }],
    employee_id: {
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
