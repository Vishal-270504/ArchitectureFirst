import { z } from 'zod';

export const upsertProgressSchema = z.object({
  body: z.object({
    projectId: z.string().min(1),
    progressPercent: z.number().int().min(0).max(100),
  }),
});
