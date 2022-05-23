import { Router } from 'express';
import Auth from '../middlewares/Auth';

import {
  listEmployees,
  registerEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employeeController';

const router = Router();

router.get('/employees', Auth.verify, listEmployees);
router.post('/employee/register', Auth.verify, registerEmployee);
router.put('/employee/:employee_id', Auth.verify, updateEmployee);
router.delete('/employee/:employee_id', Auth.verify, deleteEmployee);

export default router;
