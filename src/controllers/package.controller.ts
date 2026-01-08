import { Request, Response, NextFunction } from 'express';
import { themes } from '../data/themes';
import type { Package, Theme } from '../types/themes';
import * as packageService from '../services/package.service';

export const getPackage = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const theme_slug = req.params.theme_slug; 
    const theme: Theme | undefined = themes[theme_slug];
    if (!theme) {
      return res.status(404).json({ error: 'Theme not found' });
    }
    res.status(200).json( theme );
  } catch (error) {
    next(error);
  }
}

export const getPackageFile = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const theme_slug = req.params.theme_slug;
    const package_id = req.params.package_id;
    const theme: Theme | undefined = themes[theme_slug];
    if (!theme) {
      return res.status(404).json({ error: 'Theme not found' });
    }
    const package_item: Package | undefined = theme.packages.find(p => p.ID === package_id);
    if (!package_item) {
      return res.status(404).json({ error: 'Package not found' });
    }
    const packageDownload = await packageService.getPackageFile(package_item.r2_file);
    res.status(200).json(packageDownload);
  } catch (error) {
    next(error);
  }
}

export const validatePreinstall = async ( req: Request, res: Response, next: NextFunction ) => {
  return res.status(200).json({ message: 'passed' });
}