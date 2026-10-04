import { Request, Response } from 'express';
import * as adminService from '../services/admin.service';

export async function archiveProject(req: Request, res: Response) {
  try {
    const adminId = (req as any).user?.sub;
    const project = await adminService.softDeleteProject(adminId, req.params.id, req);
    res.json(project);
  } catch (e: any) {
    res.status(e.status || 500).json({ error: e.message });
  }
}

export async function listAudits(req: Request, res: Response) {
  try {
    const logs = await adminService.listAuditLogs();
    res.json(logs);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
