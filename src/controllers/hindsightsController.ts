import { Request, Response } from 'express';

import * as hindsightBusiness from '../business/hindsight.business';
import * as actionsBusiness from '../business/actions.business';
import * as userBusiness from '../business/user.business';

import Connection, { IHindsight } from '../models/hindsight';
import ConnectionActions, { IAction } from '../models/actions';
import ConnectionEmployee from '../models/employee';
import ConnectionUser from '../models/user';

import { IUser } from '../models/user';

interface ReqHindsight extends Request {
  user_tkn?: { user: IUser };
}

const registerHindsight = async (req: ReqHindsight, res: Response): Promise<any> => {
  const fields = ['name'];

  try {
    await hindsightBusiness.hasEmptyFields(req.body, fields);

    const newHindsight = await Connection.create({
      name: req.body.name,
      stepOne: [],
      stepTwo: [],
      stepThree: req.body.stepThree,
      user_id: req.user_tkn?.user._id!,
      timer: { hours: 0, minutes: 0, seconds: 0 },
    });

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
    const hindsights = await Connection.find({
      user_id: req.user_tkn?.user._id,
    });

    const employees = await ConnectionEmployee.find({
      user_id: req.user_tkn?.user._id,
    });

    let actions: any = await ConnectionActions.findOne({
      user_id: req.user_tkn?.user._id,
    });

    return res.status(200).json({ hindsights, employees, actions });
  } catch (e) {
    return res.status(500).json({ msg: 'Ocorreu um erro inesperado' });
  }
};

const updateHindsight = async (req: ReqHindsight, res: Response) => {
  try {
    const hindsight: IHindsight = req.body;

    await hindsightBusiness.hindsightDoesNotExist({
      id: hindsight._id!,
      user_id: req.user_tkn?.user._id!,
    });

    await Connection.updateOne({ _id: hindsight._id }, { $set: hindsight });

    return res.status(200).json(req.body);
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

const listHindsightsAdmin = async (req: ReqHindsight, res: Response) => {
  try {
    await userBusiness.verifyAdmin(req.user_tkn?.user?._id!);

    const hindsights = await Connection.find().populate('user_id', '-password');
    const users = await ConnectionUser.find();
    let actions: any = await ConnectionActions.find();

    const filteredUsers = users?.map((user) => {
      let filtered = hindsights.filter(
        (hind: any) => JSON.stringify(hind.user_id?._id) === JSON.stringify(user._id)
      );

      return {
        _id: user._id,
        teamName: user.teamName,
        email: user.email,
        cpfCnpj: user.cpfCnpj,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        type: user.type,
        totalHindsights: filtered.length,
      };
    });

    return res.status(200).json({ hindsights, users: filteredUsers, actions });
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

const listAllUserHindsightsAdmin = async (req: ReqHindsight, res: Response) => {
  try {
    await userBusiness.verifyAdmin(req.user_tkn?.user?._id!);

    const { user_id } = req.params;
    await userBusiness.userDoesNotExist({ id: user_id });

    const hindsights = await Connection.find({ user_id }).sort({
      createdAt: 'descending',
    });

    const employees = await ConnectionEmployee.find({ user_id }).sort({
      createdAt: 'descending',
    });

    let actions: any = await ConnectionActions.findOne({ user_id }).sort({
      createdAt: 'descending',
    });

    return res.status(200).json({ hindsights, employees, actions });
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
  deleteHindsight,
  updateHindsight,
  registerHindsight,
  listHindsightsAdmin,
  listAllUserHindsightsAdmin,
};
