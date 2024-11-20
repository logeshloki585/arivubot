"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const HomeNavbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="fixed  top-[10px] left-[1380px] bg-red-400 z-50">
      <nav className="flex items-center justify-between p-4 bg-white px-10 z-50">
        <div className="flex items-center gap-2">
          {/* <div className="font-semibold text-xl">✷ ChatBot AI</div> */}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <Button
            variant="outline"
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            Log Out
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default HomeNavbar;
