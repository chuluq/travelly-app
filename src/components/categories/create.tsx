"use client";

import { CategorySchema } from "@/lib/validations/article";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import React from "react";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import {
  createCategory,
  getDetailCategory,
  updateCategory,
} from "@/actions/categories";
import { z } from "zod";

type FormData = z.infer<typeof CategorySchema>;

export const CreateCategory = () => {
  const { documentId } = useParams();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
    },
  });

  React.useEffect(() => {
    async function fetchArticle() {
      const category = await getDetailCategory(String(documentId));
      setValue("name", category.data.name ?? "");
    }
    if (documentId) {
      fetchArticle();
    }
  }, [documentId]); // eslint-disable-line react-hooks/exhaustive-deps

  async function onSubmit(values: FormData) {
    try {
      setIsLoading(true);
      const payload = {
        data: {
          name: values.name,
        },
      };

      if (!documentId) {
        await createCategory(payload);
      } else {
        await updateCategory(String(documentId), payload);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:max-w-screen-sm flex flex-col"
      >
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            placeholder="category name"
            autoCapitalize="none"
            autoCorrect="off"
            disabled={isLoading}
            {...register("name")}
          />
          {errors?.name && (
            <p className="px-1 text-xs text-red-600">{errors?.name.message}</p>
          )}
        </div>
        <Button disabled={isLoading} className="mt-2 self-end">
          {isLoading && <Icons.loading className="mr-2 size-4 animate-spin" />}
          {documentId ? "Update" : "Create"} Category
        </Button>
      </form>
    </div>
  );
};
