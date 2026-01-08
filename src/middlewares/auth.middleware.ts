import { Request, Response, NextFunction } from 'express';
import { decodePayload } from '../util/libs';

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

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const xxxMeta = req.headers['xxx-meta'] as string | undefined;
    if (!xxxMeta) {
      return res.status(401).json({
        success: false,
        data: 'Missing authentication payload',
      });
    }

    const payload = decodePayload(xxxMeta);
    if (!payload) {
      return res.status(401).json({
        success: false,
        data: 'Invalid authentication payload',
      });
    }

    const p = payload as any;
    const license_key = typeof p?.license_key === 'string' ? p.license_key.trim() : '';
    const domain = typeof p?.domain === 'string'
      ? p.domain.replace(/^https?:\/\//, '').replace(/\/+$/, '').trim()
      : '';
    const api_url = typeof p?.api_url === 'string' ? p.api_url.trim() : '';
    const api_secret_key = typeof p?.api_secret_key === 'string' ? p.api_secret_key.trim() : '';
    const item_id = typeof p?.item_id === 'string' ? p.item_id.trim() : '';

    if (!license_key) {
      return res.status(401).json({
        success: false,
        data: 'Invalid license key',
      });
    }

    if (!domain) {
      return res.status(401).json({
        success: false,
        data: 'Invalid domain',
      });
    }

    if (!api_url || !api_secret_key) {
      return res.status(401).json({
        success: false,
        data: 'Missing API credentials in payload',
      });
    }

    if (!item_id) {
      return res.status(401).json({
        success: false,
        data: 'Missing item_id in payload',
      });
    }

    // Verify purchase code validity
    const verifyUrl = `${api_url.replace(/\/+$/, '')}/api/v2/verify-purchase-code-validity`;
    const formData = new FormData();
    formData.append('item_id', item_id);
    formData.append('server_name', domain);
    formData.append('purchase_code', license_key);
    console.log('formData', formData);
    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'x-api-key': api_secret_key,
        Accept: 'application/json',
      },
      body: formData,
    });
    console.log('item_id:', item_id, 'server_name:', domain, 'purchase_code:', license_key);
    console.log('api_secret_key:', api_secret_key);
    const data = await response.json().catch(() => null);
    console.log('verifyUrl:', verifyUrl, 'response status:', response.status, 'data:', data);

    // Ensure data is an object before accessing properties
    const isValidResponse = data && typeof data === 'object' && !Array.isArray(data);

    if (!response.ok || !isValidResponse || !(data as any)?.success) {
      const message = isValidResponse ? (data as any)?.message || 'License verification failed' : 'License verification failed';
      const status = response.status === 404 ? 401 : response.status || 401;
      return res.status(status).json({ success: false, data: message });
    }

    next();
  } catch (error) {
    console.error('Authentication middleware error', error);
    return res.status(500).json({
      success: false,
      data: 'Internal server error',
    });
  }
};