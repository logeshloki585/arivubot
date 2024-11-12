"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const HomeNavbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div className="fixed w-full top-0 left-0">
      <nav className=" flex items-center justify-between p-4 bg-white px-10">
        <div className="flex items-center gap-2">
          {/* <div className="font-semibold text-xl">✷ ChatBot AI</div> */}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <Button
            variant="outline"
            onClick={() => {
              if (session == null) {
                router.push("/login");
              } else {
                signOut({ callbackUrl: "/" });
              }
            }}
          >
            {session != null ? "Log Out" : "Log in"}
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default HomeNavbar;
