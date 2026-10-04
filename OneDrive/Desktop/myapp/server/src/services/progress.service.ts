import { prisma } from '../config/db';

export async function upsertProgress(userId: string, projectId: string, progressPercent: number) {
  return prisma.userProgress.upsert({
    where: { userId_projectId: { userId, projectId } },
    update: { progressPercent, updatedAt: new Date() },
    create: { userId, projectId, progressPercent },
  });
}

export async function getUserProgress(userId: string, projectId: string) {
  return prisma.userProgress.findUnique({
    where: { userId_projectId: { userId, projectId } },
  });
}
