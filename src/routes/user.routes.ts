import { Router } from 'express';
import Auth from '../middlewares/Auth';

import {
  listUsersAdmin,
  loginUser,
  registerUser,
  updateUser,
  deleteUserAdmin,
  forgotPassword,
} from '../controllers/userController';

const router = Router();

router.post('/user/login', loginUser);
router.post('/user/register', registerUser);
router.put('/user/:user_id', Auth.verify, updateUser);
router.post('/user/forgot-password', forgotPassword);

router.delete('/admin/user/:user_id', Auth.verify, deleteUserAdmin);
router.get('/admin/users', Auth.verify, listUsersAdmin);

export default router;
