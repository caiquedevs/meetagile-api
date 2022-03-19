import { Router } from 'express';
import Auth from '../middlewares/Auth';

import {
  listActions,
  showAction,
  registerAction,
  updateAction,
  deleteAction,
} from '../controllers/actionController';

const router = Router();

router.get('/actions', Auth.verify, listActions);
router.get('/action/:action_id', Auth.verify, showAction);
router.post('/action/register', Auth.verify, registerAction);
router.put('/action/:action_id', Auth.verify, updateAction);
router.delete('/action/:action_id', Auth.verify, deleteAction);

export default router;
