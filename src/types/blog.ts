import { IImageFile } from "./files";

export enum BlogStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  DELETED = 'DELETED',
  PENDING = 'PENDING',
  FUTURE = 'FUTURE',
  PRIVATE = 'PRIVATE',
}

export interface IBlogPost {
  id?: number;
  user_id?: number;
  image_file?: IImageFile;
  title: string;
  slug: string;
  body: string;
  status: BlogStatus;
  category?: string;
  tags?: string;
  edit_history: IBlogPostHistory[];
  created_at?: string|number;
  updated_at?: string|number;
}

export interface IBlogPostHistory {
  image_file?: IImageFile;
  title: string;
  slug: string;
  body: string;
  status: BlogStatus;
  category?: string;
  tags?: string;
  updated_at: string;
}

export const BlogPostDefault: IBlogPost = {
  title: '',
  slug: '',
  body: '',
  status: BlogStatus.DRAFT,
  edit_history: [],
};
