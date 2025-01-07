"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PageTitle } from "@/components/page-title";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { API_URL } from "@/config/routes";
import { useAccessToken } from "@/hooks/use-token";
import { ArticleSchema } from "@/lib/validations/article";
import { Category } from "@/types/category";
import { getCategories } from "@/actions/categories";
import {
  createArticle,
  getArticleDetail,
  updateArticle,
} from "@/actions/article";

type FormData = z.infer<typeof ArticleSchema>;

export const CreateArticle = () => {
  const session = useAccessToken();
  const { documentId } = useParams();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [imgFile, setImgFile] = React.useState<File | undefined>();
  const [categories, setCategories] = React.useState<Category[]>([]);

  const {
    setValue,
    handleSubmit,
    register,
    getValues,
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

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getCategories();
      setCategories(categories.data);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchArticle() {
      const article = await getArticleDetail(String(documentId));
      setValue("title", article.data.title ?? "");
      setValue("description", article.data.description ?? "");
      setValue("coverImg", article.data.cover_image_url ?? "");
      setValue("category", article.data.category ?? "");
    }
    if (documentId) {
      fetchArticle();
    }
  }, [documentId]); // eslint-disable-line react-hooks/exhaustive-deps

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
          category: Number(values.category) ?? null,
        },
      };

      if (!documentId) {
        await createArticle(payload);
      } else {
        await updateArticle(String(documentId), payload);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageTitle
        title={documentId ? "Update an article" : "Create a new article"}
      />
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
                {getValues().coverImg ? (
                  <Image
                    alt="preview"
                    src={getValues().coverImg}
                    width={50}
                    height={50}
                  />
                ) : null}
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
              <Select onValueChange={(id) => setValue("category", id)}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category, index) => (
                    <SelectItem value={category.id.toString()} key={index}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors?.category && (
                <p className="px-1 text-xs text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>
          <SubmitButton
            text={documentId ? "Update article" : "Create article"}
          />
        </div>
      </form>
    </div>
  );
};
