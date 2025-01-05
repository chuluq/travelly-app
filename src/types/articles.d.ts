import { DataPagination } from ".";

export type Article = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  user: User;
  category: number | null;
  comments: Comment[];
  localizations: string[];
};

export type User = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  image?: string | null;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
};

export type Comment = {
  id: number;
  documentId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
};

export type ArticlePagination = DataPagination<Article>;

export type ArticleForm = {
  title: string;
  description: string;
  cover_image_url: string;
  category: number;
};
