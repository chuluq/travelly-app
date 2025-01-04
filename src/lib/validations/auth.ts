import * as z from "zod";

export const loginSchema = z.object({
  identifier: z.string().trim().email().nonempty({
    message: "Identifier is required",
  }),
  password: z.string().trim().nonempty({
    message: "Password is required",
  }),
});

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
