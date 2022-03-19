import { Schema, model } from 'mongoose';

export interface IAction {
  _id: string;
  data: [{ name: string; status: string }];
  user_id: Schema.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ActionSchema = new Schema<IAction>(
  {
    data: [{ name: String, status: String }],
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

export default model<IAction>('actions', ActionSchema);
