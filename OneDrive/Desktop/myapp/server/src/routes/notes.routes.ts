import { Router } from 'express';
import * as notesController from '../controllers/notes.controller';
import { authenticate } from '../middleware/auth';
import { generalRateLimit } from '../middleware/rateLimit';
import { validate } from '../middleware/validate';
import { createNoteSchema, updateNoteSchema } from '../validators/notes.schema';

const router = Router();

router.post('/', authenticate, generalRateLimit, validate(createNoteSchema), notesController.create);
router.get('/project/:projectId', authenticate, generalRateLimit, notesController.list);
router.put('/:id', authenticate, generalRateLimit, validate(updateNoteSchema), notesController.update);
router.delete('/:id', authenticate, generalRateLimit, notesController.remove);

export default router;
