"use client";

import { AlertCircle } from "lucide-react";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

import { Icons } from "@/components/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signIn } from "@/actions/auth";
import { cn } from "@/lib/utils";

type LoginFormProps = React.HTMLAttributes<HTMLDivElement>;

export const LoginForm = ({ className, ...props }: LoginFormProps) => {
  const [state, formAction] = useFormState(signIn, undefined);

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
              <Label htmlFor="identifier">Identifier</Label>
              <Input
                id="identifier"
                name="identifier"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
              {state?.errors?.identifier && (
                <p className="px-1 text-xs text-red-600">
                  {state.errors.identifier.join(", ")}
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
                  {state.errors.password.join(", ")}
                </p>
              )}
            </div>
          </div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Icons.loading className="mr-2 size-4 animate-spin" />}
      Login
    </Button>
  );
}
