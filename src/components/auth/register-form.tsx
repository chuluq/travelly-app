"use client";

import { AlertCircle } from "lucide-react";
import React from "react";
import { useFormState } from "react-dom";

import { SubmitButton } from "@/components/submit-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signUp } from "@/actions/auth";
import { cn } from "@/lib/utils";

type RegisterFormProps = React.HTMLAttributes<HTMLDivElement>;

export const RegisterForm = ({ className, ...props }: RegisterFormProps) => {
  const [state, formAction] = useFormState(signUp, undefined);

  return (
    <div className={cn(className)} {...props}>
      <Alert
        variant="destructive"
        className={cn("mb-4", !state?.message && "hidden")}
      >
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{state?.message}</AlertDescription>
      </Alert>
      <h1 className="font-medium text-3xl hidden lg:block mb-4">Sign In</h1>
      <form action={formAction}>
        <div className="grid gap-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
              {state?.errors?.email && (
                <p className="px-1 text-xs text-red-600">
                  {state?.errors?.email.join(", ")}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="johndoe"
                type="text"
                autoCapitalize="none"
                autoComplete="username"
                autoCorrect="off"
              />
              {state?.errors?.username && (
                <p className="px-1 text-xs text-red-600">
                  {state?.errors?.username.join(", ")}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="password"
                type="password"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
              />
              {state?.errors?.password && (
                <p className="px-1 text-xs text-red-600">
                  {state?.errors?.password.join(", ")}
                </p>
              )}
            </div>
          </div>
          <SubmitButton text="Register" />
        </div>
      </form>
    </div>
  );
};
