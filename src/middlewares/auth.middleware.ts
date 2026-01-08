import { Request, Response, NextFunction } from 'express';
import { decodePayload } from '../util/libs';
import { Package } from '../types/themes';
import { verifyPurchaseCodeValidity } from '../services/validate.service';

/*
payload: 
  {
    domain: 'http://xxx.com',
    ip: 'xxx.xxx.xxx.xxx',
    admin_email: 'xxx@xxx.com',
    license_key: 'xxx',
    wordpress_version: '6.9',
    php_version: '8.4.10',
    theme_slug: 'xxx',
    theme_version: '1.0'
    api_url:xxx,
    api_secret_key:xxxx,
    item_id:xxx
  }
*/ 

interface Payload {
  domain: string;
  ip: string;
  admin_email: string;
  license_key: string;
  wordpress_version: string;
  php_version: string;
  theme_slug: string;
  theme_version: string;
}

export const authMiddleware = async (req: Request & { package?: Package }, res: Response, next: NextFunction) => {
  const xxxMeta = req.headers['xxx-meta'] as string | undefined;
    if (!xxxMeta) {
      return res.status(401).json({
        error: 'Missing authentication payload',
      });
    }

    const payload = decodePayload(xxxMeta) as Payload;
    const license_key = payload?.license_key;
    const domain = payload?.domain;
    console.log(payload)
    if (!payload) {
      return res.status(401).json({
        success: false,
        data: 'Invalid authentication payload',
      });
    }
    
    const $package = req.package as Package & { theme_id: string };
    if (!$package) {
      return res.status(401).json({ error: 'Invalid package' });
    }

    const result = await verifyPurchaseCodeValidity($package.theme_id, license_key, domain);

    // console.log(result)

    if (result.success === false) {
      return res.status(401).json({ error: 'Invalid purchase code' });
    }

    if (result.valid === false) {
      return res.status(401).json({ error: 'Invalid purchase code' });
    }

    next()
};