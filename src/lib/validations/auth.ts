import * as z from "zod";

export const LoginSchema = z.object({
  identifier: z
    .string({ required_error: "Identifier is required" })
    .email({ message: "Please enter a valid email" })
    .trim()
    .nonempty({ message: "Email is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Be at least 8 characters long" })
    .trim()
    .nonempty({ message: "Password is required" }),
});

export const RegisterSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email" })
    .trim()
    .nonempty({ message: "Email is required" }),
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .nonempty({ message: "Username is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Be at least 8 characters long" })
    .nonempty({ message: "Password is required" }),
});
