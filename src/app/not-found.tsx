import Image from "next/image";
import Link from "next/link";
import { Undo2 } from "lucide-react";

import illustration from "@/assets/peeps.png";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-14 bg-white container mx-auto gap-4">
      <div className="space-y-2 text-center">
        <h2 className="font-black text-6xl">Oops!</h2>
        <p className="font-bold text-2xl">You are lost</p>
      </div>
      <div className="flex-1 flex flex-col items-center w-[925px] h-full bg-not-found bg-no-repeat bg-bottom bg-contain">
        <Image
          src={illustration}
          alt="illustration-404"
          className="self-center"
        />
        <Link href="/" className="text-2xl flex items-center mt-28">
          <Undo2 className="mr-2" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
