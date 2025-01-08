import * as z from "zod";

export const ArticleSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .trim()
    .nonempty({ message: "Title is required" }),
  description: z
    .string({ required_error: "description is required" })
    .trim()
    .nonempty({ message: "Description is required" }),
  coverImg: z
    .string({ required_error: "Cover Image is required" })
    .trim()
    .nonempty({ message: "Cover Image is required" }),
  category: z
    .string({ required_error: "Category is required" })
    .nonempty({ message: "Category is required" }),
});

export const CommentSchema = z.object({
  content: z
    .string({ required_error: "Comment is required" })
    .trim()
    .nonempty({ message: "Comment is required" }),
});
