export type Comment = {
  id: number;
  documentId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
};

export type CommentPagination = DataPagination<Comment>;

export type CommentForm = {
  data: {
    content: string;
    article: number;
  };
};
