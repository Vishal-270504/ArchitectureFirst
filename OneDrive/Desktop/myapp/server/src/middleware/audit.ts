import { prisma } from '../config/db';

export async function auditLog(adminId: string | null, action: string, entityType: string, entityId: string, oldData?: any, newData?: any, req?: any) {
  await prisma.adminAudit.create({
    data: {
      adminId,
      action: action as any,
      entityType,
      entityId,
      oldData: oldData ? JSON.stringify(oldData) : null,
      newData: newData ? JSON.stringify(newData) : null,
      ipAddress: req?.ip,
      userAgent: req?.headers?.['user-agent'] || null,
    },
  });
}
