export interface Theme {
  name: string;
  description: string;
  item_id?: string;
  api_url?: string;
  api_secret_key?: string;
  packages: Package[];
}

export interface Package {
  ID: string;
  name: string;
  free?: boolean;
  locked?: boolean;
  description: string;
  image?: string;
  preview_url: string;
  tags: string[];
  size: string;
  createdAt: Date;
  updatedAt: Date;
  required: {
    type: string;
    value: string;
  }[];
  required_plugins?: {
    slug: string;
    name: string;
    version: string;
  }[];
  r2_file: string;
}