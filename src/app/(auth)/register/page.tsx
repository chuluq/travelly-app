import { type Metadata } from "next";
import Link from "next/link";

import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Register",
  description: "Register an account",
};

export default function RegisterPage() {
  return (
    <div className="container flex h-screen w-screen flex-col">
      <div className="flex flex-col pt-[18px] px-7 pb-12 space-y-10 lg:space-y-40">
        <h4 className="text-lg font-semibold">Your Logo</h4>
        <div className="w-full lg:max-w-screen-md grid lg:grid-cols-[1fr_369px] items-start lg:items-center lg:mx-auto gap-12">
          <div className="space-y-8">
            <div className="flex flex-col gap-y-1">
              <h1 className="font-semibold text-[26px]">Sign up</h1>
              <p className="text-xl font-medium">Lorem Ipsum is simply</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm">If you already have an account</p>
              <p className="text-sm">
                You can{" "}
                <Link href="/login" className="text-blue-700 font-semibold">
                  Login here !
                </Link>
              </p>
            </div>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
