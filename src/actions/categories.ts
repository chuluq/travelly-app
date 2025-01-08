"use server";

import { API_URL, PATH_CATEGORY } from "@/config/routes";
import { getSession } from "./auth";
import { revalidatePath } from "next/cache";
import { CategoryForm } from "@/types/category";
import { redirect } from "next/navigation";

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

export async function getDetailCategory(documentId: string) {
  const session = await getSession();

  const res = await fetch(`${API_URL}/api/categories/${documentId}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  const category = await res.json();

  if (!res.ok) {
    return { message: "An error occured while fetching data" };
  }

  return category;
}

export async function deleteCategory(documentId: string) {
  const session = await getSession();

  const res = await fetch(`${API_URL}/api/categories/${documentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!res.ok) {
    return { message: "An error occured while fetching data" };
  }

  revalidatePath(PATH_CATEGORY.detail(documentId));
  revalidatePath(PATH_CATEGORY.list);
}

export async function createCategory(payload: CategoryForm) {
  const session = await getSession();

  const res = await fetch(`${API_URL}/api/categories`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (res.ok) {
    revalidatePath(PATH_CATEGORY.list);
    redirect(PATH_CATEGORY.list);
  }
}

export async function updateCategory(
  documentId: string,
  payload: CategoryForm
) {
  const session = await getSession();

  const res = await fetch(`${API_URL}/api/categories/${documentId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (res.ok) {
    revalidatePath(PATH_CATEGORY.list);
    redirect(PATH_CATEGORY.list);
  }
}
