import { Router } from 'express';
import * as packageController from '../controllers/package.controller';
import { detectPackageMiddleware } from '../middlewares/detectPackage.middleware';
import { guardMiddleware } from '../middlewares/guard.middleware';


const router = Router();
const middleware = [ 
  detectPackageMiddleware,
  guardMiddleware,
];

router.get('/:theme_slug', packageController.getPackage);
router.get('/preinstall/:theme_slug/:package_id', ...middleware, packageController.validatePreinstall);
router.get('/:theme_slug/:package_id', ...middleware, packageController.getPackageFile);

export default router;