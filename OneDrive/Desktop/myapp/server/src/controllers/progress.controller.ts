import { Request, Response } from 'express';
import * as progressService from '../services/progress.service';

export async function upsert(req: Request, res: Response) {
  const userId = (req as any).user?.sub;
  const { projectId, progressPercent } = req.body;
  const progress = await progressService.upsertProgress(userId, projectId, progressPercent);
  res.json(progress);
}

export async function get(req: Request, res: Response) {
  const userId = (req as any).user?.sub;
  const progress = await progressService.getUserProgress(userId, req.params.projectId);
  res.json(progress);
}
