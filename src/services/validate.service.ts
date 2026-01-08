import { themes } from '../data/themes';

interface ThemeMetadata {
  item_id: string;
  api_url: string;
  api_secret_key: string;
}

export const getThemeMetadataByThemeId = (theme_id: string) : ThemeMetadata => {
  const theme = Object.values(themes).find(theme => theme.item_id === theme_id);
  if (!theme) {
    throw new Error('Theme not found');
  }

  return {
    item_id: theme.item_id || '',
    api_url: theme.api_url || '',
    api_secret_key: theme.api_secret_key || '',
  };
}

export const verifyPurchaseCodeValidity = async (theme_id: string, purchase_code: string, domain: string) => {
  const { api_url, api_secret_key, item_id } : ThemeMetadata = getThemeMetadataByThemeId(theme_id);

  // make form data
  const formData = new FormData();
  formData.append('purchase_code', purchase_code);
  // Remove protocol (http://, https://) and any trailing slashes to get only the domain string
  const domainStr = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  formData.append('server_name', domainStr);
  formData.append('item_id', item_id);

  const response = await fetch(`${api_url}api/v2/verify-purchase-code-validity`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-API-KEY': api_secret_key,
      'User-Agent': 'PostmanRuntime/7.49.1',
    },
    body: formData,
  });

  console.log(response);

  const data = await response.json();


  return data;
}