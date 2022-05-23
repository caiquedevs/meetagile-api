import Connection from '../models/user';

interface IUserDoesNotExist {
  id?: string;
  email?: string;
}

export const userAlreadyExists = async (email: string) => {
  const user = await Connection.findOne({ email });

  if (user) {
    throw {
      errorBusiness: 'Já existe um usuário com este email em nosso sistema!',
      status: 400,
    };
  }
};

export const hasEmptyFields = async (obj: any, whiteList: string[]) => {
  const verifyFields = whiteList.filter((item) => !obj[item]);

  if (verifyFields.length > 0) {
    throw {
      errorBusiness: `Os campos a seguir são obrigatórios -> ${verifyFields.join(', ')}`,
      status: 400,
    };
  }
};

export const userDoesNotExist = async ({ email, id }: IUserDoesNotExist) => {
  const user = await Connection.findOne().or([{ email: email }, { _id: id }]);

  if (!user) {
    throw {
      status: 400,
      errorBusiness: 'Usuário informado não existe',
    };
  }

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await Connection.findOne().and([{ email }, { password }]);

  if (!user) {
    throw {
      status: 400,
      errorBusiness: 'Usuário informado não existe',
    };
  }

  return user;
};

export const verifyAdmin = async (id: string) => {
  const user = await userDoesNotExist({ id });

  if (user.type !== 'admin') {
    throw {
      status: 401,
      errorBusiness: 'Acesso restrito apenas à ADMINISTRADORES!',
    };
  }
};
