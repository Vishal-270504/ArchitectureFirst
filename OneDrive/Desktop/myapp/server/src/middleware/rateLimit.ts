import { Request, Response, NextFunction } from 'express';

type RateConfig = { windowMs: number; max: number };

const stores = new Map<string, { count: number; reset: number }>();

function getStore(key: string, windowMs: number) {
  const now = Date.now();
  // cleanup stale entries
  for (const [k, v] of stores.entries()) {
    if (now > v.reset) stores.delete(k);
  }
  const entry = stores.get(key);
  if (!entry || now > entry.reset) {
    const fresh = { count: 0, reset: now + windowMs };
    stores.set(key, fresh);
    return fresh;
  }
  return entry;
}

export function rateLimit(config: RateConfig) {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = `${req.ip}-${req.path}`;
    const store = getStore(key, config.windowMs);
    store.count += 1;
    if (store.count > config.max) {
      return res.status(429).json({ error: 'Too many requests' });
    }
    next();
  };
}

export const authRateLimit = rateLimit({ windowMs: 60_000, max: 5 });
export const generalRateLimit = rateLimit({ windowMs: 60_000, max: 120 });
