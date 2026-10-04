import { prisma } from '../config/db';

export async function createNote(userId: string, projectId: string, content: string) {
  return prisma.userNote.create({ data: { userId, projectId, content } });
}

export async function listNotesByProject(userId: string, projectId: string) {
  return prisma.userNote.findMany({ where: { userId, projectId }, orderBy: { createdAt: 'desc' } });
}

export async function updateNote(userId: string, noteId: string, content: string) {
  const note = await prisma.userNote.findUnique({ where: { id: noteId } });
  if (!note || note.userId !== userId) {
    throw Object.assign(new Error('Not found'), { status: 404 });
  }
  return prisma.userNote.update({ where: { id: noteId }, data: { content, updatedAt: new Date() } });
}

export async function deleteNote(userId: string, noteId: string) {
  const note = await prisma.userNote.findUnique({ where: { id: noteId } });
  if (!note || note.userId !== userId) {
    throw Object.assign(new Error('Not found'), { status: 404 });
  }
  return prisma.userNote.delete({ where: { id: noteId } });
}
