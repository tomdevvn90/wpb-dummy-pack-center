import { Request, Response, NextFunction } from 'express';
import { decodePayload } from '../util/libs';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const xxx_meta = req.headers['xxx-meta'] as string;
  const payload = decodePayload(xxx_meta);
  
  // Developer note: Use this middleware for future authentication, license checking, or payload validation.
  // Example payload format:
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
  }
  */

  // ------------------- [ EXAM: License Key Validation ] -------------------
  // 1. Extract the license_key from the decoded payload object.
  //    (payload is expected to be an object from the xxx-meta header)
  // 2. If the license_key field does not exist or is falsy,
  //    immediately send a 401 Unauthorized response indicating an invalid license key.
  //
  // Example:
  //    - If payload = null               -> should reject as unauthorized.
  //    - If payload = {}                 -> should reject as unauthorized.
  //    - If payload.license_key is truthy -> allow to next().
  //    - If payload.license_key is falsy  -> block.
  //
  // [Write your exam code here:]
  //
  // const license_key = ... (extract the field from payload)
  // if (!license_key) { ... (respond 401) ... }
  //
  // [End exam section]
  // ------------------------------------------------------------------------
  /*
  Example code for reference, you can use it or not:
  const license_key = payload && (payload as any).license_key;
  if (!license_key) {
    return res.status(401).json({ 
      success: false,
      data: 'Invalid license key'
    });
  }
  */
  const license_key = payload && (payload as any).license_key;
  if (!license_key) {
    return res.status(401).json({ 
      success: false,
      data: 'Invalid license key'
    });
  }

  next();
};
