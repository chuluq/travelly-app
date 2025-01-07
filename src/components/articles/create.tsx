"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PageTitle } from "@/components/page-title";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { API_URL, PATH_ARTICLE } from "@/config/routes";
import { useAccessToken } from "@/hooks/use-token";
import { ArticleSchema } from "@/lib/validations/article";
import { Icons } from "../icons";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof ArticleSchema>;

export const CreateArticle = () => {
  const session = useAccessToken();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [imgFile, setImgFile] = React.useState<File | undefined>();

  const {
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ArticleSchema),
    defaultValues: {
      title: "",
      description: "",
      coverImg: "",
      category: "",
    },
  });

  function onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setImgFile(e.target.files[0]);
    }
  }

  async function onUploadFile() {
    const formData = new FormData();
    if (imgFile) {
      formData.append("files", imgFile);
    }

    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      const data = await res.json();
      if (res.ok && !!data) {
        setValue("coverImg", data[0].url);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(values: FormData) {
    try {
      setIsLoading(true);
      const payload = {
        data: {
          title: values.title,
          description: values.description,
          cover_image_url: values.coverImg,
          category: null,
        },
      };
      const res = await fetch(`${API_URL}/api/articles`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      if (res.ok) {
        router.push(PATH_ARTICLE.list);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageTitle title="Create a new article" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 w-full lg:max-w-screen-sm">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="coverImg">Cover Image</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="coverImg"
                  // name="coverImg"
                  placeholder="upload image"
                  type="file"
                  accept="image/*"
                  disabled={isLoading}
                  onChange={onChangeFile}
                />
                <Button onClick={onUploadFile} disabled={isLoading}>
                  {isLoading && (
                    <Icons.loading className="mr-2 size-4 animate-spin" />
                  )}
                  Upload
                </Button>
              </div>
              {errors?.coverImg && (
                <p className="px-1 text-xs text-red-600">
                  {errors.coverImg.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="some title"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                {...register("title")}
              />
              {errors?.title && (
                <p className="px-1 text-xs text-red-600">
                  {errors?.title.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="put some description here..."
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                {...register("description")}
              />
              {errors?.description && (
                <p className="px-1 text-xs text-red-600">
                  {errors?.description.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="some category"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                {...register("category")}
              />
              {errors?.category && (
                <p className="px-1 text-xs text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>
          <SubmitButton text="Create article" />
        </div>
      </form>
    </div>
  );
};
