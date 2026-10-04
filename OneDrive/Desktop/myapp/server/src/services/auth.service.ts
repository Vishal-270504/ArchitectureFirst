import { prisma } from '../config/db';
import { hashPassword, comparePassword } from '../utils/hash';
import { signAccessToken, signRefreshToken } from '../utils/jwt';
import crypto from 'crypto';

export async function register(email: string, password: string, name?: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw Object.assign(new Error('Email already in use'), { status: 409 });
  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, passwordHash, name },
  });
  return user;
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  if (!user.emailVerified) throw Object.assign(new Error('Email not verified'), { status: 403 });
  const ok = await comparePassword(password, user.passwordHash);
  if (!ok) throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  const tokenPayload = { sub: user.id, role: user.role };
  const accessToken = signAccessToken(tokenPayload);
  const refreshToken = signRefreshToken(tokenPayload);
  const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
  await prisma.refreshToken.create({
    data: {
      tokenHash,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
  return { accessToken, refreshToken, user };
}

export async function refresh(refreshToken: string) {
  try {
    const payload = verifyRefreshToken(refreshToken) as any;
    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const stored = await prisma.refreshToken.findFirst({ where: { tokenHash, userId: payload.sub } });
    if (!stored || stored.revoked || stored.expiresAt < new Date()) {
      throw Object.assign(new Error('Invalid refresh token'), { status: 401 });
    }
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) throw Object.assign(new Error('User not found'), { status: 401 });
    // rotate
    await prisma.refreshToken.update({ where: { id: stored.id }, data: { revoked: true } });
    const newPayload = { sub: user.id, role: user.role };
    const newAccess = signAccessToken(newPayload);
    const newRefresh = signRefreshToken(newPayload);
    const newHash = crypto.createHash('sha256').update(newRefresh).digest('hex');
    await prisma.refreshToken.create({ data: { tokenHash: newHash, userId: user.id, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } });
    return { accessToken: newAccess, refreshToken: newRefresh };
  } catch {
    throw Object.assign(new Error('Invalid refresh token'), { status: 401 });
  }
}
