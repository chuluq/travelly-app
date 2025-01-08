export type Category = {
  id: number;
  documentId: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
};

export type CategoryPagination = DataPagination<Category>;

export type CategoryForm = {
  data: {
    name: string;
  };
};
