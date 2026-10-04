import { Router } from 'express';
import * as projectsController from '../controllers/projects.controller';
import * as adminController from '../controllers/admin.controller';
import { authenticate, requireRole } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createProjectSchema } from '../validators/projects.schema';
import { generalRateLimit } from '../middleware/rateLimit';

const router = Router();

router.get('/', generalRateLimit, projectsController.list);
router.get('/:id', generalRateLimit, projectsController.getOne);
router.post('/', authenticate, requireRole('ADMIN'), validate(createProjectSchema), projectsController.create);

router.patch('/:id/archive', authenticate, requireRole('ADMIN'), generalRateLimit, adminController.archiveProject);

export default router;
