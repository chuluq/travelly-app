export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const secretKey = process.env.SESSION_SECRET;

export const PATH_AUTH = {
  login: "/login",
  register: "/register",
};

export const PATH_DASHBOARD = "/dashboard";

export const PATH_ARTICLE = {
  list: `${PATH_DASHBOARD}/articles`,
  create: `${PATH_DASHBOARD}/articles/new`,
  detail: (documentId: string) => `${PATH_DASHBOARD}/articles/${documentId}`,
  update: (documentId: string) =>
    `${PATH_DASHBOARD}/articles/${documentId}/update`,
};

export const PATH_COMMENT = {
  list: `${PATH_DASHBOARD}/comments`,
  create: `${PATH_DASHBOARD}/comments/new`,
  detail: (documentId: string) => `${PATH_DASHBOARD}/comments/${documentId}`,
  update: (documentId: string) =>
    `${PATH_DASHBOARD}/comments/${documentId}/update`,
};

export const PATH_CATEGORY = {
  list: `${PATH_DASHBOARD}/categories`,
  create: `${PATH_DASHBOARD}/categories/new`,
  detail: (documentId: string) => `${PATH_DASHBOARD}/categories/${documentId}`,
  update: (documentId: string) =>
    `${PATH_DASHBOARD}/categories/${documentId}/update`,
};

export const PATH_UPLOAD = "/dashboard/upload";
