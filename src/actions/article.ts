"use server";

import { API_URL, PATH_ARTICLE } from "@/config/routes";
import { revalidatePath } from "next/cache";
import { getSession } from "./auth";

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
