"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { loginSchema } from "@/lib/validations/auth";

type LoginFormProps = React.HTMLAttributes<HTMLDivElement>;

type FormData = z.infer<typeof loginSchema>;

export const LoginForm = ({ className, ...props }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    console.log(data);

    setIsLoading(false);
  }

  return (
    <div className={cn(className)} {...props}>
      <h1 className="font-medium text-3xl hidden lg:block mb-4">Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="identifier">Identifier</Label>
              <Input
                id="identifier"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                {...register("identifier")}
              />
              {errors.identifier && (
                <p className="px-1 text-xs text-red-600">
                  {errors.identifier.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="password"
                type="password"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
                {...register("password")}
              />
              {errors.password && (
                <p className="px-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};
