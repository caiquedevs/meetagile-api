import jwt from 'jsonwebtoken';
import Connection from '../models/user';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

import * as userBusiness from '../business/user.business';

dotenv.config();

const KEYJWT = process.env.KEYJWT;
const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASSWORD = process.env.USER_PASSWORD;

const loginUser = async (req: Request, res: Response): Promise<any> => {
  const whiteList = ['email', 'password'];

  try {
    await userBusiness.hasEmptyFields(req.body, whiteList);
    const user: any = await userBusiness.loginUser(req.body.email, req.body.password);

    const payload = { ...user }._doc;
    delete payload.password;

    const token = jwt.sign({ user }, KEYJWT!, {
      expiresIn: process.env.EXPIRATIONJWT,
    });

    return res.json({ token, currentUser: payload });
  } catch (error: any) {
    if (error.errorBusiness) {
      return res.status(error.status).json({ msg: error.errorBusiness });
    }

    return res.status(500).json({
      msg: 'Ocorreu um erro inesperado ao tentar realizar o login',
      error,
    });
  }
};

const registerUser = async (req: Request, res: Response): Promise<any> => {
  const fields = ['teamName', 'email', 'password'];

  try {
    await userBusiness.hasEmptyFields(req.body, fields);
    await userBusiness.userAlreadyExists(req.body.email);

    const payload = {
      teamName: req.body.teamName,
      email: req.body.email,
      password: req.body.password,
      cpfCnpj: '',
    };

    await Connection.create(payload);
    return loginUser(req, res);
  } catch (error: any) {
    if (error.errorBusiness) {
      return res.status(error.status).json({ msg: error.errorBusiness });
    }

    return res.status(500).json({
      msg: 'Ocorreu um erro inesperado ao tentar registrar um novo usuário',
      error,
    });
  }
};

const listUsers = async (req: Request, res: Response) => {
  try {
    const response = await Connection.find();
    return res.status(200).json(response.reverse());
  } catch (e) {
    return res.status(500).json({ msg: 'Ocorreu um erro inesperado' });
  }
};

const showUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.user_id;

    const user = await userBusiness.userDoesNotExist({ id });
    return res.status(200).json(user);
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

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.user_id;
    await userBusiness.userDoesNotExist({ id });

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

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.user_id;
    const user = await userBusiness.userDoesNotExist({ id });

    await Connection.deleteOne({ _id: id });
    return res.status(200).json(user);
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

const forgotPassword = async (req: Request, res: Response) => {
  const fields = ['email'];

  try {
    await userBusiness.hasEmptyFields(req.body, fields);
    const user = await userBusiness.userDoesNotExist({ email: req.body.email });

    // Email do servidor
    const remetente = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: USER_EMAIL,
        pass: USER_PASSWORD,
      },
    });

    // Email do usuário
    const emailBody = {
      from: USER_EMAIL,
      to: req.body.email,
      subject: 'Recuperação de senha',
      html: `<h5 style="font-size: 20px">Seu senha de acesso é: ${user.password}</h5>`,
    };

    // Enviar o email
    remetente.sendMail(emailBody, (err) => {
      if (!err) return res.status(200).json({ msg: 'Email enviado com sucesso!' });
      else {
        throw {
          errorBusiness: 'Ocorreu um erro inesperado ao enviar o email',
          status: 500,
        };
      }
    });
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
  listUsers,
  showUser,
  deleteUser,
  updateUser,
  registerUser,
  loginUser,
  forgotPassword,
};
