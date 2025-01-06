"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";

import {
  type SessionData,
  defaultSession,
  sessionOptions,
} from "@/lib/session";
import { API_URL } from "@/config/routes";
import { LoginSchema, RegisterSchema } from "@/lib/validations/auth";

export type LoginFormState =
  | {
      errors?: {
        identifier?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type RegisterFormState =
  | {
      errors?: {
        email?: string[];
        username?: string[];
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

export async function signIn(state: LoginFormState, formData: FormData) {
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

  const response = await fetch(`${API_URL}/api/auth/local`, {
    method: "POST",
    body: JSON.stringify({ identifier, password }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  if (!response.ok || data.error) {
    return {
      message:
        data.error.message ??
        "An error occurred while signing in your account.",
    };
  }

  session.isAuthenticated = true;
  session.accessToken = data.jwt;
  session.userId = data.user.id;

  // Create user session
  await session.save();
  // Redirect user
  redirect("/dashboard");
}

export async function signUp(state: RegisterFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = RegisterSchema.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  // Prepare data for insertion into database
  const { email, username, password } = validatedFields.data;

  const response = await fetch(`${API_URL}/api/auth/local/register`, {
    method: "POST",
    body: JSON.stringify({ email, username, password }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  if (!response.ok || data.error) {
    return {
      message:
        data.error.message ?? "An error occurred while creating your account.",
    };
  }

  // Redirect user
  redirect("/login");
}

export const signOut = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/login");
};
