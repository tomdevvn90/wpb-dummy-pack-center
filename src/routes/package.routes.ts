import { Router } from 'express';
import * as packageController from '../controllers/package.controller';

const router = Router();

router.get('/:theme_slug', packageController.getPackage);
router.get('/:theme_slug/:package_id', packageController.getPackageFile);

export default router;
