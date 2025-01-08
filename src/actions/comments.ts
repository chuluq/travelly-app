"use server";

import { API_URL, PATH_COMMENT } from "@/config/routes";
import { getSession } from "./auth";
import { CommentForm } from "@/types/comment";
import { revalidatePath } from "next/cache";

export async function getComments({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  try {
    const session = await getSession();

    const res = await fetch(
      `${API_URL}/api/comments?pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
      { headers: { Authorization: `Bearer ${session.accessToken}` } }
    );
    const comments = await res.json();

    return comments;
  } catch (error) {
    console.error(error);
    throw new Error("An error occured while fetching data");
  }
}

export async function getDetailComment({ documentId }: { documentId: string }) {
  try {
    const session = await getSession();

    const res = await fetch(`${API_URL}/api/comments/${documentId}`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });
    const comment = await res.json();

    return comment;
  } catch (error) {
    console.error(error);
    throw new Error("An error occured while fetching data");
  }
}

export async function deleteComment({ documentId }: { documentId: string }) {
  try {
    const session = await getSession();

    const res = await fetch(`${API_URL}/api/comments/${documentId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });
    const comment = await res.json();
    revalidatePath(PATH_COMMENT.list);
    return comment;
  } catch (error) {
    console.error(error);
    throw new Error("An error occured while mutating data");
  }
}

export async function createComment(payload: CommentForm) {
  try {
    const session = await getSession();

    const res = await fetch(`${API_URL}/api/comments`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    const comment = await res.json();

    console.log(comment);
  } catch (error) {
    console.error(error);
    throw new Error("An error occured while mutating data");
  }
}

export async function updateComment({
  documentId,
  content,
}: {
  documentId: string;
  content: string;
}) {
  try {
    const session = await getSession();

    const res = await fetch(`${API_URL}/api/comments/${documentId}`, {
      method: "PUT",
      body: JSON.stringify({ data: { content } }),
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });
    const comment = await res.json();

    revalidatePath(PATH_COMMENT.detail(documentId));
    revalidatePath(PATH_COMMENT.list);

    return comment;
  } catch (error) {
    console.error(error);
    throw new Error("An error occured while mutating data");
  }
}
