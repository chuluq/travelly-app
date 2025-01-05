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
