import { NextFunction, Request, Response } from 'express';
import { authMiddleware } from './auth.middleware';
import { Package } from '../types/themes';

export const guardMiddleware = (req: Request & { package?: Package }, res: Response, next: NextFunction) => {
  const $package = req.package;
  const isFree = $package?.free || false;
  const isLocked = $package?.locked || false;

  if (isLocked) {
    return res.status(401).json({ error: 'Package is locked' });
  }

  if (isFree === true) {
    return next();
  }

  return authMiddleware(req, res, next);
}