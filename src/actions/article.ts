"use server";

import { API_URL, PATH_ARTICLE } from "@/config/routes";
import { revalidatePath } from "next/cache";
import { getSession } from "./auth";
import { ArticleForm } from "@/types/articles";
import { redirect } from "next/navigation";

export async function getArticles({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  const session = await getSession();

  const res = await fetch(
    `${API_URL}/api/articles?pagination[page]=${
      page + 1
    }&pagination[pageSize]=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: "no-store",
    }
  );
  const articles = await res.json();

  if (!res.ok) {
    return { message: "An error occured while fetching data" };
  }

  return articles;
}

export async function getArticleDetail(documentId: string) {
  const session = await getSession();

  const res = await fetch(`${API_URL}/api/articles/${documentId}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  const article = await res.json();

  revalidatePath(PATH_ARTICLE.detail(documentId));
  revalidatePath(PATH_ARTICLE.list);
  return article;
}

export async function createArticle(payload: ArticleForm) {
  const session = await getSession();

  const res = await fetch(`${API_URL}/api/articles`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (res.ok) {
    revalidatePath(PATH_ARTICLE.list);
    redirect(PATH_ARTICLE.list);
  }
}

export async function updateArticle(documentId: string, payload: ArticleForm) {
  const session = await getSession();

  const res = await fetch(`${API_URL}/api/articles/${documentId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (res.ok) {
    revalidatePath(PATH_ARTICLE.detail(documentId));
    redirect(PATH_ARTICLE.detail(documentId));
  }
}

export async function deleteArticle(id: string) {
  const session = await getSession();

  await fetch(`${API_URL}/api/articles/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
}
