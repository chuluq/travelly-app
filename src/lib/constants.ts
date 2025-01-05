export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const secretKey = process.env.SESSION_SECRET;

export const auth = {
  login: "auth/local",
  register: "auth/local/register",
};

export const article = {
  list: "articles",
  create: "articles",
  detail: (documentId: string) => `articles/${documentId}`,
  update: (documentId: string) => `articles/${documentId}`,
  delete: (documentId: string) => `articles/${documentId}`,
};
