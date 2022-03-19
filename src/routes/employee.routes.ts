import { Router } from 'express';
import Auth from '../middlewares/Auth';

import {
  listEmployees,
  showEmployee,
  registerEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employeeController';

const router = Router();

router.get('/employees', Auth.verify, listEmployees);
router.get('/employee/:employee_id', Auth.verify, showEmployee);
router.post('/employee/register', Auth.verify, registerEmployee);
router.put('/employee/:employee_id', Auth.verify, updateEmployee);
router.delete('/employee/:employee_id', Auth.verify, deleteEmployee);

export default router;
