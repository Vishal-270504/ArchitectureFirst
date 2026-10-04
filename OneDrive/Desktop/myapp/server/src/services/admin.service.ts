import { prisma } from '../config/db';
import { auditLog } from '../middleware/audit';

export async function softDeleteProject(adminId: string, projectId: string, req?: any) {
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) throw Object.assign(new Error('Project not found'), { status: 404 });
  const updated = await prisma.project.update({ where: { id: projectId }, data: { status: 'ARCHIVED' } });
  await auditLog(adminId, 'SOFT_DELETE', 'Project', projectId, project, updated, req);
  return updated;
}

export async function listAuditLogs(limit = 100) {
  return prisma.adminAudit.findMany({ orderBy: { createdAt: 'desc' }, take: limit });
}
