import { DataPagination } from "@/types";
import { Comment } from "@/types/comment";
import { User } from "@/types/user";
import { Category } from "@/types/category";

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
  category: Category | null;
  comments: Comment[];
  localizations: string[];
};

export type ArticlePagination = DataPagination<Article>;

export type ArticleForm = {
  data: {
    title: string;
    description: string;
    cover_image_url: string;
    category: number;
  };
};
