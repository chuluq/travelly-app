"use server";

import { API_URL, PATH_ARTICLE } from "@/config/routes";
import { revalidatePath } from "next/cache";
import { getSession } from "./auth";

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

export async function deleteArticle(id: string) {
  const session = await getSession();

  await fetch(`${API_URL}/api/articles/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  revalidatePath(PATH_ARTICLE.list);
}
