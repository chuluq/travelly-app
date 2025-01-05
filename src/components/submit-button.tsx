"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="capitalize">
      {pending && <Icons.loading className="mr-2 size-4 animate-spin" />}
      {text}
    </Button>
  );
}
