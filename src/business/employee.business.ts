import Connection from '../models/employee';

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

export const employeeDoesNotExist = async ({ id, user_id }: IDoesNotExist) => {
  const employee = await Connection.findOne().and([{ _id: id }, { user_id }]);

  if (!employee) {
    throw {
      status: 400,
      errorBusiness: 'Funcionário informado não existe',
    };
  }

  return employee;
};
