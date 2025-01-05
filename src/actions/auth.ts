"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";

import {
  type SessionData,
  defaultSession,
  sessionOptions,
} from "@/lib/session";
import { API_URL } from "@/lib/utils";
import { LoginSchema } from "@/lib/validations/auth";

export type FormState =
  | {
      errors?: {
        identifier?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  // If user visits for the first time session returns an empty object.
  // Let's add the isAuthenticated property to this object and its value will be the default value which is false
  if (!session.isAuthenticated) {
    session.isAuthenticated = defaultSession.isAuthenticated;
  }

  return session;
}

export async function signIn(state: FormState, formData: FormData) {
  const session = await getSession();

  // Validate form fields
  const validatedFields = LoginSchema.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Prepare data for insertion into database
  const { identifier, password } = validatedFields.data;

  try {
    const response = await fetch(`${API_URL}/api/auth/local`, {
      method: "POST",
      body: JSON.stringify({ identifier, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (!response.ok || data.error) {
      state = {
        ...state,
        message: data.error.message,
      };
      return { message: "An error occurred while creating your account." };
    }

    session.isAuthenticated = true;
    session.accessToken = data.jwt;
    session.userId = data.user.id;

    // Create user session
    await session.save();
    // Redirect user
    redirect("/dashboard");
  } catch (error) {
    throw new Error(
      `An error occurred while creating your account. ${JSON.stringify(error)}`
    );
  }
}