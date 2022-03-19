import { Request, Response } from 'express';

import * as employeeBusiness from '../business/employee.business';
import Connection from '../models/employee';
import { IUser } from '../models/user';

interface ReqRegister extends Request {
  user_tkn?: { user: IUser };
}

const registerEmployee = async (req: ReqRegister, res: Response): Promise<any> => {
  const fields = ['name', 'office'];

  try {
    await employeeBusiness.hasEmptyFields(req.body, fields);

    const payload = {
      name: req.body.name,
      office: req.body.office,
      url: req.body.url,
      user_id: req.user_tkn?.user._id,
    };

    const newEmployee = await Connection.create(payload);
    return res.status(201).json(newEmployee);
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

const listEmployees = async (req: ReqRegister, res: Response) => {
  try {
    const employees = await Connection.find({ user_id: req.user_tkn?.user._id }).sort({
      createdAt: 'descending',
    });

    return res.status(200).json(employees);
  } catch (error) {
    return res.status(500).json({ msg: 'Ocorreu um erro inesperado', error });
  }
};

const showEmployee = async (req: ReqRegister, res: Response) => {
  try {
    const id = req.params.employee_id;

    const employee = await employeeBusiness.employeeDoesNotExist({
      id,
      user_id: req.user_tkn?.user._id!,
    });
    return res.status(200).json(employee);
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

const updateEmployee = async (req: ReqRegister, res: Response) => {
  const payload = { ...req.body };

  try {
    const id = req.params.employee_id;
    await employeeBusiness.employeeDoesNotExist({ id, user_id: req.user_tkn?.user._id! });

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

const deleteEmployee = async (req: ReqRegister, res: Response) => {
  const id = req.params.employee_id;

  try {
    const employee = await employeeBusiness.employeeDoesNotExist({
      id,
      user_id: req.user_tkn?.user._id!,
    });

    await Connection.deleteOne({ _id: id });
    return res.status(200).json(employee);
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

export { listEmployees, showEmployee, deleteEmployee, updateEmployee, registerEmployee };
