"use client";

import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import { Article } from "@/types/articles";
import { CommentSchema } from "@/lib/validations/article";
import { createComment } from "@/actions/comments";

interface DetailArticleProps {
  article: Article;
}

type FormData = z.infer<typeof CommentSchema>;

export const DetailArticle = ({ article }: DetailArticleProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: FormData) {
    try {
      setIsLoading(true);
      const payload = {
        data: {
          content: values.content,
          article: article?.id ?? 0,
        },
      };
      await createComment(payload);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      reset();
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <figure className="flex flex-col space-y-2">
        <Image
          src={article.cover_image_url}
          alt={article.title}
          width={250}
          height={250}
        />
        <figcaption className="font-bold text-4xl">{article.title}</figcaption>
      </figure>
      <div className="space-y-4">
        <p className="text-lg">{article.description}</p>
        <p className="text-sm">
          Created at {format(article.createdAt, "dd MMM yyyy")}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-screen-sm flex flex-col space-y-2"
      >
        <div className="grid gap-2">
          <Input
            type="text"
            placeholder="type a comment..."
            disabled={isLoading}
            {...register("content")}
          />
          {errors?.content && (
            <p className="px-1 text-xs text-red-600">
              {errors?.content.message}
            </p>
          )}
        </div>
        <Button className="self-end" disabled={isLoading}>
          {isLoading && <Icons.loading className="mr-2 size-4 animate-spin" />}
          Comment
        </Button>
      </form>
    </div>
  );
};
