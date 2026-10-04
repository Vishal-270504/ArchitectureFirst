import { Request, Response } from 'express';
import * as notesService from '../services/notes.service';

export async function create(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.sub;
    const { projectId, content } = req.body;
    const note = await notesService.createNote(userId, projectId, content);
    res.status(201).json(note);
  } catch (e: any) {
    res.status(e.status || 500).json({ error: e.message });
  }
}

export async function list(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.sub;
    const notes = await notesService.listNotesByProject(userId, req.params.projectId);
    res.json(notes);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.sub;
    const note = await notesService.updateNote(userId, req.params.id, req.body.content);
    res.json(note);
  } catch (e: any) {
    res.status(e.status || 500).json({ error: e.message });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.sub;
    await notesService.deleteNote(userId, req.params.id);
    res.status(204).send();
  } catch (e: any) {
    res.status(e.status || 500).json({ error: e.message });
  }
}
