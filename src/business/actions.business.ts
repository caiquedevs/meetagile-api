import Connection from '../models/actions';

interface IDoesNotExist {
  id: string;
  user_id: string;
}

export const hasEmptyFields = async (obj: any, fields: string[]) => {
  const verifyFields = fields.filter((item) => !obj[item]);

  if (verifyFields.length > 0) {
    throw {
      errorBusiness: `Os campos a seguir são obrigatórios -> ${verifyFields.join(', ')}`,
      status: 400,
    };
  }
};

export const actionDoesNotExist = async ({ id, user_id }: IDoesNotExist) => {
  const action = await Connection.findOne().and([{ _id: id }, { user_id }]);

  if (!action) {
    throw {
      status: 400,
      errorBusiness: 'A Ação informada não existe',
    };
  }

  return action;
};
