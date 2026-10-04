import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export async function register(req: Request, res: Response) {
  try {
    const { email, password, name } = req.body;
    const user = await authService.register(email, password, name);
    res.status(201).json({ id: user.id, email: user.email });
  } catch (e: any) {
    res.status(e.status || 500).json({ error: e.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json({ accessToken: result.accessToken, refreshToken: result.refreshToken });
  } catch (e: any) {
    res.status(e.status || 500).json({ error: e.message });
  }
}

export async function refresh(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;
    const tokens = await authService.refresh(refreshToken);
    res.json(tokens);
  } catch (e: any) {
    res.status(e.status || 401).json({ error: e.message });
  }
}
