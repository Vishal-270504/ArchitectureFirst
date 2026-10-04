import { Router } from 'express';
import * as progressController from '../controllers/progress.controller';
import { authenticate } from '../middleware/auth';
import { generalRateLimit } from '../middleware/rateLimit';
import { validate } from '../middleware/validate';
import { upsertProgressSchema } from '../validators/progress.schema';

const router = Router();

router.post('/', authenticate, generalRateLimit, validate(upsertProgressSchema), progressController.upsert);
router.get('/:projectId', authenticate, generalRateLimit, progressController.get);

export default router;
