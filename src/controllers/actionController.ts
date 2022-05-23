import { Request, Response } from 'express';

import Connection from '../models/actions';
import * as actionBusiness from '../business/actions.business';

import { IUser } from '../models/user';

interface ReqAction extends Request {
  user_tkn?: { user: IUser };
}

const registerAction = async (req: any, res: Response): Promise<any> => {
  try {
    const payload = {
      data: [],
      user_id: req.user_id,
    };

    const newAction = await Connection.create(payload);
    return newAction;
  } catch (error: any) {
    if (error.errorBusiness) {
      return res.status(error.status).json({ msg: error.errorBusiness });
    }

    return res.status(500).json({
      msg: 'Ocorreu um erro inesperado',
      error,
    });
  }
};

const updateAction = async (req: ReqAction, res: Response) => {
  try {
    const id = req.params.action_id;
    await actionBusiness.actionDoesNotExist({ id, user_id: req.user_tkn?.user._id! });

    const payload = { ...req.body };

    await Connection.updateOne({ _id: id }, { $set: payload });
    return res.status(200).json({ _id: id, ...payload });
  } catch (error: any) {
    if (error.errorBusiness) {
      return res.status(error.status).json({ msg: error.errorBusiness });
    }

    return res.status(500).json({
      msg: 'Ocorreu um erro inesperado',
      error,
    });
  }
};

export { updateAction, registerAction };
