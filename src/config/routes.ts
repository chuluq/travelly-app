export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const secretKey = process.env.SESSION_SECRET;

export const auth = {
  login: "auth/local",
  register: "auth/local/register",
  getMe: "users/me",
};

export const article = {
  list: "articles",
  create: "articles",
  detail: (documentId: string) => `articles/${documentId}`,
  update: (documentId: string) => `articles/${documentId}`,
  delete: (documentId: string) => `articles/${documentId}`,
};

export const comment = {
  list: "comments",
  create: "comments",
  detail: (documentId: string) => `comments/${documentId}`,
  update: (documentId: string) => `comments/${documentId}`,
  delete: (documentId: string) => `comments/${documentId}`,
};

export const category = {
  list: "categories",
  create: "categories",
  detail: (documentId: string) => `categories/${documentId}`,
  update: (documentId: string) => `categories/${documentId}`,
  delete: (documentId: string) => `categories/${documentId}`,
};

export const upload = "upload";
