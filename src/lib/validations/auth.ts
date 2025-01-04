import * as z from "zod";

export const loginSchema = z.object({
  identifier: z.string().trim().email(),
  password: z.string().trim(),
});
