import { Request, Response } from 'express';

import Connection from '../models/actions';
import * as actionBusiness from '../business/actions.business';
import { IUser } from '../models/user';

interface ReqAction extends Request {
  user_tkn?: { user: IUser };
}

const registerAction = async (req: ReqAction, res: Response): Promise<any> => {
  const fields = ['data'];

  try {
    await actionBusiness.hasEmptyFields(req.body, fields);

    const payload = {
      data: req.body.data,
      user_id: req.user_tkn?.user._id,
    };

    const newAction = await Connection.create(payload);
    return res.status(201).json(newAction);
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

const listActions = async (req: ReqAction, res: Response) => {
  try {
    const actions = await Connection.findOne({ user_id: req.user_tkn?.user._id }).sort({
      createdAt: 'descending',
    });

    if (!actions) {
      req.body.data = [];
      return registerAction(req, res);
    }

    return res.status(200).json(actions);
  } catch (error) {
    return res.status(500).json({ msg: 'Ocorreu um erro inesperado', error });
  }
};

const showAction = async (req: ReqAction, res: Response) => {
  try {
    const id = req.params.action_id;
    const action = await actionBusiness.actionDoesNotExist({
      id,
      user_id: req.user_tkn?.user._id!,
    });

    return res.status(200).json(action);
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

const deleteAction = async (req: ReqAction, res: Response) => {
  try {
    const id = req.params.action_id;
    const action = await actionBusiness.actionDoesNotExist({
      id,
      user_id: req.user_tkn?.user._id!,
    });

    await Connection.deleteOne({ _id: id });
    return res.status(200).json(action);
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

export { listActions, showAction, deleteAction, updateAction, registerAction };
