import { Schema, model } from 'mongoose';

export interface IEmployee {
  _id: string;
  user_id: Schema.Types.ObjectId;
  name: string;
  office: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const EmployeeSchema = new Schema<IEmployee>(
  {
    name: String,
    office: String,
    url: String,
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

export default model<IEmployee>('employees', EmployeeSchema);
