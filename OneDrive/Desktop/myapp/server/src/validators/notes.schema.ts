import { z } from 'zod';

export const createNoteSchema = z.object({
  body: z.object({
    projectId: z.string().min(1),
    content: z.string().min(1),
  }),
});

export const updateNoteSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    content: z.string().min(1),
  }),
});
