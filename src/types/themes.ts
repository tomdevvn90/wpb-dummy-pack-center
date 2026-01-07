export interface Theme {
  name: string;
  description: string;
  packages: Package[];
}

export interface Package {
  ID: string;
  name: string;
  description: string;
  image: string;
  preview_url: string;
  tags: string[];
  size: string;
  createdAt: Date;
  updatedAt: Date;
  required: {
    type: string;
    value: string;
  }[];
  required_plugins: {
    slug: string;
    name: string;
    version: string;
  }[];
  r2_file: string;
}