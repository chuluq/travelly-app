"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PageTitle } from "@/components/page-title";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";

import { ArticleSchema } from "@/lib/validations/article";
import { API_URL } from "@/config/routes";
import { defaultSession, SessionData } from "@/lib/session";

type FormData = z.infer<typeof ArticleSchema>;

export const CreateArticle = () => {
  const [session, setSession] = React.useState<SessionData>(defaultSession);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [imgFile, setImgFile] = React.useState<File | undefined>();

  const {
    setValue,
    handleSubmit,
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

  React.useEffect(() => {
    setIsLoading(true);
    fetch("/api/session")
      .then((res) => res.json())
      .then((session) => {
        setSession(session);
        setIsLoading(false);
      });
  }, []);

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
    }
  }

  function onSubmit(values: FormData) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                  placeholder="upload image"
                  type="file"
                  accept="image/*"
                  disabled={isLoading}
                  onChange={onChangeFile}
                />
                <Button onClick={onUploadFile}>Upload</Button>
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
                name="title"
                placeholder="some title"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
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
                name="description"
                placeholder="put some description here..."
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
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
                name="category"
                placeholder="some category"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
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
