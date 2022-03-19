import { Router } from 'express';
import Auth from '../middlewares/Auth';

import {
  listUsers,
  showUser,
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  forgotPassword,
} from '../controllers/userController';

const router = Router();

router.get('/users', Auth.verify, listUsers);
router.get('/user/:user_id', showUser);

router.post('/user/login', loginUser);
router.post('/user/register', registerUser);

router.put('/user/:user_id', Auth.verify, updateUser);
router.delete('/user/:user_id', Auth.verify, deleteUser);

router.post('/user/forgot-password', forgotPassword);

export default router;
