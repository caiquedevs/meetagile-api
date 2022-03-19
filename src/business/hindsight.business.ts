import Connection from '../models/hindsight';

interface ItDoesNotExist {
  id?: string;
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

export const hindsightDoesNotExist = async ({ id, user_id }: ItDoesNotExist) => {
  const user = await Connection.findOne().and([{ _id: id }, { user_id }]);

  if (!user) {
    throw {
      status: 401,
      errorBusiness: 'Retrospectiva informada não existe',
    };
  }

  return user;
};
