import { type Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/login-form";
import { getSession } from "@/actions/auth";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function LoginPage() {
  const session = await getSession();

  if (session.isAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <div className="container flex h-screen w-screen flex-col">
      <div className="flex flex-col pt-[18px] px-7 pb-12 space-y-10 lg:space-y-40">
        <h4 className="text-lg font-semibold">Your Logo</h4>
        <div className="w-full lg:max-w-screen-md grid lg:grid-cols-[1fr_369px] items-start lg:items-center lg:mx-auto gap-12">
          <div className="space-y-8">
            <div className="flex flex-col gap-y-1">
              <h1 className="font-semibold text-[26px]">Sign in to</h1>
              <p className="text-xl font-medium">Lorem Ipsum is simply</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm">If you don’t have an account</p>
              <p className="text-sm">
                You can{" "}
                <Link href="/register" className="text-blue-700 font-semibold">
                  Register here !
                </Link>
              </p>
            </div>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
