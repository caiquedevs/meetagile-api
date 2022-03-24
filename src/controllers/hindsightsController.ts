import { Request, Response } from 'express';

import * as hindsightBusiness from '../business/hindsight.business';
import Connection from '../models/hindsight';
import { IUser } from '../models/user';
import { IHindsight } from '../models/hindsight';

interface ReqHindsight extends Request {
  user_tkn?: { user: IUser };
}

const registerHindsight = async (req: ReqHindsight, res: Response): Promise<any> => {
  const fields = ['name'];

  try {
    await hindsightBusiness.hasEmptyFields(req.body, fields);

    const payload: IHindsight = {
      name: req.body.name,
      stepOne: [],
      stepTwo: [],
      stepThree: [],
      user_id: req.user_tkn?.user._id!,
    };

    const newHindsight = await Connection.create(payload);
    return res.status(201).json(newHindsight);
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

const listHindsights = async (req: ReqHindsight, res: Response) => {
  try {
    const hindsights = await Connection.find({ user_id: req.user_tkn?.user._id })
      .sort({
        createdAt: 'descending',
      })
      .populate('winningEmployee')
      .populate('stepThree.employee');
    return res.status(200).json(hindsights.reverse());
  } catch (e) {
    return res.status(500).json({ msg: 'Ocorreu um erro inesperado' });
  }
};

const showHindsight = async (req: ReqHindsight, res: Response) => {
  try {
    const id = req.params.hindsight_id;

    const hindsight = await hindsightBusiness.hindsightDoesNotExist({
      id,
      user_id: req.user_tkn?.user._id!,
    });

    return res.status(200).json(hindsight);
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

const updateHindsight = async (req: ReqHindsight, res: Response) => {
  try {
    const id = req.params.hindsight_id;

    await hindsightBusiness.hindsightDoesNotExist({
      id,
      user_id: req.user_tkn?.user._id!,
    });

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

const deleteHindsight = async (req: ReqHindsight, res: Response) => {
  try {
    const id = req.params.hindsight_id;

    const hindsight = await hindsightBusiness.hindsightDoesNotExist({
      id,
      user_id: req.user_tkn?.user._id!,
    });

    await Connection.deleteOne({ _id: id });
    return res.status(200).json(hindsight);
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

export {
  listHindsights,
  showHindsight,
  deleteHindsight,
  updateHindsight,
  registerHindsight,
};
