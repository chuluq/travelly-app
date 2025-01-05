import * as z from "zod";

export const LoginSchema = z.object({
  identifier: z
    .string({ required_error: "Identifier is required" })
    .email({ message: "Please enter a valid email" })
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Be at least 8 characters long" })
    .trim(),
});

export type FormState =
  | {
      errors?: {
        identifier?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const registerSchema = z.object({
  email: z.string().trim().email().nonempty({
    message: "Email is required",
  }),
  username: z.string().trim().nonempty({
    message: "Username is required",
  }),
  password: z.string().trim().nonempty({
    message: "Password is required",
  }),
});
