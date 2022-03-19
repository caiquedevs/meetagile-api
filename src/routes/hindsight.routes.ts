import { Router } from 'express';
import Auth from '../middlewares/Auth';

import {
  listHindsights,
  showHindsight,
  registerHindsight,
  updateHindsight,
  deleteHindsight,
} from '../controllers/hindsightsController';

const router = Router();

router.get('/hindsights', Auth.verify, listHindsights);
router.get('/hindsight/:hindsight_id', Auth.verify, showHindsight);
router.post('/hindsight/register', Auth.verify, registerHindsight);
router.put('/hindsight/:hindsight_id', Auth.verify, updateHindsight);
router.delete('/hindsight/:hindsight_id', Auth.verify, deleteHindsight);

export default router;
