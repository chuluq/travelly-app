import * as z from "zod";

export const UploadFileSchema = z.object({
  files: z
    .string({ required_error: "File is required" })
    .trim()
    .nonempty({ message: "File is required" }),
});
