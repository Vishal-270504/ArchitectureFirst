import { Request, Response } from 'express';
import * as projectsService from '../services/projects.service';

export async function list(req: Request, res: Response) {
  const { status, difficulty, limit } = req.query as any;
  const projects = await projectsService.listProjects({ status, difficulty, limit });
  res.json(projects);
}

export async function getOne(req: Request, res: Response) {
  const project = await projectsService.getProjectById(req.params.id);
  if (!project) return res.status(404).json({ error: 'Not found' });
  res.json(project);
}

export async function create(req: Request, res: Response) {
  const userId = (req as any).user?.sub;
  const project = await projectsService.createProject(req.body, userId);
  res.status(201).json(project);
}
