import { NextFunction, Request, Response } from 'express';
import { getPackageByThemeSlugAndPackageId } from '../services/package.service';
import type { Package } from '../types/themes';

export const detectPackageMiddleware = (req: Request & { package?: Package }, res: Response, next: NextFunction) => {
  const theme_slug = req.params.theme_slug;
  const package_id = req.params.package_id;
  const $package = getPackageByThemeSlugAndPackageId(theme_slug, package_id);

  if (!$package) {
    return res.status(404).json({ error: 'Package not found' });
  }
  
  req.package = $package;
  
  next();
}