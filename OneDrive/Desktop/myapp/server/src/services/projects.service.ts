import { prisma } from '../config/db';

export async function listProjects({ status, difficulty, limit = 20 }) {
  return prisma.project.findMany({
    where: { status: status ? status as any : undefined, difficulty: difficulty ? difficulty as any : undefined },
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({ where: { id } });
}

export async function createProject(data: any, createdById: string) {
  return prisma.project.create({
    data: { ...data, createdById },
  });
}

export async function updateProject(id: string, data: any) {
  return prisma.project.update({ where: { id }, data });
}

export async function softDeleteProject(id: string) {
  // No soft delete column in schema, set status ARCHIVED
  return prisma.project.update({ where: { id }, data: { status: 'ARCHIVED' } });
}
