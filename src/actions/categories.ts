"use server";

import { API_URL } from "@/config/routes";
import { getSession } from "./auth";

export async function getCategories() {
  const session = await getSession();

  const res = await fetch(`${API_URL}/api/categories`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  const categories = await res.json();

  if (!res.ok) {
    return { message: "An error occured while fetching data" };
  }

  return categories;
}
