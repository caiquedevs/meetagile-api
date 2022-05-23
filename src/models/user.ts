import { Schema, model } from 'mongoose';

export interface IUser {
  _id: string;
  teamName: string;
  email: string;
  type?: 'team' | 'admin';
  password?: string;
  cpfCnpj: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const UserSchema = new Schema<IUser>(
  {
    teamName: String,
    email: String,
    password: String,
    cpfCnpj: String,
    createdAt: String,
    updatedAt: String,
    type: String,
  },
  {
    timestamps: true,
  }
);

export default model<IUser>('users', UserSchema);
