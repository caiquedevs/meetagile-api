import { Router } from 'express';
import Auth from '../middlewares/Auth';

import {
  listHindsights,
  registerHindsight,
  updateHindsight,
  deleteHindsight,
  listHindsightsAdmin,
  listAllUserHindsightsAdmin,
} from '../controllers/hindsightsController';

const router = Router();

router.get('/hindsights', Auth.verify, listHindsights);
router.post('/hindsight/register', Auth.verify, registerHindsight);
router.put('/hindsight', Auth.verify, updateHindsight);
router.delete('/hindsight/:hindsight_id', Auth.verify, deleteHindsight);

router.get('/admin/hindsights', Auth.verify, listHindsightsAdmin);
router.get('/admin/hindsights/user/:user_id', Auth.verify, listAllUserHindsightsAdmin);

export default router;
