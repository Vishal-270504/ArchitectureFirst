import { z } from 'zod';

export const createProjectSchema = z.object({
  body: z.object({
    slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/),
    title: z.string().min(3).max(200),
    description: z.string().min(10),
    shortDescription: z.string().max(500).optional(),
    difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).default('BEGINNER'),
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
    youtubeUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    estimatedHours: z.number().int().min(0).optional(),
  }),
});

export const updateProjectSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    title: z.string().min(3).max(200).optional(),
    description: z.string().min(10).optional(),
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  }),
});

export const projectQuerySchema = z.object({
  query: z.object({
    status: z.string().optional(),
    difficulty: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.coerce.number().int().min(1).max(100).default(20),
  }),
});
