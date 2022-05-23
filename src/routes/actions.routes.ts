import { Router } from 'express';
import Auth from '../middlewares/Auth';

import { updateAction } from '../controllers/actionController';

const router = Router();

router.put('/action/:action_id', Auth.verify, updateAction);

export default router;
