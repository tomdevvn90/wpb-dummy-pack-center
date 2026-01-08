import { S3Client, GetObjectCommand, S3ClientConfig, HeadObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { themes } from '../data/themes';
import type { Package } from '../types/themes';

const s3_conf: S3ClientConfig = {
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT || '',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || ''
  }
}

const r2 = new S3Client(s3_conf);

interface PackageFileResult {
  signedUrl: string;
  size?: number;
  unit?: string;
  mime?: string;
  lastModified?: Date;
  etag?: string;
}

/**
 * Get a signed URL for a file in the R2 bucket
 *
 * @param r2_file_path - The path to the file in the R2 bucket
 * @returns The signed URL for the file
 */
export const getPackageFile = async (r2_file_path: string) : Promise<PackageFileResult> => {
  const headCmd = new HeadObjectCommand({
    Bucket: process.env.R2_BUCKET!,
    Key: r2_file_path
  });

  const meta = await r2.send(headCmd);
  
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET!,
    Key: r2_file_path
  });
  const url = await getSignedUrl(
    r2, 
    command, 
    { expiresIn: 60 * 60 * 1 }
  ); // 1hr
  return {
    signedUrl: url,
    size: meta.ContentLength,
    unit: 'bytes',
    mime: meta.ContentType,
    lastModified: meta.LastModified,
    etag: meta.ETag,
  };
}

/**
 * Get a package object by theme slug and package ID.
 */
export function getPackageByThemeSlugAndPackageId(theme_slug: string, package_id: string): Package | undefined {
  const theme = themes[theme_slug];
  if (!theme) return undefined;
  const $p = theme.packages.find(pkg => pkg.ID === package_id);
  if (!$p) return undefined;

  const theme_id = theme.item_id ? theme.item_id : '';
  return {
    ...$p,
    theme_id: theme_id,
  } as Package & { theme_id: string };
}