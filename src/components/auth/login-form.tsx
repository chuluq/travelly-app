"use client";

import React from "react";
import { useFormState } from "react-dom";
import { Loader2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { signIn } from "@/actions/auth";

type LoginFormProps = React.HTMLAttributes<HTMLDivElement>;

export const LoginForm = ({ className, ...props }: LoginFormProps) => {
  const [state, formAction, pending] = useFormState(signIn, undefined);

  return (
    <div className={cn(className)} {...props}>
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
                disabled={pending}
              />
              {state?.errors?.identifier && (
                <p className="px-1 text-xs text-red-600">
                  {state.errors.identifier}
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
                disabled={pending}
              />
              {state?.errors?.password && (
                <p className="px-1 text-xs text-red-600">
                  {state.errors.password}
                </p>
              )}
            </div>
          </div>
          <Button type="submit" disabled={pending}>
            {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};
